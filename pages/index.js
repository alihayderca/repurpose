import { useState } from 'react';
import Head from 'next/head';
import { SignIn, SignUp, useUser, useClerk, SignedIn, SignedOut } from '@clerk/nextjs';

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

// Landing page for signed out users
function LandingPage() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  if (showSignIn) {
    return (
      <div style={styles.container}>
        <div style={styles.authPage}>
          <SignIn routing="hash" afterSignInUrl="/" />
          <button onClick={() => setShowSignIn(false)} style={styles.backBtn}>
            ← Back to home
          </button>
        </div>
        <style jsx global>{globalStyles}</style>
      </div>
    );
  }

  if (showSignUp) {
    return (
      <div style={styles.container}>
        <div style={styles.authPage}>
          <SignUp routing="hash" afterSignUpUrl="/" />
          <button onClick={() => setShowSignUp(false)} style={styles.backBtn}>
            ← Back to home
          </button>
        </div>
        <style jsx global>{globalStyles}</style>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Navigation */}
      <nav style={styles.nav}>
        <span style={styles.navLogo}>REPURPOSE<span style={styles.logoAccent}>_</span></span>
        <button onClick={() => setShowSignIn(true)} style={styles.navSignIn}>Sign In</button>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.badge}>🚀 Used by 500+ creators</div>
          <h1 style={styles.heroTitle}>
            Turn any article into<br />
            <span style={styles.heroHighlight}>viral social content</span><br />
            in 10 seconds
          </h1>
          <p style={styles.heroSubtitle}>
            Paste a URL. Pick a platform. Get a Twitter thread, LinkedIn post, 
            or Threads content that's ready to post — written in the style that goes viral.
          </p>
          <div style={styles.heroCta}>
            <button onClick={() => setShowSignUp(true)} style={styles.primaryBtn}>
              Start Free → 3 posts/day
            </button>
            <p style={styles.heroNote}>No credit card required</p>
          </div>
        </div>
        
        {/* Demo Preview */}
        <div style={styles.demoBox}>
          <div style={styles.demoHeader}>
            <span style={styles.demoDot}></span>
            <span style={styles.demoDot}></span>
            <span style={styles.demoDot}></span>
          </div>
          <div style={styles.demoContent}>
            <div style={styles.demoInput}>
              <span style={styles.demoLabel}>URL</span>
              <span style={styles.demoUrl}>paulgraham.com/startupideas.html</span>
            </div>
            <div style={styles.demoOutput}>
              <span style={styles.demoLabel}>OUTPUT</span>
              <pre style={styles.demoText}>{`1/ Stop trying to "think up" startup ideas.

The biggest mistake founders make?
Solving problems that don't exist.

Here's what actually works: 🧵

2/ The best startup ideas have 3 things:
→ Something YOU want
→ Something YOU can build
→ Something few others see

Microsoft, Apple, Google all started this way...`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section style={styles.socialProof}>
        <p style={styles.socialProofText}>
          "Saved me 2 hours a day on content creation" — <span style={styles.socialProofName}>@sarahbuilds</span>
        </p>
      </section>

      {/* How It Works */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>How it works</h2>
        <div style={styles.steps}>
          <div style={styles.step}>
            <div style={styles.stepNumber}>1</div>
            <h3 style={styles.stepTitle}>Paste any URL</h3>
            <p style={styles.stepDesc}>Blog post, newsletter, article — we extract the content automatically</p>
          </div>
          <div style={styles.step}>
            <div style={styles.stepNumber}>2</div>
            <h3 style={styles.stepTitle}>Pick your platform</h3>
            <p style={styles.stepDesc}>Twitter thread, LinkedIn post, or Threads — each optimized for that platform</p>
          </div>
          <div style={styles.step}>
            <div style={styles.stepNumber}>3</div>
            <h3 style={styles.stepTitle}>Copy & post</h3>
            <p style={styles.stepDesc}>Get viral-style content in seconds. Edit if you want, or post as-is</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Why creators choose us</h2>
        <div style={styles.features}>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>⚡</div>
            <h3 style={styles.featureTitle}>10 second generation</h3>
            <p style={styles.featureDesc}>Not minutes. Seconds. Paste, click, done.</p>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>🎯</div>
            <h3 style={styles.featureTitle}>Platform-native formats</h3>
            <p style={styles.featureDesc}>Twitter threads with hooks. LinkedIn posts that beat the algorithm. Threads that feel authentic.</p>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>🔥</div>
            <h3 style={styles.featureTitle}>Viral writing style</h3>
            <p style={styles.featureDesc}>Pattern interrupts, curiosity gaps, and CTAs — the stuff that actually gets engagement.</p>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>🎨</div>
            <h3 style={styles.featureTitle}>4 tone options</h3>
            <p style={styles.featureDesc}>Professional, casual, provocative, or educational — match your brand voice.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={styles.section} id="pricing">
        <h2 style={styles.sectionTitle}>Simple pricing</h2>
        <div style={styles.pricingGrid}>
          <div style={styles.pricingCard}>
            <h3 style={styles.pricingName}>Free</h3>
            <div style={styles.pricingPrice}>$0</div>
            <p style={styles.pricingPeriod}>forever</p>
            <ul style={styles.pricingFeatures}>
              <li style={styles.pricingFeature}>✓ 3 generations per day</li>
              <li style={styles.pricingFeature}>✓ All platforms</li>
              <li style={styles.pricingFeature}>✓ All tones</li>
            </ul>
            <button onClick={() => setShowSignUp(true)} style={styles.pricingBtn}>
              Get Started
            </button>
          </div>
          <div style={styles.pricingCardPro}>
            <div style={styles.popularBadge}>MOST POPULAR</div>
            <h3 style={styles.pricingName}>Pro</h3>
            <div style={styles.pricingPrice}>$9</div>
            <p style={styles.pricingPeriod}>per month</p>
            <ul style={styles.pricingFeatures}>
              <li style={styles.pricingFeature}>✓ Unlimited generations</li>
              <li style={styles.pricingFeature}>✓ All platforms</li>
              <li style={styles.pricingFeature}>✓ All tones</li>
              <li style={styles.pricingFeature}>✓ Priority support</li>
            </ul>
            <button onClick={() => setShowSignUp(true)} style={styles.pricingBtnPro}>
              Start Free, Upgrade Later
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Questions</h2>
        <div style={styles.faq}>
          <div style={styles.faqItem}>
            <h3 style={styles.faqQuestion}>What URLs work?</h3>
            <p style={styles.faqAnswer}>Any public blog post, article, or newsletter. Medium, Substack, company blogs, news sites — if it's on the web, we can read it.</p>
          </div>
          <div style={styles.faqItem}>
            <h3 style={styles.faqQuestion}>Can I edit the output?</h3>
            <p style={styles.faqAnswer}>Yes. Copy it, tweak it, make it yours. The output is a starting point — most people post as-is, but you can always customize.</p>
          </div>
          <div style={styles.faqItem}>
            <h3 style={styles.faqQuestion}>Is the content unique?</h3>
            <p style={styles.faqAnswer}>Every generation is unique. We use AI to transform the source content into original social posts, not copy-paste.</p>
          </div>
          <div style={styles.faqItem}>
            <h3 style={styles.faqQuestion}>Can I cancel anytime?</h3>
            <p style={styles.faqAnswer}>Yes. Cancel with one click. No contracts, no questions.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={styles.finalCta}>
        <h2 style={styles.finalCtaTitle}>Stop spending hours on content</h2>
        <p style={styles.finalCtaSubtitle}>Join 500+ creators who repurpose smarter</p>
        <button onClick={() => setShowSignUp(true)} style={styles.primaryBtn}>
          Start Free →
        </button>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerLinks}>
          <a href="/privacy" style={styles.footerLink}>Privacy Policy</a>
          <a href="/terms" style={styles.footerLink}>Terms of Service</a>
        </div>
        <p style={styles.footerCopy}>© 2025 Repurpose. All rights reserved.</p>
      </footer>

      <style jsx global>{globalStyles}</style>
    </div>
  );
}

// Dashboard (same as before)
function Dashboard() {
  const { user } = useUser();
  const { signOut } = useClerk();
  
  const [isPro, setIsPro] = useState(false);
  const [checkingPro, setCheckingPro] = useState(true);
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

  const email = user?.primaryEmailAddress?.emailAddress;

  useState(() => {
    if (email) {
      fetch('/api/check-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
        .then(res => res.json())
        .then(data => {
          setIsPro(data.isPro);
          setCheckingPro(false);
        })
        .catch(() => setCheckingPro(false));
    } else {
      setCheckingPro(false);
    }
  }, [email]);

  const handleUpgrade = async () => {
    setCheckoutLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.url) window.location.href = data.url;
      else setError(data.error || 'Failed to start checkout');
    } catch (err) {
      setError('Failed to start checkout');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) { setError('Enter a URL to repurpose'); return; }

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
        if (data.limitReached) setUsage({ used: data.usage, limit: data.limit, remaining: 0 });
        throw new Error(data.error || 'Failed to generate content');
      }
      setOutput(data.output);
      setMeta(data.meta);
      if (data.usage) setUsage(data.usage);
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

  if (checkingPro) {
    return (
      <div style={{ ...styles.container, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#444', fontFamily: "'JetBrains Mono', monospace" }}>Loading...</p>
        <style jsx global>{globalStyles}</style>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.dashHeader}>
        <div style={styles.dashHeaderTop}>
          <h1 style={styles.dashLogo}>REPURPOSE<span style={styles.logoAccent}>_</span></h1>
          <div style={styles.userInfo}>
            {isPro && <span style={styles.proBadge}>PRO</span>}
            <span style={styles.userEmail}>{email}</span>
            <button onClick={() => signOut()} style={styles.logoutBtn}>Logout</button>
          </div>
        </div>
        {!isPro && (
          <div style={styles.usageBar}>
            <span style={styles.usageText}>
              {usage ? `${usage.used}/${usage.limit} free generations today` : '3 free generations / day'}
            </span>
            <button onClick={handleUpgrade} disabled={checkoutLoading} style={styles.upgradeBtn}>
              {checkoutLoading ? 'Loading...' : 'Upgrade to Pro — $9/mo'}
            </button>
          </div>
        )}
      </header>

      <main style={styles.dashMain}>
        <form style={styles.inputSection} onSubmit={handleSubmit}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>ARTICLE URL</label>
            <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/article" style={styles.input} />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>PLATFORM</label>
            <div style={styles.platformGrid}>
              {PLATFORMS.map((p) => (
                <button key={p.id} type="button" onClick={() => setPlatform(p.id)} style={{ ...styles.platformBtn, ...(platform === p.id ? styles.platformBtnActive : {}) }}>
                  <span style={styles.platformIcon}>{p.icon}</span>
                  <span style={styles.platformLabel}>{p.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>TONE</label>
            <div style={styles.toneGrid}>
              {TONES.map((t) => (
                <button key={t.id} type="button" onClick={() => setTone(t.id)} style={{ ...styles.toneBtn, ...(tone === t.id ? styles.toneBtnActive : {}) }}>
                  <span style={styles.toneLabel}>{t.label}</span>
                  <span style={styles.toneDesc}>{t.desc}</span>
                </button>
              ))}
            </div>
          </div>
          {platform === 'twitter' && (
            <div style={styles.fieldGroup}>
              <label style={styles.label}>THREAD LENGTH: <span style={styles.lengthValue}>{threadLength}</span></label>
              <input type="range" min="3" max="15" value={threadLength} onChange={(e) => setThreadLength(parseInt(e.target.value))} style={styles.slider} />
            </div>
          )}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>NICHE <span style={styles.optional}>(optional)</span></label>
            <input type="text" value={niche} onChange={(e) => setNiche(e.target.value)} placeholder="e.g., SaaS founders, fitness coaches" style={styles.input} />
          </div>
          <button type="submit" disabled={loading} style={{ ...styles.submitBtn, ...(loading ? styles.submitBtnLoading : {}) }}>
            {loading ? 'GENERATING...' : 'REPURPOSE →'}
          </button>
          {error && <div style={styles.error}>{error}</div>}
        </form>

        <section style={styles.outputSection}>
          <div style={styles.outputHeader}>
            <label style={styles.label}>OUTPUT {meta && <span style={styles.meta}>— {meta.title}</span>}</label>
            {output && <button onClick={copyToClipboard} style={styles.copyBtn}>{copied ? '✓ COPIED' : 'COPY'}</button>}
          </div>
          <div style={styles.outputBox}>
            {output ? <pre style={styles.outputText}>{output}</pre> : (
              <div style={styles.placeholder}>
                <span style={styles.placeholderIcon}>⚡</span>
                <span>Your viral content will appear here</span>
              </div>
            )}
          </div>
        </section>
      </main>
      <style jsx global>{globalStyles}</style>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Repurpose AI — Turn Articles into Viral Social Content</title>
        <meta name="description" content="Transform any article into viral Twitter threads, LinkedIn posts, and Threads content in 10 seconds. Free to start." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <SignedOut><LandingPage /></SignedOut>
      <SignedIn><Dashboard /></SignedIn>
    </>
  );
}

const globalStyles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0a0a; color: #e5e5e5; font-family: 'Inter', -apple-system, sans-serif; }
  ::selection { background: #00ff88; color: #000; }
  @media (max-width: 900px) {
    .hero-grid { grid-template-columns: 1fr !important; }
  }
`;

const styles = {
  container: { minHeight: '100vh', background: '#0a0a0a' },
  
  // Nav
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', maxWidth: '1200px', margin: '0 auto' },
  navLogo: { fontSize: '24px', fontWeight: 800, color: '#fff', fontFamily: "'JetBrains Mono', monospace" },
  logoAccent: { color: '#00ff88' },
  navSignIn: { padding: '10px 20px', background: 'transparent', border: '1px solid #333', borderRadius: '6px', color: '#888', fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit' },

  // Hero
  hero: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', padding: '80px 40px', maxWidth: '1200px', margin: '0 auto', alignItems: 'center' },
  heroContent: {},
  badge: { display: 'inline-block', padding: '8px 16px', background: '#111', border: '1px solid #222', borderRadius: '20px', fontSize: '13px', color: '#888', marginBottom: '24px' },
  heroTitle: { fontSize: '52px', fontWeight: 800, lineHeight: 1.1, color: '#fff', marginBottom: '24px' },
  heroHighlight: { color: '#00ff88' },
  heroSubtitle: { fontSize: '18px', lineHeight: 1.6, color: '#888', marginBottom: '32px', maxWidth: '500px' },
  heroCta: {},
  primaryBtn: { padding: '16px 32px', background: '#00ff88', color: '#000', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' },
  heroNote: { fontSize: '13px', color: '#555', marginTop: '12px' },

  // Demo Box
  demoBox: { background: '#111', border: '1px solid #222', borderRadius: '12px', overflow: 'hidden' },
  demoHeader: { display: 'flex', gap: '8px', padding: '12px 16px', background: '#0a0a0a', borderBottom: '1px solid #222' },
  demoDot: { width: '12px', height: '12px', borderRadius: '50%', background: '#333' },
  demoContent: { padding: '20px' },
  demoInput: { marginBottom: '16px' },
  demoLabel: { display: 'block', fontSize: '10px', fontWeight: 600, color: '#555', letterSpacing: '1px', marginBottom: '8px', fontFamily: "'JetBrains Mono', monospace" },
  demoUrl: { display: 'block', padding: '12px', background: '#0a0a0a', borderRadius: '6px', fontSize: '14px', color: '#666', fontFamily: "'JetBrains Mono', monospace" },
  demoOutput: {},
  demoText: { margin: 0, padding: '16px', background: '#0a0a0a', borderRadius: '6px', fontSize: '13px', lineHeight: 1.6, color: '#888', fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'pre-wrap' },

  // Social Proof
  socialProof: { padding: '40px', textAlign: 'center', borderTop: '1px solid #151515', borderBottom: '1px solid #151515' },
  socialProofText: { fontSize: '18px', color: '#666', fontStyle: 'italic' },
  socialProofName: { color: '#888', fontStyle: 'normal' },

  // Sections
  section: { padding: '80px 40px', maxWidth: '1000px', margin: '0 auto' },
  sectionTitle: { fontSize: '36px', fontWeight: 700, color: '#fff', textAlign: 'center', marginBottom: '48px' },

  // Steps
  steps: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' },
  step: { textAlign: 'center' },
  stepNumber: { width: '48px', height: '48px', background: '#00ff88', color: '#000', fontSize: '20px', fontWeight: 700, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' },
  stepTitle: { fontSize: '18px', fontWeight: 600, color: '#fff', marginBottom: '8px' },
  stepDesc: { fontSize: '14px', color: '#666', lineHeight: 1.5 },

  // Features
  features: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' },
  feature: { padding: '24px', background: '#111', border: '1px solid #1a1a1a', borderRadius: '12px' },
  featureIcon: { fontSize: '32px', marginBottom: '12px' },
  featureTitle: { fontSize: '18px', fontWeight: 600, color: '#fff', marginBottom: '8px' },
  featureDesc: { fontSize: '14px', color: '#666', lineHeight: 1.5 },

  // Pricing
  pricingGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', maxWidth: '700px', margin: '0 auto' },
  pricingCard: { padding: '32px', background: '#111', border: '1px solid #222', borderRadius: '12px', textAlign: 'center' },
  pricingCardPro: { padding: '32px', background: '#0a1a10', border: '2px solid #00ff88', borderRadius: '12px', textAlign: 'center', position: 'relative' },
  popularBadge: { position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', padding: '4px 12px', background: '#00ff88', color: '#000', fontSize: '11px', fontWeight: 700, borderRadius: '4px', letterSpacing: '0.5px' },
  pricingName: { fontSize: '16px', color: '#888', marginBottom: '8px' },
  pricingPrice: { fontSize: '48px', fontWeight: 800, color: '#fff' },
  pricingPeriod: { fontSize: '14px', color: '#555', marginBottom: '24px' },
  pricingFeatures: { listStyle: 'none', marginBottom: '24px', textAlign: 'left' },
  pricingFeature: { fontSize: '14px', color: '#888', padding: '8px 0', borderBottom: '1px solid #1a1a1a' },
  pricingBtn: { width: '100%', padding: '14px', background: 'transparent', border: '1px solid #333', borderRadius: '8px', color: '#888', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' },
  pricingBtnPro: { width: '100%', padding: '14px', background: '#00ff88', border: 'none', borderRadius: '8px', color: '#000', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' },

  // FAQ
  faq: { maxWidth: '700px', margin: '0 auto' },
  faqItem: { padding: '24px 0', borderBottom: '1px solid #1a1a1a' },
  faqQuestion: { fontSize: '16px', fontWeight: 600, color: '#fff', marginBottom: '8px' },
  faqAnswer: { fontSize: '14px', color: '#666', lineHeight: 1.6 },

  // Final CTA
  finalCta: { padding: '80px 40px', textAlign: 'center', background: '#0d0d0d' },
  finalCtaTitle: { fontSize: '36px', fontWeight: 700, color: '#fff', marginBottom: '12px' },
  finalCtaSubtitle: { fontSize: '18px', color: '#666', marginBottom: '32px' },

  // Footer
  footer: { padding: '40px', textAlign: 'center', borderTop: '1px solid #151515' },
  footerLinks: { display: 'flex', justifyContent: 'center', gap: '32px', marginBottom: '16px' },
  footerLink: { fontSize: '14px', color: '#555', textDecoration: 'none' },
  footerCopy: { fontSize: '13px', color: '#333' },

  // Auth
  authPage: { minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' },
  backBtn: { marginTop: '24px', padding: '10px 20px', background: 'transparent', border: 'none', color: '#666', fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit' },

  // Dashboard
  dashHeader: { padding: '16px 24px', borderBottom: '1px solid #151515' },
  dashHeaderTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  dashLogo: { fontSize: '24px', fontWeight: 900, letterSpacing: '-2px', color: '#fff', margin: 0, fontFamily: "'JetBrains Mono', monospace" },
  userInfo: { display: 'flex', alignItems: 'center', gap: '12px' },
  proBadge: { padding: '4px 8px', background: '#00ff88', color: '#000', fontSize: '10px', fontWeight: 700, borderRadius: '4px', letterSpacing: '1px', fontFamily: "'JetBrains Mono', monospace" },
  userEmail: { fontSize: '13px', color: '#666', fontFamily: "'JetBrains Mono', monospace" },
  logoutBtn: { padding: '6px 12px', background: 'transparent', border: '1px solid #333', borderRadius: '4px', color: '#666', fontSize: '11px', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace" },
  usageBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', padding: '12px 16px', background: '#111', borderRadius: '6px' },
  usageText: { fontSize: '12px', color: '#666', fontFamily: "'JetBrains Mono', monospace" },
  upgradeBtn: { padding: '8px 16px', background: '#00ff88', color: '#000', border: 'none', borderRadius: '4px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace" },

  dashMain: { maxWidth: '1200px', margin: '0 auto', padding: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' },
  inputSection: { display: 'flex', flexDirection: 'column', gap: '20px' },
  outputSection: { display: 'flex', flexDirection: 'column', gap: '12px' },
  fieldGroup: { display: 'flex', flexDirection: 'column' },
  label: { fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', color: '#666', marginBottom: '10px', fontFamily: "'JetBrains Mono', monospace" },
  optional: { color: '#333', fontWeight: 400 },
  meta: { color: '#444', fontWeight: 400, letterSpacing: 0, textTransform: 'none' },
  input: { width: '100%', padding: '14px 18px', fontSize: '15px', fontFamily: "'JetBrains Mono', monospace", background: '#111', border: '2px solid #222', borderRadius: '6px', color: '#fff', outline: 'none' },
  platformGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' },
  platformBtn: { padding: '16px 12px', background: '#111', border: '2px solid #222', borderRadius: '6px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', fontFamily: "'JetBrains Mono', monospace" },
  platformBtnActive: { borderColor: '#00ff88', background: '#0a1a10' },
  platformIcon: { fontSize: '22px', fontWeight: 700, color: '#fff' },
  platformLabel: { fontSize: '10px', color: '#666', letterSpacing: '0.5px' },
  toneGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' },
  toneBtn: { padding: '14px 16px', background: '#111', border: '2px solid #222', borderRadius: '6px', cursor: 'pointer', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '3px', fontFamily: "'JetBrains Mono', monospace" },
  toneBtnActive: { borderColor: '#00ff88', background: '#0a1a10' },
  toneLabel: { fontSize: '13px', fontWeight: 600, color: '#fff' },
  toneDesc: { fontSize: '10px', color: '#555' },
  lengthValue: { color: '#00ff88', fontWeight: 700 },
  slider: { width: '100%', height: '6px', borderRadius: '3px', background: '#222', outline: 'none', cursor: 'pointer', accentColor: '#00ff88' },
  submitBtn: { padding: '18px 32px', fontSize: '14px', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '1px', background: '#00ff88', color: '#000', border: 'none', borderRadius: '6px', cursor: 'pointer', marginTop: '8px' },
  submitBtnLoading: { background: '#222', color: '#666', cursor: 'not-allowed' },
  error: { padding: '14px 18px', background: '#1a0808', border: '1px solid #441111', borderRadius: '6px', color: '#ff6666', fontSize: '13px', fontFamily: "'JetBrains Mono', monospace" },
  outputHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  copyBtn: { padding: '8px 14px', fontSize: '11px', fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '1px', background: 'transparent', color: '#00ff88', border: '1px solid #00ff88', borderRadius: '4px', cursor: 'pointer' },
  outputBox: { flex: 1, minHeight: '500px', padding: '24px', background: '#0c0c0c', border: '2px solid #181818', borderRadius: '6px', overflow: 'auto' },
  outputText: { margin: 0, fontSize: '14px', lineHeight: 1.8, whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: "'JetBrains Mono', monospace", color: '#ccc' },
  placeholder: { height: '100%', minHeight: '450px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', color: '#2a2a2a', fontSize: '14px', fontFamily: "'JetBrains Mono', monospace" },
  placeholderIcon: { fontSize: '56px', opacity: 0.5 },
};
