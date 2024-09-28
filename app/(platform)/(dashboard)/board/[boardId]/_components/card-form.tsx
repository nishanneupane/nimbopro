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
                className='bg-gray-900 shadow-lg rounded-lg p-4 space-y-4'
            >
                <FormTextarea
                    id='title'
                    onKeyDown={onTextareaKeyDown}
                    ref={ref}
                    placeholder='Enter a title for this card ..'
                    errors={fieldErrors}
                    className='w-full resize-none border-none rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white placeholder-gray-400'
                />
                <input
                    hidden
                    id='listId'
                    name='listId'
                    value={listId}
                />
                <div className="flex items-center gap-x-2">
                    <FormSubmit 
                        variant='primary'
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 shadow-md"
                    >
                        Add card
                    </FormSubmit>
                    <Button
                        onClick={disableEditing}
                        size="sm"
                        variant="ghost"
                        className="text-gray-400 hover:text-gray-200 transition duration-200"
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
                className='h-auto px-4 py-3 w-full justify-start text-gray-300 text-sm bg-gray-800 hover:bg-gray-700 transition duration-200 rounded-lg shadow-md'
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
