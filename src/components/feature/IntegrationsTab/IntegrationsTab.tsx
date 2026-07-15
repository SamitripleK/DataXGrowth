import { App, Button } from "antd";
import { IntegrationLogo } from "@/components/feature/IntegrationLogo";
import { ADMIN_INTEGRATIONS } from "@/constants/clients";
import styles from "./IntegrationsTab.module.css";
import type { IntegrationsTabProps } from "./types";

export const IntegrationsTab = ({ clientName }: IntegrationsTabProps) => {
  const { message } = App.useApp();

  return (
    <div>
      <p className={styles.intro}>Connect {clientName}&apos;s tools to sync data into DataXGrowth AI.</p>
      <div className={styles.grid}>
        {ADMIN_INTEGRATIONS.map((integration) => (
          <div key={integration.id} className={styles.tile}>
            <IntegrationLogo src={integration.logo} name={integration.name} size={40} />
            <div className={styles.info}>
              <div className={styles.nameRow}>
                <span className={styles.name}>{integration.name}</span>
                <span
                  className={
                    integration.connected
                      ? `${styles.status} ${styles.statusConnected}`
                      : `${styles.status} ${styles.statusIdle}`
                  }
                >
                  <span
                    className={styles.statusDot}
                    style={{ background: integration.connected ? "#22c55e" : "#b5beb6" }}
                  />
                  {integration.connected ? "Connected" : "Not connected"}
                </span>
              </div>
              <div className={styles.description}>{integration.description}</div>
            </div>
            {integration.isUpload ? (
              <Button type="primary" onClick={() => message.success(`CSV upload started for ${clientName}`)}>
                Upload CSV
              </Button>
            ) : (
              <Button onClick={() => message.success(`${integration.name} access revoked`)}>Revoke Access</Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
