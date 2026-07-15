import { useMemo, useState } from "react";
import { App, Grid } from "antd";
import { BulbOutlined } from "@ant-design/icons";
import { PROFILE_STEPS } from "@/constants/profileSteps";
import { ProfileFieldType, type ProfileField } from "@/types/profile";
import { AddFieldModal } from "@/components/feature/AddFieldModal";
import { MobileProfileStepper } from "./MobileProfileStepper";
import { StepSections } from "./StepSections";
import styles from "./ProfileStepper.module.css";

const isSelectType = (type: ProfileFieldType) =>
  type === ProfileFieldType.Select || type === ProfileFieldType.MultiSelect;

const buildCustomField = (label: string, type: ProfileFieldType, options?: string[]): ProfileField => ({
  label,
  type,
  placeholder: isSelectType(type) ? "Select option" : "Enter value",
  ...(type === ProfileFieldType.Chips ? { chips: [] } : {}),
  ...(isSelectType(type) ? { options: options ?? [] } : {}),
});

const PROFILE_PCT = 35;

export const ProfileStepper = () => {
  const { message } = App.useApp();
  const screens = Grid.useBreakpoint();
  const isMobile = screens.md === false;
  const [stepId, setStepId] = useState(PROFILE_STEPS[0].id);
  const [biz, setBiz] = useState<string | null>(null);
  const [toggles, setToggles] = useState<Record<string, boolean>>({});
  const [extraFields, setExtraFields] = useState<Record<string, ProfileField[]>>({});
  const [addFieldSection, setAddFieldSection] = useState<string | null>(null);

  const currentStep = useMemo(
    () => PROFILE_STEPS.find((step) => step.id === stepId) ?? PROFILE_STEPS[0],
    [stepId]
  );

  const handleSetBiz = (value: string | null) => setBiz(value);
  const handleToggleSwitch = (label: string) =>
    setToggles((prev) => ({ ...prev, [label]: !prev[label] }));

  const handleAddField = (label: string, type: ProfileFieldType, options?: string[]) => {
    if (!addFieldSection) return;
    const sectionTitle = addFieldSection;
    setExtraFields((prev) => {
      const existing = prev[sectionTitle] ?? [];
      return { ...prev, [sectionTitle]: [...existing, buildCustomField(label, type, options)] };
    });
    message.success(`"${label}" added`);
  };

  return (
    <>
      {isMobile ? (
        <MobileProfileStepper
          steps={PROFILE_STEPS}
          pct={PROFILE_PCT}
          biz={biz}
          toggles={toggles}
          extraFields={extraFields}
          onAddFieldSection={setAddFieldSection}
          onSetBiz={handleSetBiz}
          onToggleSwitch={handleToggleSwitch}
        />
      ) : (
        <div className={styles.grid}>
          {/* LEFT: progress + navigation */}
          <div className={styles.leftColumn}>
            <div className={`${styles.card} ${styles.progressCard}`}>
              <div className={styles.progressHead}>
                <span className={styles.progressLabel}>Profile completion</span>
                <span className={styles.progressPct}>{PROFILE_PCT}%</span>
              </div>
              <div className={styles.track}>
                <div className={styles.trackFill} style={{ width: `${PROFILE_PCT}%` }} />
              </div>
            </div>

            <div className={`${styles.card} ${styles.stepNav}`}>
              {PROFILE_STEPS.map((step, index) => {
                const active = step.id === stepId;
                return (
                  <button
                    key={step.id}
                    type="button"
                    className={active ? `${styles.stepItem} ${styles.stepItemActive}` : styles.stepItem}
                    onClick={() => setStepId(step.id)}
                    aria-current={active ? "step" : undefined}
                  >
                    <span className={active ? `${styles.stepNum} ${styles.stepNumActive}` : styles.stepNum}>
                      {index + 1}
                    </span>
                    <span className={styles.stepMain}>
                      <span className={styles.stepTitleRow}>
                        <span className={active ? `${styles.stepTitle} ${styles.stepTitleActive}` : styles.stepTitle}>
                          {step.title}
                        </span>
                        <span className={active ? `${styles.stepPct} ${styles.stepPctActive}` : styles.stepPct}>
                          {step.completion}%
                        </span>
                      </span>
                      <span className={styles.stepBar}>
                        <span
                          className={active ? `${styles.stepBarFill} ${styles.stepBarFillActive}` : styles.stepBarFill}
                          style={{ width: `${step.completion}%` }}
                        />
                      </span>
                      <span className={styles.stepCaption}>{step.caption}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className={styles.tip}>
              <BulbOutlined style={{ color: "var(--color-primary)", marginTop: 1 }} />
              <p className={styles.tipText}>
                Complete each step to build a stronger client profile and get better AI insights.
              </p>
            </div>
          </div>

          {/* RIGHT: active step form */}
          <div className={styles.rightColumn}>
            <div className={styles.card}>
              <div className={styles.formHeader}>
                <div style={{ minWidth: 0 }}>
                  <h2 className={styles.formTitle}>{currentStep.title}</h2>
                  <p className={styles.formSubtitle}>{currentStep.subtitle}</p>
                </div>
              </div>

              <div className={styles.formBody}>
                <StepSections
                  step={currentStep}
                  biz={biz}
                  toggles={toggles}
                  extraFields={extraFields}
                  onAddFieldSection={setAddFieldSection}
                  onSetBiz={handleSetBiz}
                  onToggleSwitch={handleToggleSwitch}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <AddFieldModal
        open={addFieldSection !== null}
        onClose={() => setAddFieldSection(null)}
        onAdd={handleAddField}
      />
    </>
  );
};
