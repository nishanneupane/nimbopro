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
        <div className='mx-auto max-w-7xl space-y-8 py-6'>
            <div className="flex items-center justify-between">
                <h2 className="flex items-center text-2xl font-semibold tracking-tight text-foreground">
                    <User2 className='mr-3 h-7 w-7 text-primary' />
                    Your Boards
                </h2>
                <FormPopover sideOffset={10} side='bottom'>
                    <button className="flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-elevate transition hover:bg-primary/90">
                        <Plus className="mr-2 h-4 w-4" />
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
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {boards.map((board) => (
                <Link key={board.id} href={`/board/${board.id}`}>
                    <div
                        style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
                        className='group relative aspect-video overflow-hidden rounded-xl border border-border bg-cover bg-center bg-no-repeat shadow-elevate transition duration-300 hover:-translate-y-1'
                    >
                        <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition duration-300 group-hover:from-black/80' />
                        <div className='absolute inset-0 flex flex-col justify-between p-5'>
                            <h3 className="relative text-lg font-semibold text-white">
                                {board.title}
                            </h3>
                            <div className="relative flex translate-y-1 items-center text-sm font-medium text-white/90 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                View board <span className="ml-1">→</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}

            <FormPopover sideOffset={10} side='right'>
                <div className='group relative flex aspect-video cursor-pointer flex-col items-center justify-center gap-y-2 rounded-xl border border-dashed border-border bg-card transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-accent'>
                    <Plus className="h-10 w-10 text-primary transition group-hover:scale-110" />
                    <p className='text-sm font-medium text-foreground'>Create new board</p>
                    <span className='text-xs text-muted-foreground'>{isPro ? "Unlimited" : `${MAX_FREE_BOARDS - availableCount} remaining`}</span>

                    <Hint
                        sideOffset={40}
                        description={`Free Workspaces can have up to ${MAX_FREE_BOARDS} open boards. For unlimited boards upgrade this workspace`}
                    >
                        <HelpCircle className='absolute bottom-3 right-3 h-4 w-4 text-muted-foreground' />
                    </Hint>
                </div>
            </FormPopover>
        </div>
    );
};

export default BoardList;

BoardList.Skeleton = function SkeletonBoardList() {
    return (
        <div className="grid grid-cols-1 gap-5 py-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className='aspect-video w-full rounded-xl' />
            ))}
        </div>
    );
};