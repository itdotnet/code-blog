import { Card, Image } from '@nextui-org/react'
import { Prisma } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

interface Props {
    topic: Prisma.BlogGetPayload<{
        select: {
            id: true,
            title: true,
            url: true,
            cover: true,
            type: {
                select: {
                    value: true
                }
            }
        }
    }>
}

const TopicCard = ({ topic }: Props) => {

    return (
        <Card className='w-72 flex flex-col hover:scale-105' shadow='md'>
            <Image radius='none' src={topic.cover ?? "/profile.png"} className='object-fill w-96 h-48' />
            <div className='flex flex-col mt-auto'>
                <div className='p-4'>
                    <p className='text-primary-600 text-xl font-bold'>{topic.title}</p>
                    <p className='text-slate-600'>Lorem ipsum dolor sit, amet consectetur </p>
                </div>
                <div className='bg-gradient-to-br from-slate-50 to-slate-200 flex justify-between p-4'>
                    <p>{topic.type.value}</p>
                    <Link className='hover:text-primary-500 transition-colors' href={`/topic/${topic.id}/${topic.url}`}>View Details</Link>
                </div>
            </div>
        </Card>
    )
}

export default TopicCard