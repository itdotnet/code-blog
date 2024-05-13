import prisma from '@/app/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import React from 'react'

const TopicsPage =async () => {
  const {getUser}=await getKindeServerSession();
  const user=await getUser();

  const topicsPromise=prisma.blog.findMany({
    where:{
      userId:user?.id
    },
    include:{
      type:true,
      tags:true
    }
  });

  const [topics]=await Promise.all([topicsPromise]);
  console.log({topics});

  return (
    <div>TopicsPage</div>
  )
}

export default TopicsPage

