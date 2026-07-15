import type { ReactNode } from "react";

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  /** Right-aligned content, e.g. a primary action button. */
  extra?: ReactNode;
}
