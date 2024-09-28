"use client"
import { ListWithCards } from '@/types';
import React, { ElementRef, useRef, useState } from 'react'
import ListHeader from './list-header';
import CardForm from './card-form';
import { cn } from '@/lib/utils';
import CardItem from './card-item';
import { Draggable, Droppable } from '@hello-pangea/dnd';

interface ListItemProps {
    index: number;
    data: ListWithCards;
}
const ListItem = ({ index, data }: ListItemProps) => {
    const textareaRef = useRef<ElementRef<"textarea">>(null)
    const [isEditing, setIsEditing] = useState(false)

    const disableEditing = () => {
        setIsEditing(false)
    }
    const enableEditing = () => {
        setIsEditing(true)
        setTimeout(() => {
            textareaRef.current?.focus()
        })
    }
    return (
        <Draggable draggableId={data.id} index={index}>
            {
                (provided) => (
                    <li
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className='shrink-0 h-full w-[272px] select-none'>
                        <div
                            {...provided.dragHandleProps}
                            className="w-full rounded-lg bg-gray-800 shadow-lg pb-2 transition-all duration-200 ease-in-out hover:shadow-xl">
                            <ListHeader
                                data={data}
                                onAddCard={enableEditing}
                            />
                            <Droppable droppableId={data.id} type='card'>
                                {
                                    (provided) => (
                                        <ol
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className={cn("mx-2 px-1 py-1 flex flex-col gap-y-3", data.cards.length > 0 ? "mt-3" : "mt-0")}
                                        >
                                            {
                                                data.cards.map((card, index) => (
                                                    <CardItem
                                                        index={index}
                                                        key={card.id}
                                                        data={card}
                                                    />
                                                ))
                                            }
                                            {
                                                provided.placeholder
                                            }
                                        </ol>
                                    )
                                }
                            </Droppable>
                            <CardForm
                                ref={textareaRef}
                                isEditing={isEditing}
                                enableEditing={enableEditing}
                                disableEditing={disableEditing}
                                listId={data.id}
                            />
                        </div>
                    </li>
                )
            }
        </Draggable>
    )
}

export default ListItem