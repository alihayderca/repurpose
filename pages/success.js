import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Success() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home after 3 seconds
    setTimeout(() => {
      router.push('/');
    }, 3000);
  }, [router]);

  return (
    <>
      <Head>
        <title>Welcome to Pro! | REPURPOSE_</title>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.icon}>✓</div>
          <h1 style={styles.title}>You're Pro!</h1>
          <p style={styles.subtitle}>Unlimited generations unlocked.</p>
          <p style={styles.redirect}>Redirecting you back...</p>
        </div>
      </div>

      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          background: #0a0a0a;
          font-family: 'JetBrains Mono', monospace;
        }
      `}</style>
    </>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0a0a0a',
    padding: '24px',
  },
  card: {
    textAlign: 'center',
    padding: '48px',
    background: '#0d0d0d',
    border: '2px solid #00ff88',
    borderRadius: '12px',
    maxWidth: '400px',
  },
  icon: {
    width: '80px',
    height: '80px',
    background: '#00ff88',
    color: '#000',
    fontSize: '48px',
    fontWeight: 'bold',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 24px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 800,
    color: '#fff',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#888',
    marginBottom: '24px',
  },
  redirect: {
    fontSize: '13px',
    color: '#444',
  },
};
