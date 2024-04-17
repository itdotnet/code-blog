import { getKindeServerSession, LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/server';

import { Button } from '@nextui-org/react';
import React from 'react'

const SignInPanel = async () => {
    const { isAuthenticated, getUser } = await getKindeServerSession();

    if (await isAuthenticated()) { 
        const user=await getUser();
        return <div>{user?.given_name}</div> 
    }

    return <div className='flex gap-3'>
        <Button color='primary'>
            <LoginLink>Sign In</LoginLink>
        </Button>
        <Button>
            <RegisterLink>Sign Up</RegisterLink>
        </Button>
    </div>
}

export default SignInPanel;