import styles from "./PageHeader.module.css";
import type { PageHeaderProps } from "./types";

export const PageHeader = ({ title, subtitle, extra }: PageHeaderProps) => (
  <div className={styles.header}>
    <div>
      <h1 className={styles.title}>{title}</h1>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
    </div>
    {extra ? <div>{extra}</div> : null}
  </div>
);
