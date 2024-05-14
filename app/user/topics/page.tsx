import prisma from '@/app/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import React from 'react'
import TopicsTable from './_components/TopicsTable';

const PAGE_SIZE=5;

interface Props{
  searchParams:{[key:string]:string | string[] | undefined}
}

const TopicsPage =async ({searchParams}:Props) => {
  const {getUser}=await getKindeServerSession();
  const user=await getUser();

  const pagenum=searchParams.pagenum??1;
  const topicsPromise=prisma.blog.findMany({
    where:{
      userId:user?.id
    },
    include:{
      type:true,
      tags:true
    },
    skip:(+pagenum - 1)*PAGE_SIZE,
    take:PAGE_SIZE
  });

  const totalTopicsPromise=prisma.blog.count({
    where:{
      userId:user?.id
    }
  });

  const [topics,totalTopics]=await Promise.all([topicsPromise,totalTopicsPromise]);
  const totalPages=Math.round(totalTopics/PAGE_SIZE);

  console.log({topics});

  return (
    <TopicsTable topics={topics} totalPages={totalPages} currentPage={+pagenum}/>
  )
}

export default TopicsPage

