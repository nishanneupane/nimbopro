"use client"
import React, { ElementRef, useRef, useState } from 'react'
import ListWrapper from './list-wrapper'
import { Plus, X } from 'lucide-react'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'
import { FormInput } from '@/components/form/form-input'
import { useParams, useRouter } from 'next/navigation'
import FormSubmit from '@/components/form/form-submit'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useAction } from '@/hooks/use-action'
import { createList } from '@/actions/create-list'

const ListForm = () => {
    const params = useParams()
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const formRef = useRef<ElementRef<"form">>(null)
    const inputRef = useRef<ElementRef<"input">>(null)

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus()
        })
    }
    const disableEditing = () => {
        setIsEditing(false);
    }

    const { execute, fieldErrors } = useAction(createList, {
        onSuccess: (data) => {
            toast.success(`List "${data.title}" created`)
            disableEditing()
            router.refresh()
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key == "Escape") {
            disableEditing()
        }
    }

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disableEditing)

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const boardId = formData.get("boardId") as string;

        execute({ title, boardId })
    }

    return (
        <ListWrapper>
            {isEditing ? (
                <form
                    action={onSubmit}
                    ref={formRef}
                    className='w-full space-y-3 rounded-xl border border-border/60 bg-card/90 p-3 shadow-elevate backdrop-blur transition-all duration-200'
                >
                    <FormInput
                        ref={inputRef}
                        errors={fieldErrors}
                        id='title'
                        className='h-10 w-full rounded-md px-3 py-2 text-sm font-medium'
                        placeholder='Enter list title'
                    />
                    <input
                        hidden
                        value={params.boardId}
                        name='boardId'
                    />

                    <div className="flex items-center gap-x-2">
                        <FormSubmit className="flex-1">
                            Add list
                        </FormSubmit>
                        <Button
                            onClick={disableEditing}
                            size={"icon"}
                            variant={"ghost"}
                        >
                            <X className='h-5 w-5' />
                        </Button>
                    </div>
                </form>
            ) : (
                <button
                    onClick={enableEditing}
                    className='flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/10 p-3 text-sm font-medium text-white backdrop-blur transition-all duration-200 hover:bg-white/20'
                >
                    <Plus className='h-5 w-5 mr-2' />
                    Add a list
                </button>
            )}
        </ListWrapper>
    )
}

export default ListForm