import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	// Touch devices fire :hover on tap and leave it stuck. Only emit hover
	// styles where the device genuinely supports hover (mobile-first app).
	future: {
		hoverOnlyWhenSupported: true,
	},
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// App brand tokens
				brand: '#ed2a3a',
				'brand-dark': '#d12532',
				'brand-light': '#fef3f2',
				cream: '#fff5ec',
				// shadcn-ui system colors
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			// Built-in CSS easings are too weak. These are stronger custom curves.
			// tailwindcss-animate maps these to animation-timing-function too,
			// so `ease-out-strong` works on both transitions and `animate-in`.
			transitionTimingFunction: {
				'out-strong': 'cubic-bezier(0.23, 1, 0.32, 1)',
				'in-out-strong': 'cubic-bezier(0.77, 0, 0.175, 1)',
				'drawer': 'cubic-bezier(0.32, 0.72, 0, 1)',
			},
			// tailwindcss-animate reads `ease-*` from a separate theme key, so the
			// same curves must be registered here for them to apply to `animate-in`
			// (enter) animations, not just transitions.
			animationTimingFunction: {
				'out-strong': 'cubic-bezier(0.23, 1, 0.32, 1)',
				'in-out-strong': 'cubic-bezier(0.77, 0, 0.175, 1)',
				'drawer': 'cubic-bezier(0.32, 0.72, 0, 1)',
			},
			// 350 matches the JS slide timing in useMakanQuiz; registering it as
			// a scale value keeps `duration-350` unambiguous (arbitrary values
			// clash with tailwindcss-animate's animation-duration utility).
			transitionDuration: {
				'350': '350ms',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
