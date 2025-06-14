import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const CTA = () => {
  return (
    <div className='w-auto bg-gray-800 text-primary-foreground flex flex-col justify-center items-center rounded-4xl text-center p-4 sm:p-2'>
      <div className='bg-amber-200 text-primary rounded-full px-4 py-1 font-semibold'>
        Start learning your way
      </div>
      <h2 className='font-bold text-2xl'>
        Build a Personalize Learning Companion
      </h2>
      <p className=''>
        Pick a name, subject, voice & personality - and start learning through voice conversations that feel natural and fun
      </p>
      <Image src={'/images/cta.svg'} alt='cta' width={362} height={232} />
      <Link href={'/companions/new'}>
        <Button className='bg-amber-600'>
          ➕ Build a New Companion
        </Button>
      </Link>
    </div>
  )
}

export default CTA