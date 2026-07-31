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
                    "group flex items-center gap-x-2 rounded-lg p-2 text-start text-muted-foreground no-underline transition hover:bg-accent hover:text-foreground hover:no-underline",
                    isActive && !isExpanded && "bg-accent text-accent-foreground"
                )}
            >
                <div className="flex items-center gap-x-3">
                    <div className="relative h-8 w-8 overflow-hidden rounded-md border border-border">
                        <Image
                            fill
                            src={organization.imageUrl}
                            alt='Organization'
                            className='object-cover'
                        />
                    </div>
                    <span className="text-sm font-medium">{organization.name}</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className='space-y-1 pt-1'>
                {routes.map((route) => (
                    <Button
                        key={route.href}
                        size="sm"
                        onClick={() => onClick(route.href)}
                        className={cn(
                            "w-full justify-start pl-11 font-normal text-muted-foreground transition hover:bg-accent hover:text-foreground",
                            pathname === route.href && "bg-primary/10 font-medium text-primary hover:bg-primary/10 hover:text-primary"
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