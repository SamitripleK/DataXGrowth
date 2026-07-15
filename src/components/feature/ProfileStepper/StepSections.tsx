import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FieldControl } from "./FieldControl";
import { CARD_VARIANTS } from "./cardVariants";
import { RepeatableCardList } from "./RepeatableCardList";
import type { StepSectionsProps } from "./types";
import styles from "./ProfileStepper.module.css";

/** Renders one step's sections (title row, add-field, field grid), or a card
 * builder for `variant` sections. Shared verbatim by the desktop stepper and the
 * mobile scroll panels so the two layouts stay in sync. */
export const StepSections = ({
  step,
  biz,
  toggles,
  extraFields,
  onAddFieldSection,
  onSetBiz,
  onToggleSwitch,
}: StepSectionsProps) => {
  return (
    <>
      {step.sections.map((section) => {
        if (section.variant) {
          const variant = CARD_VARIANTS[section.variant];
          return (
            <RepeatableCardList
              key={section.title}
              title={section.title}
              addLabel={variant.addLabel}
              fields={variant.fields}
            />
          );
        }

        const fields = [...section.fields, ...(extraFields[section.title] ?? [])].filter(
          (field) => !field.showWhenToggle || toggles[field.showWhenToggle]
        );

        return (
          <div key={section.title}>
            <div className={styles.sectionTitleRow}>
              <span className={styles.sectionTitleLeft}>
                <h3 className={styles.sectionTitle}>{section.title}</h3>
              </span>
              <Button
                type="link"
                size="small"
                icon={<PlusOutlined />}
                onClick={() => onAddFieldSection(section.title)}
              >
                Add field
              </Button>
            </div>
            {section.helper ? (
              <p className={styles.sectionHelper}>{section.helper}</p>
            ) : (
              <div className={styles.sectionSpacer} />
            )}

            <div className={styles.fieldGrid}>
              {fields.map((field) => (
                <FieldControl
                  key={field.label}
                  field={field}
                  biz={biz}
                  checked={Boolean(toggles[field.label])}
                  onSetBiz={onSetBiz}
                  onToggleSwitch={onToggleSwitch}
                />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};
