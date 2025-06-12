import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-2xl underline font-bold p-4 sm:p-8">
      Welcome to my SaaS App
      <Link href="/sign-in">
        <Button variant={'default'}>
          Let&apos;s get started
        </Button>
      </Link>
    </div>
  );
}
