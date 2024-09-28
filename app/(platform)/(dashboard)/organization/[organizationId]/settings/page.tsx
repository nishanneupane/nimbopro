import { OrganizationProfile } from '@clerk/nextjs'
import React from 'react'

const SettingsPage = () => {
    return (
        <div className='w-full bg-gradient-to-r from-gray-900 to-gray-800 p-8 rounded-lg shadow-2xl'>
            <OrganizationProfile
                appearance={{
                    elements: {
                        rootBox: {
                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)",
                            width: "100%",
                            borderRadius: "1rem",
                            overflow: "hidden"
                        },
                        card: {
                            border: "none",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)",
                            width: "100%",
                            backgroundColor: "rgba(30, 30, 30, 0.6)",
                            backdropFilter: "blur(10px)"
                        },
                        navbar: {
                            backgroundColor: "transparent"
                        },
                        headerTitle: {
                            color: "#ffffff",
                            fontWeight: "bold"
                        },
                        headerSubtitle: {
                            color: "rgba(255, 255, 255, 0.7)"
                        },
                        button: {
                            backgroundColor: "#3730a3",
                            color: "#ffffff",
                            '&:hover': {
                                backgroundColor: "#4338ca"
                            }
                        },
                        formFieldInput: {
                            backgroundColor: "rgba(50, 50, 50, 0.8)",
                            color: "#ffffff",
                            border: "1px solid rgba(255, 255, 255, 0.1)"
                        },
                        formFieldLabel: {
                            color: "rgba(255, 255, 255, 0.9)"
                        },
                        navbarButton: {
                            color: "#ffffff",
                            '&:hover': {
                                backgroundColor: "rgba(255, 255, 255, 0.1)"
                            }
                        },
                        activeNavbarButton: {
                            color: "#ffffff",
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            '&:hover': {
                                backgroundColor: "rgba(255, 255, 255, 0.3)"
                            }
                        }
                    },
                    variables: {
                        colorBackground: "#1f2937",
                        colorText: "#ffffff",
                        colorPrimary: "#6366f1",
                        colorDanger: "#ef4444",
                        colorInputBackground: "#374151",
                        colorInputText: "#ffffff",
                        colorAlphaShade: "rgba(255, 255, 255, 0.1)"
                    }
                }}
            />
        </div>
    )
}

export default SettingsPage