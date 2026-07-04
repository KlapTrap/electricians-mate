export type Category = "certification" | "pre-work" | "post-work" | "maintenance";

export type ProcessingState = "idle" | "uploaded" | "scanning" | "complete";

export interface FormField {
  id: string;
  label: string;
  type: "text" | "select" | "multi-line" | "code" | "number";
  options?: string[];
  value?: string;
}

export interface FormSection {
  title: string;
  fields: FormField[];
}

export interface Checklist {
  slug: string;
  name: string;
  category: Category;
  description: string;
  frequency: string;
  legalBasis: string;
  sections: FormSection[];
  mockData: Record<string, string>;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  certification: "Certification",
  "pre-work": "Pre-Work Safety",
  "post-work": "Post-Work Sign-Off",
  maintenance: "Maintenance",
};
