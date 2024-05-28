import { NoSymbolIcon } from '@heroicons/react/16/solid'
import React from 'react'

const UnathorizedPage = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
        <p className='capitalize'>you are not authorized to do this action</p>
        <NoSymbolIcon className='w-36 text-red-500'/>
    </div>
  )
}

export default UnathorizedPage