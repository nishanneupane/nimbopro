import React from 'react'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={`${montserrat.className} min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800`}>
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
                <div className="w-full md:w-1/2 mb-10 md:mb-0 pr-0 md:pr-10">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
                            Nimbo<span className="text-white">pro</span>
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl max-w-xl mx-auto md:mx-0">
                            Elevate your team&apos;s productivity. From skyscrapers to home offices, Nimbopro adapts to your unique workflow, enabling seamless collaboration and project management.
                        </p>
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout