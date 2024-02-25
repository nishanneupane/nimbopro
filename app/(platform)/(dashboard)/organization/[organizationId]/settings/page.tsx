import { OrganizationProfile } from '@clerk/nextjs'
import React from 'react'

const SettingsPage = () => {
    return (
        <div className='w-full '>
            <OrganizationProfile
                appearance={{
                    elements: {
                        rootBox: {
                            boxShadow: "none",
                            width: "100%"
                        },
                        card: {
                            border: "1px solid #e5e5e5",
                            boxShadow: "none",
                            width: "100%"
                        }
                    },
                    variables:{
                        colorBackground:"#000",
                        colorText:"#fff"
                    }

                }}
            />
        </div>
    )
}

export default SettingsPage