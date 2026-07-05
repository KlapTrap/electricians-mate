"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button, Card, CardContent, CardHeader, Chip } from "@heroui/react";
import { getCustomFormById } from "@/lib/custom-forms/store";
import { CustomFormField } from "@/lib/custom-forms/types";
import ScanningOverlay from "@/components/checklists/ScanningOverlay";
import PhotoUploader from "@/components/checklists/PhotoUploader";

type ProcessingState = "idle" | "uploaded" | "scanning" | "complete";

/** Mock analysis — simulates LLM filling fields based on the description.
 *  Replace this with a real LLM API call when ready.
 *  The function receives: the form description (prompt), the image blob URL,
 *  and the list of fields to fill. */
async function mockAnalyzePhoto(
  _imageUrl: string,
  _description: string,
  fields: CustomFormField[],
): Promise<Record<string, string>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result: Record<string, string> = {};
      for (const field of fields) {
        const hint = field.description
          ? `${field.description} — ${field.label}`
          : field.label;
        result[field.id] = `[AI analysis for "${hint}" — connect LLM API]`;
      }
      resolve(result);
    }, 1500);
  });
}

function FieldValue({
  field,
  value,
  isAiFilled,
}: {
  field: CustomFormField;
  value: string;
  isAiFilled: boolean;
}) {
  const isEmpty = value === "";

  return (
    <div
      className={`rounded-lg border p-3 transition-colors ${
        isAiFilled
          ? "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40"
          : "border-zinc-200 dark:border-zinc-800"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted">
            {field.label}
          </label>
          {field.description && (
            <p className="mt-0.5 text-[0.6875rem] leading-relaxed text-muted">
              {field.description}
            </p>
          )}
        </div>
        {isAiFilled && (
          <Chip color="success" variant="soft" size="sm" className="shrink-0">
            AI-filled
          </Chip>
        )}
      </div>
      <div
        className={`mt-1 min-h-[1.25rem] text-sm ${
          isEmpty
            ? "italic text-muted"
            : "text-foreground"
        }`}
      >
        {isEmpty ? "Pending" : value}
      </div>
    </div>
  );
}

export default function CustomFormDetailPage() {
  const params = useParams();
  const formId = params.id as string;

  // Must read from localStorage on the client
  const [form, setForm] = useState(getCustomFormById(formId));

  const [state, setState] = useState<ProcessingState>("idle");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [filledValues, setFilledValues] = useState<Record<string, string>>({});
  const [aiFilledIds, setAiFilledIds] = useState<Set<string>>(new Set());
  const [revealedCount, setRevealedCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handlePhotoSelected = useCallback(
    () => {
      setState("uploaded");
      setFilledValues({});
      setAiFilledIds(new Set());
      setRevealedCount(0);
    },
    [],
  );

  const handleFile = useCallback(
    (file: File) => {
      setImageUrl(URL.createObjectURL(file));
    },
    [],
  );

  const handleAnalyze = useCallback(async () => {
    if (!form || form.fields.length === 0) return;
    setState("scanning");

    const fields = form.fields;

    const results = await mockAnalyzePhoto(
      imageUrl ?? "",
      form.description,
      fields,
    );

    let count = 0;
    const stagger = (i: number) => {
      timerRef.current = setTimeout(() => {
        const id = fields[i].id;
        if (!id) return;

        setFilledValues((prev) => ({ ...prev, [id]: results[id] ?? "" }));
        setAiFilledIds((prev) => new Set(prev).add(id));
        count++;
        setRevealedCount(count);

        if (i + 1 < fields.length) {
          stagger(i + 1);
        } else {
          setState("complete");
        }
      }, i * 300 + 600);
    };

    stagger(0);
  }, [form, imageUrl]);

  if (!form) {
    return (
      <div className="flex min-h-full items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">
            Form not found
          </h1>
          <p className="mt-2 text-muted">
            This custom form does not exist or has been deleted.
          </p>
          <Link
            href="/custom-forms"
            className="mt-4 inline-flex h-10 items-center justify-center rounded-xl bg-accent px-6 text-sm font-medium text-accent-foreground hover:bg-accent-hover transition-colors"
          >
            Back to Custom Forms
          </Link>
        </div>
      </div>
    );
  }

  const totalFields = form.fields.length;

  return (
    <div className="min-h-full bg-background">
      {state === "scanning" && (
        <ScanningOverlay
          revealedCount={revealedCount}
          totalFields={Math.max(totalFields, 1)}
        />
      )}

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Link
          href="/custom-forms"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-foreground transition-colors"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to custom forms
        </Link>

        {/* Form Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            {form.name}
          </h1>
        </div>

        {/* Description — the AI prompt */}
        <Card className="mb-8 border border-blue-200 bg-blue-50/70 dark:border-blue-800 dark:bg-blue-950/30">
          <CardHeader className="border-b border-blue-200 px-5 py-3 dark:border-blue-800">
            <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200">
              AI Analysis Instructions
            </h3>
          </CardHeader>
          <CardContent className="p-5">
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-blue-900 dark:text-blue-100">
              {form.description}
            </p>
            <p className="mt-2 text-xs text-accent">
              The AI will use these instructions to analyze your photo and fill
              out the fields below.
            </p>
          </CardContent>
        </Card>

        {/* Photo Upload */}
        <div
          className="mb-8"
          data-custom-form-photo={state !== "idle" ? "true" : undefined}
        >
          <PhotoUploader onPhotoSelected={handlePhotoSelected} onFile={handleFile} />
        </div>

        {/* Analyze button */}
        {state === "uploaded" && (
          <div className="mb-8 flex justify-center">
            <Button
              variant="primary"
              size="lg"
              onPress={handleAnalyze}
              className="px-10"
            >
              Analyze Photo
            </Button>
          </div>
        )}

        {/* Results banner */}
        {state === "complete" && (
          <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950/30">
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-emerald-600 dark:text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
                AI analysis complete — {aiFilledIds.size} fields populated
              </span>
            </div>
          </div>
        )}

        {/* Form Fields */}
        {form.fields.length > 0 ? (
          <Card className="border border-zinc-200 shadow-sm dark:border-zinc-800">
            <CardHeader className="border-b border-zinc-100 px-5 py-3 dark:border-zinc-800">
              <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Form Fields
              </h3>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 p-5">
              {form.fields.map((field) => (
                <FieldValue
                  key={field.id}
                  field={field}
                  value={filledValues[field.id] ?? ""}
                  isAiFilled={aiFilledIds.has(field.id)}
                />
              ))}
            </CardContent>
          </Card>
        ) : (
          <div className="rounded-xl border-2 border-dashed border-zinc-300 p-10 text-center dark:border-zinc-700">
            <p className="text-zinc-500 dark:text-zinc-400">
              This form has no fields defined.{" "}
              <Link
                href="/custom-forms"
                className="text-blue-600 hover:underline"
              >
                Edit it to add some fields.
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
