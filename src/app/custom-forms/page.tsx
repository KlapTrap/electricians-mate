"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Card, CardContent, Input, TextArea } from "@heroui/react";
import {
  CustomForm,
  CustomFormField,
  CustomFieldType,
  generateId,
} from "@/lib/custom-forms/types";
import { getCustomForms, saveCustomForm, deleteCustomForm } from "@/lib/custom-forms/store";

const FIELD_TYPE_LABELS: Record<CustomFieldType, string> = {
  text: "Text",
  select: "Select (dropdown)",
  "multi-line": "Multi-line",
  code: "Code (C1/C2/C3)",
  number: "Number",
};

/** Empty field template */
function emptyField(): CustomFormField {
  return {
    id: generateId(),
    label: "",
    type: "text",
  };
}

export default function CustomFormsPage() {
  const [forms, setForms] = useState<CustomForm[]>([]);
  const [showBuilder, setShowBuilder] = useState(false);

  // --- form builder state ---
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState<CustomFormField[]>([emptyField()]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setForms(getCustomForms());
    setLoaded(true);
  }, []);

  function refreshForms() {
    setForms(getCustomForms());
  }

  function resetBuilder() {
    setName("");
    setDescription("");
    setFields([emptyField()]);
    setShowBuilder(false);
  }

  function handleSaveForm() {
    const trimmedName = name.trim();
    if (!trimmedName) return;
    if (!description.trim()) return;

    // filter out empty-label fields
    const validFields = fields.filter((f) => f.label.trim() !== "");

    const form: CustomForm = {
      id: generateId(),
      name: trimmedName,
      createdAt: new Date().toISOString(),
      description: description.trim(),
      fields: validFields.length > 0 ? validFields : [],
    };

    saveCustomForm(form);
    refreshForms();
    resetBuilder();
  }

  function handleDelete(id: string) {
    deleteCustomForm(id);
    refreshForms();
  }

  function updateField(index: number, patch: Partial<CustomFormField>) {
    setFields((prev) =>
      prev.map((f, i) => (i === index ? { ...f, ...patch } : f)),
    );
  }

  function addField() {
    setFields((prev) => [...prev, emptyField()]);
  }

  function removeField(index: number) {
    setFields((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="min-h-full bg-background">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Custom Forms
              </h1>
              <p className="mt-2 text-muted">
                Create your own forms. Add a description to guide the AI when it
                analyzes your photo, then define the fields you want filled out.
              </p>
            </div>
            {!showBuilder && (
              <Button
                variant="primary"
                onPress={() => setShowBuilder(true)}
              >
                Create New Form
              </Button>
            )}
          </div>
        </div>

        {/* Form Builder */}
        {showBuilder && (
          <Card className="mb-10 border border-accent bg-accent/10">
            <CardContent className="flex flex-col gap-6 p-6">
              <h2 className="text-lg font-semibold text-foreground">
                New Custom Form
              </h2>

              {/* Form Name */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-muted">
                  Form Name
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Site Photo Audit"
                />
              </div>

              {/* Description (LLM prompt) */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-muted">
                  Description &mdash; AI Prompt
                </label>
                <p className="mb-2 text-xs text-muted">
                  This description will guide the AI when analyzing your photo.
                  Be specific about what to look for.
                </p>
                <TextArea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={`e.g., "Look at this photo of a consumer unit installation. Check: are all breakers clearly labelled? Is the enclosure undamaged? Are there any signs of overheating? Identify the main switch rating and the number of circuits visible."`}
                  rows={3}
                  className="w-full"
                />
              </div>

              {/* Fields */}
              <div>
                <label className="mb-3 block text-sm font-medium text-muted">
                  Form Fields
                </label>
                <div className="flex flex-col gap-3">
                  {fields.map((field, i) => (
                    <div
                      key={field.id}
                      className="flex items-start gap-3 rounded-lg border border-border bg-surface p-3"
                    >
                      <div className="flex flex-col min-w-0 flex-1 gap-2">
                          <Input
                            value={field.label}
                            onChange={(e) => updateField(i, { label: e.target.value })}
                            placeholder="Field label (e.g. 'Consumer unit condition')"
                            className="flex-1"
                          />
                        <input
                          type="text"
                          value={field.description ?? ""}
                          onChange={(e) =>
                            updateField(i, { description: e.target.value || undefined })
                          }
                          placeholder="e.g. Look for a rating printed on the main switch in amps"
                          className="w-full rounded-lg border border-border/60 bg-background px-3 py-1 text-xs text-muted placeholder:text-muted/60 dark:border-border/60 dark:bg-default/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
                        />
                        <div className="flex gap-2">
                          <select
                            value={field.type}
                            onChange={(e) => {
                              const type = e.target.value as CustomFieldType;
                              updateField(i, {
                                type,
                                options:
                                  type === "select" ? field.options ?? [] : undefined,
                              });
                            }}
                            className="w-44 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-foreground"
                            aria-label="Field type"
                          >
                            {(
                              Object.entries(FIELD_TYPE_LABELS) as [
                                CustomFieldType,
                                string,
                              ][]
                            ).map(([value, label]) => (
                              <option key={value} value={value}>
                                {label}
                              </option>
                            ))}
                          </select>
                          {field.type === "select" && (
                            <Input
                              value={(field.options ?? []).join(", ")}
                              onChange={(e) =>
                                updateField(i, {
                                  options: e.target.value
                                    .split(",")
                                    .map((s) => s.trim())
                                    .filter(Boolean),
                                })
                              }
                              placeholder="Options (comma-separated)"
                              className="flex-1"
                            />
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => removeField(i)}
                        className="mt-1 shrink-0 rounded-lg p-1.5 text-muted hover:bg-danger/10 hover:text-danger transition-colors"
                        title="Remove field"
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={addField}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add field
                </button>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <Button variant="primary" onPress={handleSaveForm}>
                  Save Form
                </Button>
                <Button variant="ghost" onPress={resetBuilder}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Saved Forms */}
        {loaded && forms.length === 0 && !showBuilder && (
          <div className="rounded-xl border-2 border-dashed border-border bg-background p-12 text-center dark:bg-default/50">
            <p className="text-muted">
              No custom forms yet. Click &ldquo;Create New Form&rdquo; to get
              started.
            </p>
          </div>
        )}

        {forms.length > 0 && (
          <div className="flex flex-col gap-4">
            {forms.map((form) => (
              <Card
                key={form.id}
                className="border border-border transition-shadow hover:shadow-md"
              >
                <CardContent className="flex items-center justify-between gap-4 p-5">
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/custom-forms/${form.id}`}
                      className="text-base font-semibold text-foreground hover:text-accent transition-colors"
                    >
                      {form.name}
                    </Link>
                    <p className="mt-1 line-clamp-2 text-sm text-muted">
                      {form.description}
                    </p>
                    <p className="mt-2 text-xs text-muted">
                      {form.fields.length} field
                      {form.fields.length !== 1 ? "s" : ""} &middot; Created{" "}
                      {new Date(form.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Link
                      href={`/custom-forms/${form.id}`}
                      className="inline-flex h-9 items-center justify-center rounded-lg bg-accent px-4 text-sm font-medium text-accent-foreground hover:bg-accent-hover transition-colors"
                    >
                      Open
                    </Link>
                    <button
                      onClick={() => handleDelete(form.id)}
                      className="inline-flex h-9 items-center justify-center rounded-lg px-2 text-sm text-muted hover:bg-danger/10 hover:text-danger transition-colors"
                      title="Delete form"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
