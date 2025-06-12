import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavItems from './NavItems'

const Navbar = () => {
    return (
        <nav className='flex items-center justify-between p-4 sm:p-8'>
            <Link href={"/"}>
                <div className='flex items-center gap-2.5 cursor-pointer'>
                    <Image src={"/logo.svg"} alt="logo" width={46} height={44} />
                </div>
            </Link>
            <div className='flex gap-2 sm:gap-8 items-center'>
                <NavItems />
                <Link href="">
                    <p className='font-semibold cursor-pointer'>
                        Sign In
                    </p>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar