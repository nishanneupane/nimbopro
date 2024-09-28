"use client"
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Activity, CreditCard, Layout, Settings } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

export type Organization = {
    id: string;
    slug: string;
    imageUrl: string;
    name: string;
}

interface NavItemProps {
    isExpanded: boolean;
    isActive: boolean;
    organization: Organization;
    onExpand: (id: string) => void;
}

const NavItem = ({ isExpanded, isActive, organization, onExpand }: NavItemProps) => {
    const routes = [
        {
            label: "Boards",
            icon: <Layout className='h-4 w-4 mr-2' />,
            href: `/organization/${organization.id}`
        },
        {
            label: "Activity",
            icon: <Activity className='h-4 w-4 mr-2' />,
            href: `/organization/${organization.id}/activity`
        },
        {
            label: "Settings",
            icon: <Settings className='h-4 w-4 mr-2' />,
            href: `/organization/${organization.id}/settings`
        },
        {
            label: "Billing",
            icon: <CreditCard className='h-4 w-4 mr-2' />,
            href: `/organization/${organization.id}/billing`
        },
    ];
    const router = useRouter()
    const pathname = usePathname()

    const onClick = (href: string) => {
        router.push(href)
    }

    return (
        <AccordionItem
            value={organization.id}
            className='border-none'
        >
            <AccordionTrigger 
                onClick={() => onExpand(organization.id)} 
                className={cn(
                    "flex items-center gap-x-2 p-3 text-gray-300 rounded-lg hover:bg-gray-800/50 transition-all duration-300 text-start no-underline hover:no-underline group",
                    isActive && !isExpanded && "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                )}
            >
                <div className="flex items-center gap-x-3">
                    <div className="w-10 h-10 relative overflow-hidden rounded-lg shadow-inner transition-transform duration-300 group-hover:scale-110">
                        <Image
                            fill
                            src={organization.imageUrl}
                            alt='Organization'
                            className='object-cover'
                        />
                    </div>
                    <span className="font-semibold text-sm group-hover:text-white transition-colors duration-300">{organization.name}</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className='pt-2 text-gray-300 space-y-1'>
                {routes.map((route) => (
                    <Button 
                        key={route.href} 
                        size="sm" 
                        onClick={() => onClick(route.href)} 
                        className={cn(
                            "w-full font-normal justify-start pl-12 py-2 text-gray-300 hover:text-white hover:bg-gray-800/70 transition-all duration-300",
                            pathname === route.href && "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                        )} 
                        variant="ghost"
                    >
                        {route.icon}
                        <span className="ml-2 text-sm">{route.label}</span>
                    </Button>
                ))}
            </AccordionContent>
        </AccordionItem>
    )
}

export default NavItem

NavItem.Skeleton = function SkeletonNavItem() {
    return (
        <div className="flex items-center gap-x-3 p-3 animate-pulse">
            <Skeleton className="w-10 h-10 rounded-lg bg-gray-700" />
            <Skeleton className="h-6 w-32 bg-gray-700" />
        </div>
    )
}