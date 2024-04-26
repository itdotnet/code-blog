"use client"

import React, { useState } from 'react'
import Stepper from './Stepper'
import { Button } from '@nextui-org/react'
import Basic from './basic'
import { BlogType } from '@prisma/client'

const steps = [
    {
        label: "Basic"
    },
    {
        label: "Cover"
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
    const [step, setStep] = useState(0);

    return (
        <div>
            <Stepper items={steps} activeItem={step} setActiveItem={setStep} />
            <form className='mt-3 p-2'>
                <Basic types={props.types}></Basic>
            </form>
        </div>
    )
}

export default AddTopicForm