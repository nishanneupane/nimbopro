import { checkSubscription } from "@/lib/subscription"
import { Separator } from "@/components/ui/separator";
import Info from "../_components/info";
import { SubscriptionButton } from "./_components/subscription-button";
import { CreditCard, Shield } from 'lucide-react';

const BillingPage = async () => {
    const isPro = await checkSubscription();

    return (
        <div className="w-full">
            <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    Billing &amp; Subscription
                </h2>
                <CreditCard className="h-7 w-7 text-primary" />
            </div>
            <div className="mb-8">
                <Info isPro={isPro} />
            </div>
            <Separator className="my-8" />
            <div className="flex flex-col items-center">
                <div className="mb-6 flex items-center text-sm text-muted-foreground">
                    <Shield className="mr-2 h-4 w-4 text-primary" />
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
