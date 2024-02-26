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
            toast.success("Board created !")
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
            <PopoverTrigger>
                {children}
            </PopoverTrigger>
            <PopoverContent align={align} className='w-80 pt-3' side={side} sideOffset={sideOffset}>
                <div className="text-sm font-medium text-center text-neutral-200 pb-4">
                    Generate board with ai
                </div>
                <PopoverClose ref={closeRef} asChild>
                    <Button
                        className=' h-auto w-auto p-2 absolute top-2 right-2 text-neutral-200'
                        variant={"ghost"}
                    >
                        <X className='w-4 h-4 ' />
                    </Button>
                </PopoverClose>
                <form className='space-y-4' action={onSubmit}>
                    <div className="space-y-4">
                        <FormPicker
                            id="image"
                            errors={fieldErrors} />
                        <FormInput
                            id="title"
                            label='Board title'
                            type='text'
                            errors={fieldErrors}
                        />
                        <PromptDescription
                            id='Description'
                            label='Board Prompt'
                            type='text'
                            placeholder='Give a appropriate explanation to your board.'
                            errors={fieldErrors}
                        />
                    </div>
                    <FormSubmit className='w-full text-neutral-200'>Generate <Bot className='h-5 w-5 ml-2 font-bold text-white' /></FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    )
}

export default PromptPopover