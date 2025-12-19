import Head from 'next/head';
import Link from 'next/link';

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Repurpose AI</title>
        <meta name="description" content="Privacy Policy for Repurpose AI" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div style={styles.container}>
        <nav style={styles.nav}>
          <Link href="/" style={styles.navLogo}>
            REPURPOSE<span style={styles.logoAccent}>_</span>
          </Link>
        </nav>

        <main style={styles.main}>
          <h1 style={styles.title}>Privacy Policy</h1>
          <p style={styles.updated}>Last updated: December 19, 2025</p>

          <section style={styles.section}>
            <h2 style={styles.heading}>1. Information We Collect</h2>
            <p style={styles.text}>
              When you use Repurpose AI, we collect the following information:
            </p>
            <ul style={styles.list}>
              <li><strong>Account Information:</strong> Email address and authentication data when you create an account.</li>
              <li><strong>Usage Data:</strong> URLs you submit for content repurposing, platform preferences, and generation history.</li>
              <li><strong>Payment Information:</strong> When you upgrade to Pro, payment processing is handled by Stripe. We do not store your credit card details.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, and device information for security and analytics purposes.</li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>2. How We Use Your Information</h2>
            <p style={styles.text}>We use your information to:</p>
            <ul style={styles.list}>
              <li>Provide and improve our content repurposing service</li>
              <li>Process payments and manage subscriptions</li>
              <li>Send important service updates and notifications</li>
              <li>Prevent fraud and abuse</li>
              <li>Analyze usage patterns to improve our product</li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>3. Data Sharing</h2>
            <p style={styles.text}>
              We do not sell your personal information. We share data only with:
            </p>
            <ul style={styles.list}>
              <li><strong>Stripe:</strong> For payment processing</li>
              <li><strong>Clerk:</strong> For authentication services</li>
              <li><strong>Anthropic:</strong> For AI content generation (URLs and content you submit are processed by their API)</li>
              <li><strong>Vercel:</strong> For hosting services</li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>4. Data Retention</h2>
            <p style={styles.text}>
              We retain your account information for as long as your account is active. Usage data is retained for up to 12 months for analytics purposes. You can request deletion of your data at any time by contacting us.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>5. Your Rights</h2>
            <p style={styles.text}>You have the right to:</p>
            <ul style={styles.list}>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data in a portable format</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>6. Cookies</h2>
            <p style={styles.text}>
              We use essential cookies for authentication and session management. We do not use tracking cookies for advertising purposes.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>7. Security</h2>
            <p style={styles.text}>
              We implement industry-standard security measures including HTTPS encryption, secure authentication through Clerk, and PCI-compliant payment processing through Stripe.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>8. Children's Privacy</h2>
            <p style={styles.text}>
              Repurpose AI is not intended for users under 13 years of age. We do not knowingly collect information from children under 13.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>9. Changes to This Policy</h2>
            <p style={styles.text}>
              We may update this privacy policy from time to time. We will notify you of significant changes by email or through a notice on our website.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>10. Contact Us</h2>
            <p style={styles.text}>
              If you have questions about this privacy policy or your data, contact us at privacy@repurposeai.app
            </p>
          </section>
        </main>

        <footer style={styles.footer}>
          <Link href="/" style={styles.footerLink}>← Back to Home</Link>
        </footer>
      </div>

      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0a; color: #e5e5e5; font-family: 'Inter', -apple-system, sans-serif; }
      `}</style>
    </>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#0a0a0a' },
  nav: { padding: '20px 40px', borderBottom: '1px solid #151515' },
  navLogo: { fontSize: '20px', fontWeight: 800, color: '#fff', textDecoration: 'none', fontFamily: "'JetBrains Mono', monospace" },
  logoAccent: { color: '#00ff88' },
  main: { maxWidth: '700px', margin: '0 auto', padding: '60px 24px' },
  title: { fontSize: '36px', fontWeight: 700, color: '#fff', marginBottom: '8px' },
  updated: { fontSize: '14px', color: '#555', marginBottom: '48px' },
  section: { marginBottom: '40px' },
  heading: { fontSize: '20px', fontWeight: 600, color: '#fff', marginBottom: '16px' },
  text: { fontSize: '15px', color: '#888', lineHeight: 1.7, marginBottom: '12px' },
  list: { paddingLeft: '24px', marginTop: '12px' },
  footer: { padding: '40px', borderTop: '1px solid #151515', textAlign: 'center' },
  footerLink: { fontSize: '14px', color: '#555', textDecoration: 'none' },
};
