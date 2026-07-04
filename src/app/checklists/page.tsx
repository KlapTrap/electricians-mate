"use client";

import { CATEGORY_LABELS, Category } from "@/lib/checklists/types";
import { getChecklistsByCategory } from "@/lib/checklists/data";
import ChecklistCard from "@/components/checklists/ChecklistCard";

export default function ChecklistsPage() {
  const grouped = getChecklistsByCategory();
  const order: Category[] = [
    "certification",
    "pre-work",
    "post-work",
    "maintenance",
  ];

  return (
    <div className="min-h-full bg-zinc-50 dark:bg-black">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Check Sheets &amp; Forms
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Browse electrical certification, safety, and maintenance checklists.
            Select one to capture a photo and auto-fill the form.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {order.map((cat) => {
            const items = grouped[cat];
            if (items.length === 0) return null;
            return (
              <section key={cat}>
                <h2 className="mb-4 text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                  {CATEGORY_LABELS[cat]}
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {items.map((c) => (
                    <ChecklistCard key={c.slug} checklist={c} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
