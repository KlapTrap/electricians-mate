export type CustomFieldType = "text" | "select" | "multi-line" | "code" | "number";

export interface CustomFormField {
  id: string;
  label: string;
  type: CustomFieldType;
  options?: string[]; // for "select" type: comma-separated options
  /** LLM context for the field — guides the AI when extracting this field's value */
  description?: string;
}

export interface CustomForm {
  id: string;
  name: string;
  createdAt: string;
  /** The description at the top of the form — also used as the LLM prompt
   *  to guide analysis of the uploaded photo. */
  description: string;
  fields: CustomFormField[];
}

export interface CustomFormFillResult {
  formId: string;
  /** Map of field id → filled value */
  values: Record<string, string>;
  completedAt: string;
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
