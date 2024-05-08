import React from 'react'
import AddTopicForm from './_components/AddTopicForm'
import prisma from '@/app/lib/prisma';

const AddTopicPage =async () => {
  const [blogTypes]=await Promise.all([prisma.blogType.findMany()]);
  const [blogTags]=await Promise.all([prisma.blogTag.findMany()]);

  return (
    <AddTopicForm types={blogTypes} tags={blogTags}/>
  )
}

export default AddTopicPage