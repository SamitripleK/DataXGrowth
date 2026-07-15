import { useRef, useState } from "react";
import { Button, Input, Select } from "antd";
import { DeleteOutlined, DownOutlined, PlusOutlined } from "@ant-design/icons";
import type { CardFieldDef } from "./cardVariants";
import styles from "./ProfileStepper.module.css";

const { TextArea } = Input;

const renderCardField = (fieldDef: CardFieldDef) => {
  switch (fieldDef.control) {
    case "select":
      return (
        <Select
          placeholder={fieldDef.placeholder}
          aria-label={fieldDef.label}
          style={{ width: "100%" }}
          options={(fieldDef.options ?? []).map((option) => ({ value: option, label: option }))}
        />
      );
    case "textarea":
      return <TextArea rows={3} placeholder={fieldDef.placeholder} aria-label={fieldDef.label} />;
    default:
      return <Input placeholder={fieldDef.placeholder} aria-label={fieldDef.label} />;
  }
};

interface CardRow {
  id: number;
}

interface RepeatableCardListProps {
  title: string;
  addLabel: string;
  fields: CardFieldDef[];
}

/** Repeatable card builder used by "Products and services" and "Competitors":
 * a collapsible list of cards (each with a delete action) plus an add button. */
export const RepeatableCardList = ({ title, addLabel, fields }: RepeatableCardListProps) => {
  const nextId = useRef(1);
  const [rows, setRows] = useState<CardRow[]>([{ id: 0 }]);
  const [open, setOpen] = useState(true);

  const addRow = () => setRows((prev) => [...prev, { id: nextId.current++ }]);
  const removeRow = (id: number) => setRows((prev) => prev.filter((row) => row.id !== id));

  return (
    <div>
      <button
        type="button"
        className={styles.sectionCollapseHead}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <h3 className={styles.sectionTitle}>{title}</h3>
        <DownOutlined
          style={{ transform: `rotate(${open ? 0 : -90}deg)`, transition: "transform .2s", color: "#a6aba2" }}
        />
      </button>

      {open ? (
        <>
          {rows.map((row) => (
            <div key={row.id} className={styles.productCard}>
              <button
                type="button"
                className={styles.productDelete}
                onClick={() => removeRow(row.id)}
                aria-label={`Remove ${title} entry`}
              >
                <DeleteOutlined />
              </button>
              <div className={styles.fieldGrid}>
                {fields.map((fieldDef) => (
                  <div
                    key={fieldDef.key}
                    className={fieldDef.full ? `${styles.field} ${styles.fieldFull}` : styles.field}
                  >
                    <label className={styles.label}>{fieldDef.label}</label>
                    {renderCardField(fieldDef)}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className={styles.productAddRow}>
            <Button type="primary" icon={<PlusOutlined />} onClick={addRow}>
              {addLabel}
            </Button>
          </div>
        </>
      ) : null}
    </div>
  );
};
