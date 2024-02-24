import React from 'react'
import Navbar from './_components/navbar'
import Footer from './_components/footer'

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-screen bg-slate-900'>
            <Navbar />
            <main className='pt-20 pb-20 bg-slate-900'>
                {children}
            </main>
            {/* <Footer/> */}
        </div>
    )
}

export default MarketingLayout