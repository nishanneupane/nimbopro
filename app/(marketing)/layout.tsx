import React from 'react'
import Navbar from './_components/navbar'
import Footer from './_components/footer'

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default MarketingLayout