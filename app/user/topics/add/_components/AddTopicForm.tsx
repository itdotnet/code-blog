"use client"

import React, { useState } from 'react'
import Stepper from './Stepper'
import { Button, cn } from '@nextui-org/react'
import Basic from './basic'
import { BlogTag, BlogType } from '@prisma/client'
import Picture from './Picture'
import Seo from './Seo'
import Tag from './Tag'
import { string, z } from 'zod'
import { AddBlogFormSchema } from '@/app/lib/zodSchema'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { uploadAvatar, uploadImages } from '@/app/lib/upload'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { saveBlog } from '@/app/lib/actions/blog'
import { redirect } from 'next/navigation'
import { toast } from 'react-toastify'

const steps = [
    {
        label: "Basic"
    },
    {
        label: "Pictures"
    },
    {
        label: "Seo"
    },
    {
        label: "Tags"
    }
]

interface Props {
    types: BlogType[];
    tags: BlogTag[];
}

export type AddBlogInputType = z.infer<typeof AddBlogFormSchema>;

const AddTopicForm = (props: Props) => {
    const methods = useForm<AddBlogInputType>({
        resolver: zodResolver(AddBlogFormSchema)
    })

    const [images, setImages] = useState<File[]>([]);
    const [cover, setCover] = useState<File | undefined>();
    const [selectedTags, setSelectedTags] = useState<BlogTag[]>([]);
    const [step, setStep] = useState(0);

    const { user } = useKindeBrowserClient();
    const onSubmit: SubmitHandler<AddBlogInputType> = async (data) => {
        console.log({ data });

        if (cover) {
            const coverUrl = await uploadAvatar(cover!, "blogCover");
            data.cover = coverUrl;
            console.log({ coverUrl });
        }

        let imageUrls:string[] | null=null;
        if (images.length>0) {
            imageUrls = await uploadImages(images);
            console.log({ imageUrls });
        }

        console.log({ selectedTags });
        try {
            await saveBlog(data,imageUrls,selectedTags,user?.id!);
            toast.success('Topic Added!');
            redirect("/user/topics");
        }
        catch (error) {
            console.error({ error });
        }
    }

    return (
        <div>
            <Stepper items={steps} activeItem={step} setActiveItem={setStep} />
            <FormProvider {...methods}>
                <form className='mt-3 p-2' onSubmit={methods.handleSubmit(onSubmit, (errors) => { console.log(errors) })}>
                    <Basic className={cn({ 'hidden': step != 0 })} types={props.types}
                        next={() => setStep(prev => prev + 1)} cover={cover} setCover={setCover}></Basic>
                    <Picture className={cn({ 'hidden': step != 1 })} next={() => setStep(prev => prev + 1)}
                        prev={() => setStep(prev => prev - 1)} images={images} setImages={setImages} />
                    <Seo className={cn({ 'hidden': step != 2 })} next={() => setStep(prev => prev + 1)}
                        prev={() => setStep(prev => prev - 1)} />
                    <Tag className={cn({ 'hidden': step != 3 })} prev={() => setStep(prev => prev - 1)}
                        tags={props.tags} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
                </form>
            </FormProvider>
        </div>
    )
}

export default AddTopicForm