import { checkSubscription } from "@/lib/subscription"
import { Separator } from "@/components/ui/separator";
import Info from "../_components/info";
import { SubscriptionButton } from "./_components/subscription-button";
import { CreditCard, Shield } from 'lucide-react';

const BillingPage = async () => {
    const isPro = await checkSubscription();

    return (
        <div className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        Billing & Subscription
                    </span>
                </h2>
                <CreditCard className="h-8 w-8 text-purple-400" />
            </div>
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-xl shadow-lg backdrop-blur-sm mb-8 transition-all duration-300 hover:shadow-purple-500/10">
                <Info isPro={isPro} />
            </div>
            <Separator className="my-8 bg-gray-700 opacity-50" />
            <div className="flex flex-col items-center">
                <div className="mb-6 flex items-center text-gray-300">
                    <Shield className="h-5 w-5 mr-2 text-purple-400" />
                    <span>Secure payment processing</span>
                </div>
                <SubscriptionButton
                    isPro={isPro}
                />
            </div>
        </div>
    );
};

export default BillingPage;
