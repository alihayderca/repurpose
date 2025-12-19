import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#00ff88',
          colorBackground: '#0a0a0a',
          colorInputBackground: '#111',
          colorInputText: '#fff',
          borderRadius: '6px',
        },
        elements: {
          formButtonPrimary: {
            backgroundColor: '#00ff88',
            color: '#000',
            fontWeight: 700,
            '&:hover': {
              backgroundColor: '#00cc6a',
            },
          },
          card: {
            backgroundColor: '#0a0a0a',
            border: '1px solid #222',
          },
          headerTitle: {
            color: '#fff',
          },
          headerSubtitle: {
            color: '#666',
          },
          socialButtonsBlockButton: {
            backgroundColor: '#111',
            border: '1px solid #333',
            '&:hover': {
              backgroundColor: '#1a1a1a',
            },
          },
          formFieldInput: {
            backgroundColor: '#111',
            border: '2px solid #222',
            '&:focus': {
              borderColor: '#00ff88',
            },
          },
          footerActionLink: {
            color: '#00ff88',
          },
        },
      }}
      {...pageProps}
    >
      <Component {...pageProps} />
    </ClerkProvider>
  );
}
