"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@heroui/react";
import { getChecklistBySlug } from "@/lib/checklists/data";
import { ProcessingState, CATEGORY_LABELS } from "@/lib/checklists/types";
import FormRenderer from "@/components/checklists/FormRenderer";
import PhotoUploader from "@/components/checklists/PhotoUploader";
import ScanningOverlay from "@/components/checklists/ScanningOverlay";

const CATEGORY_PILLS: Record<string, string> = {
  certification:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  "pre-work":
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  "post-work":
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  maintenance:
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

export default function ChecklistDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const checklist = getChecklistBySlug(slug);

  const [state, setState] = useState<ProcessingState>("idle");
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

  const handleAnalyze = useCallback(() => {
    if (!checklist) return;
    setState("scanning");

    const allFieldIds = checklist.sections.flatMap((s) =>
      s.fields.map((f) => f.id),
    );
    const mock = checklist.mockData;
    let count = 0;

    const stagger = (i: number) => {
      timerRef.current = setTimeout(() => {
        const id = allFieldIds[i];
        if (!id) return;

        setFilledValues((prev) => ({ ...prev, [id]: mock[id] ?? "" }));
        setAiFilledIds((prev) => new Set(prev).add(id));
        count++;
        setRevealedCount(count);

        if (i + 1 < allFieldIds.length) {
          stagger(i + 1);
        } else {
          setState("complete");
        }
      }, i * 300 + 600);
    };

    stagger(0);
  }, [checklist]);

  if (!checklist) {
    return (
      <div className="flex min-h-full items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Checklist not found
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            The checklist &quot;{slug}&quot; does not exist.
          </p>
          <Link
            href="/checklists"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-blue-600 px-6 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Back to Checklists
          </Link>
        </div>
      </div>
    );
  }

  const sectionsWithValues = checklist.sections.map((s) => ({
    ...s,
    fields: s.fields.map((f) => ({
      ...f,
      value: filledValues[f.id] ?? "",
    })),
  }));

  const totalFields = checklist.sections.flatMap((s) => s.fields).length;

  return (
    <div className="min-h-full bg-zinc-50 dark:bg-black">
      {state === "scanning" && (
        <ScanningOverlay
          revealedCount={revealedCount}
          totalFields={totalFields}
        />
      )}

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/checklists"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to checklists
        </Link>

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              {checklist.name}
            </h1>
            <span
              className={`inline-flex items-center rounded-full px-1.5 h-5 text-[10px] leading-none font-medium ${CATEGORY_PILLS[checklist.category]}`}
            >
              {CATEGORY_LABELS[checklist.category]}
            </span>
          </div>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            {checklist.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-zinc-500 dark:text-zinc-500">
            <span>
              <span className="font-medium">Frequency:</span> {checklist.frequency}
            </span>
            <span>
              <span className="font-medium">Legal basis:</span> {checklist.legalBasis}
            </span>
          </div>
        </div>

        <div className="mb-8">
          <PhotoUploader onPhotoSelected={handlePhotoSelected} />
        </div>

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

        {state === "complete" && (
          <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950/30">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
                AI analysis complete — {aiFilledIds.size} fields populated below
              </span>
            </div>
          </div>
        )}

        <FormRenderer
          sections={sectionsWithValues}
          aiFilledIds={aiFilledIds}
        />
      </div>
    </div>
  );
}
