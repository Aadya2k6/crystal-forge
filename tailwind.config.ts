import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Custom Ice Colors
        ice: {
          primary: "hsl(var(--ice-primary))",
          secondary: "hsl(var(--ice-secondary))",
          glow: "hsl(var(--ice-glow))",
          frost: "hsl(var(--ice-frost))",
        },
        void: {
          deep: "hsl(var(--void-deep))",
          mid: "hsl(var(--void-mid))",
          glow: "hsl(var(--void-glow))",
        },
        neon: {
          cyan: "hsl(var(--neon-cyan))",
          blue: "hsl(var(--neon-blue))",
          purple: "hsl(var(--neon-purple))",
          white: "hsl(var(--neon-white))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { 
            opacity: "0.6",
            filter: "brightness(1)",
          },
          "50%": { 
            opacity: "1",
            filter: "brightness(1.3)",
          },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "crystal-pulse": {
          "0%, 100%": { 
            transform: "scale(1)",
            filter: "brightness(1) hue-rotate(0deg)",
          },
          "50%": { 
            transform: "scale(1.05)",
            filter: "brightness(1.2) hue-rotate(10deg)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        "crystal-pulse": "crystal-pulse 4s ease-in-out infinite",
      },
      boxShadow: {
        'glow': '0 0 20px hsl(var(--ice-primary) / 0.4)',
        'glow-lg': '0 0 40px hsl(var(--ice-primary) / 0.5)',
        'glow-xl': '0 0 60px hsl(var(--ice-primary) / 0.6)',
        'inner-glow': 'inset 0 0 20px hsl(var(--ice-primary) / 0.2)',
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(180deg, hsl(var(--void-deep)) 0%, hsl(var(--void-mid)) 50%, hsl(var(--void-deep)) 100%)',
        'ice-gradient': 'linear-gradient(135deg, hsl(var(--ice-primary) / 0.2) 0%, hsl(var(--ice-secondary) / 0.1) 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent 0%, hsl(var(--ice-frost) / 0.2) 50%, transparent 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
