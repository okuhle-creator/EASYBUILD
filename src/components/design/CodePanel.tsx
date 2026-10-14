import React, { useState, useEffect } from 'react';
import { FileCode, Paintbrush, FileTerminal, Copy, Check, Play, Download, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { CodeTab } from '../../types';
import { downloadSingleFile } from '../../services/export';
import styles from './CodePanel.module.css';

interface CodePanelProps {
  html: string;
  css: string;
  javascript: string;
  onChange: (field: 'html' | 'css' | 'javascript', value: string) => void;
  hasProject: boolean;
}

const TABS: { id: CodeTab; label: string; icon: React.ReactNode; filename: string; mime: string }[] = [
  { id: 'html', label: 'HTML', icon: <FileCode size={12} strokeWidth={2} />, filename: 'index.html', mime: 'text/html' },
  { id: 'css', label: 'CSS', icon: <Paintbrush size={12} strokeWidth={2} />, filename: 'style.css', mime: 'text/css' },
  { id: 'javascript', label: 'JS', icon: <FileTerminal size={12} strokeWidth={2} />, filename: 'script.js', mime: 'text/javascript' },
];

export function CodePanel({ html, css, javascript, onChange, hasProject }: CodePanelProps) {
  const [activeTab, setActiveTab] = useState<CodeTab>('html');
  const [copied, setCopied] = useState(false);
  const [localCode, setLocalCode] = useState({ html, css, javascript });
  const [hasUnapplied, setHasUnapplied] = useState(false);
  const [validationMsg, setValidationMsg] = useState<{ text: string; error: boolean } | null>(null);

  // Sync incoming props if not currently modified locally
  useEffect(() => {
    setLocalCode({ html, css, javascript });
    setHasUnapplied(false);
  }, [html, css, javascript]);

  if (!hasProject) {
    return (
      <div className={styles.emptyState}>
        <p>Generate a website to view and edit its code here.</p>
      </div>
    );
  }

  const currentTabInfo = TABS.find((t) => t.id === activeTab)!;
  const currentText = localCode[activeTab];

  function handleCodeInput(value: string) {
    setLocalCode((prev) => ({ ...prev, [activeTab]: value }));
    setHasUnapplied(true);
    setValidationMsg(null);
  }

  function validateCode(type: CodeTab, code: string): string | null {
    if (!code.trim()) return null;
    if (type === 'html') {
      const openDivs = (code.match(/<div\b/gi) || []).length;
      const closeDivs = (code.match(/<\/div>/gi) || []).length;
      if (openDivs !== closeDivs) {
        return `Notice: Found ${openDivs} open <div> tags and ${closeDivs} closing </div> tags`;
      }
    } else if (type === 'css') {
      const openBraces = (code.match(/\{/g) || []).length;
      const closeBraces = (code.match(/\}/g) || []).length;
      if (openBraces !== closeBraces) {
        return `CSS Warning: Mismatched braces ({: ${openBraces}, }: ${closeBraces})`;
      }
    } else if (type === 'javascript') {
      try {
        new Function(code);
      } catch (err: any) {
        return `JS Syntax: ${err.message}`;
      }
    }
    return null;
  }

  function handleApply() {
    const error = validateCode(activeTab, currentText);
    if (error) {
      setValidationMsg({ text: error, error: true });
    } else {
      setValidationMsg({ text: 'Validated and applied to preview', error: false });
      setTimeout(() => setValidationMsg(null), 3000);
    }

    onChange(activeTab, currentText);
    setHasUnapplied(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Ctrl+S or Cmd+S to apply
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      handleApply();
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(currentText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleDownloadFile() {
    downloadSingleFile(currentText, currentTabInfo.filename, currentTabInfo.mime);
  }

  return (
    <div className={styles.panel}>
      {/* Tab bar */}
      <div className={styles.tabBar}>
        <div className={styles.tabs}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.tabActions}>
          <button
            className={styles.iconBtn}
            onClick={handleDownloadFile}
            title={`Download ${currentTabInfo.filename}`}
            aria-label={`Download ${currentTabInfo.filename}`}
          >
            <Download size={12} strokeWidth={2} />
          </button>
          <button className={styles.copyBtn} onClick={handleCopy} title="Copy to clipboard" aria-label="Copy code">
            {copied ? <Check size={12} strokeWidth={2.5} /> : <Copy size={12} strokeWidth={2} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Editor sub-bar */}
      <div className={styles.subBar}>
        <div className={styles.subStatus}>
          {hasUnapplied ? (
            <span className={styles.unappliedBadge}>• Unapplied edits</span>
          ) : (
            <span className={styles.syncedBadge}>✓ In sync</span>
          )}
        </div>
        <button
          className={`${styles.applyBtn} ${hasUnapplied ? styles.applyBtnActive : ''}`}
          onClick={handleApply}
          title="Apply edits to live preview (Ctrl+S / ⌘S)"
        >
          <Play size={11} strokeWidth={2.5} />
          Apply to Preview
        </button>
      </div>

      {/* Validation feedback */}
      {validationMsg && (
        <div className={`${styles.validationBanner} ${validationMsg.error ? styles.valWarning : styles.valSuccess}`}>
          {validationMsg.error ? <AlertCircle size={12} /> : <CheckCircle2 size={12} />}
          <span>{validationMsg.text}</span>
        </div>
      )}

      {/* Code editor */}
      <div className={styles.editorWrapper}>
        <textarea
          className={styles.editor}
          value={currentText}
          onChange={(e) => handleCodeInput(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          aria-label={`${activeTab} code editor`}
          placeholder={currentText ? '' : `No ${activeTab.toUpperCase()} generated yet.`}
        />
        {!currentText && (
          <div className={styles.editorEmpty}>
            <p>Generate a website to see the {activeTab.toUpperCase()} code here. You can edit it directly.</p>
          </div>
        )}
      </div>

      <div className={styles.editorInfo}>
        <span>{currentText.split('\n').length} lines</span>
        <span>{currentText.length} chars</span>
        <span className={styles.shortcutHint}>Ctrl+S to apply</span>
      </div>
    </div>
  );
}
