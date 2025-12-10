import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['SF Pro Display', 'SF Pro', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Figtree', ...defaultTheme.fontFamily.sans],
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
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                // ReactBits shine animation
                shine: {
                    '0%': { backgroundPosition: '100%' },
                    '100%': { backgroundPosition: '-100%' },
                },
                // ReactBits gradient animation
                gradient: {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
                // Aurora background animations
                'aurora-1': {
                    '0%, 100%': {
                        transform: 'translate(0, 0) scale(1)',
                    },
                    '33%': {
                        transform: 'translate(30%, 20%) scale(1.1)',
                    },
                    '66%': {
                        transform: 'translate(-20%, 10%) scale(0.9)',
                    },
                },
                'aurora-2': {
                    '0%, 100%': {
                        transform: 'translate(0, 0) scale(1)',
                    },
                    '33%': {
                        transform: 'translate(-30%, 30%) scale(1.15)',
                    },
                    '66%': {
                        transform: 'translate(20%, -20%) scale(0.85)',
                    },
                },
                'aurora-3': {
                    '0%, 100%': {
                        transform: 'translate(0, 0) scale(1)',
                    },
                    '33%': {
                        transform: 'translate(20%, -30%) scale(0.9)',
                    },
                    '66%': {
                        transform: 'translate(-30%, 20%) scale(1.1)',
                    },
                },
                // Float animation for Apple-like effect
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                // Pulse glow
                'pulse-glow': {
                    '0%, 100%': {
                        opacity: '0.5',
                        transform: 'scale(1)',
                    },
                    '50%': {
                        opacity: '0.8',
                        transform: 'scale(1.05)',
                    },
                },
                // Slide up fade in
                'slide-up': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(20px)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
            },
            animation: {
                shine: 'shine 5s linear infinite',
                gradient: 'gradient 8s linear infinite',
                'aurora-1': 'aurora-1 20s ease-in-out infinite',
                'aurora-2': 'aurora-2 25s ease-in-out infinite',
                'aurora-3': 'aurora-3 22s ease-in-out infinite',
                float: 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
                'slide-up': 'slide-up 0.6s ease-out forwards',
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },

    plugins: [forms],
};
