import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { StepSections } from "./StepSections";
import type { MobileProfileStepperProps } from "./types";
import styles from "./ProfileStepper.module.css";

/** Compact tab labels for the horizontal section nav. */
const SHORT_LABEL: Record<string, string> = {
  basic: "Basic Profile",
  kpis: "KPIs",
  audience: "Audience",
  products: "Products",
  competitors: "Competitors",
  buyer: "Funnel",
  reporting: "Reporting",
};

/** Walk up to the nearest vertically-scrollable ancestor (the layout's scroll
 * area) so the sticky header, ScrollSpy root, and smooth scrolling all share it. */
const getScrollParent = (node: HTMLElement | null): HTMLElement | null => {
  let el = node?.parentElement ?? null;
  while (el) {
    const overflowY = getComputedStyle(el).overflowY;
    if (overflowY === "auto" || overflowY === "scroll") return el;
    el = el.parentElement;
  }
  return null;
};

/** Mobile-only (≤768px) Client Profile experience: a sticky horizontal section
 * nav with ScrollSpy over stacked panels. Desktop uses the stepper unchanged. */
export const MobileProfileStepper = ({
  steps,
  pct,
  biz,
  toggles,
  extraFields,
  onAddFieldSection,
  onSetBiz,
  onToggleSwitch,
}: MobileProfileStepperProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabListRef = useRef<HTMLDivElement>(null);
  const scrollParentRef = useRef<HTMLElement | null>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const suppressSpy = useRef(false);
  const suppressTimer = useRef<number | undefined>(undefined);

  const [activeId, setActiveId] = useState(steps[0]?.id ?? "");
  const [headerH, setHeaderH] = useState(0);

  // Measure the sticky header so section headings never hide behind it.
  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const measure = () => setHeaderH(header.getBoundingClientRect().height);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(header);
    return () => ro.disconnect();
  }, []);

  // Resolve the layout's scroll container once after mount.
  useLayoutEffect(() => {
    scrollParentRef.current = getScrollParent(rootRef.current);
  }, []);

  // Keep the active tab centered within the horizontal tab list.
  useEffect(() => {
    const tab = tabRefs.current.get(activeId);
    const list = tabListRef.current;
    if (!tab || !list) return;
    const target = tab.offsetLeft - (list.clientWidth - tab.clientWidth) / 2;
    list.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [activeId]);

  // ScrollSpy: mark the section sitting just under the sticky header as active.
  useEffect(() => {
    const root = scrollParentRef.current;
    if (!root || headerH === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (suppressSpy.current) return;
        const topmost = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        const id = topmost?.target.getAttribute("data-section-id");
        if (id) setActiveId(id);
      },
      { root, rootMargin: `-${Math.round(headerH) + 8}px 0px -65% 0px`, threshold: 0 }
    );
    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headerH, steps]);

  const scrollToSection = useCallback((id: string) => {
    const el = sectionRefs.current.get(id);
    if (!el) return;
    setActiveId(id);
    // Suppress ScrollSpy while the programmatic smooth-scroll settles.
    suppressSpy.current = true;
    window.clearTimeout(suppressTimer.current);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    suppressTimer.current = window.setTimeout(() => {
      suppressSpy.current = false;
    }, 500);
  }, []);

  const handleTabKeyDown = (event: React.KeyboardEvent, id: string) => {
    const index = steps.findIndex((step) => step.id === id);
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight") nextIndex = Math.min(steps.length - 1, index + 1);
    else if (event.key === "ArrowLeft") nextIndex = Math.max(0, index - 1);
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = steps.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    const nextId = steps[nextIndex].id;
    tabRefs.current.get(nextId)?.focus();
    scrollToSection(nextId);
  };

  return (
    <div className={styles.mobileRoot} ref={rootRef}>
      <div className={styles.mobileSticky} ref={headerRef}>
        <div className={styles.mobileProgress}>
          <div className={styles.mobileTrack}>
            <div className={styles.mobileTrackFill} style={{ width: `${pct}%` }} />
          </div>
          <span className={styles.mobilePct}>{pct}% Complete</span>
        </div>
        <div className={styles.mobileTabs} ref={tabListRef} role="tablist" aria-label="Profile sections">
          {steps.map((step) => {
            const active = step.id === activeId;
            return (
              <button
                key={step.id}
                ref={(node) => {
                  if (node) tabRefs.current.set(step.id, node);
                  else tabRefs.current.delete(step.id);
                }}
                type="button"
                role="tab"
                id={`tab-${step.id}`}
                aria-selected={active}
                aria-controls={`panel-${step.id}`}
                tabIndex={active ? 0 : -1}
                className={active ? `${styles.mobileTab} ${styles.mobileTabActive}` : styles.mobileTab}
                onClick={() => scrollToSection(step.id)}
                onKeyDown={(event) => handleTabKeyDown(event, step.id)}
              >
                {SHORT_LABEL[step.id] ?? step.title}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.mobileSections}>
        {steps.map((step, index) => (
          <section
            key={step.id}
            id={`panel-${step.id}`}
            data-section-id={step.id}
            ref={(node) => {
              if (node) sectionRefs.current.set(step.id, node);
              else sectionRefs.current.delete(step.id);
            }}
            role="tabpanel"
            aria-labelledby={`tab-${step.id}`}
            className={`${styles.card} ${styles.mobilePanel}`}
            style={{ scrollMarginTop: headerH + 12 }}
          >
            <div className={styles.mobilePanelHead}>
              <h2 className={styles.formTitle}>{step.title}</h2>
              <p className={styles.formSubtitle}>{step.subtitle}</p>
            </div>
            <div className={styles.mobilePanelBody}>
              <StepSections
                step={step}
                biz={biz}
                toggles={toggles}
                extraFields={extraFields}
                onAddFieldSection={onAddFieldSection}
                onSetBiz={onSetBiz}
                onToggleSwitch={onToggleSwitch}
              />
            </div>
            <div className={styles.mobileNavBtns}>
              <Button
                className={styles.mobileNavBtn}
                icon={<LeftOutlined />}
                disabled={index === 0}
                onClick={() => {
                  const prev = steps[index - 1];
                  if (prev) scrollToSection(prev.id);
                }}
              >
                Previous
              </Button>
              <Button
                className={styles.mobileNavBtn}
                icon={<RightOutlined />}
                iconPosition="end"
                disabled={index === steps.length - 1}
                onClick={() => {
                  const next = steps[index + 1];
                  if (next) scrollToSection(next.id);
                }}
              >
                Next
              </Button>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
