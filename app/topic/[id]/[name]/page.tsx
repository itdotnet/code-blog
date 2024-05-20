import PageTitle from "@/app/components/pageTitle";
import prisma from "@/app/lib/prisma"
import { Card } from "@nextui-org/react";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props{
    params:{
        id:string
    }
}

export async function generateMetadata(
    { params }: Props
  ): Promise<Metadata> {
    // read route params
    const id = params.id
   
    // fetch data
    const topic=await prisma.blog.findUnique({
        where:{
            id:+params.id
        }
    });
   
    return {
      title: topic?.title,
      description:topic?.metaDescription
    }
  }

const TopicPage =async ({params}:Props) => {
    const topic=await prisma.blog.findUnique({
        where:{
            id:+params.id
        },
        include:{
            type:true,
            tags:true,
            images:true
        },
    });

    if(!topic) return notFound();

  return (
    <div>
        <PageTitle title="Topic Page" href="/user/topics" linkCaption="Back To Topics"/>
        <div className="p-4">
            <h2 className="text-2xl font-bold text-primary my-5">{topic.title}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="col-span-2 flex flex-col gap-5">

                    <div className="p-5" dangerouslySetInnerHTML={{__html:topic.description}}></div>
                </div>
                <Card className="p-5 flex flex-col gap-3">
                    <div>
                        <h2 className="text-xl font-bold text-slate-700">Tags</h2>
                        <hr className="border border-solid border-slate-300"/>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                        {topic.tags.map(tag=>
                            <Link className="px-3 py-2 bg-blue-500 text-white text-center" key={tag.id} href={`/tag/${tag.id}/${tag.name}`}>{tag.name}</Link>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    </div>
  )
}

export default TopicPage