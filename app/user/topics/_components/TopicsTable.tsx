'use client'

import { CheckIcon, EyeIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react';
import { Prisma } from '@prisma/client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

type Props = {
    topics: Prisma.BlogGetPayload<{
        include: {
            type: true,
            tags: true
        }
    }>[];
    totalPages:number;
    currentPage:number;
}

const TopicsTable = ({ topics,totalPages,currentPage }: Props) => {
    const router=useRouter();
    return (
        <div className='flex flex-col items-center gap-4'>
            <Table>
                <TableHeader>
                    <TableColumn>TITLE</TableColumn>
                    <TableColumn>URL</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>TYPE</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody>
                    {topics.map(item => (
                        <TableRow>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>{item.url}</TableCell>
                            <TableCell>
                                {item.status && <CheckIcon color='green' className='w-5' />}
                                {!item.status && <XMarkIcon color='red' className='w-5' />}
                            </TableCell>
                            <TableCell>{item.type.value}</TableCell>
                            <TableCell>
                                <div className='flex gap-4 items-center'>
                                    <Tooltip content='Details'>
                                        <Link href={`/topic/${item.id}`}>
                                            <EyeIcon className='w-5 text-slate-500' />
                                        </Link>
                                    </Tooltip>
                                    <Tooltip content='Edit Topic' color='warning'>
                                        <Link href={`/user/topics/${item.id}/edit`}>
                                            <PencilIcon className='w-5 text-yellow-500' />
                                        </Link>
                                    </Tooltip>
                                    <Tooltip content='Delete Topic' color='danger'>
                                    <Link href={`/user/topics/${item.id}/delete`}>
                                            <TrashIcon className='w-5 text-red-500' />
                                        </Link>
                                    </Tooltip>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination total={totalPages} initialPage={1} page={currentPage} onChange={(page)=>router.push(`/user/topics?pagenum=${page}`)}/>
        </div>
    )
}

export default TopicsTable