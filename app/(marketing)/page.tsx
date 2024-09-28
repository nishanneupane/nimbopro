import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import LocalFont from "next/font/local"
import { cn } from '@/lib/utils'
import { Building, Globe, TabletSmartphone, Zap, Users, Lock } from 'lucide-react'

const headingFont = LocalFont({
    src: "../../public/fonts/font.woff2"
})

const MarketingPage = () => {
    return (
        <div className='flex flex-col items-center justify-start bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-gray-100 overflow-hidden'>
            {/* Hero Section */}
            <section className="w-full py-32 px-4 sm:px-6 lg:px-8 relative">
                <div className="max-w-7xl mx-auto">
                    <div className={cn("text-center", headingFont.className)}>
                        <h1 className="text-6xl md:text-8xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-fade-in-down">
                            Redefine Productivity with Nimbopro
                        </h1>
                        <p className="text-2xl md:text-3xl text-gray-300 mt-6 max-w-3xl mx-auto animate-fade-in-up">
                            Elevate your workflow, amplify collaboration, and shatter productivity barriers.
                        </p>
                        <div className="mt-12 animate-fade-in-up">
                            <Button className='text-xl font-semibold py-4 px-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:scale-105'>
                                <Link href="/sign-up">
                                    Start For Free
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-[-1]">
                    <div className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="w-full py-32 px-4 sm:px-6 lg:px-8 bg-gray-800">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-5xl font-bold text-center mb-16 text-white animate-fade-in-up">
                        Key Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {[
                            { icon: TabletSmartphone, title: "Responsive Design", description: "Seamlessly adapt to any device, anytime, anywhere." },
                            { icon: Building, title: "Organizational Tools", description: "Connect teams and departments efficiently." },
                            { icon: Globe, title: "Global Accessibility", description: "Access from anywhere with our cloud-based solution." },
                            { icon: Zap, title: "Fast Performance", description: "Experience quick load times and real-time updates." },
                            { icon: Users, title: "Team Collaboration", description: "Foster teamwork with intuitive sharing features." },
                            { icon: Lock, title: "Enhanced Security", description: "Keep your data safe with advanced encryption." },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="bg-gray-700 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 group animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <feature.icon className="h-16 w-16 mb-6 text-blue-400 group-hover:text-purple-400 transition-colors duration-300" />
                                <h3 className="text-2xl font-semibold mb-4 text-white">{feature.title}</h3>
                                <p className="text-gray-300 text-lg">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="w-full py-32 px-4 sm:px-6 lg:px-8 bg-gray-900">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-5xl font-bold text-center mb-16 text-white animate-fade-in-up">
                        Simple Pricing, Powerful Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                        {[
                            { name: "Free", price: "$0", features: ["Up to 5 Creations", "Basic Collaboration", "Responsive UI", "Essential Features"] },
                            { name: "Pro", price: "$20", features: ["Unlimited Creations", "Multi-Person Collaboration", "Rich Feature Set", "Responsive and UI Friendly", "Activity Tracking", "Priority Support", "Advanced Analytics"] },
                        ].map((plan, index) => (
                            <div
                                key={index}
                                className={`bg-gray-800 rounded-3xl p-10 shadow-2xl ${index === 1 ? 'border-2 border-blue-500 transform scale-105' : ''} hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up`}
                                style={{ animationDelay: `${index * 200}ms` }}
                            >
                                <h3 className="text-3xl font-bold mb-4 text-white">{plan.name}</h3>
                                <p className="text-5xl font-bold mb-8 text-white">{plan.price}<span className="text-2xl font-normal text-gray-400">{index === 0 ? '' : '/month'}</span></p>
                                <ul className="mb-10 space-y-4">
                                    {plan.features.map((feature, fIndex) => (
                                        <li key={fIndex} className="flex items-center text-gray-300 text-lg" >
                                            <Zap className="h-6 w-6 mr-3 text-blue-400" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Button className={`w-full py-4 rounded-full font-semibold text-xl ${index === 1 ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700' : 'bg-gray-700 text-white hover:bg-gray-600'} transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105`}>
                                    <Link href={index === 0 ? '/sign-up' : '/sign-in'}>
                                        {index === 0 ? 'Get Started' : 'Upgrade to Pro'}
                                    </Link>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900 to-purple-900 relative overflow-hidden">
                <div className="max-w-5xl mx-auto text-center relative z-10 animate-fade-in-up">
                    <h2 className="text-5xl font-bold mb-8 text-white">Ready to Revolutionize Your Workflow?</h2>
                    <p className="text-3xl mb-12 text-gray-300">Join thousands of teams already experiencing the future of productivity.</p>
                    <Button className='text-xl font-semibold py-4 px-12 rounded-full bg-white text-blue-900 hover:bg-gray-100 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:scale-105'>
                        <Link href="/sign-up">
                            Start Your Free Trial
                        </Link>
                    </Button>
                </div>
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    <div className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                </div>
            </section>
        </div>
    )
}

export default MarketingPage
