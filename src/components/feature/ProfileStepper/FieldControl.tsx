import { Input, Segmented, Select, Switch } from "antd";
import { ProfileFieldType } from "@/types/profile";
import { renderFieldIcon } from "./fieldIcons";
import styles from "./ProfileStepper.module.css";
import type { FieldControlProps } from "./types";

const { TextArea } = Input;

const FULL_WIDTH_TYPES = new Set<ProfileFieldType>([
  ProfileFieldType.Area,
  ProfileFieldType.BigArea,
  ProfileFieldType.Chips,
  ProfileFieldType.Toggle,
  ProfileFieldType.BizModel,
]);

export const FieldControl = ({ field, biz, checked, onToggleBiz, onToggleSwitch }: FieldControlProps) => {
  const { label, type, placeholder, value, required, icon, options, chips, unit, fieldHelper } = field;
  const fieldClass = FULL_WIDTH_TYPES.has(type) ? `${styles.field} ${styles.fieldFull}` : styles.field;
  const prefix = renderFieldIcon(icon);

  const renderControl = () => {
    switch (type) {
      case ProfileFieldType.Text:
      case ProfileFieldType.Url:
        return <Input prefix={prefix ?? undefined} placeholder={placeholder} defaultValue={value} aria-label={label} />;
      case ProfileFieldType.Select:
        return (
          <Select
            placeholder={placeholder}
            aria-label={label}
            style={{ width: "100%" }}
            options={(options ?? []).map((option) => ({ value: option, label: option }))}
          />
        );
      case ProfileFieldType.Area:
        return <TextArea rows={3} placeholder={placeholder} aria-label={label} />;
      case ProfileFieldType.BigArea:
        return <TextArea rows={6} placeholder={placeholder} aria-label={label} />;
      case ProfileFieldType.Chips:
        return (
          <Select
            mode="tags"
            placeholder={placeholder}
            aria-label={label}
            style={{ width: "100%" }}
            defaultValue={chips ?? []}
            open={false}
            suffixIcon={null}
          />
        );
      case ProfileFieldType.MinMax:
        return (
          <div className={styles.minmax}>
            <Input prefix={unit} placeholder="Min" aria-label={`${label} minimum`} />
            <Input prefix={unit} placeholder="Max" aria-label={`${label} maximum`} />
          </div>
        );
      case ProfileFieldType.Toggle:
        return (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 11 }}>
            <Switch checked={checked} onChange={() => onToggleSwitch(label)} aria-label={label} />
            <span style={{ fontSize: 13, fontWeight: 600, color: "#5c635b" }}>
              {checked ? "Enabled" : "Disabled"}
            </span>
          </span>
        );
      case ProfileFieldType.BizModel:
        return (
          <Segmented
            options={["B2B", "D2C"]}
            value={biz ?? undefined}
            onChange={(next) => onToggleBiz(next as "B2B" | "D2C")}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={fieldClass}>
      <label className={styles.label}>
        {label}
        {required ? <span className={styles.req}> *</span> : null}
      </label>
      {renderControl()}
      {fieldHelper ? <p className={styles.fieldHelper}>{fieldHelper}</p> : null}
    </div>
  );
};
