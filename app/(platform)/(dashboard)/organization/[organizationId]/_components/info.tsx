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
        <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-6 shadow-elevate">
            <div className='flex items-center gap-x-4'>
                <div className="relative h-[56px] w-[56px]">
                    <Image
                        fill
                        src={organization?.imageUrl!}
                        alt='Organization'
                        className='rounded-full border border-border object-cover'
                    />
                </div>
                <div className="space-y-1">
                    <p className="text-2xl font-semibold tracking-tight text-foreground">
                        {organization?.name}
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <CreditCard className='mr-2 h-4 w-4 text-primary' />
                        {isPro ? "Pro Plan" : "Free Plan"}
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-end gap-3'>
                <FormPopover>
                    <Button size={"icon"} className='block rounded-full md:hidden'>
                        <Plus className='h-5 w-5' />
                    </Button>
                </FormPopover>
                <PromptPopover align='start' side='right' sideOffset={18}>
                    <Button size={"icon"} className='relative block rounded-full bg-gradient-to-r from-teal-500 to-primary text-white hover:opacity-90 md:hidden'>
                        <Bot className='h-5 w-5' />
                        <Badge className='absolute -right-2 -top-2 bg-pink-500 text-xs text-white'>
                            New
                        </Badge>
                    </Button>
                </PromptPopover>
            </div>
            <div className='hidden items-center justify-end gap-3 md:flex'>
                <FormPopover align='start' side='bottom' sideOffset={18}>
                    <Button size={"lg"} className='h-auto rounded-full px-5 py-2.5'>
                        Create Board
                    </Button>
                </FormPopover>
                <PromptPopover align='start' side='right' sideOffset={18}>
                    <Button size={"lg"} className='relative h-auto rounded-full bg-gradient-to-r from-teal-500 to-primary px-5 py-2.5 font-semibold text-white transition hover:opacity-90'>
                        Generate with AI
                        <Bot className='ml-2 h-5 w-5' />
                        <Badge className='absolute -right-2 -top-2 bg-pink-500 text-xs text-white'>
                            New
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
        <div className="flex items-center gap-x-4 rounded-2xl border border-border bg-card p-6">
            <div className="relative h-[56px] w-[56px]">
                <Skeleton className='absolute h-full w-full rounded-full' />
            </div>
            <div className="space-y-2">
                <Skeleton className='h-8 w-[200px]' />
                <div className="flex items-center">
                    <Skeleton className='mr-2 h-4 w-4' />
                    <Skeleton className='h-4 w-[100px]' />
                </div>
            </div>
        </div>
    )
}