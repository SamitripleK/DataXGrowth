import type { ProfileFieldType } from "@/types/profile";

export interface AddFieldModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (label: string, type: ProfileFieldType, options?: string[]) => void;
}

export interface AddFieldFormValues {
  label: string;
  type: ProfileFieldType;
  options?: { label: string }[];
}
