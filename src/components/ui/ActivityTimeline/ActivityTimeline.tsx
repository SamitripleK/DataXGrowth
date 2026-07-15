import { timelineColor, timelineRing } from "@/utils/queueStyles";
import styles from "./ActivityTimeline.module.css";
import type { ActivityTimelineProps } from "./types";

export const ActivityTimeline = ({ events }: ActivityTimelineProps) => (
  <div className={styles.timeline}>
    {events.map((event, index) => (
      <div key={`${event.text}-${index}`} className={styles.event}>
        <div className={styles.rail}>
          <span
            className={styles.dot}
            style={{ background: timelineColor(event.kind), boxShadow: `0 0 0 2px ${timelineRing(event.kind)}` }}
          />
          <span className={styles.line} />
        </div>
        <div className={styles.body}>
          <div className={styles.text}>{event.text}</div>
          <div className={styles.time}>{event.time}</div>
        </div>
      </div>
    ))}
  </div>
);
