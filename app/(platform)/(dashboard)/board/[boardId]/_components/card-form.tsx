"use client"

import { createCard } from '@/actions/create-card';
import FormSubmit from '@/components/form/form-submit';
import { FormTextarea } from '@/components/form/form-textarea';
import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/use-action';
import { Plus, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { ElementRef, KeyboardEventHandler, forwardRef, useRef } from 'react'
import { toast } from 'sonner';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';

interface CardFormProps {
    listId: string;
    enableEditing: () => void;
    disableEditing: () => void;
    isEditing: boolean;
}

const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(({ listId, enableEditing, disableEditing, isEditing }, ref) => {
    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);
    const { execute, fieldErrors } = useAction(createCard, {
        onSuccess: (data) => {
            toast.success(`Card "${data.title}" created`)
            disableEditing()
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing()
        }
    }

    useOnClickOutside(formRef, disableEditing)
    useEventListener("keydown", onKeyDown)

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            formRef.current?.requestSubmit()
        }
    }

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const listId = formData.get("listId") as string;
        const boardId = params.boardId as string;

        execute({
            title,
            listId,
            boardId
        })
    }

    if (isEditing) {
        return (
            <form
                ref={formRef}
                action={onSubmit}
                className='space-y-3 rounded-xl border border-border/60 bg-card/95 p-3 shadow-elevate backdrop-blur'
            >
                <FormTextarea
                    id='title'
                    onKeyDown={onTextareaKeyDown}
                    ref={ref}
                    placeholder='Enter a title for this card ..'
                    errors={fieldErrors}
                    className='w-full resize-none rounded-md'
                />
                <input
                    hidden
                    id='listId'
                    name='listId'
                    value={listId}
                />
                <div className="flex items-center gap-x-2">
                    <FormSubmit>
                        Add card
                    </FormSubmit>
                    <Button
                        onClick={disableEditing}
                        size="icon"
                        variant="ghost"
                    >
                        <X className='h-5 w-5' />
                    </Button>
                </div>
            </form>
        )
    }

    return (
        <div className='pt-2 px-2'>
            <Button
                onClick={enableEditing}
                className='h-auto w-full justify-start rounded-lg px-4 py-3 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground'
                variant="ghost"
                size="sm"
            >
                <Plus className='h-4 w-4 mr-2' />
                Add a card
            </Button>
        </div>
    )
})

export default CardForm
CardForm.displayName = "CardForm"
