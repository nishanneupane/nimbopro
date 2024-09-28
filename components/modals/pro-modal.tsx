"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAction } from "@/hooks/use-action";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { toast } from "sonner";
import { CheckCircle, ArrowRight } from "lucide-react";

export const ProModal = () => {
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
    execute({});
  };

  const features = [
    { text: "Unlimited boards", description: "Create as many boards as you need" },
    { text: "Advanced checklists", description: "Nested lists, dependencies, and more" },
    { text: "Admin controls", description: "Manage team access and permissions" },
    { text: "AI task suggestions", description: "Get smart recommendations for your workflow" },
    { text: "Unlimited integrations", description: "Connect with all your favorite tools" },
  ];

  return (
    <Dialog
      open={proModal.isOpen}
      onOpenChange={proModal.onClose}
    >
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-gray-900 text-gray-100 rounded-lg">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-8 space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Upgrade to Nimbo Pro</h2>
              <p className="text-gray-400">Take your productivity to the next level</p>
            </div>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{feature.text}</p>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              disabled={isLoading}
              onClick={onClick}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-all duration-200 flex items-center justify-center group"
            >
              Upgrade Now
              <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
            <p className="text-xs text-center text-gray-500">
              30-day money-back guarantee. No questions asked.
            </p>
          </div>
          <div className="md:w-1/2 relative">
            <Image
              src="/hero.svg"
              alt="Nimbo Pro Features"
              layout="fill"
              objectFit="cover"
              className="rounded-r-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <blockquote className="text-lg font-medium italic">
                Nimbo Pro has revolutionized our team&apos;s workflow. It&apos;s an essential tool for any serious project management.
              </blockquote>
              <p className="mt-2 text-sm">- Nishan Neupane, Product Manager</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
