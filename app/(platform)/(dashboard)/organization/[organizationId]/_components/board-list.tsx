import FormPopover from '@/components/form/form-popover';
import Hint from '@/components/hint';
import { Skeleton } from '@/components/ui/skeleton';
import { MAX_FREE_BOARDS } from '@/constants/boards';
import { db } from '@/lib/db';
import { getAvailableCount } from '@/lib/org-limit';
import { checkSubscription } from '@/lib/subscription';
import { auth } from '@clerk/nextjs';
import { HelpCircle, User2, Plus } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

interface Board {
    id: string;
    orgId: string;
    title: string;
    imageId: string;
    imageThumbUrl: string;
    imageFullUrl: string;
    imageUserName: string;
    imageLinkHTML: string;
    createdAt: Date;
    updatedAt: Date;
}

const BoardList = async () => {
    const { orgId } = auth();
    if (!orgId) {
        redirect("/select-org");
    }

    return (
        <div className='space-y-8 px-6 py-10 max-w-7xl mx-auto bg-gray-900'>
            <div className="flex items-center justify-between transition-all duration-300 ease-in-out">
                <h2 className="text-3xl font-bold text-gray-100 flex items-center">
                    <User2 className='h-10 w-10 mr-4 text-indigo-400' />
                    Your Boards
                </h2>
                <FormPopover sideOffset={10} side='bottom'>
                    <button className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition duration-300 flex items-center shadow-lg hover:shadow-xl">
                        <Plus className="h-5 w-5 mr-2" />
                        Create Board
                    </button>
                </FormPopover>
            </div>

            <Suspense fallback={<BoardList.Skeleton />}>
                <BoardContent orgId={orgId} />
            </Suspense>
        </div>
    );
};

const BoardContent = async ({ orgId }: { orgId: string }) => {
    const boards = await db.board.findMany({
        where: { orgId },
        orderBy: { createdAt: "desc" }
    });

    const availableCount = await getAvailableCount();
    const isPro = await checkSubscription();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {boards.map((board) => (
                <div
                    key={board.id}
                    className="transform transition-all duration-300 hover:scale-105"
                >
                    <Link href={`/board/${board.id}`}>
                        <div 
                            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
                            className='group relative aspect-video bg-no-repeat bg-center bg-cover rounded-xl shadow-2xl overflow-hidden'
                        >
                            <div className='absolute inset-0 bg-black/50 group-hover:bg-black/60 transition duration-300' />
                            <div className='absolute inset-0 p-6 flex flex-col justify-between'>
                                <h3 className="relative font-bold text-white text-xl group-hover:text-indigo-300 transition-colors duration-300">
                                    {board.title}
                                </h3>
                                <div className="relative text-white text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    View Board
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}

            <FormPopover sideOffset={10} side='right'>
                <div className='aspect-video relative bg-gray-800 rounded-xl shadow-inner flex flex-col gap-y-2 items-center justify-center hover:bg-gray-700 transition duration-300 cursor-pointer transform hover:scale-105 border border-gray-700'>
                    <Plus className="h-14 w-14 text-indigo-400" />
                    <p className='text-sm font-medium text-gray-300'>Create new board</p>
                    <span className='text-xs text-gray-400'>{isPro ? "Unlimited" : `${MAX_FREE_BOARDS - availableCount} remaining`}</span>

                    <Hint
                        sideOffset={40}
                        description={`Free Workspaces can have up to ${MAX_FREE_BOARDS} open boards. For unlimited boards upgrade this workspace`}
                    >
                        <HelpCircle className='absolute bottom-3 right-3 h-5 w-5 text-gray-500' />
                    </Hint>
                </div>
            </FormPopover>
        </div>
    );
};

export default BoardList;

BoardList.Skeleton = function SkeletonBoardList() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-6 py-10 bg-gray-900">
            {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className='aspect-video w-full rounded-xl bg-gray-800' />
            ))}
        </div>
    );
};