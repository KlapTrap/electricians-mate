"use client";

import Link from "next/link";
import { Card, CardContent, Chip } from "@heroui/react";
import { Checklist, CATEGORY_LABELS } from "@/lib/checklists/types";

const CATEGORY_COLORS: Record<string, "success" | "warning" | "danger" | "accent"> = {
  certification: "accent",
  "pre-work": "warning",
  "post-work": "success",
  maintenance: "danger",
};

export default function ChecklistCard({ checklist }: { checklist: Checklist }) {
  return (
    <Link href={`/checklists/${checklist.slug}`} className="block group">
      <Card
        className="h-full border border-zinc-200 transition-shadow hover:shadow-md dark:border-zinc-800"
      >
        <CardContent className="flex flex-col gap-3 p-5">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {checklist.name}
          </h3>
          <Chip
            color={CATEGORY_COLORS[checklist.category]}
            variant="soft"
            size="sm"
            className="self-start"
          >
            {CATEGORY_LABELS[checklist.category]}
          </Chip>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {checklist.description}
          </p>
          <div className="flex gap-4 text-xs text-zinc-500 dark:text-zinc-500">
            <span>
              <span className="font-medium">Frequency:</span> {checklist.frequency}
            </span>
            <span>
              <span className="font-medium">Legal:</span> {checklist.legalBasis}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
