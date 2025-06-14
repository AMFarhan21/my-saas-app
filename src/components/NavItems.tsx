"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Companions",
    href: "/companions",
  },
  {
    label: "My Journey",
    href: "/my-journey",
  },
];

function NavItems() {
  const pathName = usePathname();

  return (
    <div className="flex gap-2 sm:gap-8 items-center text-sm">
      {navItems.map((item) => (
        <Link
          href={item.href}
          key={item.label}
          className={cn(pathName === item.href && "font-semibold")}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export default NavItems;
