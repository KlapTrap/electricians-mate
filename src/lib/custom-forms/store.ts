"use client";

import { CustomForm } from "./types";

const STORAGE_KEY = "electricians-mate:custom-forms";

function loadAll(): CustomForm[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CustomForm[]) : [];
  } catch {
    return [];
  }
}

function saveAll(forms: CustomForm[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
}

export function getCustomForms(): CustomForm[] {
  return loadAll().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function getCustomFormById(id: string): CustomForm | undefined {
  return loadAll().find((f) => f.id === id);
}

export function saveCustomForm(form: CustomForm): void {
  const forms = loadAll();
  const idx = forms.findIndex((f) => f.id === form.id);
  if (idx >= 0) {
    forms[idx] = form;
  } else {
    forms.push(form);
  }
  saveAll(forms);
}

export function deleteCustomForm(id: string): void {
  saveAll(loadAll().filter((f) => f.id !== id));
}
