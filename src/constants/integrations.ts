import { ConnectAction, type Integration } from "@/types/integration";

/** Action button copy per connect method. */
export const ACTION_LABEL: Record<ConnectAction, string> = {
  [ConnectAction.Connect]: "Connect",
  [ConnectAction.UploadCsv]: "Upload CSV",
  [ConnectAction.ApiKey]: "Add API Key",
};

/** Dummy client-facing integrations for the Connect screen. */
export const INTEGRATIONS: Integration[] = [
  { id: "google", name: "Google Suite", description: "Analytics · Ads · Search Console", action: ConnectAction.Connect, logo: "/logos/google.svg", connected: false },
  { id: "hubspot", name: "HubSpot", description: "Contacts · Deals · Pipeline", action: ConnectAction.UploadCsv, logo: "/logos/hubspot.svg", connected: false },
  { id: "salesforce", name: "Salesforce", description: "Leads · Opportunities · Pipeline", action: ConnectAction.UploadCsv, logo: "/logos/salesforce.svg", connected: false },
  { id: "asana", name: "Asana", description: "Tasks · Projects · Workspaces", action: ConnectAction.Connect, logo: "/logos/asana.svg", connected: false },
  { id: "semrush", name: "SEMrush", description: "Keywords · Rankings · Competitors", action: ConnectAction.ApiKey, logo: "/logos/semrush.svg", connected: false },
  { id: "linkedin", name: "LinkedIn", description: "Ads, pages, and lead-gen activity", action: ConnectAction.Connect, logo: "/logos/linkedin.svg", connected: false },
  { id: "fathom", name: "Fathom", description: "Privacy-first website analytics", action: ConnectAction.ApiKey, logo: "/logos/fathom.svg", connected: false },
  { id: "slack", name: "Slack", description: "Deliver digests to client channels", action: ConnectAction.Connect, logo: "/logos/slack.svg", connected: false },
  { id: "reddit", name: "Reddit Ads", description: "Ad campaigns · Reports · Audiences", action: ConnectAction.Connect, logo: "/logos/reddit.svg", connected: false },
];
