import React from 'react'
import { Montserrat } from 'next/font/google'
import { CheckCircle2 } from 'lucide-react'

const montserrat = Montserrat({ subsets: ['latin'] })

const highlights = [
    'Organize projects across unlimited boards',
    'Real-time collaboration for your whole team',
    'Enterprise-grade security by default',
]

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={`${montserrat.className} min-h-screen grid lg:grid-cols-2 bg-[#07080c] text-white`}>
            {/* Brand panel */}
            <div className="relative hidden lg:flex flex-col justify-between p-14 overflow-hidden border-r border-white/5">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />

                <div className="relative z-10">
                    <h1 className="text-3xl font-extrabold tracking-tight">
                        Nimbo<span className="text-indigo-400">pro</span>
                    </h1>
                </div>

                <div className="relative z-10 max-w-md">
                    <h2 className="text-4xl font-bold leading-tight mb-6">
                        Elevate your team&apos;s productivity.
                    </h2>
                    <p className="text-gray-400 text-lg mb-10">
                        From skyscrapers to home offices, Nimbopro adapts to your
                        workflow — seamless collaboration and project management.
                    </p>
                    <ul className="space-y-4">
                        {highlights.map((item) => (
                            <li key={item} className="flex items-center gap-3 text-gray-300">
                                <CheckCircle2 className="h-5 w-5 text-indigo-400 shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <p className="relative z-10 text-sm text-gray-600">
                    &copy; {new Date().getFullYear()} Nimbopro. All rights reserved.
                </p>
            </div>

            {/* Auth panel */}
            <div className="flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md flex justify-center">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AuthLayout
