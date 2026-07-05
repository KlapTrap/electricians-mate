"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center gap-8 py-32 px-16">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Electricians Mate
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Capture a photo of the installation and let AI fill out your check sheets.
        </p>
        <div className="flex gap-4">
          <Link
            href="/checklists"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-blue-600 px-8 text-base font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Browse Check Sheets
          </Link>
          <Link
            href="/custom-forms"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-blue-600 bg-transparent px-8 text-base font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
          >
            Custom Forms
          </Link>
        </div>
      </main>
    </div>
  );
}
