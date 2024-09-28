"use client"
import Logo from '@/components/logo'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import React from 'react'
import MobileSidebar from './mobile-sidebar'

const Navbar = () => {
    return (
        <nav className='fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-gray-900 flex items-center'>
            <MobileSidebar />
            <div className="flex items-center gap-4">
                <div className='hidden md:flex'>
                    <Logo />
                </div>
            </div>

            <div className="ml-auto flex items-center gap-x-2">
                <OrganizationSwitcher
                    hidePersonal
                    afterCreateOrganizationUrl={"/organization/:id"}
                    afterLeaveOrganizationUrl='select-org'
                    afterSelectOrganizationUrl={"/organization/:id"}
                    appearance={{
                        elements: {
                            rootBox: {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "#fff",
                                backgroundColor: "#1f2937",
                                padding: "4px",
                                borderRadius: "8px"
                            },
                            organizationSwitcherTrigger: {
                                backgroundColor: "#1f2937",
                            },
                        },
                        variables: {
                            colorText: "#fff",
                            colorBackground: "#1f2937",
                        }
                    }}
                />

                <UserButton 
                    afterSignOutUrl='/' 
                    appearance={{
                        elements: {
                            avatarBox: {
                                height: 32,
                                width: 32
                            },
                            userButtonTrigger: {
                                backgroundColor: "#1f2937",
                            },
                        },
                        variables: {
                            colorBackground: "#1f2937",
                            colorText: "#fff"
                        }
                    }} 
                />
            </div>
        </nav>
    )
}

export default Navbar