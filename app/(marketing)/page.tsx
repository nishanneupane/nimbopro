import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import LocalFont from "next/font/local"
import { cn } from '@/lib/utils'
import {
    Building2, Globe2, Smartphone, Zap, Users, Lock,
    ArrowRight, Check, Sparkles, Star
} from 'lucide-react'

const headingFont = LocalFont({
    src: "../../public/fonts/font.woff2"
})

const features = [
    { icon: Smartphone, title: "Works everywhere", description: "Pixel-perfect from your 6-inch phone to a 40-inch display. No compromises." },
    { icon: Building2, title: "Built for teams", description: "Organize people into workspaces and keep every project exactly where it belongs." },
    { icon: Globe2, title: "Always in sync", description: "Cloud-native and real-time. Open a board on any device and pick up mid-thought." },
    { icon: Zap, title: "Ridiculously fast", description: "Instant loads, optimistic updates, zero spinners staring back at you." },
    { icon: Users, title: "Real collaboration", description: "Drag, drop, comment, assign. Watch the board move as your team moves." },
    { icon: Lock, title: "Secure by default", description: "Encryption in transit and at rest, with permissions you actually control." },
]

const plans = [
    {
        name: "Free", price: "$0", cadence: "forever", cta: "Start for free", href: "/sign-up", featured: false,
        features: ["Up to 5 boards", "Basic collaboration", "Responsive UI", "Core features"],
    },
    {
        name: "Pro", price: "$20", cadence: "/month", cta: "Upgrade to Pro", href: "/sign-in", featured: true,
        features: ["Unlimited boards", "Team collaboration", "Activity tracking", "Advanced analytics", "Priority support", "Everything in Free"],
    },
]

const MarketingPage = () => {
    return (
        <div className="flex flex-col items-center w-full text-foreground">
            {/* Hero */}
            <section className="relative w-full overflow-hidden px-4 pt-28 pb-24 sm:pt-36">
                {/* ambient glow */}
                <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
                <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute left-1/4 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[hsl(var(--brand)/0.25)] blur-[120px] animate-blob" />
                    <div className="absolute right-1/4 top-20 h-[24rem] w-[24rem] translate-x-1/2 rounded-full bg-[hsl(var(--brand-2)/0.22)] blur-[120px] animate-blob animation-delay-2000" />
                </div>

                <div className="mx-auto max-w-5xl text-center">
                    <Link
                        href="#features"
                        className="animate-fade-down inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur transition hover:border-primary/40 hover:text-foreground"
                    >
                        <Sparkles className="h-3.5 w-3.5 text-primary" />
                        New — real-time boards, now faster
                        <ArrowRight className="h-3.5 w-3.5" />
                    </Link>

                    <h1 className={cn(
                        "animate-fade-up mt-8 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl",
                        headingFont.className
                    )}>
                        The workspace where
                        <br />
                        <span className="text-brand-gradient">work actually flows.</span>
                    </h1>

                    <p className="animate-fade-up mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
                        Nimbopro turns scattered tasks into boards your whole team can move together — organized, real-time, and genuinely nice to use.
                    </p>

                    <div className="animate-fade-up mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Button asChild size="lg" className="group h-12 rounded-full px-7 text-base shadow-elevate">
                            <Link href="/sign-up">
                                Start for free
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="h-12 rounded-full px-7 text-base">
                            <Link href="#pricing">See pricing</Link>
                        </Button>
                    </div>

                    <p className="animate-fade-up mt-5 text-sm text-muted-foreground">
                        No credit card required · Free plan forever
                    </p>
                </div>

                {/* Product mock — a tiny playful board preview */}
                <div className="animate-fade-up mx-auto mt-20 max-w-5xl">
                    <div className="ring-brand rounded-2xl bg-card/80 p-3 backdrop-blur">
                        <div className="rounded-xl border border-border bg-background/60 p-4">
                            <div className="mb-4 flex items-center gap-1.5">
                                <span className="h-3 w-3 rounded-full bg-destructive/70" />
                                <span className="h-3 w-3 rounded-full bg-amber-400/70" />
                                <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
                                <span className="ml-3 text-xs text-muted-foreground">nimbopro · marketing sprint</span>
                            </div>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                {[
                                    { title: "To do", cards: ["Draft launch copy", "Design hero", "Book studio time"] },
                                    { title: "In progress", cards: ["Record demo 🎬", "Ship pricing page"] },
                                    { title: "Done", cards: ["Kickoff ✅", "Brand refresh"] },
                                ].map((col) => (
                                    <div key={col.title} className="rounded-lg border border-border bg-card p-3 text-left">
                                        <p className="mb-2 text-xs font-medium text-muted-foreground">{col.title}</p>
                                        <div className="space-y-2">
                                            {col.cards.map((c) => (
                                                <div key={c} className="rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm">
                                                    {c}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social proof strip */}
            <section className="w-full border-y border-border/60 py-10">
                <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 text-center">
                    <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Loved by <span className="font-medium text-foreground">2,000+</span> teams shipping their best work.
                    </p>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="w-full px-4 py-28">
                <div className="mx-auto max-w-6xl">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-sm font-medium uppercase tracking-widest text-primary">Features</p>
                        <h2 className={cn("mt-3 text-4xl font-semibold tracking-tight sm:text-5xl", headingFont.className)}>
                            Everything you need. Nothing you don&apos;t.
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            A focused set of tools that get out of your way so the work stays front and center.
                        </p>
                    </div>

                    <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((f) => (
                            <div
                                key={f.title}
                                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevate"
                            >
                                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground transition group-hover:scale-110">
                                    <f.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-semibold">{f.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="w-full px-4 py-28">
                <div className="mx-auto max-w-5xl">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-sm font-medium uppercase tracking-widest text-primary">Pricing</p>
                        <h2 className={cn("mt-3 text-4xl font-semibold tracking-tight sm:text-5xl", headingFont.className)}>
                            Simple pricing, powerful features
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Start free. Upgrade when your team outgrows it — never before.
                        </p>
                    </div>

                    <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
                        {plans.map((plan) => (
                            <div
                                key={plan.name}
                                className={cn(
                                    "relative rounded-2xl border bg-card p-8 transition duration-300",
                                    plan.featured
                                        ? "border-primary/50 ring-brand"
                                        : "border-border hover:border-primary/30 hover:shadow-elevate"
                                )}
                            >
                                {plan.featured && (
                                    <span className="absolute -top-3 right-6 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow-elevate">
                                        Most popular
                                    </span>
                                )}
                                <h3 className="text-xl font-semibold">{plan.name}</h3>
                                <div className="mt-4 flex items-baseline gap-1">
                                    <span className="text-5xl font-semibold tracking-tight">{plan.price}</span>
                                    <span className="text-muted-foreground">{plan.cadence}</span>
                                </div>
                                <ul className="mt-8 space-y-3">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3 text-sm">
                                            <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                                                <Check className="h-3 w-3" />
                                            </span>
                                            <span className="text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    asChild
                                    size="lg"
                                    variant={plan.featured ? "default" : "outline"}
                                    className="mt-8 h-12 w-full rounded-full text-base"
                                >
                                    <Link href={plan.href}>{plan.cta}</Link>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="w-full px-4 pb-28">
                <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border bg-card px-6 py-20 text-center">
                    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
                        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[hsl(var(--brand)/0.25)] blur-[100px] animate-blob" />
                    </div>
                    <h2 className={cn("mx-auto max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl", headingFont.className)}>
                        Ready to move work forward?
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
                        Join thousands of teams already running their day on Nimbopro. It&apos;s free to start.
                    </p>
                    <Button asChild size="lg" className="group mt-10 h-12 rounded-full px-8 text-base shadow-elevate">
                        <Link href="/sign-up">
                            Start your free trial
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    )
}

export default MarketingPage
