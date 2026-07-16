import { App, Button } from "antd";
import { DownloadOutlined, StopOutlined, SyncOutlined, UploadOutlined } from "@ant-design/icons";
import { ADMIN_INTEGRATIONS } from "@/constants/clients";
import styles from "./IntegrationsTab.module.css";
import type { IntegrationsTabProps } from "./types";

export const IntegrationsTab = ({ clientName }: IntegrationsTabProps) => {
  const { message } = App.useApp();

  return (
    <div className={styles.grid}>
      {ADMIN_INTEGRATIONS.map((integration) => {
        const light = integration.headerText === "light";
        return (
          <article key={integration.id} className={styles.card}>
            <header
              className={styles.head}
              style={{
                background: integration.brandColor,
                color: light ? "#fff" : "var(--color-text-strong)",
              }}
            >
              <div
                className={styles.logoTile}
                style={{
                  background: "#ffffff",
                  borderColor: light ? "rgba(255,255,255,0.22)" : "var(--color-border-subtle)",
                }}
              >
                <img className={styles.logo} src={integration.logo} alt={`${integration.name} logo`} />
              </div>
              <div className={styles.headInfo}>
                <div className={styles.name}>{integration.name}</div>
                <div className={styles.categories} style={{ opacity: light ? 0.82 : 0.66 }}>
                  {integration.categories.join(" · ")}
                </div>
              </div>
              <span
                className={styles.badge}
                style={{ color: light ? "rgba(255,255,255,0.92)" : "var(--color-text-muted)" }}
              >
                <span
                  className={styles.badgeDot}
                  style={{ background: integration.status === "connected" ? "#22c55e" : "#b5beb6" }}
                />
                {integration.status === "connected" ? "CONNECTED" : "NO DATA"}
              </span>
            </header>

            <div className={styles.body}>
              {integration.isUpload ? (
                <>
                  <p className={styles.uploadHint}>{integration.uploadHint}</p>
                  <div className={styles.uploadActions}>
                    <Button
                      block
                      type="primary"
                      icon={<UploadOutlined />}
                      onClick={() => message.success(`CSV upload started for ${clientName}`)}
                    >
                      Upload CSV
                    </Button>
                    <Button
                      type="link"
                      icon={<DownloadOutlined />}
                      className={styles.templateBtn}
                      onClick={() => message.success(`${integration.name} template downloaded`)}
                    >
                      Download template
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.statsRow}>
                    <div className={styles.stat}>
                      <span className={styles.statLabel}>Connected</span>
                      <span className={styles.statValue}>{integration.connectedDate ?? "—"}</span>
                    </div>
                    <div className={`${styles.stat} ${styles.statRight}`}>
                      <span className={styles.statLabel}>Last sync</span>
                      {integration.lastSynced ? (
                        <span className={`${styles.statValue} ${styles.syncActive}`}>
                          <SyncOutlined />
                          {integration.lastSync}
                        </span>
                      ) : (
                        <span className={styles.pending}>{integration.lastSync}</span>
                      )}
                    </div>
                  </div>

                  {integration.syncedChips && (
                    <div className={styles.chips}>
                      {integration.syncedChips.map((chip) => (
                        <span key={chip} className={styles.chip}>
                          {chip}
                        </span>
                      ))}
                    </div>
                  )}

                  <Button
                    danger
                    icon={<StopOutlined />}
                    className={styles.revoke}
                    onClick={() => message.success(`${integration.name} access revoked`)}
                  >
                    Revoke Access
                  </Button>
                </>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
};
