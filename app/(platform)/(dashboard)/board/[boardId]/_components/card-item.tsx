"use client"
import { useCardModal } from '@/hooks/use-card-modal';
import { fetcher } from '@/lib/fetcher';
import { Draggable } from '@hello-pangea/dnd';
import { Card } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react'

interface CardItemProps {
    index: number;
    data: Card;
}
const CardItem = ({ index, data }: CardItemProps) => {
    const cardModal = useCardModal();
    const queryClient = useQueryClient();

    // Warm the cache so the modal opens instantly instead of on a cold fetch.
    const prefetch = () => {
        queryClient.prefetchQuery({
            queryKey: ['card', data.id],
            queryFn: () => fetcher(`/api/cards/${data.id}`),
        });
        queryClient.prefetchQuery({
            queryKey: ['card-logs', data.id],
            queryFn: () => fetcher(`/api/cards/${data.id}/logs`),
        });
    };

    return (
        <Draggable draggableId={data.id} index={index}>
            {
                (provided) => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        role='button'
                        onMouseEnter={prefetch}
                        onFocus={prefetch}
                        onClick={() => cardModal.onOpen(data.id)}
                        className='truncate rounded-md border border-border bg-card px-3 py-2 text-sm text-card-foreground shadow-sm transition hover:border-primary/50 hover:shadow-md'>
                        {data.title}
                    </div>
                )
            }
        </Draggable>
    )
}

export default CardItem