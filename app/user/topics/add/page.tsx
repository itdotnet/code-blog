import React from 'react'
import AddTopicForm from './_components/AddTopicForm'
import prisma from '@/app/lib/prisma';

const AddTopicPage =async () => {
  const [blogTypes]=await Promise.all([prisma.blogType.findMany()]);

  return (
    <AddTopicForm types={blogTypes}/>
  )
}

export default AddTopicPage