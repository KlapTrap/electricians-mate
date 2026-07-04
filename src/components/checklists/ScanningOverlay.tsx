"use client";

import { Spinner } from "@heroui/react";

const STATUS_MESSAGES = [
  "Analyzing photo...",
  "Detecting electrical components...",
  "Identifying circuits...",
  "Reading equipment labels...",
  "Checking test results...",
  "Populating form fields...",
];

export default function ScanningOverlay({
  revealedCount,
  totalFields,
}: {
  revealedCount: number;
  totalFields: number;
}) {
  const progress = Math.round((revealedCount / totalFields) * 100);
  const messageIndex = Math.min(
    Math.floor((revealedCount / Math.max(totalFields, 1)) * STATUS_MESSAGES.length),
    STATUS_MESSAGES.length - 1,
  );
  const message = STATUS_MESSAGES[messageIndex] ?? STATUS_MESSAGES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6 rounded-2xl bg-white px-12 py-10 shadow-2xl dark:bg-zinc-900">
        <Spinner size="lg" color="accent" />
        <div className="text-center">
          <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {message}
          </p>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {revealedCount} of {totalFields} fields populated
          </p>
        </div>
        <div className="h-2 w-64 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
