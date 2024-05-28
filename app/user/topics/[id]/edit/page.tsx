import prisma from '@/app/lib/prisma'
import React from 'react'
import AddTopicForm from '../../add/_components/AddTopicForm'
import { notFound, redirect } from 'next/navigation'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

interface Props {
    params: { id: string }
}

const EditTopicPage = async ({ params }: Props) => {
    const [topicTypes, topicTags, topic] = await Promise.all([prisma.blogType.findMany(), prisma.blogTag.findMany(), prisma.blog.findUnique({
        where: {
            id: +params.id
        },
        include: {
            images: true,
            tags: true,
            type: true
        }
    })])

    const {getUser}=getKindeServerSession();
    const user=await getUser();

    if (!topic)
        return notFound();

    if(!user || user.id!=topic.userId) return redirect("/unathorized");

    return <AddTopicForm types={topicTypes} tags={topicTags} topic={topic} isEdit={true} />
}

export default EditTopicPage