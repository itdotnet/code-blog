"use client"

import React, { useState } from 'react'
import Stepper from './Stepper'
import { Button, cn } from '@nextui-org/react'
import Basic from './basic'
import { BlogType } from '@prisma/client'
import Picture from './Picture'
import Seo from './Seo'

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
        label: "Categories"
    },
    {
        label: "Tags"
    }
]

interface Props {
    types: BlogType[]
}

const AddTopicForm = (props: Props) => {
    const [images, setImages] = useState<File[]>([]);
    const [step, setStep] = useState(0);

    return (
        <div>
            <Stepper items={steps} activeItem={step} setActiveItem={setStep} />
            <form className='mt-3 p-2'>
                <Basic className={cn({ 'hidden': step != 0 })} types={props.types} next={() => setStep(prev => prev + 1)}></Basic>
                <Picture className={cn({ 'hidden': step != 1 })} next={() => setStep(prev => prev + 1)}
                    prev={() => setStep(prev => prev - 1)} images={images} setImages={setImages} />
                <Seo className={cn({ 'hidden': step != 2 })} next={() => setStep(prev => prev + 1)}
                    prev={() => setStep(prev => prev - 1)} />
            </form>
        </div>
    )
}

export default AddTopicForm