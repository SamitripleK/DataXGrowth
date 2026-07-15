import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { App } from "antd";
import { TeamOutlined, UserOutlined, UnorderedListOutlined, LogoutOutlined } from "@ant-design/icons";
import { QUEUE } from "@/constants/queue";
import styles from "./Sidebar.module.css";

interface NavItem {
  key: string;
  label: string;
  path: string;
  icon: React.ReactNode;
  badge?: number;
  isActive: (pathname: string) => boolean;
}

const PENDING_COUNT = QUEUE.filter((item) => item.status === "Pending").length;

const NAV_ITEMS: NavItem[] = [
  { key: "clients", label: "Clients", path: "/clients", icon: <TeamOutlined />, isActive: (p) => p.startsWith("/clients") },
  { key: "users", label: "Users", path: "/users", icon: <UserOutlined />, isActive: (p) => p.startsWith("/users") },
  { key: "queue", label: "Queue", path: "/queue", icon: <UnorderedListOutlined />, badge: PENDING_COUNT, isActive: (p) => p.startsWith("/queue") },
];

interface SidebarProps {
  variant?: "fixed" | "drawer";
  onNavigate?: () => void;
}

export const Sidebar = ({ variant = "fixed", onNavigate }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { modal } = App.useApp();
  const pathname = location.pathname;

  const items = useMemo(
    () => NAV_ITEMS.map((item) => ({ ...item, active: item.isActive(pathname) })),
    [pathname]
  );

  const go = (path: string) => {
    navigate(path);
    onNavigate?.();
  };

  const handleLogout = () => {
    modal.confirm({
      title: "Log out?",
      content:
        "You'll be returned to the sign-in screen and will need to sign in again to access the console.",
      okText: "Log out",
      cancelText: "Cancel",
      okButtonProps: { danger: true },
      onOk: () => {
        navigate("/login");
        onNavigate?.();
      },
    });
  };

  const asideClass = variant === "drawer" ? `${styles.sidebar} ${styles.sidebarDrawer}` : styles.sidebar;

  return (
    <aside className={asideClass}>
      <img className={styles.logo} src="/dxg-logo.svg" alt="DataXGrowth — Tactical Growth Marketing" />
      <div className={styles.navLabel}>NAVIGATION</div>

      <nav className={styles.nav}>
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            className={item.active ? `${styles.navItem} ${styles.navItemActive}` : styles.navItem}
            onClick={() => go(item.path)}
            aria-current={item.active ? "page" : undefined}
          >
            <span aria-hidden>{item.icon}</span>
            <span className={styles.navItemLabel}>{item.label}</span>
            {item.badge ? <span className={styles.badge}>{item.badge}</span> : null}
          </button>
        ))}
      </nav>

      <div className={styles.spacer} />

      <div className={styles.account}>
        <div className={styles.avatar}>AD</div>
        <div className={styles.accountInfo}>
          <div className={styles.accountEmail}>alex.morgan@dxg.com</div>
          <div className={styles.accountRole}>Workspace owner</div>
        </div>
        <button type="button" className={styles.logout} onClick={handleLogout} title="Log out" aria-label="Log out">
          <LogoutOutlined />
        </button>
      </div>
    </aside>
  );
};
