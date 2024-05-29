import SubmitButton from '@/app/components/SubmitButton';
import { deleteBlog } from '@/app/lib/actions/blog';
import prisma from '@/app/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import React from 'react'

interface Props {
    params: { id: string }
}

const DeleteTopicPage = async ({ params }: Props) => {
    const { getUser } = getKindeServerSession();
    const topicPromise = prisma.blog.findUnique({
        where: {
            id: +params.id
        }
    });

    const [topic, user] = await Promise.all([topicPromise, getUser()]);
    if (!topic) return notFound();

    if (!user || user.id != topic.userId) redirect("/unutorized");

    const deleteAction = async () => {
        "use server"
        try {
            await deleteBlog(+params.id);
            redirect("/user/topics");
        }
        catch (e) {
            throw (e);
        }
    }

    return (
        <form action={deleteAction} className='mt-9 flex flex-col items-center justify-center gap-3'>
            <p>Are You Sure To Delete This Topic?</p>
            <p>
                <span className='text-slate-400'>Title: </span>
                <span className='text-slate-700'>{topic.title}</span>
            </p>
            <div className='flex justify-center gap-3'>
                <Link href={'/user/topics'}>
                    <Button>Cancel</Button>
                </Link>
                <SubmitButton type='submit' color='danger' variant='light'>Delete</SubmitButton>
            </div>
        </form>
    )
}

export default DeleteTopicPage