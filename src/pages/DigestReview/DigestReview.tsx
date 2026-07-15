import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { App, Button } from "antd";
import {
  LeftOutlined,
  WarningFilled,
  SendOutlined,
  EditOutlined,
  CopyOutlined,
  ClockCircleOutlined,
  NumberOutlined,
} from "@ant-design/icons";
import { EditDigestModal } from "@/components/feature/EditDigestModal";
import { QUEUE } from "@/constants/queue";
import styles from "./DigestReview.module.css";

const CHANNEL = "#northwind-growth";

const DigestReviewPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { modal, message } = App.useApp();
  const [editOpen, setEditOpen] = useState(false);

  const item = QUEUE.find((entry) => entry.id === id) ?? QUEUE.find((entry) => entry.isDigest);
  const digestId = item?.id ?? "Q-1044";
  const title = item?.task ?? "Daily Growth Pulse — Northwind Labs";

  const approve = () =>
    modal.confirm({
      title: "Approve & send to Slack?",
      content: `The Daily Growth Pulse will be posted to ${CHANNEL} for Northwind Labs. Make sure delayed sources have been reviewed.`,
      okText: "Approve & Send",
      cancelText: "Cancel",
      onOk: () => message.success(`Digest sent to ${CHANNEL}`),
    });

  const reject = () =>
    modal.confirm({
      title: "Reject this digest?",
      content:
        "This digest will not be sent to the client. It will be archived and the client owner will not be notified.",
      okText: "Reject Digest",
      cancelText: "Cancel",
      okButtonProps: { danger: true },
      onOk: () => message.success("Digest rejected"),
    });

  return (
    <div className={styles.page}>
      <Button type="link" style={{ paddingLeft: 0, marginBottom: 6 }} icon={<LeftOutlined />} onClick={() => navigate("/queue")}>
        Back to Queue
      </Button>

      <div className={`${styles.card} ${styles.headerCard}`}>
        <div className={styles.crumb}>
          <span>{digestId}</span>
          <span className={styles.crumbSep} />
          <span>AI Digest · Daily Growth Pulse</span>
        </div>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.pills}>
          <span className={`${styles.pill} ${styles.pillWarn}`}>
            <span className={styles.dot} />
            Pending Review
          </span>
          <span className={`${styles.pill} ${styles.pillDanger}`}>
            <WarningFilled />
            High Priority
          </span>
          <span className={`${styles.pill} ${styles.pillNeutral}`}>
            <ClockCircleOutlined />
            Medium Confidence
          </span>
        </div>
        <div className={styles.metaRow}>
          <span className={styles.metaItem}>
            <ClockCircleOutlined style={{ color: "#a6aba2" }} />
            Generated Jun 24, 2026 · 7:01 AM
          </span>
          <span className={styles.metaItem} style={{ fontWeight: 600, color: "#4a544c" }}>
            <NumberOutlined style={{ color: "#a6aba2" }} />
            {CHANNEL.replace(/^#/, "")}
          </span>
        </div>
      </div>

      <div className={`${styles.card} ${styles.actionBar}`}>
        <span className={styles.warn}>
          <WarningFilled style={{ color: "#b07a16" }} />
          Some source data may be delayed. Review before sending.
        </span>
        <Button danger onClick={reject}>
          Reject
        </Button>
        <Button type="primary" icon={<SendOutlined />} onClick={approve}>
          Approve &amp; Send to Slack
        </Button>
      </div>

      <div className={styles.card}>
        <div className={styles.previewHead}>
          <h2 className={styles.previewTitle}>Slack Digest Preview</h2>
          <p className={styles.previewSub}>This is the client-facing message that will be sent to Slack.</p>
        </div>

        <div className={styles.previewBody}>
          <div className={styles.channelBar}>
            <NumberOutlined style={{ color: "#9aa097" }} />
            {CHANNEL.replace(/^#/, "")}
          </div>
          <div className={styles.message}>
            <div className={styles.appAvatar}>
              <span className={styles.bar} />
              <span className={styles.bar} style={{ opacity: 0.66 }} />
              <span className={styles.bar} style={{ opacity: 0.4 }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className={styles.msgHead}>
                <span className={styles.appName}>DataXGrowth AI</span>
                <span className={styles.appTag}>APP</span>
                <span className={styles.msgTime}>7:01 AM</span>
              </div>
              <div className={styles.msgBody}>
                <div className={styles.msgTitle}>Daily Growth Pulse — Northwind Labs — Jun 24, 2026</div>
                <div className={styles.statusPill}>
                  <span className={styles.statusDot} />
                  Status: Yellow
                </div>
                <div className={styles.insight}>
                  <span className={styles.bold}>1. Marketing-sourced pipeline increased 12% WoW.</span>
                  <br />
                  Likely driver: paid CPL improved while organic sessions continued to grow.
                  <br />
                  <span className={styles.muted}>Confidence: Medium</span>
                  <br />
                  <span className={styles.action}>→ Action:</span> Review paid landing page performance before increasing spend.
                </div>
                <div className={styles.insight}>
                  <span className={styles.bold}>2. Organic search showed early positive movement.</span>
                  <br />
                  Why it matters: three target keywords moved onto page one.
                  <br />
                  <span className={styles.action}>→ Action:</span> Review top gaining queries and update priority pages.
                </div>
                <div className={styles.insight}>
                  <span className={styles.bold}>3. ABM campaign is still blocked by creative approval.</span>
                  <br />
                  Why it matters: launch delay may affect this week&apos;s pipeline target.
                  <br />
                  <span className={styles.action}>→ Action:</span> Get client sign-off on ABM creative today.
                </div>
                <div className={styles.platformWatch}>
                  <span className={styles.bold}>📈 Platform Watch</span>
                  <br />
                  Google core update is rolling out. Monitor non-brand rankings this week.
                </div>
                <div className={styles.openTitle}>Open Items</div>
                <div className={styles.openItem}>
                  <span className={styles.bullet}>•</span>ABM creative pending client sign-off
                </div>
                <div className={styles.openItem}>
                  <span className={styles.bullet}>•</span>Competitor pricing teardown due Friday
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.previewFooter}>
          <Button icon={<EditOutlined />} onClick={() => setEditOpen(true)}>
            Edit Digest
          </Button>
          <Button icon={<CopyOutlined />} onClick={() => message.success("Preview copied to clipboard")}>
            Copy Preview
          </Button>
        </div>
      </div>

      <EditDigestModal open={editOpen} onClose={() => setEditOpen(false)} />
    </div>
  );
};

export default DigestReviewPage;
