import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavItems from './NavItems'
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
import { Button } from './ui/button'
import { LogInIcon } from 'lucide-react'

const Navbar = () => {
    return (
        <nav className='flex items-center justify-between p-4 sm:px-8 sm:py-4'>
            <Link href={"/"}>
                <div className='flex items-center gap-2.5 cursor-pointer'>
                    <Image src={"/logo.svg"} alt="logo" width={46} height={44} />
                </div>
            </Link>
            <div className='flex gap-2 sm:gap-8 items-center'>
                <NavItems />
                <SignedOut>
                    <SignInButton>
                        <Button className='w-8 sm:w-auto'>
                            <span className='hidden sm:flex'>SignIn</span>
                            <LogInIcon className='sm:hidden'/>
                        </Button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    )
}

export default Navbar


