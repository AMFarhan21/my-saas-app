import CompanionForm from '@/components/CompanionForm'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const NewCompanion = async () => {

  const user = await auth()
  const userId = user.userId
  console.log(userId)

  if(!userId) redirect("/sign-in")

  return (
    <main className='p-4 w-80 sm:w-120 md:w-160 xl:w-180 justify-center items-center mx-auto'>
      <article className='w-full gap-4 flex flex-col'>
        <h1 className='text-xl font-bold '>Companion Builder</h1>
        <CompanionForm />
      </article>
    </main>
  )
}

export default NewCompanion