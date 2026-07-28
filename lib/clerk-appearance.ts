import { dark } from "@clerk/themes"
import type { Appearance } from "@clerk/types"

// Shared Clerk appearance so every widget matches the brand (blue→purple on a
// glassy gray-800 card) instead of the raw default dark theme.
export const clerkAppearance: Appearance = {
    baseTheme: dark,
    variables: {
        colorPrimary: "#8b5cf6",
        colorBackground: "transparent",
        colorInputBackground: "rgba(255,255,255,0.05)",
        colorText: "#f3f4f6",
        colorTextSecondary: "#9ca3af",
        borderRadius: "0.75rem",
    },
    elements: {
        card: "bg-transparent shadow-none",
        rootBox: "w-full",
        headerTitle: "text-white",
        headerSubtitle: "text-gray-400",
        socialButtonsBlockButton:
            "border-white/10 hover:bg-white/5 text-gray-200",
        formButtonPrimary:
            "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white normal-case",
        footerActionLink: "text-blue-400 hover:text-blue-300",
    },
}
