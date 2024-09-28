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
            <div className="w-64 h-full sticky left-0 top-0 bg-gray-900 p-6 space-y-4">
                <Skeleton className="h-8 w-full bg-gray-800 rounded-lg" />
                <Skeleton className="h-12 w-full bg-gray-800 rounded-lg" />
                <Skeleton className="h-12 w-full bg-gray-800 rounded-lg" />
                <Skeleton className="h-12 w-full bg-gray-800 rounded-lg" />
            </div>
        )
    }

    return (
        <div className="w-64 h-full sticky left-0 top-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6 overflow-y-auto shadow-2xl transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Workspaces</h2>
                <Button asChild type="button" size="sm" variant="ghost" className="hover:bg-gray-700 rounded-full p-2 transition-colors duration-200">
                    <Link href="/select-org">
                        <Plus className="h-5 w-5 text-blue-400 hover:text-purple-400 transition-colors duration-200" />
                    </Link>
                </Button>
            </div>

            <Accordion
                type="multiple"
                defaultValue={defaultAccordionValue}
                className="space-y-3"
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