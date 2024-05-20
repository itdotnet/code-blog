"use server"

import { AddBlogInputType } from "@/app/user/topics/add/_components/AddTopicForm";
import { Blog, BlogTag } from "@prisma/client";
import prisma from "../prisma";
import { connect } from "net";

export async function saveBlog(blogData:AddBlogInputType,imagesUrls:string[] | null,tags:BlogTag[],userId:string) {
    const basic:Omit<Blog,"id">={
        title:blogData.title,
        description:blogData.description,
        url:blogData.url,
        typeId:blogData.typeId,
        status:blogData.status,
        metaDescription:blogData.metaDescription,
        userId,
        cover:blogData.cover?blogData.cover:null
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
                connect:tags
            }
        }
    });

    console.log({result});
    return result;
}