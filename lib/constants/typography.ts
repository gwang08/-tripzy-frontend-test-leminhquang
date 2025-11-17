/**
 * Typography constants for consistent text styling
 */
export const TYPOGRAPHY = {
  fonts: {
    primary: "'Nunito Sans', sans-serif",
    geist: 'var(--font-geist-sans)',
    geistMono: 'var(--font-geist-mono)',
  },
  heading: {
    fontWeight: 600,
    fontSize: '40px',
    lineHeight: '100%',
    letterSpacing: '0.89px',
  },
  paragraph: {
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '100%',
    letterSpacing: '0px',
  },
  searchCard: {
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '100%',
    letterSpacing: '0.89px',
  },
} as const;
