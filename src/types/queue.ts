export type QueueStatus = "Pending" | "In Progress" | "Completed" | "Failed";
export type QueuePriority = "Low" | "Medium" | "High";
export type TimelineKind = "done" | "active" | "failed";

export interface TimelineEvent {
  text: string;
  time: string;
  kind: TimelineKind;
}

export interface QueueItem {
  id: string;
  task: string;
  client: string;
  type: string;
  status: QueueStatus;
  priority: QueuePriority;
  created: string;
  updated: string;
  integration: string | null;
  /** Digests open the full Digest Review screen instead of the drawer. */
  isDigest?: boolean;
  description: string;
  error?: string;
  timeline: TimelineEvent[];
}
