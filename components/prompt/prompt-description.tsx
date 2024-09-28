"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import FormErrors from "../form/form-errors";
import { Textarea } from "../ui/textarea";

interface PromptDescriptionProps {
    id: string;
    label?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    errors?: Record<string, string[] | undefined>;
    className?: string;
    defaultValue?: string;
    onBlur?: () => void;
};

export const PromptDescription = forwardRef<HTMLTextAreaElement, PromptDescriptionProps>(({
    id,
    label,
    type,
    placeholder,
    required,
    disabled,
    errors,
    className,
    defaultValue = "",
    onBlur
}, ref) => {
    const { pending } = useFormStatus();

    return (
        <div className="space-y-3">
            <div className="space-y-2">
                {label ? (
                    <Label
                        htmlFor={id}
                        className="text-sm font-medium text-gray-200 tracking-wide"
                    >
                        {label}
                    </Label>
                ) : null}
                <Textarea
                    onBlur={onBlur}
                    defaultValue={defaultValue}
                    ref={ref}
                    required={required}
                    name={id}
                    id={id}
                    placeholder={placeholder}
                    disabled={pending || disabled}
                    className={cn(
                        "text-base px-4 py-3 h-32 bg-gray-800 border border-gray-700 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ease-in-out resize-none",
                        className,
                    )}
                    aria-describedby={`${id}-error`}
                />
            </div>
            <FormErrors
                id={id}
                errors={errors}
            />
        </div>
    )
});

PromptDescription.displayName = "PromptDescription";
