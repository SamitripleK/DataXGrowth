import type { QueueItem } from "@/types/queue";

export interface QueueDrawerProps {
  item: QueueItem | null;
  open: boolean;
  onClose: () => void;
}
