import prisma from '@/app/lib/prisma'
import React from 'react'
import AddTopicForm from '../../add/_components/AddTopicForm'

interface Props{
    params:{id:string}
}

const EditTopicPage =async ({params}:Props) => {
    const [topicTypes,topicTags,topic]=await Promise.all([prisma.blogType.findMany(),prisma.blogTag.findMany(),prisma.blog.findUnique({
        where:{
            id:+params.id
        },
        include:{
            images:true,
            tags:true,
            type:true
        }
    })])

    if(topic)
        return <AddTopicForm types={topicTypes} tags={topicTags} topic={topic} isEdit={true}/>
}

export default EditTopicPage