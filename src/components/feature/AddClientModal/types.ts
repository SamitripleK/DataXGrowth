export interface AddClientModalProps {
  open: boolean;
  onClose: () => void;
}

export interface AddClientFormValues {
  name: string;
  email: string;
  website?: string;
  industry?: string;
}
