"use client";

import { toast } from "sonner";
import { ElementRef, useRef, useState } from "react";
import { Layout } from "lucide-react";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { CardWithList } from "@/types";
import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";
import { Skeleton } from "@/components/ui/skeleton";
import { FormInput } from "@/components/form/form-input";

interface HeaderProps {
    data: CardWithList;
}

const Header = ({
    data,
}: HeaderProps) => {
    const queryClient = useQueryClient();
    const params = useParams();

    const { execute } = useAction(updateCard, {
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["card", data.id]
            });

            queryClient.invalidateQueries({
                queryKey: ["card-logs", data.id]
            });

            toast.success(`Renamed to "${data.title}"`);
            setTitle(data.title);
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const inputRef = useRef<ElementRef<"input">>(null);

    const [title, setTitle] = useState(data.title);

    const onBlur = () => {
        inputRef.current?.form?.requestSubmit();
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.target as HTMLFormElement);
        const title = formData.get("title") as string;
        const boardId = params.boardId as string;

        if (title === data.title) {
            return;
        }

        execute({
            title,
            boardId,
            id: data.id,
        });
    }

    return (
        <div className="flex items-start gap-x-3 mb-6 w-full bg-black text-gray-300 rounded-lg shadow-md p-4">
            <Layout className="h-5 w-5 mt-1 text-gray-400" />
            <div className="w-full">
                <form onSubmit={(event) => onSubmit(event)}>
                    <FormInput
                        ref={inputRef}
                        onBlur={onBlur}
                        id="title"
                        defaultValue={title}
                        className="font-semibold text-xl px-1 bg-black border-transparent relative -left-1.5 w-[95%] focus-visible:bg-gray-700 focus-visible:border-input mb-0.5 truncate rounded-md"
                    />
                </form>
                <p className="text-sm text-gray-500 mt-1">
                    in list <span className="underline">{data.list.title}</span>
                </p>
            </div>
        </div>
    );
};

export default Header;

Header.Skeleton = function HeaderSkeleton() {
    return (
        <div className="flex items-start gap-x-3 mb-6 bg-black text-gray-300 rounded-lg shadow-md p-4">
            <Skeleton className="h-6 w-6 mt-1 bg-gray-600 rounded-full" />
            <div>
                <Skeleton className="w-24 h-6 mb-1 bg-gray-600 rounded-md" />
                <Skeleton className="w-12 h-4 bg-gray-600 rounded-md" />
            </div>
        </div>
    );
};
