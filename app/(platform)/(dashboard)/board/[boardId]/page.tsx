import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'
import ListContainer from './_components/list-container';
import { Skeleton } from '@/components/ui/skeleton';

interface BoardIdPageProps {
    params: {
        boardId: string;
    }
}

const BoardContent = async ({ boardId, orgId }: { boardId: string, orgId: string }) => {
    const lists = await db.list.findMany({
        where: {
            boardId: boardId,
            board: {
                orgId
            }
        },
        include: {
            cards: {
                orderBy: {
                    order: "asc"
                }
            }
        },
        orderBy: {
            order: "asc"
        }
    })

    return (
        <ListContainer
            boardId={boardId}
            data={lists}
        />
    )
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
    const { orgId } = auth();
    if (!orgId) {
        redirect("/select-org")
    }

    return (
        <div className='p-4 h-full overflow-x-auto'>
            <Suspense fallback={<Skeleton className="h-full w-full" />}>
                <BoardContent boardId={params.boardId} orgId={orgId} />
            </Suspense>
        </div>
    )
}

export default BoardIdPage