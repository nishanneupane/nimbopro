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
        <div className="flex items-center justify-between bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className='flex items-center gap-x-4'>
                <div className="w-[60px] h-[60px] relative">
                    <Image
                        fill
                        src={organization?.imageUrl!}
                        alt='Organization'
                        className='rounded-full object-cover border-2 border-indigo-500'
                    />
                </div>
                <div className="space-y-1">
                    <p className="font-semibold text-2xl text-white">
                        {organization?.name}
                    </p>
                    <div className="flex items-center text-sm text-gray-300">
                        <CreditCard className='h-4 w-4 mr-2 text-indigo-400' />
                        {isPro ? "Pro Plan" : "Free Plan"}
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-end gap-4'>
                <FormPopover>
                    <Button size={"sm"} variant="primary" className='rounded-full block md:hidden font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300'>
                        <Plus className='h-5 w-5' />
                    </Button>
                </FormPopover>
                <PromptPopover align='start' side='right' sideOffset={18}>
                    <Button size={"sm"} variant="primary" className='rounded-full block md:hidden relative font-bold text-white bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 transition duration-300'>
                        <Bot className='h-5 w-5' />
                        <Badge className='absolute -top-2 -right-2 text-xs bg-pink-500 text-white'>
                            New
                        </Badge>
                    </Button>
                </PromptPopover>
            </div>
            <div className='hidden md:flex items-center justify-end gap-4'>
                <FormPopover align='start' side='bottom' sideOffset={18}>
                    <Button size={"lg"} variant={"default"} className='rounded-full h-auto py-2 px-4 bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300'>
                        Create Board
                    </Button>
                </FormPopover>
                <PromptPopover align='start' side='right' sideOffset={18}>
                    <Button size={"lg"} variant={"default"} className='relative rounded-full h-auto py-2 px-4 bg-gradient-to-r from-teal-500 to-indigo-600 text-white font-bold hover:from-teal-600 hover:to-indigo-700 transition duration-300'>
                        Generate with AI
                        <Bot className='h-5 w-5 ml-2' />
                        <Badge className='absolute -top-2 -right-2 text-xs bg-pink-500 text-white'>
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
        <div className="flex items-center gap-x-4 bg-gray-800 p-6 rounded-lg animate-pulse">
            <div className="w-[60px] h-[60px] relative">
                <Skeleton className='w-full h-full absolute rounded-full' />
            </div>
            <div className="space-y-2">
                <Skeleton className='h-8 w-[200px] bg-gray-700' />
                <div className="flex items-center">
                    <Skeleton className='h-4 w-4 mr-2 bg-gray-700' />
                    <Skeleton className='h-4 w-[100px] bg-gray-700' />
                </div>
            </div>
        </div>
    )
}