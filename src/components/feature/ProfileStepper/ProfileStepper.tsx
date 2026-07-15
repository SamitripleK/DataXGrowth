import { useMemo, useState } from "react";
import { App, Button } from "antd";
import {
  BulbOutlined,
  DeploymentUnitOutlined,
  DownOutlined,
  RightOutlined,
  ThunderboltOutlined,
  LockOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { PROFILE_STEPS } from "@/constants/profileSteps";
import { ProfileFieldType, type BusinessModel, type ProfileField, type ProfileGroup } from "@/types/profile";
import { AddFieldModal } from "@/components/feature/AddFieldModal";
import { FieldControl } from "./FieldControl";
import styles from "./ProfileStepper.module.css";

const buildCustomField = (label: string, type: ProfileFieldType): ProfileField => ({
  label,
  type,
  placeholder: type === ProfileFieldType.Select ? "Select option" : "Enter value",
  ...(type === ProfileFieldType.Chips ? { chips: [] } : {}),
  ...(type === ProfileFieldType.Select ? { options: [] } : {}),
});

const PROFILE_PCT = 35;

const groupOrder = (biz: BusinessModel): Record<ProfileGroup, number> =>
  biz === "B2B" ? { b2b: 0, both: 1, d2c: 2 } : { d2c: 0, both: 1, b2b: 2 };

export const ProfileStepper = () => {
  const { message } = App.useApp();
  const [stepId, setStepId] = useState(PROFILE_STEPS[0].id);
  const [biz, setBiz] = useState<BusinessModel>(null);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [toggles, setToggles] = useState<Record<string, boolean>>({});
  const [extraFields, setExtraFields] = useState<Record<string, ProfileField[]>>({});
  const [addFieldSection, setAddFieldSection] = useState<string | null>(null);

  const currentStep = useMemo(
    () => PROFILE_STEPS.find((step) => step.id === stepId) ?? PROFILE_STEPS[0],
    [stepId]
  );
  const advancedSteps = useMemo(
    () => PROFILE_STEPS.map((step, index) => ({ ...step, num: index + 1 })).filter((step) => step.id !== "basic"),
    []
  );
  const order = groupOrder(biz);

  const handleSetBiz = (model: "B2B" | "D2C") => {
    setBiz(model);
    message.success(`Business model set to ${model}`);
  };
  const handleToggleSwitch = (label: string) =>
    setToggles((prev) => ({ ...prev, [label]: !prev[label] }));

  const handleAddField = (label: string, type: ProfileFieldType) => {
    if (!addFieldSection) return;
    const sectionTitle = addFieldSection;
    setExtraFields((prev) => {
      const existing = prev[sectionTitle] ?? [];
      return { ...prev, [sectionTitle]: [...existing, buildCustomField(label, type)] };
    });
    message.success(`"${label}" added`);
  };

  return (
    <>
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
            <Button
              icon={<ThunderboltOutlined />}
              onClick={() => message.success("Scanning website — suggestions will appear shortly")}
            >
              Scan website and suggest details
            </Button>
          </div>

          <div className={styles.formBody}>
            {currentStep.sections.map((section) => {
              const locked = Boolean(section.conditional) && !biz;
              const sorted =
                section.conditional && biz
                  ? [...section.fields].sort(
                      (a, b) => order[a.group ?? "both"] - order[b.group ?? "both"]
                    )
                  : section.fields;
              const fields = [...sorted, ...(extraFields[section.title] ?? [])];

              return (
                <div key={section.title}>
                  <div className={styles.sectionTitleRow}>
                    <span className={styles.sectionTitleLeft}>
                      <h3 className={styles.sectionTitle}>{section.title}</h3>
                      <span className={styles.countBadge}>{section.count}</span>
                    </span>
                    <Button
                      type="link"
                      size="small"
                      icon={<PlusOutlined />}
                      onClick={() => setAddFieldSection(section.title)}
                    >
                      Add field
                    </Button>
                  </div>
                  {section.helper ? (
                    <p className={styles.sectionHelper}>{section.helper}</p>
                  ) : (
                    <div className={styles.sectionSpacer} />
                  )}

                  {locked ? (
                    <div className={styles.lockedBox}>
                      <LockOutlined style={{ fontSize: 22, color: "#a6aba2", marginBottom: 9 }} />
                      <p className={styles.lockedText}>
                        Choose a business model first to unlock the most relevant audience fields.
                      </p>
                      <div className={styles.lockedActions}>
                        <Button type="primary" size="small" onClick={() => handleSetBiz("B2B")}>
                          B2B
                        </Button>
                        <Button size="small" onClick={() => handleSetBiz("D2C")}>
                          D2C
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.fieldGrid}>
                      {fields.map((field) => (
                        <FieldControl
                          key={field.label}
                          field={field}
                          biz={biz}
                          checked={Boolean(toggles[field.label])}
                          onToggleBiz={handleSetBiz}
                          onToggleSwitch={handleToggleSwitch}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {currentStep.id === "basic" ? (
              <div className={styles.advanced}>
                <button
                  type="button"
                  className={styles.advancedHeader}
                  onClick={() => setAdvancedOpen((open) => !open)}
                  aria-expanded={advancedOpen}
                >
                  <span className={styles.advancedIcon}>
                    <DeploymentUnitOutlined />
                  </span>
                  <span style={{ flex: 1 }}>
                    <span className={styles.advancedTitle}>Advanced Details</span>
                    <span className={styles.advancedSub}>Optional fields can be completed later</span>
                  </span>
                  <DownOutlined
                    style={{ transform: `rotate(${advancedOpen ? 180 : 0}deg)`, transition: "transform .2s", color: "#a6aba2" }}
                  />
                </button>
                {advancedOpen ? (
                  <div className={styles.advancedList}>
                    {advancedSteps.map((step) => (
                      <button key={step.id} type="button" className={styles.advancedItem} onClick={() => setStepId(step.id)}>
                        <span className={styles.advancedItemNum}>{step.num}</span>
                        <span className={styles.advancedItemMain}>
                          <span className={styles.advancedItemTitle}>{step.title}</span>
                          <span className={styles.advancedItemCaption}>{step.caption}</span>
                        </span>
                        <span className={styles.stepPct}>{step.completion}%</span>
                        <RightOutlined style={{ color: "#c7ccc2", fontSize: 13 }} />
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      </div>

      <AddFieldModal
        open={addFieldSection !== null}
        onClose={() => setAddFieldSection(null)}
        onAdd={handleAddField}
      />
    </>
  );
};
