"use client"

import React, { useMemo } from 'react'
import { useOrganization, useOrganizationList } from '@clerk/nextjs'
import { useLocalStorage } from 'usehooks-ts'
import Link from 'next/link'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Accordion } from '@/components/ui/accordion'
import NavItem, { Organization } from './nav-item'

interface SidebarProps {
    storageKey?: string;
}

const Sidebar = ({ storageKey = "t-sidebar-state" }: SidebarProps) => {
    const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {})
    const { organization: activeOrganization, isLoaded: isLoadedOrg } = useOrganization()
    const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
        userMemberships: { infinite: true }
    })

    const isLoading = !isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading

    const sortedOrganizations = useMemo(() => {
        return userMemberships.data
            ?.map(({ organization }) => organization as Organization)
            .sort((a, b) => a.name.localeCompare(b.name)) || []
    }, [userMemberships.data])

    const defaultAccordionValue: string[] = Object.keys(expanded).filter(key => expanded[key])

    const onExpand = (id: string) => {
        setExpanded(curr => ({ ...curr, [id]: !curr[id] }))
    }

    if (isLoading) {
        return (
            <div className="sticky left-0 top-0 h-full w-64 space-y-4 border-r border-border/60 bg-card/40 p-6">
                <Skeleton className="h-8 w-full rounded-lg" />
                <Skeleton className="h-12 w-full rounded-lg" />
                <Skeleton className="h-12 w-full rounded-lg" />
                <Skeleton className="h-12 w-full rounded-lg" />
            </div>
        )
    }

    return (
        <div className="sticky left-0 top-0 h-full w-64 overflow-y-auto border-r border-border/60 bg-card/40 p-4">
            <div className="mb-6 flex items-center justify-between px-2">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Workspaces</h2>
                <Button asChild type="button" size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground">
                    <Link href="/select-org">
                        <Plus className="h-4 w-4" />
                    </Link>
                </Button>
            </div>

            <Accordion
                type="multiple"
                defaultValue={defaultAccordionValue}
                className="space-y-1"
            >
                {sortedOrganizations.map((org) => (
                    <NavItem
                        key={org.id}
                        isActive={activeOrganization?.id === org.id}
                        isExpanded={expanded[org.id]}
                        organization={org}
                        onExpand={onExpand}
                    />
                ))}
            </Accordion>
        </div>
    )
}

export default Sidebar