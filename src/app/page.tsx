import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-2xl underline font-bold">
      Welcome to my SaaS App
      <Link href="/sign-in">
        <Button variant={'default'}>
          Let&apos;s get started
        </Button>
      </Link>
    </div>
  );
}
