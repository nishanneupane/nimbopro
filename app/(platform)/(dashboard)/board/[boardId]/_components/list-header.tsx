"use client"

import React, { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner';
import { useEventListener } from 'usehooks-ts';
import { List } from '@prisma/client'

import { updateList } from '@/actions/update-list';
import { FormInput } from '@/components/form/form-input';
import { useAction } from '@/hooks/use-action';
import ListOptions from './list-options';

interface ListHeaderProps {
    data: List;
    onAddCard: () => void;
}

const ListHeader = ({ data, onAddCard }: ListHeaderProps) => {
    const [title, setTitle] = useState(data.title)
    const [isEditing, setIsEditing] = useState(false)
    const formRef = useRef<ElementRef<"form">>(null)
    const inputRef = useRef<ElementRef<"input">>(null)

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        })
    }

    const disableEditing = () => {
        setIsEditing(false);
    }

    const { execute } = useAction(updateList, {
        onSuccess: (data) => {
            toast.success(`Renamed to "${data.title}"`)
            setTitle(data.title)
            disableEditing()
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const handleSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const id = formData.get("id") as string;
        const boardId = formData.get("boardId") as string;

        if (title === data.title) {
            return disableEditing()
        }

        execute({ title, id, boardId })
    }

    const onBlur = () => {
        formRef.current?.requestSubmit()
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            formRef.current?.requestSubmit()
        }
    }

    useEventListener("keydown", onKeyDown)

    return (
        <div className='flex items-start justify-between gap-x-2 rounded-t-xl px-2 pt-2 text-sm font-semibold text-card-foreground'>
            {isEditing ? (
                <form
                    ref={formRef}
                    action={handleSubmit}
                    className='flex-1 px-[2px]'
                >
                    <input
                        hidden
                        id="id"
                        name='id'
                        value={data.id}
                    />
                    <input
                        hidden
                        id='boardId'
                        name='boardId'
                        value={data.boardId}
                    />
                    <FormInput
                        ref={inputRef}
                        onBlur={onBlur}
                        id='title'
                        placeholder='Enter list title'
                        defaultValue={title}
                        className='h-7 truncate rounded border-transparent bg-transparent px-[7px] py-1 text-sm font-medium text-card-foreground transition hover:border-input focus:border-input focus:bg-muted'
                    />
                    <button type='submit' hidden />
                </form>
            ) : (
                <div
                    onClick={enableEditing}
                    className="h-7 w-full cursor-pointer rounded border-transparent px-2.5 py-1 text-sm font-medium text-card-foreground transition hover:bg-muted"
                >
                    {title}
                </div>
            )}
            <ListOptions
                data={data}
                onAddCard={onAddCard}
            />
        </div>
    )
}

export default ListHeader