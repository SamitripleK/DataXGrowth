export enum ProfileFieldType {
  Text = "text",
  Url = "url",
  Select = "select",
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
}

export interface ProfileSection {
  title: string;
  count: string;
  helper?: string;
  /** Gated behind a business-model choice. */
  conditional?: boolean;
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
