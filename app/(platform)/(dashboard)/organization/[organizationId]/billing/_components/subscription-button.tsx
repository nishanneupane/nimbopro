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
    <div className="flex w-full max-w-md flex-col items-center justify-center rounded-2xl border border-border bg-card p-8 shadow-elevate">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          {isPro ? "Pro Plan" : "Free Plan"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {isPro ? "Enjoy premium features" : "Upgrade for more power"}
        </p>
      </div>
      <div className="relative mb-10 flex h-24 w-24 items-center justify-center rounded-2xl bg-accent">
        {isPro ? (
          <CreditCard className="h-12 w-12 text-primary" />
        ) : (
          <Sparkles className="h-12 w-12 text-primary animate-float" />
        )}
      </div>
      <Button
        variant={isPro ? "secondary" : "default"}
        onClick={onClick}
        disabled={isLoading}
        className="h-14 w-64 rounded-full text-lg font-semibold shadow-elevate transition hover:scale-[1.02]"
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
      <p className="mt-4 text-xs text-muted-foreground">
        {isPro ? "Cancel anytime" : "7-day free trial, cancel anytime"}
      </p>
    </div>
  )
};