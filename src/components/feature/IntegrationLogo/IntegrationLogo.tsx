import styles from "./IntegrationLogo.module.css";
import type { IntegrationLogoProps } from "./types";

const DEFAULT_SIZE = 44;

/** Brand logo on a neutral rounded tile. */
export const IntegrationLogo = ({ src, name, size = DEFAULT_SIZE }: IntegrationLogoProps) => {
  const inner = Math.round(size * 0.6);

  return (
    <div className={styles.tile} style={{ width: size, height: size }}>
      <img
        className={styles.image}
        src={src}
        alt={`${name} logo`}
        width={inner}
        height={inner}
      />
    </div>
  );
};
