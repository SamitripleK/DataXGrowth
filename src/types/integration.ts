/** How a client connects a given platform. Drives the row's action button. */
export enum ConnectAction {
  Connect = "connect",
  UploadCsv = "csv",
  ApiKey = "apikey",
}

export interface Integration {
  /** Stable unique key (also used to resolve the brand logo asset). */
  id: string;
  name: string;
  /** Short "A · B · C" descriptor shown under the name. */
  description: string;
  action: ConnectAction;
  /** Path to the brand logo under /public/logos. */
  logo: string;
  connected: boolean;
}
