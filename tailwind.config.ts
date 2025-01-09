import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				serif: ["var(--font-gabriela)"],
			},
			colors: {
				background: "#FFFFFF",
				foreground: "#090A0C",
				card: {
					DEFAULT: "#FFFFFF",
					foreground: "#090A0C",
				},
				popover: {
					DEFAULT: "#FFFFFF",
					foreground: "#090A0C",
				},
				primary: {
					DEFAULT: "#1A1B1E",
					foreground: "#FAFAFA",
				},
				secondary: {
					DEFAULT: "#F4F4F5",
					foreground: "#1A1B1E",
				},
				muted: {
					DEFAULT: "#F4F4F5",
					foreground: "#737578",
				},
				accent: {
					DEFAULT: "#894b1c",
					foreground: "#1A1B1E",
				},
				destructive: {
					DEFAULT: "#EA4E3D",
					foreground: "#FAFAFA",
				},
				border: "#E4E4E7",
				input: "#E4E4E7",
				ring: "#090A0C",
				chart: {
					1: "#F76B48",
					2: "#2A9D8F",
					3: "#264653",
					4: "#EEC64C",
					5: "#F4743B",
				},
			},
			borderRadius: {
				lg: "0.5rem",
				md: "0.375rem",
				sm: "0.25rem",
			},
		},
	},
	plugins: [tailwindAnimate],
} satisfies Config;
