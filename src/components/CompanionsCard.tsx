import { Clock, Save } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";


interface CompanionsCardProps {
    id: string;
    subject: string | null;
    name?: string | null;
    topic?: string | null;
    duration: number | bigint | null;
    color: string;
}

const CompanionCard = ({ id, subject, name, topic, duration, color }: CompanionsCardProps) => {
    return (
        <article className={`p-3 sm:p-4 rounded-xl space-y-2 text-sm border-1 border-black`} style={{ backgroundColor: color }} key={id}>
            <div className="flex items-center justify-between text-xs">
                <div className="bg-black text-white px-4 py-2 rounded-2xl">{subject}</div>
                <div className="bg-black rounded-2xl p-2">
                    <Save className="text-white w-4 h-4" />
                </div>
            </div>
            <h2 className="font-bold text-lg sm:text-xl">
                {name}
            </h2>
            <p>{topic}</p>
            <p className="flex items-center gap-2">
                <Clock className="w-4" /> {duration} mins duration
            </p>
            <Link href={`/companions/${id}`}>
                <Button className="w-full bg-amber-600">Launch Lesson</Button>
            </Link>
        </article>
    );
};

export default CompanionCard;
