import CompanionCard from "@/components/CompanionsCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import { getSubjectColors } from "@/constants";
import { getAllCompanions, getRecentSessions } from "@/lib/actions/companion.action";

export default async function Home() {

  const companions = await getAllCompanions()
  const recentSessions = await getRecentSessions(6)
  
  return (
    <main className="">
      <div className="px-4 sm:px-8 xl:px-40">
        <h1 className="text-2xl underline font-bold mb-8">
          Popular Companions
        </h1>
        {/* Companions Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
          {
            companions?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 3).map((session) => (
              <CompanionCard
                key={session.id}
                id={session.id}
                subject={session.subject}
                name={session.name}
                topic={session.topic}
                duration={session.duration}
                color={getSubjectColors(session.subject!)}
              />
            ))
          }
        </section>
        {/* Companions Lists */}
        <section className=" justify-between grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 ">
          <CompanionsList title={"Recent Sessions"} recentSessions={recentSessions}/>
          <CTA />
        </section>
      </div>
    </main>
  );
}
