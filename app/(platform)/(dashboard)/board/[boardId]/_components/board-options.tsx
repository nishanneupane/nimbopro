"use client"
import { deleteBoard } from '@/actions/delete-board'
import { Button } from '@/components/ui/button'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useAction } from '@/hooks/use-action'
import { MoreHorizontal, X, Trash2 } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

const BoardOptions = ({ id }: { id: string }) => {
    const { execute, isLoading } = useAction(deleteBoard, {
        onError: (error) => {
            toast.error(error)
        }
    })

    const onDelete = () => {
        execute({ id })
    }
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className='h-auto w-auto p-2 hover:bg-neutral-800 transition' variant={"ghost"}>
                    <MoreHorizontal className='h-4 w-4 text-neutral-400' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="px-0 pt-3 pb-3 shadow-md bg-neutral-900 border border-neutral-800" side="bottom" align="end">
                <div className="text-sm font-semibold text-center text-neutral-300 pb-4 border-b border-neutral-800">
                    Board Actions
                </div>
                <PopoverClose asChild>
                    <Button
                        className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-400 hover:text-neutral-200 transition'
                        variant={"ghost"}
                    >
                        <X className='h-4 w-4' />
                    </Button>
                </PopoverClose>
                <Button
                    variant={"ghost"}
                    onClick={onDelete}
                    disabled={isLoading}
                    className='rounded-none w-full h-auto p-3 px-5 justify-start font-normal text-sm text-red-400 hover:text-red-300 hover:bg-red-900/50 transition'
                >
                    <Trash2 className='h-4 w-4 mr-2' />
                    Delete this board
                </Button>
            </PopoverContent>
        </Popover>
    )
}

export default BoardOptions