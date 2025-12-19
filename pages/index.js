import { useState } from 'react';
import Head from 'next/head';

const PLATFORMS = [
  { id: 'twitter', label: 'Twitter/X', icon: '𝕏' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'in' },
  { id: 'threads', label: 'Threads', icon: '@' },
];

const TONES = [
  { id: 'professional', label: 'Professional', desc: 'Credible & polished' },
  { id: 'casual', label: 'Casual', desc: 'Friendly & relaxed' },
  { id: 'provocative', label: 'Provocative', desc: 'Bold & challenging' },
  { id: 'educational', label: 'Educational', desc: 'Clear & instructive' },
];

export default function Home() {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState('twitter');
  const [tone, setTone] = useState('professional');
  const [threadLength, setThreadLength] = useState(5);
  const [niche, setNiche] = useState('');
  const [output, setOutput] = useState('');
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Enter a URL to repurpose');
      return;
    }

    setLoading(true);
    setError('');
    setOutput('');
    setMeta(null);

    try {
      const response = await fetch('/api/repurpose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, platform, tone, threadLength, niche }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate content');
      }

      setOutput(data.output);
      setMeta(data.meta);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Head>
        <title>REPURPOSE_ | Article to Viral Content</title>
        <meta name="description" content="Transform any article into viral social media content" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.logo}>REPURPOSE<span style={styles.logoAccent}>_</span></h1>
          <p style={styles.tagline}>Article → Viral content in seconds</p>
        </header>

        <main style={styles.main}>
          <form style={styles.inputSection} onSubmit={handleSubmit}>
            {/* URL Input */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>ARTICLE URL</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/article"
                style={styles.urlInput}
              />
            </div>

            {/* Platform Selection */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>PLATFORM</label>
              <div style={styles.platformGrid}>
                {PLATFORMS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlatform(p.id)}
                    style={{
                      ...styles.platformBtn,
                      ...(platform === p.id ? styles.platformBtnActive : {}),
                    }}
                  >
                    <span style={styles.platformIcon}>{p.icon}</span>
                    <span style={styles.platformLabel}>{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tone Selection */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>TONE</label>
              <div style={styles.toneGrid}>
                {TONES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTone(t.id)}
                    style={{
                      ...styles.toneBtn,
                      ...(tone === t.id ? styles.toneBtnActive : {}),
                    }}
                  >
                    <span style={styles.toneLabel}>{t.label}</span>
                    <span style={styles.toneDesc}>{t.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Thread Length (Twitter only) */}
            {platform === 'twitter' && (
              <div style={styles.fieldGroup}>
                <label style={styles.label}>
                  THREAD LENGTH: <span style={styles.lengthValue}>{threadLength}</span>
                </label>
                <input
                  type="range"
                  min="3"
                  max="15"
                  value={threadLength}
                  onChange={(e) => setThreadLength(parseInt(e.target.value))}
                  style={styles.slider}
                />
                <div style={styles.sliderLabels}>
                  <span>3</span>
                  <span>15</span>
                </div>
              </div>
            )}

            {/* Niche (Optional) */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>NICHE <span style={styles.optional}>(optional)</span></label>
              <input
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="e.g., SaaS founders, fitness coaches"
                style={styles.nicheInput}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.submitBtn,
                ...(loading ? styles.submitBtnLoading : {}),
              }}
            >
              {loading ? 'GENERATING...' : 'REPURPOSE →'}
            </button>

            {error && <div style={styles.error}>{error}</div>}
          </form>

          {/* Output Section */}
          <section style={styles.outputSection}>
            <div style={styles.outputHeader}>
              <label style={styles.label}>
                OUTPUT
                {meta && <span style={styles.meta}> — {meta.title}</span>}
              </label>
              {output && (
                <button onClick={copyToClipboard} style={styles.copyBtn}>
                  {copied ? '✓ COPIED' : 'COPY'}
                </button>
              )}
            </div>
            <div style={styles.outputBox}>
              {output ? (
                <pre style={styles.outputText}>{output}</pre>
              ) : (
                <div style={styles.placeholder}>
                  <span style={styles.placeholderIcon}>⚡</span>
                  <span>Your viral content will appear here</span>
                </div>
              )}
            </div>
          </section>
        </main>

        <footer style={styles.footer}>
          <span>Built for speed. Ship it.</span>
        </footer>
      </div>

      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          background: #0a0a0a;
          color: #e5e5e5;
          font-family: 'JetBrains Mono', 'SF Mono', 'Consolas', monospace;
        }
        ::selection {
          background: #00ff88;
          color: #000;
        }
        @media (max-width: 900px) {
          main {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#0a0a0a',
    position: 'relative',
  },
  header: {
    padding: '48px 24px 24px',
    textAlign: 'center',
  },
  logo: {
    fontSize: '48px',
    fontWeight: 900,
    letterSpacing: '-3px',
    color: '#fff',
    margin: 0,
    fontFamily: "'JetBrains Mono', monospace",
  },
  logoAccent: {
    color: '#00ff88',
  },
  tagline: {
    fontSize: '13px',
    color: '#555',
    marginTop: '8px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    fontFamily: "'JetBrains Mono', monospace",
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '32px',
  },
  inputSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  outputSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '1.5px',
    color: '#666',
    marginBottom: '10px',
    fontFamily: "'JetBrains Mono', monospace",
  },
  optional: {
    color: '#333',
    fontWeight: 400,
  },
  meta: {
    color: '#444',
    fontWeight: 400,
    letterSpacing: 0,
    textTransform: 'none',
  },
  urlInput: {
    width: '100%',
    padding: '14px 18px',
    fontSize: '15px',
    fontFamily: "'JetBrains Mono', monospace",
    background: '#111',
    border: '2px solid #222',
    borderRadius: '6px',
    color: '#fff',
    outline: 'none',
  },
  nicheInput: {
    width: '100%',
    padding: '14px 18px',
    fontSize: '14px',
    fontFamily: "'JetBrains Mono', monospace",
    background: '#111',
    border: '2px solid #222',
    borderRadius: '6px',
    color: '#fff',
    outline: 'none',
  },
  platformGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
  },
  platformBtn: {
    padding: '16px 12px',
    background: '#111',
    border: '2px solid #222',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    fontFamily: "'JetBrains Mono', monospace",
  },
  platformBtnActive: {
    borderColor: '#00ff88',
    background: '#0a1a10',
  },
  platformIcon: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#fff',
  },
  platformLabel: {
    fontSize: '10px',
    color: '#666',
    letterSpacing: '0.5px',
  },
  toneGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
  },
  toneBtn: {
    padding: '14px 16px',
    background: '#111',
    border: '2px solid #222',
    borderRadius: '6px',
    cursor: 'pointer',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
    fontFamily: "'JetBrains Mono', monospace",
  },
  toneBtnActive: {
    borderColor: '#00ff88',
    background: '#0a1a10',
  },
  toneLabel: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#fff',
  },
  toneDesc: {
    fontSize: '10px',
    color: '#555',
  },
  lengthValue: {
    color: '#00ff88',
    fontWeight: 700,
  },
  slider: {
    width: '100%',
    height: '6px',
    borderRadius: '3px',
    background: '#222',
    outline: 'none',
    cursor: 'pointer',
    accentColor: '#00ff88',
  },
  sliderLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '10px',
    color: '#444',
    marginTop: '6px',
    fontFamily: "'JetBrains Mono', monospace",
  },
  submitBtn: {
    padding: '18px 32px',
    fontSize: '14px',
    fontWeight: 700,
    fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: '1px',
    background: '#00ff88',
    color: '#000',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '8px',
  },
  submitBtnLoading: {
    background: '#222',
    color: '#666',
    cursor: 'not-allowed',
  },
  error: {
    padding: '14px 18px',
    background: '#1a0808',
    border: '1px solid #441111',
    borderRadius: '6px',
    color: '#ff6666',
    fontSize: '13px',
    fontFamily: "'JetBrains Mono', monospace",
  },
  outputHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  copyBtn: {
    padding: '8px 14px',
    fontSize: '11px',
    fontWeight: 600,
    fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: '1px',
    background: 'transparent',
    color: '#00ff88',
    border: '1px solid #00ff88',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  outputBox: {
    flex: 1,
    minHeight: '500px',
    padding: '24px',
    background: '#0c0c0c',
    border: '2px solid #181818',
    borderRadius: '6px',
    overflow: 'auto',
  },
  outputText: {
    margin: 0,
    fontSize: '14px',
    lineHeight: 1.8,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    fontFamily: "'JetBrains Mono', monospace",
    color: '#ccc',
  },
  placeholder: {
    height: '100%',
    minHeight: '450px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    color: '#2a2a2a',
    fontSize: '14px',
    fontFamily: "'JetBrains Mono', monospace",
  },
  placeholderIcon: {
    fontSize: '56px',
    opacity: 0.5,
  },
  footer: {
    padding: '48px 24px',
    textAlign: 'center',
    fontSize: '12px',
    color: '#2a2a2a',
    letterSpacing: '1px',
    fontFamily: "'JetBrains Mono', monospace",
  },
};
