import { dark } from "@clerk/themes"
import type { Appearance } from "@clerk/types"

// Shared Clerk appearance. We theme almost entirely through `variables` so the
// look stays consistent across every widget (SignIn, OrganizationList,
// OrganizationSwitcher + its popover, UserButton). Heavy per-element class
// overrides are avoided — they broke the org popovers (hidden icons).
export const clerkAppearance: Appearance = {
    baseTheme: dark,
    variables: {
        colorPrimary: "#6366f1",
        colorBackground: "#0d1017",
        colorInputBackground: "#161a24",
        colorInputText: "#f3f4f6",
        colorText: "#f3f4f6",
        colorTextSecondary: "#9096a6",
        colorNeutral: "#ffffff",
        borderRadius: "0.625rem",
        fontSize: "0.9375rem",
    },
    elements: {
        card: "shadow-2xl border border-white/10",
        headerTitle: "tracking-tight",
        formButtonPrimary: "normal-case font-medium",

        // Avatar triggers in the topbar
        avatarBox: "ring-2 ring-white/10",

        // UserButton popover
        userButtonPopoverCard:
            "rounded-xl border border-white/10 shadow-2xl bg-[#0d1017]",
        userButtonPopoverActionButton:
            "hover:bg-white/[0.06] transition-colors",
        userButtonPopoverActionButtonIcon: "text-gray-400",
        userButtonPopoverFooter: "hidden",

        // OrganizationSwitcher popover
        organizationSwitcherPopoverCard:
            "rounded-xl border border-white/10 shadow-2xl bg-[#0d1017]",
        organizationSwitcherPopoverActionButton:
            "hover:bg-white/[0.06] transition-colors",
        organizationSwitcherPopoverActionButtonIcon: "text-gray-400",
        organizationSwitcherPopoverFooter: "hidden",
        organizationPreviewMainIdentifier: "text-white font-medium",
        organizationSwitcherTriggerIcon: "text-gray-400",
    },
}
