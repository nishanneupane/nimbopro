import { OrganizationProfile } from '@clerk/nextjs'
import React from 'react'

const SettingsPage = () => {
    return (
        <div className='w-full'>
            <OrganizationProfile
                appearance={{
                    elements: {
                        rootBox: "w-full",
                        card: "w-full shadow-2xl border border-white/10",
                    },
                }}
            />
        </div>
    )
}

export default SettingsPage
