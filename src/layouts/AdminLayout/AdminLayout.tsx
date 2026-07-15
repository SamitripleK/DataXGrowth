import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Button, Drawer, Grid } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Sidebar } from "@/components/layout/Sidebar";
import styles from "./AdminLayout.module.css";

/** Shell for authenticated admin screens. Fixed sidebar on desktop; a top bar
 * with a Drawer-based nav on mobile/tablet (< md). */
export const AdminLayout = () => {
  const screens = Grid.useBreakpoint();
  const isMobile = screens.md === false;
  const [navOpen, setNavOpen] = useState(false);

  if (isMobile) {
    return (
      <div className={styles.mobileShell}>
        <header className={styles.topbar}>
          <Button icon={<MenuOutlined />} onClick={() => setNavOpen(true)} aria-label="Open navigation" />
          <img className={styles.topbarLogo} src="/dxg-logo.svg" alt="DataXGrowth" />
        </header>
        <main className={styles.mobileContent}>
          <Outlet />
        </main>
        <Drawer
          placement="left"
          open={navOpen}
          onClose={() => setNavOpen(false)}
          width={260}
          styles={{ body: { padding: 0 } }}
          closable={false}
        >
          <Sidebar variant="drawer" onNavigate={() => setNavOpen(false)} />
        </Drawer>
      </div>
    );
  }

  return (
    <div className={styles.shell}>
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
