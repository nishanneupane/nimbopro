import React, { ElementRef, useRef } from 'react'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { Bot, X } from 'lucide-react';
import { useProModal } from '@/hooks/use-pro-modal';
import { useAction } from '@/hooks/use-action';
import { createBoard } from '@/actions/create-board';
import { toast } from 'sonner';
import { FormInput } from '../form/form-input';
import FormPicker from '../form/form-picker';
import FormSubmit from '../form/form-submit';
import { PromptDescription } from './prompt-description';

interface PromptPopoverProps {
    children: React.ReactNode;
    side?: "left" | "right" | "top" | "bottom";
    align?: "start" | "center" | "end";
    sideOffset?: number;
}

const PromptPopover = ({ children, align, side, sideOffset }: PromptPopoverProps) => {
    const router = useRouter();
    const proModal = useProModal()
    const closeRef = useRef<ElementRef<"button">>(null);

    const { execute, fieldErrors } = useAction(createBoard, {
        onSuccess: (data) => {
            toast.success("Board created!")
            closeRef.current?.click();
            router.push(`/board/${data.id}`)
        },
        onError: (error) => {
            toast.error(error)
            proModal.onOpen()
        }
    })

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const image = formData.get("image") as string;
        const description = formData.get("description") as string;
        execute({ title, image })
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent 
                align={align} 
                side={side} 
                sideOffset={sideOffset}
                className='w-96 p-6 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl'
            >
                <h3 className="text-xl font-semibold text-white text-center mb-6">
                    Generate Board with AI
                </h3>
                <PopoverClose ref={closeRef} asChild>
                    <Button
                        className='absolute top-3 right-3 text-gray-400 hover:text-white transition-colors'
                        variant="ghost"
                        size="icon"
                    >
                        <X className='w-5 h-5' />
                    </Button>
                </PopoverClose>
                <form className='space-y-6' onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(new FormData(e.currentTarget));
                }}>
                    <FormPicker
                        id="image"
                        errors={fieldErrors}
                    />
                    <FormInput
                        id="title"
                        label='Board Title'
                        type='text'
                        errors={fieldErrors}
                        placeholder="Enter board title"
                        className="bg-gray-800 text-white border-gray-700 focus:border-indigo-500"
                    />
                    <PromptDescription
                        id='description'
                        label='Board Prompt'
                        placeholder='Describe your board in detail...'
                        errors={fieldErrors}
                        className="bg-gray-800 text-white border-gray-700 focus:border-indigo-500"
                    />
                    <FormSubmit className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors'>
                        <span className="flex items-center justify-center">
                            Generate
                            <Bot className='h-5 w-5 ml-2' />
                        </span>
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    )
}

export default PromptPopover