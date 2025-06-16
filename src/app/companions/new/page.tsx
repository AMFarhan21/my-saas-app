import CompanionForm from '@/components/CompanionForm'
import { Button } from '@/components/ui/button'
import { newCompanionPermissions } from '@/lib/actions/companion.action'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const NewCompanion = async () => {

  const user = await auth()
  const userId = user.userId
  console.log(userId)
  // console.log("FEATURE YANG SAYA GUNAKAN => ", user.has({role: "10_active_companions"}))

  const canCreateCompanion = await newCompanionPermissions()
  // console.log(canCreateCompanion)

  if (!userId) redirect("/sign-in")

  return (
    <main className='p-4 w-80 sm:w-120 md:w-160 xl:w-180 justify-center items-center mx-auto'>
      {
        canCreateCompanion ? (
          <article className='w-full gap-4 flex flex-col'>
            <h1 className='text-xl font-bold '>Companion Builder</h1>
            <CompanionForm />
          </article>
        ) : (
          <article className='w-full items-center justify-center flex flex-col space-y-6'>
            <Image src={"/images/limit.svg"} alt="Companion limit reached" width={360} height={230} className='' />
            <div className='bg-amber-200 text-black font-semibold px-4 py-1 rounded-xl'>
              Upgrade your plan
            </div>
            <div className='flex flex-col justify-center items-center'>
              <h1 className='text-xl font-bold '>You&apos;ve Reached Your Limit</h1>
              <p className='text-center'>
                You&apos;ve reached your companion limit. Upgrade to create more companions and premium features.
              </p>
            </div>
            <Link href={"/subscription"}>
              <Button className='px-24 bg-amber-600 font-semibold'>
                Upgrade your plan
              </Button>
            </Link>
          </article>
        )
      }
    </main>
  )
}

export default NewCompanion