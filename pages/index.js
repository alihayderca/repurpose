import { useState, useEffect } from 'react';
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
  // Auth state
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Form state
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState('twitter');
  const [tone, setTone] = useState('professional');
  const [threadLength, setThreadLength] = useState(5);
  const [niche, setNiche] = useState('');
  const [output, setOutput] = useState('');
  const [meta, setMeta] = useState(null);
  const [usage, setUsage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Check for existing session on load
  useEffect(() => {
    const savedEmail = localStorage.getItem('repurpose_email');
    const savedPro = localStorage.getItem('repurpose_pro');
    
    if (savedEmail) {
      setEmail(savedEmail);
      setIsLoggedIn(true);
      
      if (savedPro === 'true') {
        setIsPro(true);
        setCheckingAuth(false);
      } else {
        // Verify subscription status with Stripe
        checkSubscription(savedEmail);
      }
    } else {
      setCheckingAuth(false);
    }
  }, []);

  const checkSubscription = async (userEmail) => {
    try {
      const response = await fetch('/api/check-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail }),
      });
      const data = await response.json();
      setIsPro(data.isPro);
      if (data.isPro) {
        localStorage.setItem('repurpose_pro', 'true');
      }
    } catch (err) {
      console.error('Failed to check subscription:', err);
    } finally {
      setCheckingAuth(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Enter a valid email');
      return;
    }
    localStorage.setItem('repurpose_email', email);
    setIsLoggedIn(true);
    setError('');
    checkSubscription(email);
  };

  const handleLogout = () => {
    localStorage.removeItem('repurpose_email');
    localStorage.removeItem('repurpose_pro');
    setEmail('');
    setIsLoggedIn(false);
    setIsPro(false);
    setOutput('');
    setUsage(null);
  };

  const handleUpgrade = async () => {
    setCheckoutLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Failed to start checkout');
      }
    } catch (err) {
      setError('Failed to start checkout');
    } finally {
      setCheckoutLoading(false);
    }
  };

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
        body: JSON.stringify({ url, platform, tone, threadLength, niche, email, isPro }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.limitReached) {
          setUsage({ used: data.usage, limit: data.limit, remaining: 0 });
        }
        throw new Error(data.error || 'Failed to generate content');
      }

      setOutput(data.output);
      setMeta(data.meta);
      if (data.usage) {
        setUsage(data.usage);
      }
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

  // Show loading while checking auth
  if (checkingAuth) {
    return (
      <>
        <Head>
          <title>REPURPOSE_</title>
          <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        </Head>
        <div style={{ ...styles.container, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: '#444', fontFamily: "'JetBrains Mono', monospace" }}>Loading...</p>
        </div>
      </>
    );
  }

  // Show login screen if not logged in
  if (!isLoggedIn) {
    return (
      <>
        <Head>
          <title>REPURPOSE_ | Article to Viral Content</title>
          <meta name="description" content="Transform any article into viral social media content" />
          <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        </Head>

        <div style={styles.container}>
          <div style={styles.loginWrapper}>
            <h1 style={styles.logo}>REPURPOSE<span style={styles.logoAccent}>_</span></h1>
            <p style={styles.tagline}>Article → Viral content in seconds</p>
            
            <form onSubmit={handleLogin} style={styles.loginForm}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={styles.urlInput}
              />
              <button type="submit" style={styles.submitBtn}>
                GET STARTED →
              </button>
            </form>
            
            {error && <div style={styles.error}>{error}</div>}
            
            <div style={styles.pricing}>
              <div style={styles.pricingCard}>
                <h3 style={styles.pricingTitle}>Free</h3>
                <p style={styles.pricingPrice}>$0</p>
                <p style={styles.pricingFeature}>3 generations / day</p>
              </div>
              <div style={{ ...styles.pricingCard, ...styles.pricingCardPro }}>
                <h3 style={styles.pricingTitle}>Pro</h3>
                <p style={styles.pricingPrice}>$9<span style={styles.pricingPeriod}>/mo</span></p>
                <p style={styles.pricingFeature}>Unlimited generations</p>
              </div>
            </div>
          </div>
        </div>

        <style jsx global>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: #0a0a0a; font-family: 'JetBrains Mono', monospace; }
        `}</style>
      </>
    );
  }

  // Main app (logged in)
  return (
    <>
      <Head>
        <title>REPURPOSE_ | Article to Viral Content</title>
        <meta name="description" content="Transform any article into viral social media content" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <div style={styles.container}>
        {/* Header with user info */}
        <header style={styles.header}>
          <div style={styles.headerTop}>
            <h1 style={styles.logoSmall}>REPURPOSE<span style={styles.logoAccent}>_</span></h1>
            <div style={styles.userInfo}>
              {isPro && <span style={styles.proBadge}>PRO</span>}
              <span style={styles.userEmail}>{email}</span>
              <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
            </div>
          </div>
          
          {/* Usage indicator for free users */}
          {!isPro && (
            <div style={styles.usageBar}>
              <span style={styles.usageText}>
                {usage ? `${usage.used}/${usage.limit} free generations today` : '3 free generations / day'}
              </span>
              <button onClick={handleUpgrade} disabled={checkoutLoading} style={styles.upgradeBtn}>
                {checkoutLoading ? 'Loading...' : 'Upgrade to Pro →'}
              </button>
            </div>
          )}
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
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0a; color: #e5e5e5; font-family: 'JetBrains Mono', monospace; }
        ::selection { background: #00ff88; color: #000; }
        @media (max-width: 900px) {
          main { grid-template-columns: 1fr !important; }
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
  // Login styles
  loginWrapper: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  },
  loginForm: {
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '32px',
  },
  pricing: {
    display: 'flex',
    gap: '16px',
    marginTop: '48px',
  },
  pricingCard: {
    padding: '24px',
    background: '#111',
    border: '2px solid #222',
    borderRadius: '8px',
    textAlign: 'center',
    width: '160px',
  },
  pricingCardPro: {
    borderColor: '#00ff88',
    background: '#0a1a10',
  },
  pricingTitle: {
    fontSize: '14px',
    color: '#888',
    marginBottom: '8px',
    fontWeight: 600,
  },
  pricingPrice: {
    fontSize: '32px',
    fontWeight: 800,
    color: '#fff',
  },
  pricingPeriod: {
    fontSize: '14px',
    color: '#666',
    fontWeight: 400,
  },
  pricingFeature: {
    fontSize: '11px',
    color: '#555',
    marginTop: '8px',
  },
  // Header styles
  header: {
    padding: '16px 24px',
    borderBottom: '1px solid #151515',
  },
  headerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoSmall: {
    fontSize: '24px',
    fontWeight: 900,
    letterSpacing: '-2px',
    color: '#fff',
    margin: 0,
    fontFamily: "'JetBrains Mono', monospace",
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  proBadge: {
    padding: '4px 8px',
    background: '#00ff88',
    color: '#000',
    fontSize: '10px',
    fontWeight: 700,
    borderRadius: '4px',
    letterSpacing: '1px',
  },
  userEmail: {
    fontSize: '13px',
    color: '#666',
  },
  logoutBtn: {
    padding: '6px 12px',
    background: 'transparent',
    border: '1px solid #333',
    borderRadius: '4px',
    color: '#666',
    fontSize: '11px',
    cursor: 'pointer',
    fontFamily: "'JetBrains Mono', monospace",
  },
  usageBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '12px',
    padding: '12px 16px',
    background: '#111',
    borderRadius: '6px',
  },
  usageText: {
    fontSize: '12px',
    color: '#666',
  },
  upgradeBtn: {
    padding: '8px 16px',
    background: '#00ff88',
    color: '#000',
    border: 'none',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: "'JetBrains Mono', monospace",
  },
  // Rest of styles
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
