import { Button } from '@nextui-org/react';
import Link from 'next/link';
import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode;
    modalDelete:ReactNode;
}

const PropertiesLayout = ({ children,modalDelete }: Props) => {
    return (
        <div>
            <div className='bg-primary-400 flex justify-between items-center p-2'>
                <h2 className='text-white px-2 text-xl font-semibold'>User Topics</h2>
                <Button color='secondary'>
                    <Link href={'/user/topics/add'}>Add Topic</Link>
                </Button>
            </div>
            {children}
            {modalDelete}
        </div>
    )
}

export default PropertiesLayout