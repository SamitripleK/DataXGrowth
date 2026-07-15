import { useMemo } from "react";
import { App, Card, Col, Progress, Row, Typography } from "antd";
import { IntegrationRow } from "@/components/feature/IntegrationRow";
import { useConnectStore } from "@/store/useConnectStore";
import { splitIntoColumns } from "@/utils/splitIntoColumns";
import { BRAND } from "@/theme/antdTheme";
import styles from "./Connect.module.css";

const { Text } = Typography;

const CARD_BODY_STYLE = { padding: "8px 24px" } as const;

const ConnectPage = () => {
  const { message } = App.useApp();
  const integrations = useConnectStore((state) => state.integrations);
  const connectedCount = useConnectStore((state) => state.connectedCount);
  const toggle = useConnectStore((state) => state.toggle);

  const total = integrations.length;
  const percent = total === 0 ? 0 : Math.round((connectedCount / total) * 100);
  const columns = useMemo(() => splitIntoColumns(integrations, 2), [integrations]);

  const handleToggle = (id: string) => {
    const target = integrations.find((item) => item.id === id);
    toggle(id);
    if (!target) return;
    const nowConnected = !target.connected;
    message.success(`${target.name} ${nowConnected ? "connected" : "disconnected"}`);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <img className={styles.logo} src="/dxg-logo.svg" alt="DataXGrowth" />

        <div className={styles.progressHeader}>
          <Text className={styles.progressLabel}>PROGRESS</Text>
          <Text className={styles.progressCount}>
            {connectedCount} of {total} connected
          </Text>
        </div>
        <Progress
          percent={percent}
          showInfo={false}
          strokeColor={BRAND.primary}
          trailColor="#eae6da"
          size={{ height: 5 }}
          aria-label={`${connectedCount} of ${total} integrations connected`}
        />

        <Row gutter={[24, 24]} className={styles.cards} align="top">
          {columns.map((column, columnIndex) => (
            <Col key={columnIndex} xs={24} md={12}>
              <Card variant="outlined" styles={{ body: CARD_BODY_STYLE }}>
                {column.map((integration, rowIndex) => (
                  <IntegrationRow
                    key={integration.id}
                    integration={integration}
                    isLast={rowIndex === column.length - 1}
                    onToggle={handleToggle}
                  />
                ))}
              </Card>
            </Col>
          ))}
        </Row>

        <Text className={styles.footer}>
          Your data stays private and is only used to power your growth insights. You can disconnect
          a platform at any time.
        </Text>
      </div>
    </div>
  );
};

export default ConnectPage;
