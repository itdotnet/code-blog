import { boolean, z } from "zod";

export const AddBlogFormSchema=z.object({
    title:z.string().min(1,"Enter The Name"),
    description:z.string().min(1,"Enter The Content"),
    url:z.string().min(2,'Enter The Url'),
    metaDescription:z.string().min(2,'Enter The Url'),
    typeId:z.string().min(1,"Select The Type Of Your Type").transform((data:unknown)=>Number(data)),
    status:z.string().min(1,"Select The Status").transform((data:unknown)=>data=="0"?false:true),
    cover:z.string().optional()
});