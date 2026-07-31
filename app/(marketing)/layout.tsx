import React from 'react'
import Navbar from './_components/navbar'
import Footer from './_components/footer'

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Navbar />
            <main className="flex-grow pt-16">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default MarketingLayout
