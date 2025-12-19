import Head from 'next/head';
import Link from 'next/link';
import { SignUp, useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function TwitterThreadGenerator() {
  const [showSignUp, setShowSignUp] = useState(false);
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleCTA = () => {
    if (isSignedIn) {
      router.push('/');
    } else {
      setShowSignUp(true);
    }
  };

  return (
    <>
      <Head>
        <title>Free Twitter Thread Generator | Turn Articles into Viral Threads</title>
        <meta name="description" content="Generate viral Twitter threads from any article or blog post in seconds. Free AI-powered thread generator. No writing skills needed." />
        <meta name="keywords" content="twitter thread generator, thread maker, viral twitter threads, article to thread, blog to twitter, tweet generator" />
        <link rel="canonical" href="https://repurposeai.app/twitter-thread-generator" />
        
        <meta property="og:title" content="Free Twitter Thread Generator | Turn Articles into Viral Threads" />
        <meta property="og:description" content="Generate viral Twitter threads from any article in seconds. Free AI tool." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://repurposeai.app/twitter-thread-generator" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Twitter Thread Generator" />
        <meta name="twitter:description" content="Turn any article into a viral Twitter thread in 10 seconds." />
        
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div style={styles.container}>
        {showSignUp ? (
          <div style={styles.authWrapper}>
            <SignUp routing="hash" afterSignUpUrl="/" />
            <button onClick={() => setShowSignUp(false)} style={styles.backBtn}>← Back</button>
          </div>
        ) : (
          <>
            <nav style={styles.nav}>
              <Link href="/" style={styles.navLogo}>REPURPOSE<span style={styles.accent}>_</span></Link>
              <Link href="/" style={styles.navLink}>{isSignedIn ? '← Back to App' : '← Back to Home'}</Link>
            </nav>

            <section style={styles.hero}>
              <div style={styles.badge}>🐦 #1 Twitter Thread Tool</div>
              <h1 style={styles.h1}>Free Twitter Thread Generator</h1>
              <p style={styles.heroSub}>
                Turn any article, blog post, or newsletter into a viral Twitter thread in 10 seconds. 
                AI-powered. No writing skills needed.
              </p>
              <button onClick={handleCTA} style={styles.cta}>
                {isSignedIn ? 'Generate a Thread Now →' : 'Generate Your First Thread Free →'}
              </button>
              <p style={styles.ctaNote}>No credit card required • 3 free threads/day</p>
            </section>

            <section style={styles.demoSection}>
              <div style={styles.demo}>
                <div style={styles.demoHeader}>
                  <span style={styles.demoDot}></span>
                  <span style={styles.demoDot}></span>
                  <span style={styles.demoDot}></span>
                  <span style={styles.demoTitle}>Thread Generator</span>
                </div>
                <div style={styles.demoBody}>
                  <div style={styles.demoInput}>
                    <div style={styles.demoLabel}>PASTE URL</div>
                    <div style={styles.demoUrl}>https://paulgraham.com/startupideas.html</div>
                  </div>
                  <div style={styles.demoArrow}>↓</div>
                  <div style={styles.demoOutput}>
                    <div style={styles.demoLabel}>GENERATED THREAD</div>
                    <pre style={styles.demoText}>{`1/ Stop trying to "think up" startup ideas.

The biggest mistake founders make?
Solving problems that don't exist.

Here's what actually works: 🧵

2/ The best startup ideas have 3 things:
→ Something YOU want
→ Something YOU can build
→ Something few others see

Microsoft, Apple, Google all started this way.

3/ When you "think up" ideas, you get "sitcom startups."

Example: A social network for pet owners.
Sounds reasonable, right?

Everyone says "Yeah, maybe I'd use that."
But "maybe" × millions = zero users.`}</pre>
                  </div>
                </div>
              </div>
            </section>

            <section style={styles.section}>
              <h2 style={styles.h2}>How the Twitter Thread Generator Works</h2>
              <div style={styles.steps}>
                <div style={styles.step}>
                  <div style={styles.stepNum}>1</div>
                  <h3 style={styles.stepTitle}>Paste any URL</h3>
                  <p style={styles.stepText}>Blog post, article, newsletter, news story — any public URL works.</p>
                </div>
                <div style={styles.step}>
                  <div style={styles.stepNum}>2</div>
                  <h3 style={styles.stepTitle}>AI extracts key points</h3>
                  <p style={styles.stepText}>Our AI reads the content and identifies the most engaging insights.</p>
                </div>
                <div style={styles.step}>
                  <div style={styles.stepNum}>3</div>
                  <h3 style={styles.stepTitle}>Get a viral-format thread</h3>
                  <p style={styles.stepText}>Receive a ready-to-post thread with hooks, insights, and CTAs.</p>
                </div>
              </div>
            </section>

            <section style={styles.section}>
              <h2 style={styles.h2}>Why Our Thread Generator?</h2>
              <div style={styles.features}>
                <div style={styles.feature}>
                  <span style={styles.featureIcon}>⚡</span>
                  <h3 style={styles.featureTitle}>10-Second Generation</h3>
                  <p style={styles.featureText}>Not minutes. Seconds. Paste, click, done.</p>
                </div>
                <div style={styles.feature}>
                  <span style={styles.featureIcon}>🎯</span>
                  <h3 style={styles.featureTitle}>Viral Format Built-In</h3>
                  <p style={styles.featureText}>Pattern interrupts, curiosity gaps, and CTAs — the stuff that actually gets retweets.</p>
                </div>
                <div style={styles.feature}>
                  <span style={styles.featureIcon}>📏</span>
                  <h3 style={styles.featureTitle}>Perfect Length</h3>
                  <p style={styles.featureText}>Every tweet under 280 characters. Proper 1/ 2/ 3/ formatting included.</p>
                </div>
                <div style={styles.feature}>
                  <span style={styles.featureIcon}>🎨</span>
                  <h3 style={styles.featureTitle}>4 Tone Options</h3>
                  <p style={styles.featureText}>Professional, casual, provocative, or educational — match your brand voice.</p>
                </div>
              </div>
            </section>

            <section style={styles.section}>
              <h2 style={styles.h2}>Twitter Thread Generator FAQ</h2>
              <div style={styles.faq}>
                <div style={styles.faqItem}>
                  <h3 style={styles.faqQ}>Is this thread generator free?</h3>
                  <p style={styles.faqA}>Yes! You get 3 free thread generations per day. No credit card required. Pro users get unlimited generations for $9/month.</p>
                </div>
                <div style={styles.faqItem}>
                  <h3 style={styles.faqQ}>What URLs can I use?</h3>
                  <p style={styles.faqA}>Any public URL — blog posts, Medium articles, Substack newsletters, news articles, company blogs, and more.</p>
                </div>
                <div style={styles.faqItem}>
                  <h3 style={styles.faqQ}>How long are the generated threads?</h3>
                  <p style={styles.faqA}>You choose! Select anywhere from 3 to 15 tweets per thread depending on how much detail you want.</p>
                </div>
                <div style={styles.faqItem}>
                  <h3 style={styles.faqQ}>Can I edit the threads?</h3>
                  <p style={styles.faqA}>Absolutely. Copy the output, tweak any tweets you want, and post. Most users post as-is because the quality is already high.</p>
                </div>
                <div style={styles.faqItem}>
                  <h3 style={styles.faqQ}>Is the content unique?</h3>
                  <p style={styles.faqA}>Yes. Every thread is generated fresh based on the source content. No templates, no duplicate content.</p>
                </div>
              </div>
            </section>

            <section style={styles.finalCta}>
              <h2 style={styles.finalCtaTitle}>Ready to create viral threads?</h2>
              <p style={styles.finalCtaSub}>Join 500+ creators using our thread generator</p>
              <button onClick={handleCTA} style={styles.cta}>
                {isSignedIn ? 'Go to App →' : 'Generate Your First Thread Free →'}
              </button>
            </section>

            <footer style={styles.footer}>
              <div style={styles.footerLinks}>
                <Link href="/linkedin-post-generator" style={styles.footerLink}>LinkedIn Post Generator</Link>
                <Link href="/threads-post-generator" style={styles.footerLink}>Threads Post Generator</Link>
                <Link href="/privacy" style={styles.footerLink}>Privacy</Link>
                <Link href="/terms" style={styles.footerLink}>Terms</Link>
              </div>
              <p style={styles.footerCopy}>© 2025 Repurpose AI</p>
            </footer>
          </>
        )}
      </div>

      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0a; color: #e5e5e5; font-family: 'Inter', sans-serif; }
      `}</style>
    </>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#0a0a0a' },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', maxWidth: '1100px', margin: '0 auto' },
  navLogo: { fontSize: '20px', fontWeight: 800, color: '#fff', textDecoration: 'none', fontFamily: "'JetBrains Mono', monospace" },
  accent: { color: '#00ff88' },
  navLink: { color: '#666', textDecoration: 'none', fontSize: '14px' },
  
  authWrapper: { minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  backBtn: { marginTop: '20px', background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '14px' },
  
  hero: { textAlign: 'center', padding: '80px 24px 60px', maxWidth: '800px', margin: '0 auto' },
  badge: { display: 'inline-block', padding: '8px 16px', background: '#111', border: '1px solid #222', borderRadius: '20px', fontSize: '13px', color: '#888', marginBottom: '24px' },
  h1: { fontSize: '48px', fontWeight: 800, lineHeight: 1.1, color: '#fff', marginBottom: '24px' },
  heroSub: { fontSize: '18px', color: '#888', lineHeight: 1.6, marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' },
  cta: { padding: '16px 32px', background: '#00ff88', color: '#000', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 700, cursor: 'pointer' },
  ctaNote: { fontSize: '13px', color: '#555', marginTop: '12px' },

  demoSection: { padding: '0 24px 80px', maxWidth: '700px', margin: '0 auto' },
  demo: { background: '#111', border: '1px solid #222', borderRadius: '12px', overflow: 'hidden' },
  demoHeader: { display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: '#0a0a0a', borderBottom: '1px solid #222' },
  demoDot: { width: '12px', height: '12px', borderRadius: '50%', background: '#333' },
  demoTitle: { marginLeft: '12px', fontSize: '13px', color: '#555' },
  demoBody: { padding: '24px' },
  demoInput: { marginBottom: '16px' },
  demoLabel: { fontSize: '10px', fontWeight: 600, color: '#555', letterSpacing: '1px', marginBottom: '8px', fontFamily: "'JetBrains Mono', monospace" },
  demoUrl: { padding: '12px', background: '#0a0a0a', borderRadius: '6px', fontSize: '14px', color: '#666', fontFamily: "'JetBrains Mono', monospace" },
  demoArrow: { textAlign: 'center', fontSize: '24px', color: '#333', margin: '8px 0' },
  demoOutput: {},
  demoText: { margin: 0, padding: '16px', background: '#0a0a0a', borderRadius: '6px', fontSize: '13px', lineHeight: 1.6, color: '#888', fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'pre-wrap' },

  section: { padding: '60px 24px', maxWidth: '900px', margin: '0 auto' },
  h2: { fontSize: '32px', fontWeight: 700, color: '#fff', textAlign: 'center', marginBottom: '40px' },

  steps: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' },
  step: { textAlign: 'center', padding: '24px' },
  stepNum: { width: '40px', height: '40px', background: '#00ff88', color: '#000', fontSize: '18px', fontWeight: 700, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' },
  stepTitle: { fontSize: '16px', fontWeight: 600, color: '#fff', marginBottom: '8px' },
  stepText: { fontSize: '14px', color: '#666', lineHeight: 1.5 },

  features: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' },
  feature: { padding: '24px', background: '#111', border: '1px solid #1a1a1a', borderRadius: '12px' },
  featureIcon: { fontSize: '28px', marginBottom: '12px', display: 'block' },
  featureTitle: { fontSize: '16px', fontWeight: 600, color: '#fff', marginBottom: '8px' },
  featureText: { fontSize: '14px', color: '#666', lineHeight: 1.5 },

  faq: { maxWidth: '700px', margin: '0 auto' },
  faqItem: { padding: '24px 0', borderBottom: '1px solid #1a1a1a' },
  faqQ: { fontSize: '16px', fontWeight: 600, color: '#fff', marginBottom: '8px' },
  faqA: { fontSize: '14px', color: '#888', lineHeight: 1.6 },

  finalCta: { padding: '80px 24px', textAlign: 'center', background: '#0d0d0d' },
  finalCtaTitle: { fontSize: '32px', fontWeight: 700, color: '#fff', marginBottom: '12px' },
  finalCtaSub: { fontSize: '16px', color: '#666', marginBottom: '32px' },

  footer: { padding: '40px 24px', textAlign: 'center', borderTop: '1px solid #151515' },
  footerLinks: { display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '16px', flexWrap: 'wrap' },
  footerLink: { fontSize: '14px', color: '#555', textDecoration: 'none' },
  footerCopy: { fontSize: '13px', color: '#333' },
};
