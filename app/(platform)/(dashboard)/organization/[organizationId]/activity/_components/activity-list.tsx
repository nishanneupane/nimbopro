import ActivityItem from '@/components/activity-item';
import { Skeleton } from '@/components/ui/skeleton';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation';
import React from 'react'

const ActivityList = async () => {
    const { orgId } = auth();
    if (!orgId) {
        redirect("select-org")
    }

    const auditLogs = await db.auditLog.findMany({
        where: {
            orgId
        },
        orderBy: {
            createdAt: "desc"
        },
    });

    return (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-elevate">
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">Activity Log</h2>
            {auditLogs.length === 0 ? (
                <p className="rounded-md border border-border bg-muted p-4 text-center text-muted-foreground">
                    No activity found inside this organization
                </p>
            ) : (
                <ol className="space-y-4">
                    {auditLogs.map((log) => (
                        <ActivityItem key={log.id} data={log} />
                    ))}
                </ol>
            )}
        </div>
    )
}

export default ActivityList

ActivityList.Skeleton = function ActivityListSkeleton() {
    return (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-elevate">
            <Skeleton className="mb-4 h-8 w-1/3" />
            <ol className="space-y-4">
                {[...Array(5)].map((_, index) => (
                    <li key={index}>
                        <Skeleton className="h-16 w-full rounded-md" />
                    </li>
                ))}
            </ol>
        </div>
    )
}