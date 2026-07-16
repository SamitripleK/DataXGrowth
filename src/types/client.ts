export interface Client {
  id: number;
  name: string;
  email: string;
  website: string;
  initials: string;
  industry: string;
  updated: string;
}

/** Admin-side integration shown on the client Integrations tab. */
export interface AdminIntegration {
  id: string;
  name: string;
  /** Capability chips shown under the name, e.g. ["Analytics", "Ads"]. */
  categories: string[];
  logo: string;
  /** Header band background color (brand color). */
  brandColor: string;
  /** Light header text/icon for dark bands; dark for light bands. */
  headerText: "light" | "dark";
  /** HubSpot / Salesforce use a CSV upload flow instead of Revoke. */
  isUpload: boolean;
  /** Connection status shown in the header badge. */
  status: "connected" | "no_data";
  /** Date the integration was connected (M/D/YYYY); null when never connected. */
  connectedDate: string | null;
  /** Last sync value — a date, or "Pending". */
  lastSync: string;
  /** True when the last sync completed (renders a green sync icon). */
  lastSynced: boolean;
  /** Optional synced-count chips, e.g. ["208 tasks_synced"]. */
  syncedChips?: string[];
  /** Body copy shown for upload integrations. */
  uploadHint?: string;
}
