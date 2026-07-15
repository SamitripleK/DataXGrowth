import styles from "./InitialsAvatar.module.css";
import type { InitialsAvatarProps } from "./types";

export const InitialsAvatar = ({
  initials,
  size = 34,
  fontSize = 12.5,
  radius = 9,
}: InitialsAvatarProps) => (
  <div className={styles.avatar} style={{ width: size, height: size, fontSize, borderRadius: radius }}>
    {initials}
  </div>
);
