"use client";

import { Card, CardContent, CardHeader, Chip } from "@heroui/react";
import { FormSection, FormField } from "@/lib/checklists/types";

function FieldValue({ field, isAiFilled }: { field: FormField; isAiFilled: boolean }) {
  const value = field.value ?? "";
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
        <label className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          {field.label}
        </label>
        {isAiFilled && (
          <Chip color="success" variant="soft" size="sm" className="shrink-0">
            AI-filled
          </Chip>
        )}
      </div>
      <div
        className={`mt-1 min-h-[1.25rem] text-sm ${
          isEmpty
            ? "italic text-zinc-400 dark:text-zinc-600"
            : "text-zinc-900 dark:text-zinc-100"
        }`}
      >
        {isEmpty ? "Pending" : value}
      </div>
    </div>
  );
}

export default function FormRenderer({
  sections,
  aiFilledIds,
}: {
  sections: FormSection[];
  aiFilledIds: Set<string>;
}) {
  return (
    <div className="flex flex-col gap-6">
      {sections.map((section, si) => (
        <Card
          key={si}
          className="border border-zinc-200 shadow-sm dark:border-zinc-800"
        >
          <CardHeader className="border-b border-zinc-100 px-5 py-3 dark:border-zinc-800">
            <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              {section.title}
            </h3>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 p-5">
            {section.fields.map((field) => (
              <FieldValue
                key={field.id}
                field={field}
                isAiFilled={aiFilledIds.has(field.id)}
              />
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
