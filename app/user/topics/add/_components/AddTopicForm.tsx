"use client"

import React, { useState } from 'react'
import Stepper from './Stepper'
import { Button } from '@nextui-org/react'

const steps=[
    {
        label:"Basic"
    },
    {
        label:"Cover"
    },
    {
        label:"Seo"
    },
    {
        label:"Categories"
    },
    {
        label:"Tags"
    }
]

const AddTopicForm = () => {
    const [step,setStep]=useState(0);

  return (
    <div>
        <Stepper items={steps} activeItem={step} setActiveItem={setStep} />
    </div>
  )
}

export default AddTopicForm