import { Button, Typography } from "antd";
import { ArrowRightOutlined, CheckOutlined } from "@ant-design/icons";
import { IntegrationLogo } from "@/components/feature/IntegrationLogo";
import { ACTION_LABEL } from "@/constants/integrations";
import styles from "./IntegrationRow.module.css";
import type { IntegrationRowProps } from "./types";

const { Text } = Typography;

export const IntegrationRow = ({ integration, isLast = false, onToggle }: IntegrationRowProps) => {
  const { id, name, description, action, logo, connected } = integration;
  const rowClassName = isLast ? styles.row : `${styles.row} ${styles.divider}`;

  return (
    <div className={rowClassName}>
      <IntegrationLogo src={logo} name={name} />

      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <Text className={styles.description}>{description}</Text>
      </div>

      {connected ? (
        <Button
          className={styles.action}
          icon={<CheckOutlined />}
          onClick={() => onToggle(id)}
          aria-label={`Disconnect ${name}`}
        >
          Connected
        </Button>
      ) : (
        <Button
          className={styles.action}
          type="primary"
          icon={<ArrowRightOutlined />}
          iconPosition="end"
          onClick={() => onToggle(id)}
          aria-label={`${ACTION_LABEL[action]} — ${name}`}
        >
          {ACTION_LABEL[action]}
        </Button>
      )}
    </div>
  );
};
