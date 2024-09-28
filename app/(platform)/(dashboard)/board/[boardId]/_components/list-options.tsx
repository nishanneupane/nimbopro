"use client"
import { copyList } from '@/actions/copy-list';
import { deleteList } from '@/actions/delete-list';
import FormSubmit from '@/components/form/form-submit';
import { Button } from '@/components/ui/button';
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useAction } from '@/hooks/use-action';
import { List } from '@prisma/client'
import { MoreHorizontal, X, Plus, Copy, Trash2 } from 'lucide-react';
import React, { ElementRef, useRef } from 'react'
import { toast } from 'sonner';

interface ListOptionsProps {
    data: List;
    onAddCard: () => void;
}

const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
    const closeRef = useRef<ElementRef<"button">>(null)

    const { execute: executeDelete } = useAction(deleteList, {
        onSuccess: (data) => {
            toast.success(`List "${data.title}" deleted`, {
                style: { background: '#10B981', color: '#fff' }
            })
            closeRef.current?.click()
        },
        onError: (error) => {
            toast.error(error, {
                style: { background: '#EF4444', color: '#fff' }
            })
        }
    })

    const { execute: executeCopy } = useAction(copyList, {
        onSuccess: (data) => {
            toast.success(`List "${data.title}" copied`, {
                style: { background: '#3B82F6', color: '#fff' }
            })
            closeRef.current?.click()
        },
        onError: (error) => {
            toast.error(error, {
                style: { background: '#EF4444', color: '#fff' }
            })
        }
    })

    const onDelete = (formData: FormData) => {
        const id = formData.get("id") as string;
        const boardId = formData.get("boardId") as string;
        executeDelete({ id, boardId })
    }

    const onCopy = (formData: FormData) => {
        const id = formData.get("id") as string;
        const boardId = formData.get("boardId") as string;
        executeCopy({ id, boardId })
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                    <MoreHorizontal className='h-5 w-5 rounded-md text-gray-700 hover:text-gray-600 transition-colors ' />
            </PopoverTrigger>
            <PopoverContent
                className='w-64 p-0 rounded-lg shadow-lg bg-gray-800 border border-gray-700'
                side='bottom'
                align='end'
            >
                <div className="px-4 py-3 text-sm font-medium text-gray-200 border-b border-gray-700">
                    List Actions
                </div>
                <PopoverClose ref={closeRef} asChild>
                    <Button
                        className='h-6 w-6 p-0 absolute top-2 right-2 text-gray-400 hover:text-gray-200'
                        variant="ghost"
                    >
                        <X className='h-4 w-4' />
                    </Button>
                </PopoverClose>
                <div className="py-2">
                    <Button
                        onClick={onAddCard}
                        className='w-full px-4 py-2 text-left text-sm font-normal text-gray-300 hover:bg-gray-700 transition-colors flex items-center'
                        variant="ghost"
                    >
                        <Plus className='h-4 w-4 mr-2' />
                        Add card
                    </Button>
                    <form action={onCopy}>
                        <input hidden name='id' value={data.id} />
                        <input hidden name='boardId' value={data.boardId} />
                        <FormSubmit
                            variant='ghost'
                            className='w-full px-4 py-2 text-left text-sm font-normal text-gray-300 hover:bg-gray-700 transition-colors flex items-center'
                        >
                            <Copy className='h-4 w-4 mr-2' />
                            Copy list
                        </FormSubmit>
                    </form>
                    <Separator className='my-2 bg-gray-700' />
                    <form action={onDelete}>
                        <input hidden name='id' value={data.id} />
                        <input hidden name='boardId' value={data.boardId} />
                        <FormSubmit
                            variant='ghost'
                            className='w-full px-4 py-2 text-left text-sm font-normal text-red-400 hover:bg-red-900/30 transition-colors flex items-center'
                        >
                            <Trash2 className='h-4 w-4 mr-2' />
                            Delete this list
                        </FormSubmit>
                    </form>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default ListOptions