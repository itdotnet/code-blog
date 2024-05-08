import { Button, Card, cn, Input, Select, SelectItem, Image } from '@nextui-org/react'
import { BlogType } from '@prisma/client'
import { Editor } from '@tinymce/tinymce-react'
import { Editor as TinyMCEEditor } from 'tinymce';
import React, { useRef, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import FileInput from '@/app/components/fileUpload';
import { useFormContext } from 'react-hook-form';
import { AddBlogInputType } from './AddTopicForm';

interface Props {
  className?: string
  types: BlogType[]
  next: () => void
}

const Basic = (props: Props) => {
  const { register, formState: { errors },trigger } = useFormContext<AddBlogInputType>();

  const editorRef = useRef<TinyMCEEditor | null>(null);
  const handleNext =async () => {
    if(await trigger(["title","description","status","typeId"]))
      props.next()
  };
  const [image, setImage] = useState<File>();

  return (
    <Card className={cn("p-2 grid grid-cols-1 md:grid-cols-3 gap-3", props.className)}>
      <Input {...register("title")} errorMessage={errors.title?.message} isInvalid={!!errors.title} label="Title" className='md:col-span-3' />
      <div className='md:col-span-3'>
        <Editor 
          apiKey='k6phizol048u0brh9q5tx0xp2wcs0sxfp7vp160roa9s3odb'
          onInit={(_evt, editor) => editorRef.current = editor}
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            height: 200,
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
        />
      </div>
      <Select label="Type" selectionMode='single' {...register("typeId")} errorMessage={errors.typeId?.message} isInvalid={!!errors.typeId}>
        {props.types.map((item) => (
          <SelectItem key={item.id} value={item.value}>{item.value}</SelectItem>
        ))}
      </Select>
      <Select label="Status" selectionMode='single' {...register("status")} errorMessage={errors.status?.message} isInvalid={!!errors.status}>
        <SelectItem key={0} value={0}>{'Draft'}</SelectItem>
        <SelectItem key={1} value={1}>{'Release'}</SelectItem>
      </Select>
      <div className='md:col-span-3 flex flex-col'>
        <FileInput onChange={(e) => setImage((e as any).target.files[0])} lablText='Cover'/>
        {image && <Image src={URL.createObjectURL(image)} width={200} height={200} />}
      </div>
      <div className='flex justify-center col-span-3 gap-3'>
        <Button isDisabled color='primary' className='w-36' startContent={<ChevronLeftIcon className='w-6' />}>Previous</Button>
        <Button color='primary' className='w-36' endContent={<ChevronRightIcon className='w-6' />} onClick={handleNext}>Next</Button>
      </div>
    </Card>
  )
}

export default Basic