"use client"
import FormPopover from '@/components/form/form-popover';
import PromptPopover from '@/components/prompt/prompt-popover';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useOrganization } from '@clerk/nextjs'
import { Bot, CreditCard, Plus } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

interface InfoProps {
    isPro: boolean
}
const Info = ({ isPro }: InfoProps) => {
    const { organization, isLoaded } = useOrganization();

    if (!isLoaded) {
        return (
            <Info.Skeleton />
        )
    }

    return (
        <div className="flex items-center justify-between">
            <div className='flex items-center gap-x-4'>
                <div className="w-[60px] h-[60px] relative">
                    <Image
                        fill
                        src={organization?.imageUrl!}
                        alt='Organization'
                        className='rounded-md object-cover'
                    />
                </div>
                <div className="space-y-1">
                    <p className="font-semibold text-xl">
                        {organization?.name}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                        <CreditCard className='h-3 w-3 mr-1' />
                        {isPro ? "Pro" : "Free"}
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-end gap-2'>
                <FormPopover>
                    <Button size={"sm"} variant="primary" className='rounded-sm block md:hidden font-bold text-white'>
                        <Plus className='h-4 w-4' />
                    </Button>

                </FormPopover>
                <PromptPopover align='start' side='right' sideOffset={18}>
                    <Button size={"sm"} variant="primary" className='rounded-sm block md:hidden relative font-bold text-white'>
                        <Bot className='h-4 w-4' />
                        <Badge className='absolute -top-2 -right-[12px] text-xs scale-50'>
                            upcoming
                        </Badge>
                    </Button>
                </PromptPopover>
            </div>
            <div className='flex items-center justify-end gap-2'>
                <FormPopover align='start' side='bottom' sideOffset={18}>
                    <Button size={"lg"} variant={"default"} className='rounded-sm hidden md:block h-auto py-1.5 px-2'>
                        Create
                    </Button>

                </FormPopover>
                <PromptPopover align='start' side='right' sideOffset={18}>
                    <Button size={"lg"} variant={"default"} className='relative rounded-sm hidden md:flex h-auto py-1.5 px-2 bg-gradient-to-r from-teal-500 to-sky-600 text-white font-bold '>
                        Generate with ai
                        <Bot className='h-4 w-4 ml-2' />
                        <Badge className='absolute -top-2 -right-2 text-xs scale-50'>
                            upcoming
                        </Badge>
                    </Button>
                </PromptPopover>
            </div>

        </div>
    )
}

export default Info

Info.Skeleton = function SkeletonInfo() {
    return (
        <div className="flex items-center gap-x-4">
            <div className="w-[60px] h-[60px] relative">
                <Skeleton className='w-full  h-full absolute' />
            </div>
            <div className="space-y-2">
                <Skeleton className='h-10 w-[200px]' />
                <div className="flex items-center">
                    <Skeleton className='h-4 w-4 mr-2' />
                    <Skeleton className='h-4 w-[100px]' />
                </div>
            </div>
        </div>
    )
}