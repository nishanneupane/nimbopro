import { AuditLog } from '@prisma/client'
import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar';
import { generateLogMessage } from '@/lib/generate-log-message';
import { format } from "date-fns"

interface ActivityItemProps {
    data: AuditLog;
}

const ActivityItem = ({ data }: ActivityItemProps) => {
    return (
        <li className="flex items-center gap-4 p-3 rounded-lg bg-gradient-to-r from-gray-800 to-gray-700 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-600">
            <Avatar className="h-10 w-10 ring-2 ring-indigo-400 ring-offset-2 ring-offset-gray-800">
                <AvatarImage
                    src={data.userImage}
                    alt={data.userName}
                    className="object-cover"
                />
            </Avatar>
            <div className="flex flex-col space-y-1 flex-grow">
                <p className="text-sm text-gray-200 leading-snug">
                    <span className="font-semibold text-indigo-400 mr-1">
                        {data.userName}
                    </span>
                    <span className="text-gray-300">
                        {generateLogMessage(data)}
                    </span>
                </p>
                <p className="text-xs text-gray-400 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {new Date(data.createdAt).toLocaleString('en-US', { 
                        timeZone: 'Asia/Kathmandu', 
                        hour12: true, 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric', 
                        hour: 'numeric', 
                        minute: 'numeric' 
                    })}
                </p>
            </div>
        </li>
    )
}

export default ActivityItem