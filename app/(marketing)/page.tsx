import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import LocalFont from "next/font/local"
import { cn } from '@/lib/utils'
import { Building, Globe, TabletSmartphone } from 'lucide-react'

const headingFont = LocalFont({
    src: "../../public/fonts/font.woff2"
})

const MarketingPage = () => {
    return (
        <div className='flex items-center justify-start flex-col bg-gray-900 min-h-screen'>
            <div className={cn("flex items-center justify-center flex-col", headingFont.className)}>
                <h1 className="text-3xl md:text-6xl text-center text-gray-100 mb-6">
                    Manage your tasks easily with<br />
                    <span className="bg-gradient-to-r from-blue-500 to-teal-400 text-transparent bg-clip-text p-2 rounded-md mt-3">Nimbopro</span>
                </h1>
            </div>
            <div className="text-base md:text-lg text-gray-500 mt-4 max-w-md md:max-w-2xl text-center mx-auto">
                Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique - accomplish it all with Nimbopro.
            </div>
            <Button className='mt-6 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 mb-5 -z-10'>
                <Link href={"/sign-up"}>
                    Get Nimbopro for Free
                </Link>
            </Button>


            {/* Services Section */}
            <section className="py-10 w-full">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-100 mb-6">What you&apos;ll get?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-black shadow-md rounded-lg p-6">
                            <h3 className="text-xl font-extrabold bg-gradient-to-r from-blue-500 to-teal-400 text-white mb-2 w-[50px] p-2 rounded-md"><TabletSmartphone className='h-8 w-8 mr-2' /></h3>
                            <p className="text-gray-100">
                                Responsive UI
                            </p>
                        </div>
                        <div className="bg-black shadow-md rounded-lg p-6">
                            <h3 className="text-xl font-extrabold bg-gradient-to-r from-blue-500 to-teal-400 text-white mb-2 w-[50px] p-2 rounded-md"><Building className='h-8 w-8 mr-2' /></h3>
                            <p className="text-gray-100">
                                Organization connectivity
                            </p>
                        </div>
                        <div className="bg-black shadow-md rounded-lg p-6">
                            <h3 className="text-xl font-extrabold bg-gradient-to-r from-blue-500 to-teal-400 text-white mb-2 w-[50px] p-2 rounded-md"><Globe className='h-8 w-8 mr-2' /></h3>
                            <p className="text-gray-100">
                                Seamless Productivity
                            </p>
                        </div>
                       
                    </div>
                </div>
            </section>
        </div>
    )
}

export default MarketingPage
