import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import { Button, Card, cn, Input, Textarea } from '@nextui-org/react'
import React from 'react'
import { useFormContext } from 'react-hook-form';
import { AddBlogInputType } from './AddTopicForm';

interface Props
{
    next:()=>void;
    prev:()=>void;
    className?:string;
}

const Seo = (props:Props) => {
  const { register, formState: { errors } } = useFormContext<AddBlogInputType>();
  
  return (
    <Card className={cn('p-2 gap-3',props.className)}>
        <Input label='Url' {...register("url")} errorMessage={errors.url?.message} isInvalid={!!errors.url}/>
        <Textarea label='Meta Description' {...register("metaDescription")} errorMessage={errors.metaDescription?.message} isInvalid={!!errors.metaDescription}/>
        <div className='flex justify-center gap-3'>
            <Button color='primary' className='w-36' onClick={props.prev} startContent={<ChevronLeftIcon className='w-6'/>}>Previous</Button>
            <Button color='primary' className='w-36' onClick={props.next} endContent={<ChevronRightIcon className='w-6'/>}>Next</Button>
        </div>
    </Card>
  )
}

export default Seo