import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { App, Button, Tabs } from "antd";
import { LeftOutlined, MailOutlined, GlobalOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { InitialsAvatar } from "@/components/ui/InitialsAvatar";
import { ProfileStepper } from "@/components/feature/ProfileStepper";
import { IntegrationsTab } from "@/components/feature/IntegrationsTab";
import { CLIENTS } from "@/constants/clients";
import styles from "./ClientProfile.module.css";

const ClientProfilePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { message } = App.useApp();

  const client = useMemo(() => {
    const index = Number(id);
    return CLIENTS.find((c) => c.id === index) ?? CLIENTS[0];
  }, [id]);

  const tabItems = [
    { key: "profile", label: "Profile", children: <ProfileStepper /> },
    { key: "integrations", label: "Integrations", children: <IntegrationsTab clientName={client.name} /> },
  ];

  return (
    <div className={styles.page}>
      <Button type="link" className={styles.back} icon={<LeftOutlined />} onClick={() => navigate("/clients")}>
        Back to Clients
      </Button>

      <div className={styles.headerCard}>
        <div className={styles.headerTop}>
          <InitialsAvatar initials={client.initials} size={54} fontSize={19} radius={14} />
          <div style={{ flex: 1, minWidth: 200 }}>
            <h1 className={styles.name}>{client.name}</h1>
            <div className={styles.meta}>
              <span className={styles.metaItem}>
                <MailOutlined style={{ color: "#a6aba2" }} />
                {client.email}
              </span>
              <span className={styles.metaItem}>
                <GlobalOutlined style={{ color: "#a6aba2" }} />
                {client.website}
              </span>
            </div>
          </div>
          <div className={styles.actions}>
            <Button icon={<ThunderboltOutlined />} onClick={() => message.success(`Magic link sent to ${client.email}`)}>
              Send Magic Link
            </Button>
            <Button type="primary" onClick={() => message.success("Profile saved")}>
              Save Profile
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultActiveKey="profile" items={tabItems} />
    </div>
  );
};

export default ClientProfilePage;
