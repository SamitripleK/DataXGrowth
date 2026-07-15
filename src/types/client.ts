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
  description: string;
  logo: string;
  /** Salesforce uses a CSV upload flow instead of Revoke. */
  isUpload: boolean;
  connected: boolean;
}
