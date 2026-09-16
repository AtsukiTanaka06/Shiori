/**
 * Shiori Design Tokens
 * Source: Input/Design.md
 */

export const Colors = {
  // Brand - Sage
  sage500: '#899B8C',
  sage600: '#718576',
  sage100: '#E6ECE6',

  // Background
  ivory50: '#FFFDF8',
  ivory100: '#F8F0DF',

  // Accent - Coral
  coral400: '#E5A395',
  coral100: '#F7E2DE',

  // Text
  ink900: '#30332F',
  ink600: '#666A64',
  ink400: '#92958F',

  // Border
  line200: '#E7E3DA',

  // Semantic
  success: '#718576',
  warning: '#C79B5A',
  error: '#C87970',
  info: '#7892A3',

  // Base
  white: '#FFFFFF',
} as const;

export const Spacing = {
  s1: 4,
  s2: 8,
  s3: 12,
  s4: 16,
  s5: 20,
  s6: 24,
  s8: 32,
  s10: 40,
  s12: 48,
  screenH: 16,
} as const;

export const Radius = {
  chip: 8,
  button: 12,
  input: 12,
  card: 16,
  bookCard: 16,
  featureCard: 20,
  modal: 24,
} as const;

export const FontSize = {
  display: 32,
  largeTitle: 28,
  title1: 24,
  title2: 20,
  headline: 17,
  body: 16,
  bodySmall: 14,
  caption: 12,
  micro: 11,
} as const;

export const Shadow = {
  card: {
    shadowColor: '#30332F',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
} as const;
