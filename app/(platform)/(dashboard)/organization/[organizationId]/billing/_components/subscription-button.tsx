"use client";

import { toast } from "sonner";
import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { useProModal } from "@/hooks/use-pro-modal";
import { Sparkles, CreditCard } from "lucide-react";

interface SubscriptionButtonProps {
  isPro: boolean;
};

export const SubscriptionButton = ({
  isPro,
}: SubscriptionButtonProps) => {
  const proModal = useProModal();

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  const onClick = () => {
    if (isPro) {
      execute({});
    } else {
      proModal.onOpen();
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.3)] transition-all duration-300 ease-in-out hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)]">
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 tracking-tight">
          {isPro ? "Pro Plan" : "Free Plan"}
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          {isPro ? "Enjoy premium features" : "Upgrade for more power"}
        </p>
      </div>
      <div className="mb-10 relative">
        {isPro ? (
          <CreditCard className="w-20 h-20 text-purple-400 animate-pulse" />
        ) : (
          <Sparkles className="w-20 h-20 text-blue-400 animate-bounce" />
        )}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
      </div>
      <Button
        variant={isPro ? "secondary" : "default"}
        onClick={onClick}
        disabled={isLoading}
        className={`w-64 h-16 text-lg font-semibold rounded-full transition-all duration-300 ${
          isPro 
            ? "bg-purple-600 hover:bg-purple-700 text-white" 
            : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
        } transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 ${
          isPro ? "focus:ring-purple-500" : "focus:ring-blue-500"
        } shadow-lg hover:shadow-xl`}
      >
        {isPro ? (
          <span className="flex items-center justify-center">
            <CreditCard className="mr-2 w-6 h-6" />
            Manage Plan
          </span>
        ) : (
          <span className="flex items-center justify-center">
            <Sparkles className="mr-2 w-6 h-6" />
            Upgrade to Pro
          </span>
        )}
      </Button>
      <p className="mt-4 text-xs text-gray-500">
        {isPro ? "Cancel anytime" : "7-day free trial, cancel anytime"}
      </p>
    </div>
  )
};