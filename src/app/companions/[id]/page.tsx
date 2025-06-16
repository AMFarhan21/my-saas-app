import CompanionComponent from '@/components/CompanionComponent'
import { Button } from '@/components/ui/button'
import { getSubjectColors } from '@/constants'
import { getCompanion } from '@/lib/actions/companion.action'
import { currentUser } from '@clerk/nextjs/server'
import { Clock } from 'lucide-react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

interface CompanionSessionPageProps {
  params: Promise<{
    id: string
  }>
}

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
  const { id } = await params;
  const companion = await getCompanion(id)

  const user = await currentUser()
  if (!user) redirect("/sign-in")
  if (!companion) redirect("/companions")

  return (
    <main className='px-4 sm:px-8 xl:px-40'>
      <div className='flex border-1 border-black p-4 rounded-2xl justify-between space-x-4'>
        <div className='flex space-x-4 w-full'>
          <div className='hidden sm:flex size-20 aspect-square justify-center rounded-2xl' style={{ backgroundColor: getSubjectColors(companion.subject as string) }}>
            <Image src={`/icons/${companion.subject}.svg`} alt={companion.subject as string} width={35} height={35} />
          </div>
          <div className='w-full'>
            <div className='flex justify-between space-x-2 flex-wrap'>
              <div className='flex space-x-2'>
                <p className='font-bold text-lg sm:text-xl'> {companion.name} </p>
                <Button>
                  {companion.subject}
                </Button>
              </div>
              <div className='text-sm sm:text-base font-semibold flex items-center'>
                <Clock className='p-1' /> {companion.duration} minutes
              </div>
            </div>
            <div className='text-sm sm:text-base text-justify'> {companion.topic} </div>
          </div>
        </div>
      </div>
      <CompanionComponent
        companion={companion}
        userName={user.fullName!}
        userImage={user.imageUrl!}
      />
    </main>
  )
}

export default CompanionSession


