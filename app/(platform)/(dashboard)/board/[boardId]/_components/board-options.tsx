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
                <Button className='h-auto w-auto p-2 text-white hover:bg-white/20 transition' variant={"ghost"}>
                    <MoreHorizontal className='h-4 w-4' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="px-0 pb-3 pt-3" side="bottom" align="end">
                <div className="border-b border-border pb-4 text-center text-sm font-semibold text-foreground">
                    Board Actions
                </div>
                <PopoverClose asChild>
                    <Button
                        className='absolute right-2 top-2 h-auto w-auto p-2 text-muted-foreground transition hover:text-foreground'
                        variant={"ghost"}
                    >
                        <X className='h-4 w-4' />
                    </Button>
                </PopoverClose>
                <Button
                    variant={"ghost"}
                    onClick={onDelete}
                    disabled={isLoading}
                    className='h-auto w-full justify-start rounded-none p-3 px-5 text-sm font-normal text-destructive transition hover:bg-destructive/10 hover:text-destructive'
                >
                    <Trash2 className='h-4 w-4 mr-2' />
                    Delete this board
                </Button>
            </PopoverContent>
        </Popover>
    )
}

export default BoardOptions