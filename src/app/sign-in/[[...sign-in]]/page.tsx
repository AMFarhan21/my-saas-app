import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <main className='justify-center flex'>
        <SignIn />
    </main>
  )
}