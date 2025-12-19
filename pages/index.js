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

      <div className="container">
        <div className="grain" />

        <header className="header">
          <h1 className="logo">REPURPOSE<span className="logo-accent">_</span></h1>
          <p className="tagline">Article → Viral content in seconds</p>
        </header>

        <main className="main">
          <form className="input-section" onSubmit={handleSubmit}>
            {/* URL Input */}
            <div className="field-group">
              <label className="label">ARTICLE URL</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/article"
                className="url-input"
              />
            </div>

            {/* Platform Selection */}
            <div className="field-group">
              <label className="label">PLATFORM</label>
              <div className="platform-grid">
                {PLATFORMS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlatform(p.id)}
                    className={`platform-btn ${platform === p.id ? 'active' : ''}`}
                  >
                    <span className="platform-icon">{p.icon}</span>
                    <span className="platform-label">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tone Selection */}
            <div className="field-group">
              <label className="label">TONE</label>
              <div className="tone-grid">
                {TONES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTone(t.id)}
                    className={`tone-btn ${tone === t.id ? 'active' : ''}`}
                  >
                    <span className="tone-label">{t.label}</span>
                    <span className="tone-desc">{t.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Thread Length (Twitter only) */}
            {platform === 'twitter' && (
              <div className="field-group">
                <label className="label">
                  THREAD LENGTH: <span className="length-value">{threadLength}</span>
                </label>
                <input
                  type="range"
                  min="3"
                  max="15"
                  value={threadLength}
                  onChange={(e) => setThreadLength(parseInt(e.target.value))}
                  className="slider"
                />
                <div className="slider-labels">
                  <span>3</span>
                  <span>15</span>
                </div>
              </div>
            )}

            {/* Niche (Optional) */}
            <div className="field-group">
              <label className="label">NICHE <span className="optional">(optional)</span></label>
              <input
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="e.g., SaaS founders, fitness coaches"
                className="niche-input"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`submit-btn ${loading ? 'loading' : ''}`}
            >
              {loading ? (
                <span className="loading-text">
                  <span className="spinner">◐</span> GENERATING...
                </span>
              ) : (
                'REPURPOSE →'
              )}
            </button>

            {error && <div className="error">{error}</div>}
          </form>

          {/* Output Section */}
          <section className="output-section">
            <div className="output-header">
              <label className="label">
                OUTPUT
                {meta && <span className="meta"> — {meta.title} ({meta.wordCount} words)</span>}
              </label>
              {output && (
                <button onClick={copyToClipboard} className="copy-btn">
                  {copied ? '✓ COPIED' : 'COPY'}
                </button>
              )}
            </div>
            <div className="output-box">
              {output ? (
                <pre className="output-text">{output}</pre>
              ) : (
                <div className="placeholder">
                  <span className="placeholder-icon">⚡</span>
                  <span>Your viral content will appear here</span>
                </div>
              )}
            </div>
          </section>
        </main>

        <footer className="footer">
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
      `}</style>

      <style jsx>{`
        .container {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }

        .grain {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          opacity: 0.03;
          pointer-events: none;
          z-index: 1;
        }

        .header {
          padding: 48px 24px 24px;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .logo {
          font-size: clamp(32px, 8vw, 56px);
          font-weight: 900;
          letter-spacing: -3px;
          color: #fff;
        }

        .logo-accent {
          color: #00ff88;
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          50% { opacity: 0; }
        }

        .tagline {
          font-size: 13px;
          color: #555;
          margin-top: 8px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          position: relative;
          z-index: 2;
        }

        @media (max-width: 900px) {
          .main {
            grid-template-columns: 1fr;
          }
        }

        .input-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .output-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .field-group {
          display: flex;
          flex-direction: column;
        }

        .label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #666;
          margin-bottom: 10px;
        }

        .optional {
          color: #333;
          font-weight: 400;
        }

        .meta {
          color: #444;
          font-weight: 400;
          letter-spacing: 0;
          text-transform: none;
        }

        .url-input,
        .niche-input {
          width: 100%;
          padding: 14px 18px;
          font-size: 15px;
          font-family: inherit;
          background: #111;
          border: 2px solid #222;
          border-radius: 6px;
          color: #fff;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .url-input:focus,
        .niche-input:focus {
          border-color: #00ff88;
          box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.1);
        }

        .url-input::placeholder,
        .niche-input::placeholder {
          color: #444;
        }

        .platform-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .platform-btn {
          padding: 16px 12px;
          background: #111;
          border: 2px solid #222;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          font-family: inherit;
        }

        .platform-btn:hover {
          border-color: #333;
          background: #151515;
        }

        .platform-btn.active {
          border-color: #00ff88;
          background: #0a1a10;
        }

        .platform-icon {
          font-size: 22px;
          font-weight: 700;
          color: #fff;
        }

        .platform-label {
          font-size: 10px;
          color: #666;
          letter-spacing: 0.5px;
        }

        .tone-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        .tone-btn {
          padding: 14px 16px;
          background: #111;
          border: 2px solid #222;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 3px;
          font-family: inherit;
        }

        .tone-btn:hover {
          border-color: #333;
          background: #151515;
        }

        .tone-btn.active {
          border-color: #00ff88;
          background: #0a1a10;
        }

        .tone-label {
          font-size: 13px;
          font-weight: 600;
          color: #fff;
        }

        .tone-desc {
          font-size: 10px;
          color: #555;
        }

        .length-value {
          color: #00ff88;
          font-weight: 700;
        }

        .slider {
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: #222;
          outline: none;
          cursor: pointer;
          -webkit-appearance: none;
          appearance: none;
        }

        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #00ff88;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(0, 255, 136, 0.4);
        }

        .slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #00ff88;
          cursor: pointer;
          border: none;
        }

        .slider-labels {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          color: #444;
          margin-top: 6px;
        }

        .submit-btn {
          padding: 18px 32px;
          font-size: 14px;
          font-weight: 700;
          font-family: inherit;
          letter-spacing: 1px;
          background: #00ff88;
          color: #000;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 8px;
        }

        .submit-btn:hover {
          background: #00cc6a;
          transform: translateY(-1px);
        }

        .submit-btn.loading {
          background: #222;
          color: #666;
          cursor: not-allowed;
          transform: none;
        }

        .loading-text {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .spinner {
          display: inline-block;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .error {
          padding: 14px 18px;
          background: #1a0808;
          border: 1px solid #441111;
          border-radius: 6px;
          color: #ff6666;
          font-size: 13px;
        }

        .output-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .copy-btn {
          padding: 8px 14px;
          font-size: 11px;
          font-weight: 600;
          font-family: inherit;
          letter-spacing: 1px;
          background: transparent;
          color: #00ff88;
          border: 1px solid #00ff88;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .copy-btn:hover {
          background: #00ff88;
          color: #000;
        }

        .output-box {
          flex: 1;
          min-height: 500px;
          padding: 24px;
          background: #0c0c0c;
          border: 2px solid #181818;
          border-radius: 6px;
          overflow: auto;
        }

        .output-text {
          margin: 0;
          font-size: 14px;
          line-height: 1.8;
          white-space: pre-wrap;
          word-break: break-word;
          font-family: inherit;
          color: #ccc;
        }

        .placeholder {
          height: 100%;
          min-height: 450px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          color: #2a2a2a;
          font-size: 14px;
        }

        .placeholder-icon {
          font-size: 56px;
          opacity: 0.5;
        }

        .footer {
          padding: 48px 24px;
          text-align: center;
          font-size: 12px;
          color: #2a2a2a;
          letter-spacing: 1px;
          position: relative;
          z-index: 2;
        }
      `}</style>
    </>
  );
}
