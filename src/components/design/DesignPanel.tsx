import React from 'react';
import type { DesignSettings } from '../../types';
import { FONT_OPTIONS } from '../../types';
import styles from './DesignPanel.module.css';

interface DesignPanelProps {
  settings: DesignSettings | null;
  onChange: (settings: Partial<DesignSettings>) => void;
  hasProject: boolean;
}

interface ColorFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function ColorField({ label, value, onChange }: ColorFieldProps) {
  return (
    <div className={styles.colorField}>
      <label className={styles.fieldLabel}>{label}</label>
      <div className={styles.colorInput}>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={styles.colorSwatch}
          aria-label={label}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={styles.colorText}
          spellCheck={false}
          aria-label={`${label} hex value`}
        />
      </div>
    </div>
  );
}

interface RangeFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
}

function RangeField({ label, value, min, max, step = 1, unit = '', onChange }: RangeFieldProps) {
  return (
    <div className={styles.rangeField}>
      <div className={styles.rangeHeader}>
        <label className={styles.fieldLabel}>{label}</label>
        <span className={styles.rangeValue}>{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={styles.rangeInput}
        aria-label={label}
      />
    </div>
  );
}

export function DesignPanel({ settings, onChange, hasProject }: DesignPanelProps) {
  if (!hasProject || !settings) {
    return (
      <div className={styles.emptyState}>
        <p>Create or open a project to customise the design.</p>
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      {/* Colors */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Colours</h3>
        <ColorField label="Primary" value={settings.primaryColor} onChange={(v) => onChange({ primaryColor: v })} />
        <ColorField label="Secondary" value={settings.secondaryColor} onChange={(v) => onChange({ secondaryColor: v })} />
        <ColorField label="Accent" value={settings.accentColor} onChange={(v) => onChange({ accentColor: v })} />
        <ColorField label="Background" value={settings.backgroundColor} onChange={(v) => onChange({ backgroundColor: v })} />
        <ColorField label="Surface" value={settings.surfaceColor} onChange={(v) => onChange({ surfaceColor: v })} />
        <ColorField label="Text" value={settings.textColor} onChange={(v) => onChange({ textColor: v })} />
        <ColorField label="Muted" value={settings.mutedColor} onChange={(v) => onChange({ mutedColor: v })} />
      </section>

      <div className={styles.divider} />

      {/* Typography */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Typography</h3>
        <div className={styles.selectField}>
          <label className={styles.fieldLabel}>Heading Font</label>
          <select
            className={styles.select}
            value={settings.headingFont}
            onChange={(e) => onChange({ headingFont: e.target.value })}
            aria-label="Heading font"
          >
            {FONT_OPTIONS.map((f) => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
        </div>
        <div className={styles.selectField}>
          <label className={styles.fieldLabel}>Body Font</label>
          <select
            className={styles.select}
            value={settings.bodyFont}
            onChange={(e) => onChange({ bodyFont: e.target.value })}
            aria-label="Body font"
          >
            {FONT_OPTIONS.map((f) => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
        </div>
        <RangeField
          label="Base Font Size"
          value={settings.baseSize}
          min={12}
          max={20}
          unit="px"
          onChange={(v) => onChange({ baseSize: v })}
        />
      </section>

      <div className={styles.divider} />

      {/* Layout */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Layout</h3>
        <RangeField
          label="Section Spacing"
          value={settings.spacing}
          min={0.5}
          max={3}
          step={0.25}
          unit="×"
          onChange={(v) => onChange({ spacing: v })}
        />
        <RangeField
          label="Border Radius"
          value={settings.borderRadius}
          min={0}
          max={24}
          step={2}
          unit="px"
          onChange={(v) => onChange({ borderRadius: v })}
        />
        <RangeField
          label="Max Content Width"
          value={settings.maxWidth}
          min={800}
          max={1600}
          step={100}
          unit="px"
          onChange={(v) => onChange({ maxWidth: v })}
        />
      </section>

      <div className={styles.divider} />

      {/* Theme */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Theme</h3>
        <div className={styles.themeSelector}>
          <button
            className={`${styles.themeBtn} ${settings.theme === 'light' ? styles.active : ''}`}
            onClick={() => onChange({ theme: 'light' })}
          >
            ☀️ Light
          </button>
          <button
            className={`${styles.themeBtn} ${settings.theme === 'dark' ? styles.active : ''}`}
            onClick={() => onChange({ theme: 'dark' })}
          >
            🌙 Dark
          </button>
        </div>
        <p className={styles.themeNote}>
          Theme preference is passed to AI generation. Apply colour changes above for immediate effect.
        </p>
      </section>
    </div>
  );
}
