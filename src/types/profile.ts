export enum ProfileFieldType {
  Text = "text",
  Url = "url",
  Number = "number",
  Select = "select",
  MultiSelect = "multiselect",
  Area = "area",
  BigArea = "bigarea",
  Chips = "chips",
  MinMax = "minmax",
  Toggle = "toggle",
  BizModel = "bizmodel",
}

export type ProfileFieldIcon = "globe" | "building" | "tag" | "target" | "shield" | "briefcase";

export type ProfileGroup = "b2b" | "d2c" | "both";

export interface ProfileField {
  label: string;
  type: ProfileFieldType;
  placeholder?: string;
  value?: string;
  required?: boolean;
  icon?: ProfileFieldIcon;
  options?: string[];
  chips?: string[];
  unit?: string;
  group?: ProfileGroup;
  fieldHelper?: string;
  /** Force this field to span the full row even when its type is normally half-width. */
  full?: boolean;
  /** Only render this field when the named Toggle field (by label) is switched on. */
  showWhenToggle?: string;
  /** For Select/MultiSelect: show an inline "Add new option" input in the dropdown. */
  allowAddOption?: boolean;
  /** Disable this field (with a hint) until a business model is chosen. */
  requiresBiz?: boolean;
  /** This Select drives the business model that `requiresBiz` fields depend on. */
  controlsBiz?: boolean;
}

export interface ProfileSection {
  title: string;
  count: string;
  helper?: string;
  /** Gated behind a business-model choice. */
  conditional?: boolean;
  /** Special renderer instead of the standard field grid. */
  variant?: "products" | "competitors";
  fields: ProfileField[];
}

export interface ProfileStep {
  id: string;
  title: string;
  subtitle: string;
  completion: number;
  caption: string;
  sections: ProfileSection[];
}

export type BusinessModel = "B2B" | "D2C" | null;
