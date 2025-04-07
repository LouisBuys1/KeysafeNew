import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'brand-purple': {
          light: '#4c3f79', // Lighter shade for inner elements/highlights
          DEFAULT: '#3a2d5f', // Main background
          dark: '#2a1f44', // Darker shade for shadows/depth
        },
        'brand-orange': {
          DEFAULT: '#f9a826', // Key icon color
        },
        'brand-text': {
          light: '#e0ddeb', // Lighter text
          DEFAULT: '#c7c1d9', // Default text
          dark: '#a9a2c2', // Dimmer text
        },
        'brand-red': {
          DEFAULT: '#e57373', // For buttons like 'Check Out'
        }
      },
      fontFamily: {
        sans: [
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      boxShadow: {
        'neumorphic-inset': 'inset 6px 6px 12px #2a1f44, inset -6px -6px 12px #4c3f79',
        'neumorphic-outset': '6px 6px 12px #2a1f44, -6px -6px 12px #4c3f79',
        'neumorphic-outset-sm': '3px 3px 6px #2a1f44, -3px -3px 6px #4c3f79',
      }
    },
  },
  plugins: [],
} satisfies Config;
