"use server"

import { AddBlogInputType } from "@/app/user/topics/add/_components/AddTopicForm";
import { Blog } from "@prisma/client";
import prisma from "../prisma";

export async function saveBlog(blogData:AddBlogInputType,imagesUrls:string[] | null,tags:number[],userId:string) {
    const basic:Omit<Blog,"id">={
        title:blogData.title,
        description:blogData.description,
        url:blogData.url,
        typeId:blogData.typeId,
        status:blogData.status,
        metaDescription:blogData.metaDescription,
        userId,
        cover:blogData.cover!
    };

    const result=await prisma.blog.create({
        data:{
            ...basic,
            images:{
                create:imagesUrls?.map(img=>({
                    url:img
                }))
            },
            tags:{
                create:tags.map(tag=>({
                    tagId:tag
                }))
            }
        }
    });

    console.log({result});
    return result;
}