import CompanionCard from "@/components/CompanionsCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import { recentSessions } from "@/constants";

export default function Home() {
  return (
    <main className="">
      <div className="px-4 xl:px-40">
        <h1 className="text-2xl underline font-bold mb-8">
          Popular Companions
        </h1>
        {/* Companions Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
          {
            recentSessions.map((session) => (
              <CompanionCard
                key={session.id}
                id={session.id}
                subject={session.subject}
                name={session.name}
                topic={session.topic}
                duration={session.duration}
                color={session.color}
              />
            ))
          }
        </section>
        {/* Companions Lists */}
        <section className=" justify-between grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 ">
          <CompanionsList
            recentSessions={recentSessions}
          />
          <CTA />
        </section>
      </div>
    </main>
  );
}
