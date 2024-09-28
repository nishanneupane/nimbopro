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
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-white">Activity Log</h2>
            {auditLogs.length === 0 ? (
                <p className="text-center text-gray-400 bg-gray-800 p-4 rounded-md shadow">
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
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-lg shadow-xl animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
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