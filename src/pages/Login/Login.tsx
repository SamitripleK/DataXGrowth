import { useNavigate } from "react-router-dom";
import { Button, Typography } from "antd";
import styles from "./Login.module.css";

const { Title, Paragraph } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <img className={styles.logo} src="/dxg-logo.svg" alt="DataXGrowth" />
        <Title level={1} className={styles.title}>
          Sign in to your console
        </Title>
        <Paragraph className={styles.subtitle}>
          Use your approved Google account to access the DataXGrowth AI admin platform.
        </Paragraph>

        <Button
          className={styles.googleButton}
          onClick={() => navigate("/clients")}
          aria-label="Continue with Google"
        >
          <img className={styles.googleIcon} src="/logos/google.svg" alt="" aria-hidden />
          Continue with Google
        </Button>

        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerText}>SECURE ACCESS</span>
          <span className={styles.dividerLine} />
        </div>

        <Paragraph className={styles.footer}>
          Access is limited to approved team members. Contact your workspace admin if you need an
          invite.
        </Paragraph>
      </div>
    </div>
  );
};

export default LoginPage;
