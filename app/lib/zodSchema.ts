import { z } from "zod";

export const AddBlogFormSchema=z.object({
    title:z.string(),
    description:z.string(),
    url:z.string(),
    metaDescription:z.string(),
    typeId:z.string().transform((data:unknown)=>Number(data)),
    status:z.boolean()
});