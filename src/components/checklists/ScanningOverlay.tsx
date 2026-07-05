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
      <div className="flex flex-col items-center gap-6 rounded-2xl bg-surface px-12 py-10 shadow-2xl">
        <Spinner size="lg" color="accent" />
        <div className="text-center">
          <p className="text-lg font-semibold text-foreground">
            {message}
          </p>
          <p className="mt-1 text-sm text-muted">
            {revealedCount} of {totalFields} fields populated
          </p>
        </div>
        <div className="h-2 w-64 overflow-hidden rounded-full bg-default">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
