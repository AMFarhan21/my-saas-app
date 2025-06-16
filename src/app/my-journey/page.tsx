import { getUserCompanion, getUserSessions } from "@/lib/actions/companion.action";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { redirect } from "next/navigation";
import Image from "next/image";
import CompanionsList from "@/components/CompanionsList";

const Profile = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in")

  const getUserCompanions = await getUserCompanion(user.id!);
  const getUserRecentSession = await getUserSessions(user.id, 10)

  return (
    <main className="px-4 sm:px-8 xl:px-40">
      <section className="justify-center items-center text-center flex flex-col sm:flex-row sm:justify-between gap-2">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <Image src={user.imageUrl} alt={user.fullName!} width={110} height={110} />
          <div className="gap-2">
            <h1 className="font-bold text-lg sm:text-2xl">
              {user.fullName}
            </h1>
            <p>
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="border-1 border-black rounded-2xl p-2">
            <div className="flex gap-2 text-center items-center justify-center">
              <Image src={'/icons/check.svg'} alt={'completed'} width={22} height={22} />
              {getUserRecentSession?.length}
            </div>
            <p>
              Lessons completed
            </p>
          </div>
          <div className="border-1 border-black rounded-2xl p-2">
            <div className="flex gap-2 text-center items-center justify-center">
              <Image src={'/icons/cap.svg'} alt={'completed'} width={22} height={22} />
              {getUserCompanions?.length}
            </div>
            <p>
              Companion Created
            </p>
          </div>
        </div>
      </section>
      <section>
        <Accordion type="multiple">
          <AccordionItem value="recent">
            <AccordionTrigger className="text-xl font-bold">Recent Sessions</AccordionTrigger>
            <AccordionContent>
              <CompanionsList title={"Recent Sessions"} recentSessions={getUserRecentSession} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
      <section>
        <Accordion type="multiple">
          <AccordionItem value="companions">
            <AccordionTrigger className="text-xl font-bold">My Companions ({getUserCompanions?.length}) </AccordionTrigger>
            <AccordionContent className="gap-2">
              <CompanionsList title={"My Companions"} recentSessions={getUserCompanions} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </main>
  );
};

export default Profile;
