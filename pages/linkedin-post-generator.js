import Head from 'next/head';
import Link from 'next/link';
import { SignUp, SignedOut, SignedIn } from '@clerk/nextjs';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LinkedInPostGenerator() {
  const [showSignUp, setShowSignUp] = useState(false);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Free LinkedIn Post Generator | Turn Articles into Viral Posts</title>
        <meta name="description" content="Generate high-engagement LinkedIn posts from any article in seconds. AI-powered post generator optimized for the LinkedIn algorithm. Free to try." />
        <meta name="keywords" content="linkedin post generator, linkedin content creator, article to linkedin, blog to linkedin post, linkedin writing tool, viral linkedin posts" />
        <link rel="canonical" href="https://repurposeai.app/linkedin-post-generator" />
        
        <meta property="og:title" content="Free LinkedIn Post Generator | Turn Articles into Viral Posts" />
        <meta property="og:description" content="Generate viral LinkedIn posts from any article in seconds. Free AI tool." />
        <meta property="og:type" content="website" />
        
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <SignedIn>
        {typeof window !== 'undefined' && router.push('/')}
      </SignedIn>

      <SignedOut>
        <div style={styles.container}>
          <nav style={styles.nav}>
            <Link href="/" style={styles.navLogo}>REPURPOSE<span style={styles.accent}>_</span></Link>
            <Link href="/" style={styles.navLink}>← Back to Home</Link>
          </nav>

          {showSignUp ? (
            <div style={styles.authWrapper}>
              <SignUp routing="hash" afterSignUpUrl="/" />
              <button onClick={() => setShowSignUp(false)} style={styles.backBtn}>← Back</button>
            </div>
          ) : (
            <>
              <section style={styles.hero}>
                <div style={styles.badge}>💼 #1 LinkedIn Content Tool</div>
                <h1 style={styles.h1}>
                  Free LinkedIn Post Generator
                </h1>
                <p style={styles.heroSub}>
                  Transform any article into a high-engagement LinkedIn post in 10 seconds. 
                  Optimized for the algorithm. Built for busy professionals.
                </p>
                <button onClick={() => setShowSignUp(true)} style={styles.cta}>
                  Generate Your First Post Free →
                </button>
                <p style={styles.ctaNote}>No credit card required • 3 free posts/day</p>
              </section>

              <section style={styles.demoSection}>
                <div style={styles.demo}>
                  <div style={styles.demoHeader}>
                    <span style={styles.demoDot}></span>
                    <span style={styles.demoDot}></span>
                    <span style={styles.demoDot}></span>
                    <span style={styles.demoTitle}>LinkedIn Post Generator</span>
                  </div>
                  <div style={styles.demoBody}>
                    <div style={styles.demoInput}>
                      <div style={styles.demoLabel}>PASTE URL</div>
                      <div style={styles.demoUrl}>https://hbr.org/2024/01/leadership-trends</div>
                    </div>
                    <div style={styles.demoArrow}>↓</div>
                    <div style={styles.demoOutput}>
                      <div style={styles.demoLabel}>GENERATED POST</div>
                      <pre style={styles.demoText}>{`I turned down a promotion last month.

My team thought I was crazy.

Here's why it was the best decision I ever made:

The role came with a 40% raise.
Corner office. Executive title.

But I noticed something in the interview:

Every leader I met looked... exhausted.

Not from hard work.
From meetings about meetings.

I realized:

→ More money ≠ more impact
→ Bigger title ≠ better life
→ Corner office ≠ fulfillment

Sometimes the best career move is saying no.

What would you have done?

#leadership #career #growth`}</pre>
                    </div>
                  </div>
                </div>
              </section>

              <section style={styles.section}>
                <h2 style={styles.h2}>How the LinkedIn Post Generator Works</h2>
                <div style={styles.steps}>
                  <div style={styles.step}>
                    <div style={styles.stepNum}>1</div>
                    <h3 style={styles.stepTitle}>Paste any URL</h3>
                    <p style={styles.stepText}>Article, blog post, industry report — any content you want to share.</p>
                  </div>
                  <div style={styles.step}>
                    <div style={styles.stepNum}>2</div>
                    <h3 style={styles.stepTitle}>AI crafts your hook</h3>
                    <p style={styles.stepText}>We create a scroll-stopping first line that beats "see more."</p>
                  </div>
                  <div style={styles.step}>
                    <div style={styles.stepNum}>3</div>
                    <h3 style={styles.stepTitle}>Copy & post</h3>
                    <p style={styles.stepText}>Get an algorithm-optimized post ready for engagement.</p>
                  </div>
                </div>
              </section>

              <section style={styles.section}>
                <h2 style={styles.h2}>Built for the LinkedIn Algorithm</h2>
                <div style={styles.features}>
                  <div style={styles.feature}>
                    <span style={styles.featureIcon}>🎣</span>
                    <h3 style={styles.featureTitle}>Killer First Line</h3>
                    <p style={styles.featureText}>The hook that shows before "see more" — optimized to stop the scroll.</p>
                  </div>
                  <div style={styles.feature}>
                    <span style={styles.featureIcon}>📱</span>
                    <h3 style={styles.featureTitle}>Mobile-Optimized Format</h3>
                    <p style={styles.featureText}>Short paragraphs, strategic white space, easy to read on phones.</p>
                  </div>
                  <div style={styles.feature}>
                    <span style={styles.featureIcon}>💬</span>
                    <h3 style={styles.featureTitle}>Engagement Triggers</h3>
                    <p style={styles.featureText}>Questions and CTAs that drive comments — LinkedIn's top ranking signal.</p>
                  </div>
                  <div style={styles.feature}>
                    <span style={styles.featureIcon}>#️⃣</span>
                    <h3 style={styles.featureTitle}>Smart Hashtags</h3>
                    <p style={styles.featureText}>3-5 relevant hashtags at the end — the format LinkedIn prefers.</p>
                  </div>
                </div>
              </section>

              <section style={styles.section}>
                <h2 style={styles.h2}>LinkedIn Post Generator FAQ</h2>
                <div style={styles.faq}>
                  <div style={styles.faqItem}>
                    <h3 style={styles.faqQ}>Will my posts sound like me?</h3>
                    <p style={styles.faqA}>Choose from 4 tone options: professional, casual, provocative, or educational. Pick what matches your brand voice, then customize further if needed.</p>
                  </div>
                  <div style={styles.faqItem}>
                    <h3 style={styles.faqQ}>How long are the generated posts?</h3>
                    <p style={styles.faqA}>1,200-1,500 characters — the sweet spot for LinkedIn engagement. Long enough to provide value, short enough to get read.</p>
                  </div>
                  <div style={styles.faqItem}>
                    <h3 style={styles.faqQ}>Can I use this for company pages?</h3>
                    <p style={styles.faqA}>Yes! Works for personal profiles and company pages. Just adjust the tone to match your brand guidelines.</p>
                  </div>
                  <div style={styles.faqItem}>
                    <h3 style={styles.faqQ}>What about LinkedIn's algorithm changes?</h3>
                    <p style={styles.faqA}>We continuously update our prompts based on what's working now. The fundamentals — hooks, engagement, value — don't change.</p>
                  </div>
                </div>
              </section>

              <section style={styles.finalCta}>
                <h2 style={styles.finalCtaTitle}>Stop staring at a blank post</h2>
                <p style={styles.finalCtaSub}>Generate scroll-stopping LinkedIn content in seconds</p>
                <button onClick={() => setShowSignUp(true)} style={styles.cta}>
                  Generate Your First Post Free →
                </button>
              </section>

              <footer style={styles.footer}>
                <div style={styles.footerLinks}>
                  <Link href="/twitter-thread-generator" style={styles.footerLink}>Twitter Thread Generator</Link>
                  <Link href="/threads-post-generator" style={styles.footerLink}>Threads Post Generator</Link>
                  <Link href="/privacy" style={styles.footerLink}>Privacy</Link>
                  <Link href="/terms" style={styles.footerLink}>Terms</Link>
                </div>
                <p style={styles.footerCopy}>© 2025 Repurpose AI</p>
              </footer>
            </>
          )}
        </div>
      </SignedOut>

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
