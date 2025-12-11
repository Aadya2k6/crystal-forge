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
        space: ['Space Grotesk', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
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
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
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
        // Glacial Colors
        glacier: {
          light: "hsl(186 100% 94%)",
          mid: "hsl(187 71% 80%)",
          deep: "hsl(186 76% 16%)",
          ocean: "hsl(186 100% 20%)",
        },
        ice: {
          clear: "hsl(186 100% 97%)",
          frost: "hsl(186 40% 95%)",
          blue: "hsl(195 100% 70%)",
          cyan: "hsl(185 100% 50%)",
          diamond: "hsl(0 0% 100%)",
        },
        holo: {
          pink: "hsl(320 80% 75%)",
          purple: "hsl(270 80% 75%)",
          cyan: "hsl(185 100% 75%)",
          blue: "hsl(210 100% 70%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
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
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "spin-slow": {
          "0%": { transform: "rotateY(0deg) rotateX(0deg)" },
          "100%": { transform: "rotateY(360deg) rotateX(360deg)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { 
            boxShadow: "0 0 20px hsl(185 100% 50% / 0.3)",
          },
          "50%": { 
            boxShadow: "0 0 40px hsl(185 100% 50% / 0.5)",
          },
        },
        "sparkle": {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        "holo-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "frost-grow": {
          "0%": { transform: "scale(0)", opacity: "0" },
          "50%": { transform: "scale(1.1)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        "shimmer": "shimmer 3s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "sparkle": "sparkle 2s ease-in-out infinite",
        "holo-shift": "holo-shift 8s ease infinite",
        "frost-grow": "frost-grow 0.6s ease-out forwards",
      },
      boxShadow: {
        'glow-cyan': '0 0 30px hsl(185 100% 50% / 0.4)',
        'glow-cyan-lg': '0 0 50px hsl(185 100% 50% / 0.5)',
        'glow-success': '0 0 30px hsl(160 70% 45% / 0.5)',
        'glow-warning': '0 0 30px hsl(45 90% 55% / 0.5)',
        'glow-destructive': '0 0 30px hsl(0 70% 55% / 0.5)',
        'ice': '0 8px 32px hsl(185 100% 50% / 0.15)',
        'ice-lg': '0 12px 48px hsl(185 100% 50% / 0.25)',
      },
      backgroundImage: {
        'glacier-gradient': 'linear-gradient(180deg, hsl(186 100% 94%) 0%, hsl(187 71% 85%) 30%, hsl(190 80% 70%) 60%, hsl(186 76% 30%) 100%)',
        'holographic': 'linear-gradient(135deg, hsl(320 80% 75% / 0.3) 0%, hsl(270 80% 75% / 0.3) 25%, hsl(185 100% 75% / 0.3) 50%, hsl(210 100% 70% / 0.3) 75%, hsl(320 80% 75% / 0.3) 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
