import type { QueuePriority, QueueStatus, TimelineKind } from "@/types/queue";

export interface StatusStyle {
  bg: string;
  color: string;
  dot: string;
}

export interface PriorityStyle {
  color: string;
  dot: string;
}

const STATUS_STYLES: Record<QueueStatus, StatusStyle> = {
  Pending: { bg: "#fdf4e3", color: "#9a6700", dot: "#e0a23b" },
  "In Progress": { bg: "#eaf1fc", color: "#2456c7", dot: "#3b82f6" },
  Completed: { bg: "#e7f6ec", color: "#15803d", dot: "#22c55e" },
  Failed: { bg: "#fdecea", color: "#c2342f", dot: "#e05a52" },
};

const PRIORITY_STYLES: Record<QueuePriority, PriorityStyle> = {
  Low: { color: "#7a857f", dot: "#aab4ad" },
  Medium: { color: "#9a6700", dot: "#e0a23b" },
  High: { color: "#c2342f", dot: "#e05a52" },
};

const TIMELINE_COLOR: Record<TimelineKind, string> = {
  done: "#22c55e",
  active: "#3b82f6",
  failed: "#e05a52",
};

const TIMELINE_RING: Record<TimelineKind, string> = {
  done: "#e7f6ec",
  active: "#eaf1fc",
  failed: "#fdecea",
};

export const statusStyle = (status: QueueStatus): StatusStyle => STATUS_STYLES[status];
export const priorityStyle = (priority: QueuePriority): PriorityStyle => PRIORITY_STYLES[priority];
export const timelineColor = (kind: TimelineKind): string => TIMELINE_COLOR[kind];
export const timelineRing = (kind: TimelineKind): string => TIMELINE_RING[kind];
