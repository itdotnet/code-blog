import { Button, Card, cn, Input, Select, SelectItem, Image } from '@nextui-org/react'
import { BlogType } from '@prisma/client'
import { Editor } from '@tinymce/tinymce-react'
import { Editor as TinyMCEEditor } from 'tinymce';
import React, { useRef, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from '@heroicons/react/16/solid';
import FileInput from '@/app/components/fileUpload';
import { useFormContext } from 'react-hook-form';
import { AddBlogInputType } from './AddTopicForm';

interface Props {
  className?: string
  types: BlogType[]
  next: () => void,
  cover: File | undefined,
  setCover: (image: File | undefined) => void
}

const Basic = (props: Props) => {
  const { register, formState: { errors }, trigger, setValue, getValues,watch } = useFormContext<AddBlogInputType>();
  watch("cover");

  const editorRef = useRef<TinyMCEEditor | null>(null);
  const handleNext = async () => {
    if (await trigger(["title", "description", "status", "typeId"]))
      props.next()
  };

  return (
    <Card className={cn("p-2 grid grid-cols-1 md:grid-cols-3 gap-3", props.className)}>
      <Input {...register("title")} errorMessage={errors.title?.message}
        isInvalid={!!errors.title} label="Title" className='md:col-span-3' defaultValue={getValues().title} />
      <div className='md:col-span-3'>
        <Editor
          apiKey='k6phizol048u0brh9q5tx0xp2wcs0sxfp7vp160roa9s3odb'
          onInit={(_evt, editor) => editorRef.current = editor}
          initialValue={getValues().description}
          onEditorChange={(newValue) =>
            setValue("description", newValue)
          }
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
        <Input
          className='hidden'
          {...register("description")}
          errorMessage={errors.description?.message}
          isInvalid={!!errors.description}
          defaultValue={getValues().description}
        />
        {errors.description?.message && (
          <p className='mt-2 text-sm text-red-400'>
            {errors.description.message}
          </p>
        )}
      </div>
      <Select label="Type" selectionMode='single' {...register("typeId")}
        errorMessage={errors.typeId?.message} isInvalid={!!errors.typeId}
        defaultSelectedKeys={[getValues().typeId?.toString()]}
      >
        {props.types.map((item) => (
          <SelectItem key={item.id} value={item.id}>{item.value}</SelectItem>
        ))}
      </Select>
      <Select label="Status" selectionMode='single'
        {...register("status")} errorMessage={errors.status?.message} isInvalid={!!errors.status}
        defaultSelectedKeys={[getValues().status===true ? "1" : getValues().status===false?"0":""]}>
        <SelectItem key={0} value={0}>{'Draft'}</SelectItem>
        <SelectItem key={1} value={1}>{'Release'}</SelectItem>
      </Select>
      <div className='md:col-span-3 flex flex-col'>
        <FileInput onChange={(e) => props.setCover((e as any).target.files[0])} lablText='Cover' />
      </div>
      <Card className={cn("flex flex-col items-center w-40", { "hidden": props.cover == undefined })}>
        {props.cover!! && <Image src={URL.createObjectURL(props.cover)} className='w-36 h-36 object-contain' />}
        <button type='button' className='mb-2' onClick={() => { props.setCover(undefined); }}>
          <TrashIcon className='text-danger-400 w-4' />
        </button>
      </Card>
      <Card className={cn("flex flex-col items-center w-40", { "hidden": getValues().cover == undefined })}>
        {getValues().cover!! && <Image src={getValues().cover} className='w-36 h-36 object-contain' />}
        <button type='button' className='mb-2' onClick={() => { setValue("cover", undefined, { shouldDirty: true }); }}>
          <TrashIcon className='text-danger-400 w-4' />
        </button>
      </Card>
      <div className='flex justify-center col-span-3 gap-3'>
        <Button isDisabled color='primary' className='w-36' startContent={<ChevronLeftIcon className='w-6' />}>Previous</Button>
        <Button color='primary' className='w-36' endContent={<ChevronRightIcon className='w-6' />} onClick={handleNext}>Next</Button>
      </div>
    </Card>
  )
}

export default Basic