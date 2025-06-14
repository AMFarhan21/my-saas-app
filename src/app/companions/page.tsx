import CompanionCard from "@/components/CompanionsCard"
import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"


const CompanionsLibrary = async () => {

  const companions = await prisma.companions.findMany()
  const user = await auth()
  console.log(user.userId)


  return (
    <main className="p-4 sm:p-8 flex flex-wrap gap-4 sm:gap-8 justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {
          companions.map((companion) => {
            return (
              <CompanionCard
                key={companion.id}
                id={companion.id}
                name={companion.name}
                subject={companion.subject}
                topic={companion.topic}
                duration={companion?.duration}
                color={""}
              />
            )
          })
        }
      </div>
    </main>
  )
}

export default CompanionsLibrary
