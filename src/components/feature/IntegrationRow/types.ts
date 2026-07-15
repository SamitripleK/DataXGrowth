import type { Integration } from "@/types/integration";

export interface IntegrationRowProps {
  integration: Integration;
  /** Hide the bottom divider on the last row of a card. */
  isLast?: boolean;
  onToggle: (id: string) => void;
}
