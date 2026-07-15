import type { BusinessModel, ProfileField } from "@/types/profile";

export interface FieldControlProps {
  field: ProfileField;
  biz: BusinessModel;
  checked: boolean;
  onToggleBiz: (model: "B2B" | "D2C") => void;
  onToggleSwitch: (label: string) => void;
}
