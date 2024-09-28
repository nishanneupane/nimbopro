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
                    className='w-full p-3 rounded-lg bg-gray-800 space-y-4 shadow-lg transition-all duration-200'
                >
                    <FormInput
                        ref={inputRef}
                        errors={fieldErrors}
                        id='title'
                        className='w-full text-sm px-3 py-2 h-10 font-medium border-2 border-gray-600 rounded-md focus:border-blue-400 focus:ring-2 focus:ring-blue-700 transition-all'
                        placeholder='Enter List title'
                    />
                    <input
                        hidden
                        value={params.boardId}
                        name='boardId'
                    />

                    <div className="flex items-center gap-x-2">
                        <FormSubmit className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors">
                            Add list
                        </FormSubmit>
                        <Button
                            onClick={disableEditing}
                            size={"sm"}
                            variant={"outline"}
                            className="border-2 border-gray-600 hover:bg-gray-700 transition-colors"
                        >
                            <X className='h-5 w-5' />
                        </Button>
                    </div>
                </form>
            ) : (
                <button
                    onClick={enableEditing}
                    className='w-full rounded-lg bg-black/30 hover:bg-black/40 transition-all duration-200 p-3 flex items-center justify-center font-medium text-sm text-white'
                >
                    <Plus className='h-5 w-5 mr-2' />
                    Add a list
                </button>
            )}
        </ListWrapper>
    )
}

export default ListForm