import { Board } from '@prisma/client'
import React from 'react'
import BoardTitleForm from './board-title-form'
import BoardOptions from './board-options'

const BoardNavbar = async ({ data }: { data: Board }) => {
    return (
        <div className='w-full h-14 z-[40] bg-black/30 backdrop-blur-sm fixed top-14 flex items-center px-6 gap-x-4 text-white'>
            <BoardTitleForm data={data} />
            <div className="ml-auto">
                <BoardOptions id={data.id}/>
            </div>
        </div>
    )
}

export default BoardNavbar