import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, AlertCircle, RefreshCw, Zap, Cpu } from 'lucide-react';
import type { ChatMessage } from '../../types';
import styles from './ChatPanel.module.css';

interface ChatPanelProps {
  messages: ChatMessage[];
  isGenerating: boolean;
  error: string | null;
  mode: 'demo' | 'api';
  onModeChange: (mode: 'demo' | 'api') => void;
  onSend: (message: string) => void;
  onClearError: () => void;
  hasProject: boolean;
}

const EXAMPLE_PROMPTS = [
  { label: 'Portfolio', text: 'A portfolio for a UX designer with a hero, selected projects, about section and contact form' },
  { label: 'Startup', text: 'A SaaS landing page for a project management tool with features, pricing and testimonials' },
  { label: 'Store', text: 'An online store for artisan coffee with product showcase, story section and newsletter signup' },
  { label: 'Personal', text: 'A minimal personal website for a writer with a bio, recent articles and links' },
];

export function ChatPanel({
  messages, isGenerating, error, mode, onModeChange, onSend, onClearError, hasProject
}: ChatPanelProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!input.trim() || isGenerating) return;
    onSend(input.trim());
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  function handleTextareaInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }

  return (
    <div className={styles.panel}>
      {/* Panel header */}
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>Conversation</h2>
        <div className={styles.modeSelector}>
          <button
            className={`${styles.modeBtn} ${mode === 'demo' ? styles.active : ''}`}
            onClick={() => onModeChange('demo')}
            title="Demo mode — no API key required"
          >
            <Zap size={12} strokeWidth={2} />
            Demo
          </button>
          <button
            className={`${styles.modeBtn} ${mode === 'api' ? styles.active : ''}`}
            onClick={() => onModeChange('api')}
            title="API mode — uses your AI provider"
          >
            <Cpu size={12} strokeWidth={2} />
            API
          </button>
        </div>
      </div>

      {/* Mode notice */}
      {mode === 'demo' && (
        <div className={styles.modeNotice}>
          <Zap size={12} strokeWidth={2} />
          Demo mode — loads polished example sites. Add an API key for real AI generation.
        </div>
      )}

      {/* Messages area */}
      <div className={styles.messages}>
        {messages.length === 0 && (
          <div className={styles.welcome}>
            <div className={styles.welcomeIcon}>
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="7" fill="#1E3A5F"/>
                <path d="M8 10h10M8 16h16M8 22h12" stroke="#4A90D9" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className={styles.welcomeTitle}>What would you like to build?</h3>
            <p className={styles.welcomeDesc}>
              Describe a website and I'll generate it for you. You can refine it through conversation.
            </p>
            <div className={styles.examplePrompts}>
              {EXAMPLE_PROMPTS.map((p) => (
                <button
                  key={p.label}
                  className={styles.examplePrompt}
                  onClick={() => setInput(p.text)}
                >
                  <span className={styles.exampleLabel}>{p.label}</span>
                  <span className={styles.exampleText}>{p.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {error && (
          <div className={styles.errorBanner}>
            <AlertCircle size={14} strokeWidth={2} />
            <span>{error}</span>
            <button className={styles.retryBtn} onClick={onClearError}>
              <RefreshCw size={12} strokeWidth={2} />
              Dismiss
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Composer */}
      <form className={styles.composer} onSubmit={handleSubmit}>
        <div className={styles.composerInner}>
          <textarea
            ref={textareaRef}
            className={styles.composerTextarea}
            value={input}
            onChange={handleTextareaInput}
            onKeyDown={handleKeyDown}
            placeholder={
              hasProject
                ? 'Ask for changes...'
                : 'Describe your website...'
            }
            rows={1}
            disabled={isGenerating}
            aria-label="Message input"
          />
          <button
            type="submit"
            className={styles.sendBtn}
            disabled={!input.trim() || isGenerating}
            aria-label="Send message"
          >
            {isGenerating ? (
              <Loader2 size={16} strokeWidth={2} className={styles.spinning} />
            ) : (
              <Send size={16} strokeWidth={2} />
            )}
          </button>
        </div>
        <p className={styles.composerHint}>
          {isGenerating ? 'Generating your website…' : 'Enter ↵ to send · Shift+Enter for new line'}
        </p>
      </form>
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';
  const isError = message.status === 'error';

  return (
    <div className={`${styles.message} ${isUser ? styles.userMessage : styles.assistantMessage}`}>
      {!isUser && (
        <div className={styles.avatar}>
          <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="6" fill="#1E3A5F"/>
            <path d="M8 10h10M8 16h16M8 22h12" stroke="#4A90D9" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>
      )}
      <div className={`${styles.bubble} ${isUser ? styles.userBubble : styles.assistantBubble} ${isError ? styles.errorBubble : ''}`}>
        {message.isGenerating ? (
          <div className={styles.typingIndicator}>
            <span/><span/><span/>
          </div>
        ) : (
          <p>{message.content}</p>
        )}
      </div>
    </div>
  );
}
