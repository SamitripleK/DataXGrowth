import { create } from "zustand";
import { INTEGRATIONS } from "@/constants/integrations";
import type { Integration } from "@/types/integration";

interface ConnectState {
  integrations: Integration[];
  connectedCount: number;
  toggle: (id: string) => void;
}

/**
 * Global store for the client's integration connections. Kept in Zustand
 * because connection state is shared across the page (progress bar + rows)
 * and would otherwise need prop-drilling.
 */
export const useConnectStore = create<ConnectState>((set) => ({
  integrations: INTEGRATIONS,
  connectedCount: 0,
  toggle: (id) =>
    set((state) => {
      const integrations = state.integrations.map((item) =>
        item.id === id ? { ...item, connected: !item.connected } : item
      );
      return {
        integrations,
        connectedCount: integrations.filter((item) => item.connected).length,
      };
    }),
}));
