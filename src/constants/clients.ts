import type { AdminIntegration, Client } from "@/types/client";

export const CLIENTS: Client[] = [
  { id: 0, name: "Northwind Labs", email: "ops@northwindlabs.com", website: "northwindlabs.com", initials: "NL", industry: "B2B SaaS", updated: "2 days ago" },
  { id: 1, name: "Brightwave Media", email: "hello@brightwave.co", website: "brightwave.co", initials: "BM", industry: "Media", updated: "5 hours ago" },
  { id: 2, name: "Halcyon Health", email: "team@halcyonhealth.com", website: "halcyonhealth.com", initials: "HH", industry: "Healthcare", updated: "1 day ago" },
  { id: 3, name: "Vertex Logistics", email: "ops@vertexlogistics.io", website: "vertexlogistics.io", initials: "VL", industry: "Logistics", updated: "3 days ago" },
  { id: 4, name: "Lumen Retail", email: "growth@lumenretail.com", website: "lumenretail.com", initials: "LR", industry: "E-commerce", updated: "6 days ago" },
  { id: 5, name: "Cedar & Co.", email: "hello@cedarandco.com", website: "cedarandco.com", initials: "CC", industry: "B2B SaaS", updated: "1 week ago" },
];

export const INDUSTRIES = ["B2B SaaS", "E-commerce", "Healthcare", "Logistics", "Media"];

/** Admin Integrations tab — Salesforce uses a CSV upload flow. */
export const ADMIN_INTEGRATIONS: AdminIntegration[] = [
  { id: "google", name: "Google Suite", description: "Sync email, calendar, and Drive activity", logo: "/logos/google.svg", isUpload: false, connected: true },
  { id: "hubspot", name: "HubSpot", description: "CRM contacts, deals, and marketing data", logo: "/logos/hubspot.svg", isUpload: false, connected: false },
  { id: "salesforce", name: "Salesforce", description: "Accounts, opportunities, and pipeline", logo: "/logos/salesforce.svg", isUpload: true, connected: false },
  { id: "asana", name: "Asana", description: "Project tasks and campaign timelines", logo: "/logos/asana.svg", isUpload: false, connected: false },
  { id: "semrush", name: "SEMrush", description: "SEO, keyword, and competitor data", logo: "/logos/semrush.svg", isUpload: false, connected: false },
  { id: "fathom", name: "Fathom", description: "Privacy-first website analytics", logo: "/logos/fathom.svg", isUpload: false, connected: false },
  { id: "reddit", name: "Reddit Ads", description: "Campaign spend and audience reach", logo: "/logos/reddit.svg", isUpload: false, connected: false },
  { id: "linkedin", name: "LinkedIn", description: "Ads, pages, and lead-gen activity", logo: "/logos/linkedin.svg", isUpload: false, connected: false },
  { id: "slack", name: "Slack", description: "Deliver digests to client channels", logo: "/logos/slack.svg", isUpload: false, connected: true },
];
