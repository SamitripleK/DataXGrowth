import { App, Button, Drawer } from "antd";
import { WarningFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ActivityTimeline } from "@/components/ui/ActivityTimeline";
import { CLIENTS } from "@/constants/clients";
import { priorityStyle, statusStyle } from "@/utils/queueStyles";
import type { QueueItem } from "@/types/queue";
import styles from "./QueueDrawer.module.css";
import type { QueueDrawerProps } from "./types";

interface PrimaryAction {
  label: string;
  run: () => void;
}

const MetaItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className={styles.metaLabel}>{label}</div>
    <div className={styles.metaValue}>{value}</div>
  </div>
);

export const QueueDrawer = ({ item, open, onClose }: QueueDrawerProps) => {
  const navigate = useNavigate();
  const { modal, message } = App.useApp();

  if (!item) return null;

  const ss = statusStyle(item.status);
  const ps = priorityStyle(item.priority);
  const canCancel = item.status !== "Completed";

  const viewClient = () => {
    const target = CLIENTS.find((c) => c.name === item.client);
    onClose();
    navigate(`/clients/${target?.id ?? 0}`);
  };

  const confirmAction = (config: {
    title: string;
    content: string;
    okText: string;
    okDanger?: boolean;
    toast: string;
  }) => {
    modal.confirm({
      title: config.title,
      content: config.content,
      okText: config.okText,
      cancelText: "Cancel",
      okButtonProps: config.okDanger ? { danger: true } : undefined,
      onOk: () => {
        message.success(config.toast);
        onClose();
      },
    });
  };

  const resolvePrimary = (queueItem: QueueItem): PrimaryAction => {
    switch (queueItem.status) {
      case "Failed":
        return {
          label: "Retry",
          run: () =>
            confirmAction({
              title: "Retry failed sync?",
              content: `DataXGrowth AI will attempt to re-run the ${queueItem.integration ?? "sync"} job for ${queueItem.client}.`,
              okText: "Retry sync",
              toast: `Retry queued for ${queueItem.client}`,
            }),
        };
      case "Pending":
        return {
          label: "Start Processing",
          run: () => {
            message.success(`Processing started for ${queueItem.id}`);
            onClose();
          },
        };
      case "In Progress":
        return {
          label: queueItem.type === "Profile Review" ? "Mark as Reviewed" : "Mark Completed",
          run: () =>
            confirmAction({
              title: "Mark task as completed?",
              content: `This will move "${queueItem.task}" to Completed and notify the client owner.`,
              okText: "Mark completed",
              toast: "Task marked as completed",
            }),
        };
      default:
        return { label: "View Client Profile", run: viewClient };
    }
  };

  const primary = resolvePrimary(item);

  const cancelItem = () =>
    confirmAction({
      title: "Cancel this queue item?",
      content: `The task "${item.task}" will be removed from the active queue. This action cannot be undone.`,
      okText: "Cancel item",
      okDanger: true,
      toast: "Queue item cancelled",
    });

  return (
    <Drawer
      open={open}
      onClose={onClose}
      width={460}
      title={
        <div>
          <div className={styles.id}>{item.id}</div>
          <h2 className={styles.title}>{item.task}</h2>
          <div className={styles.tags}>
            <span className={styles.tag} style={{ color: ss.color, background: ss.bg }}>
              <span className={styles.dot} style={{ background: ss.dot }} />
              {item.status}
            </span>
            <span className={styles.tag} style={{ color: ps.color, background: "#f5f6f3" }}>
              <span className={styles.priorityDot} style={{ background: ps.dot }} />
              {item.priority} priority
            </span>
          </div>
        </div>
      }
      footer={
        <div className={styles.footer}>
          <div className={styles.footerRow}>
            <Button type="primary" block onClick={primary.run}>
              {primary.label}
            </Button>
            <Button onClick={viewClient}>View Client Profile</Button>
          </div>
          {canCancel ? (
            <Button type="link" className={styles.cancel} onClick={cancelItem}>
              Cancel queue item
            </Button>
          ) : null}
        </div>
      }
    >
      <div className={styles.metaGrid}>
        <MetaItem label="CLIENT" value={item.client} />
        <MetaItem label="TASK TYPE" value={item.type} />
        <MetaItem label="CREATED" value={item.created} />
        <MetaItem label="LAST UPDATED" value={item.updated} />
        {item.integration ? <MetaItem label="INTEGRATION" value={item.integration} /> : null}
      </div>

      <div>
        <div className={styles.sectionLabel}>DESCRIPTION</div>
        <p className={styles.description}>{item.description}</p>
      </div>

      {item.status === "Failed" && item.error ? (
        <div className={styles.errorBox}>
          <div className={styles.errorTitle}>
            <WarningFilled style={{ color: "#c2342f" }} />
            Sync failed
          </div>
          <p className={styles.errorText}>{item.error}</p>
        </div>
      ) : null}

      <div className={styles.sectionLabel}>ACTIVITY LOG</div>
      <ActivityTimeline events={item.timeline} />
    </Drawer>
  );
};
