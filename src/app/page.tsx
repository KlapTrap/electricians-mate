"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-sans">
      <main className="flex w-full max-w-3xl flex-col items-center py-12 px-16">
        <div className="flex flex-col items-center gap-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Electricians Mate
          </h1>
          <p className="text-lg text-muted">
            Capture a photo of the installation and let AI fill out your check sheets.
          </p>
          <div className="flex gap-4">
            <Link
              href="/checklists"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-accent px-8 text-base font-medium text-accent-foreground hover:bg-accent-hover transition-colors"
            >
              Browse Check Sheets
            </Link>
            <Link
              href="/custom-forms"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-accent bg-transparent px-8 text-base font-medium text-accent hover:bg-accent-soft transition-colors"
            >
              Custom Forms
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
