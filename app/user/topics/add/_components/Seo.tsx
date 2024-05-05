import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import { Button, Card, cn, Input, Textarea } from '@nextui-org/react'
import React from 'react'

interface Props
{
    next:()=>void;
    prev:()=>void;
    className?:string;
}

const Seo = (props:Props) => {
  return (
    <Card className={cn('p-2 gap-3',props.className)}>
        <Input label='Url'/>
        <Textarea label='Meta Desxription'/>
        <div className='flex justify-center gap-3'>
            <Button color='primary' className='w-36' onClick={props.prev} startContent={<ChevronLeftIcon className='w-6'/>}>Previous</Button>
            <Button color='primary' className='w-36' onClick={props.next} endContent={<ChevronRightIcon className='w-6'/>}>Next</Button>
        </div>
    </Card>
  )
}

export default Seo