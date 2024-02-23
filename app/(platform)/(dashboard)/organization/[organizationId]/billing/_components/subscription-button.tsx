"use client";

import { toast } from "sonner";

import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { useProModal } from "@/hooks/use-pro-modal";

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
    <div className="flex flex-col gap-3 items-start justify-start">
      <div className="flex items-center justify-center">
        <h1 className="bg-gradient-to-r from-blue-500 to-teal-400 text-transparent bg-clip-text p-2 rounded-md mt-3 font-3xl md:font-6xl font-extrabold">You are on {isPro ? "pro " : "free "} plan</h1>
      </div>
      <Button
        variant="default"
        onClick={onClick}
        disabled={isLoading}
      >
        {isPro ? "Manage subscription" : "Upgrade to pro"}
      </Button>
    </div>
  )
};