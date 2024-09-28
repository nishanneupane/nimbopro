import React from 'react'

const PrivacyPolicyPage = () => {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-8 text-center text-white">Privacy Policy for Nimbo Pro</h1>
            <div className="space-y-6 text-gray-300">
                <p>Last updated: [Current Date]</p>
                
                <h2 className="text-2xl font-semibold mt-6 text-white">1. Introduction</h2>
                <p>Welcome to Nimbo Pro. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data and tell you about your privacy rights.</p>
                
                <h2 className="text-2xl font-semibold mt-6 text-white">2. Data We Collect</h2>
                <p>We may collect, use, store and transfer different kinds of personal data about you, including:</p>
                <ul className="list-disc pl-5 mt-2">
                    <li>Identity Data</li>
                    <li>Contact Data</li>
                    <li>Technical Data</li>
                    <li>Usage Data</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mt-6 text-white">3. How We Use Your Data</h2>
                <p>We use your personal data to provide and improve our services, communicate with you, and comply with legal obligations.</p>
                
                <h2 className="text-2xl font-semibold mt-6 text-white">4. Data Security</h2>
                <p>We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way.</p>
                
                <h2 className="text-2xl font-semibold mt-6 text-white">5. Your Rights</h2>
                <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to access, correct, erase, or object to processing of your personal data.</p>
                
                <h2 className="text-2xl font-semibold mt-6 text-white">6. Contact Us</h2>
                <p>If you have any questions about this privacy policy or our privacy practices, please contact us at [contact email].</p>
            </div>
        </div>
    )
}

export default PrivacyPolicyPage