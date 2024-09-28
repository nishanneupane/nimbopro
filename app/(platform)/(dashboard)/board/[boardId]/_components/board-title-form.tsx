"use client"

import { updateBoard } from '@/actions/update-board'
import { FormInput } from '@/components/form/form-input'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/use-action'
import { Board } from '@prisma/client'
import React, { ElementRef, useRef, useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Edit2, Check } from 'lucide-react'

const BoardTitleForm = ({ data }: { data: Board }) => {
    const { execute } = useAction(updateBoard, {
        onSuccess: (data) => {
            toast.success(`Board "${data.title}" updated!`, {
                style: { background: '#10B981', color: '#FFFFFF' }
            })
            setTitle(data.title)
            disableEditing()
        },
        onError: (error) => {
            toast.error(error, {
                style: { background: '#EF4444', color: '#FFFFFF' }
            })
        }
    })

    const formRef = useRef<ElementRef<"form">>(null)
    const inputRef = useRef<ElementRef<"input">>(null)

    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(data.title)

    const disableEditing = () => setIsEditing(false)
    
    const enableEditing = () => {
        setIsEditing(true)
    }

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus()
            inputRef.current?.select()
        }
    }, [isEditing])

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string
        if (title !== data.title) {
            execute({
                title,
                id: data.id
            })
        } else {
            disableEditing()
        }
    }

    const onBlur = () => {
        formRef.current?.requestSubmit()
    }

    return (
        <div className="relative group">
            {isEditing ? (
                <form
                    action={onSubmit}
                    ref={formRef}
                    className='flex items-center gap-x-2 transition-all duration-300 ease-in-out'
                >
                    <FormInput
                        ref={inputRef}
                        id='title'
                        onBlur={onBlur}
                        defaultValue={title}
                        className='text-xl font-bold px-3 py-2 h-10 bg-white/10 backdrop-blur-sm rounded-md focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out'
                    />
                    <Button
                        type="submit"
                        variant="ghost"
                        size="icon"
                        className="bg-green-500/20 hover:bg-green-500/30 transition-colors"
                    >
                        <Check className="h-4 w-4 text-green-500" />
                    </Button>
                </form>
            ) : (
                <div className="transition-all duration-300 ease-in-out">
                    <Button
                        onClick={enableEditing}
                        variant="ghost"
                        className='font-bold text-xl h-auto w-auto p-2 rounded-md transition-all duration-200 ease-in-out hover:bg-white/10 group'
                    >
                        {title}
                        <Edit2 className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Button>
                </div>
            )}
        </div>
    )
}

export default BoardTitleForm