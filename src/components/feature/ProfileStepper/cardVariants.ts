export interface CardFieldDef {
  key: string;
  label: string;
  control: "text" | "url" | "select" | "textarea";
  placeholder?: string;
  full?: boolean;
  options?: string[];
}

interface CardVariant {
  addLabel: string;
  fields: CardFieldDef[];
}

/** Section variants that render a repeatable list of cards instead of a field grid. */
export const CARD_VARIANTS: Record<"products" | "competitors", CardVariant> = {
  products: {
    addLabel: "Add product / service",
    fields: [
      { key: "name", label: "Name", control: "text", placeholder: "Product or service name" },
      {
        key: "category",
        label: "Category",
        control: "select",
        placeholder: "Select category",
        options: ["Core product", "Add-on / module", "Service", "Subscription", "Professional services", "Other"],
      },
      { key: "description", label: "Description", control: "textarea", placeholder: "What it is / who it's for", full: true },
    ],
  },
  competitors: {
    addLabel: "Add competitor",
    fields: [
      { key: "name", label: "Name", control: "text", placeholder: "Competitor name" },
      { key: "website", label: "Website", control: "url", placeholder: "competitor.com" },
      {
        key: "type",
        label: "Type",
        control: "select",
        placeholder: "Select type",
        options: ["Direct", "Indirect", "Substitute", "Alternative / status quo"],
      },
    ],
  },
};
