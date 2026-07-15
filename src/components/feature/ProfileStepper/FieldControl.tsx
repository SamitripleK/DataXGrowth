import { useState } from "react";
import { Button, Divider, Input, InputNumber, Select, Switch } from "antd";
import { PlusOutlined } from "@ant-design/icons";
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
  ProfileFieldType.MinMax,
]);

interface EditableSelectProps {
  label: string;
  placeholder?: string;
  options: string[];
  defaultSelected?: string[];
  mode?: "multiple";
  allowAdd: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

/** Single/multi Select. When `allowAdd` is set, the dropdown gains an inline
 * "Add new option" input so users can extend the option list on the fly. */
const EditableSelect = ({
  label,
  placeholder,
  options,
  defaultSelected,
  mode,
  allowAdd,
  disabled,
  onChange,
}: EditableSelectProps) => {
  const [items, setItems] = useState<string[]>(options);
  const [draft, setDraft] = useState("");

  const addOption = () => {
    const value = draft.trim();
    if (!value || items.includes(value)) return;
    setItems((prev) => [...prev, value]);
    setDraft("");
  };

  return (
    <Select
      mode={mode}
      disabled={disabled}
      onChange={onChange ? (next) => onChange(typeof next === "string" ? next : "") : undefined}
      defaultValue={mode === "multiple" ? defaultSelected : undefined}
      placeholder={placeholder}
      aria-label={label}
      style={{ width: "100%" }}
      options={items.map((option) => ({ value: option, label: option }))}
      dropdownRender={
        allowAdd
          ? (menu) => (
              <>
                {menu}
                <Divider style={{ margin: "6px 0" }} />
                <div style={{ display: "flex", gap: 8, padding: "0 8px 6px" }}>
                  <Input
                    placeholder="Add new option"
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={(event) => {
                      event.stopPropagation();
                      if (event.key === "Enter") {
                        event.preventDefault();
                        addOption();
                      }
                    }}
                  />
                  <Button type="text" icon={<PlusOutlined />} onClick={addOption}>
                    Add
                  </Button>
                </div>
              </>
            )
          : undefined
      }
    />
  );
};

export const FieldControl = ({ field, biz, checked, onSetBiz, onToggleSwitch }: FieldControlProps) => {
  const { label, type, placeholder, value, required, icon, options, chips, unit, fieldHelper, full, allowAddOption, requiresBiz, controlsBiz } =
    field;
  const fieldClass = full || FULL_WIDTH_TYPES.has(type) ? `${styles.field} ${styles.fieldFull}` : styles.field;
  const prefix = renderFieldIcon(icon);
  const disabled = Boolean(requiresBiz) && !biz;

  const renderControl = () => {
    switch (type) {
      case ProfileFieldType.Text:
      case ProfileFieldType.Url:
        return (
          <Input
            prefix={prefix ?? undefined}
            placeholder={placeholder}
            defaultValue={value}
            aria-label={label}
            disabled={disabled}
          />
        );
      case ProfileFieldType.Number:
        return <InputNumber style={{ width: "100%" }} placeholder={placeholder} aria-label={label} disabled={disabled} />;
      case ProfileFieldType.Select:
      case ProfileFieldType.MultiSelect:
        return (
          <EditableSelect
            label={label}
            placeholder={placeholder}
            options={options ?? []}
            defaultSelected={chips}
            mode={type === ProfileFieldType.MultiSelect ? "multiple" : undefined}
            allowAdd={Boolean(allowAddOption)}
            disabled={disabled}
            onChange={controlsBiz ? (next) => onSetBiz(next || null) : undefined}
          />
        );
      case ProfileFieldType.Area:
        return <TextArea rows={3} placeholder={placeholder} aria-label={label} disabled={disabled} />;
      case ProfileFieldType.BigArea:
        return <TextArea rows={6} placeholder={placeholder} aria-label={label} disabled={disabled} />;
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
      {disabled ? (
        <p className={styles.fieldHelper}>Select a business model to enable</p>
      ) : fieldHelper ? (
        <p className={styles.fieldHelper}>{fieldHelper}</p>
      ) : null}
    </div>
  );
};
