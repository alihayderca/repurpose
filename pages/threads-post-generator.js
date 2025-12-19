import Head from 'next/head';
import Link from 'next/link';
import { SignUp, useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function ThreadsPostGenerator() {
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
        <title>Free Threads Post Generator | Turn Articles into Engaging Posts</title>
        <meta name="description" content="Generate authentic Threads posts from any article in seconds. AI-powered content creator for Meta's Threads app. Free to try." />
        <meta name="keywords" content="threads post generator, threads content creator, article to threads, threads app, instagram threads, threads writing tool" />
        <link rel="canonical" href="https://repurposeai.app/threads-post-generator" />
        
        <meta property="og:title" content="Free Threads Post Generator | Turn Articles into Posts" />
        <meta property="og:description" content="Generate engaging Threads posts from any article in seconds." />
        <meta property="og:type" content="website" />
        
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
              <div style={styles.badge}>@ Threads Content Tool</div>
              <h1 style={styles.h1}>Free Threads Post Generator</h1>
              <p style={styles.heroSub}>
                Transform any article into authentic Threads content in 10 seconds. 
                Casual, conversational posts that feel native to the platform.
              </p>
              <button onClick={handleCTA} style={styles.cta}>
                {isSignedIn ? 'Generate a Post Now →' : 'Generate Your First Post Free →'}
              </button>
              <p style={styles.ctaNote}>No credit card required • 3 free posts/day</p>
            </section>

            <section style={styles.demoSection}>
              <div style={styles.demo}>
                <div style={styles.demoHeader}>
                  <span style={styles.demoDot}></span>
                  <span style={styles.demoDot}></span>
                  <span style={styles.demoDot}></span>
                  <span style={styles.demoTitle}>Threads Post Generator</span>
                </div>
                <div style={styles.demoBody}>
                  <div style={styles.demoInput}>
                    <div style={styles.demoLabel}>PASTE URL</div>
                    <div style={styles.demoUrl}>https://techcrunch.com/ai-startup-funding</div>
                  </div>
                  <div style={styles.demoArrow}>↓</div>
                  <div style={styles.demoOutput}>
                    <div style={styles.demoLabel}>GENERATED POST</div>
                    <pre style={styles.demoText}>{`hot take: the AI funding bubble isn't actually a bubble

hear me out...

everyone's comparing this to crypto/NFTs but the difference is AI actually does something useful??

like companies are shipping real products. saving real money. not just vibes and speculation

maybe I'm wrong but the "this is definitely a bubble" takes feel lazy at this point

idk what do you think`}</pre>
                  </div>
                </div>
              </div>
            </section>

            <section style={styles.section}>
              <h2 style={styles.h2}>How the Threads Generator Works</h2>
              <div style={styles.steps}>
                <div style={styles.step}>
                  <div style={styles.stepNum}>1</div>
                  <h3 style={styles.stepTitle}>Paste any URL</h3>
                  <p style={styles.stepText}>News article, blog post, industry report — any content worth discussing.</p>
                </div>
                <div style={styles.step}>
                  <div style={styles.stepNum}>2</div>
                  <h3 style={styles.stepTitle}>AI creates authentic content</h3>
                  <p style={styles.stepText}>Casual, conversational — the way people actually talk on Threads.</p>
                </div>
                <div style={styles.step}>
                  <div style={styles.stepNum}>3</div>
                  <h3 style={styles.stepTitle}>Post & engage</h3>
                  <p style={styles.stepText}>Get content designed to spark real conversations.</p>
                </div>
              </div>
            </section>

            <section style={styles.section}>
              <h2 style={styles.h2}>Made for How Threads Works</h2>
              <div style={styles.features}>
                <div style={styles.feature}>
                  <span style={styles.featureIcon}>💬</span>
                  <h3 style={styles.featureTitle}>Conversational Tone</h3>
                  <p style={styles.featureText}>No corporate speak. Real, human language that fits the platform vibe.</p>
                </div>
                <div style={styles.feature}>
                  <span style={styles.featureIcon}>🔥</span>
                  <h3 style={styles.featureTitle}>Hot Takes Welcome</h3>
                  <p style={styles.featureText}>Threads rewards opinions. We help you share yours without being boring.</p>
                </div>
                <div style={styles.feature}>
                  <span style={styles.featureIcon}>📏</span>
                  <h3 style={styles.featureTitle}>Perfect Length</h3>
                  <p style={styles.featureText}>Under 500 characters — the sweet spot for Threads engagement.</p>
                </div>
                <div style={styles.feature}>
                  <span style={styles.featureIcon}>🚫</span>
                  <h3 style={styles.featureTitle}>No Hashtags</h3>
                  <p style={styles.featureText}>Threads doesn't use hashtags like Instagram. We know that.</p>
                </div>
              </div>
            </section>

            <section style={styles.section}>
              <h2 style={styles.h2}>Threads Post Generator FAQ</h2>
              <div style={styles.faq}>
                <div style={styles.faqItem}>
                  <h3 style={styles.faqQ}>What makes Threads different from Twitter?</h3>
                  <p style={styles.faqA}>Threads is more casual, less performative. Our generator creates content that feels like a genuine thought, not a polished "thread."</p>
                </div>
                <div style={styles.faqItem}>
                  <h3 style={styles.faqQ}>Can it create multi-post threads?</h3>
                  <p style={styles.faqA}>Yes! Choose between single posts or short threads (3-5 posts) depending on how much you want to say.</p>
                </div>
                <div style={styles.faqItem}>
                  <h3 style={styles.faqQ}>Will it sound like me?</h3>
                  <p style={styles.faqA}>The output is a starting point. Edit it to add your voice, then post. Most people tweak 1-2 lines and they're good.</p>
                </div>
                <div style={styles.faqItem}>
                  <h3 style={styles.faqQ}>Is Threads even worth posting on?</h3>
                  <p style={styles.faqA}>Threads hit 175M+ users faster than any app in history. Early adopters are building real audiences there now.</p>
                </div>
              </div>
            </section>

            <section style={styles.finalCta}>
              <h2 style={styles.finalCtaTitle}>Get on Threads without the effort</h2>
              <p style={styles.finalCtaSub}>Generate authentic content in seconds</p>
              <button onClick={handleCTA} style={styles.cta}>
                {isSignedIn ? 'Go to App →' : 'Generate Your First Post Free →'}
              </button>
            </section>

            <footer style={styles.footer}>
              <div style={styles.footerLinks}>
                <Link href="/twitter-thread-generator" style={styles.footerLink}>Twitter Thread Generator</Link>
                <Link href="/linkedin-post-generator" style={styles.footerLink}>LinkedIn Post Generator</Link>
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
