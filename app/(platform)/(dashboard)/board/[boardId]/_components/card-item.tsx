"use client"
import { useCardModal } from '@/hooks/use-card-modal';
import { Draggable } from '@hello-pangea/dnd';
import { Card } from '@prisma/client';
import React from 'react'

interface CardItemProps {
    index: number;
    data: Card;
}
const CardItem = ({ index, data }: CardItemProps) => {
    const cardModal = useCardModal();
    return (
        <Draggable draggableId={data.id} index={index}>
            {
                (provided) => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        role='button'
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