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
          ? "border-success bg-success/10"
          : "border-border"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-muted">
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
            ? "italic text-muted"
            : "text-foreground"
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
          className="border border-border shadow-sm"
        >
          <CardHeader className="border-b border-border px-5 py-3">
            <h3 className="text-sm font-semibold text-foreground">
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
