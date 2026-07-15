import type { ProfileField, ProfileStep } from "@/types/profile";

export interface FieldControlProps {
  field: ProfileField;
  biz: string | null;
  checked: boolean;
  onSetBiz: (value: string | null) => void;
  onToggleSwitch: (label: string) => void;
}

/** State + handlers shared by the desktop and mobile section renderers. */
export interface StepSectionsProps {
  step: ProfileStep;
  /** Selected business model (from the "Business type" field); gates `requiresBiz` fields. */
  biz: string | null;
  toggles: Record<string, boolean>;
  extraFields: Record<string, ProfileField[]>;
  onAddFieldSection: (title: string) => void;
  onSetBiz: (value: string | null) => void;
  onToggleSwitch: (label: string) => void;
}

export interface MobileProfileStepperProps extends Omit<StepSectionsProps, "step"> {
  steps: ProfileStep[];
  pct: number;
}
