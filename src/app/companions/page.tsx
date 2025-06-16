import AllCompanions from "@/components/AllCompanions";
import { getAllCompanions } from "@/lib/actions/companion.action"


const CompanionsLibrary = async () => {
  const companions = await getAllCompanions()

  return (
    <main className="px-4 sm:px-8 xl:px-40 flex-wrap gap-4 sm:gap-8 justify-center">
      <div className="font-bold text-xl py-4">
        <h1>Companion Library</h1>
      </div>
      <AllCompanions
        companions={companions ? companions : []}
      />
    </main>
  )
}

export default CompanionsLibrary
