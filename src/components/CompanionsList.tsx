import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from 'next/link';
import Image from 'next/image';
import { Clock } from 'lucide-react';


interface CompanionsListProps {
  recentSessions: [{
    id: string;
    subject: string;
    name: string;
    topic: string;
    duration: number;
    color: string;
  }]
}


const CompanionsList = ({ recentSessions }: CompanionsListProps) => {
  return (
    <article className='col-span-2 border-1 border-black rounded-4xl p-2 sm:p-4 w-full'>
      <h2 className='text-lg sm:text-xl font-bold ml-2 mt-2'>Recent Sessions</h2>
      <Table className='table-fixed'>
        <TableHeader>
          <TableRow>
            <TableHead className="text-sm sm:text-lg w-3/3">Lessons</TableHead>
            <TableHead className='text-sm sm:text-lg truncate w-1/3'>Subject</TableHead>
            <TableHead className='text-sm sm:text-lg text-right truncate w-1/3'>Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            recentSessions.map((session) => (
              <TableRow className='text-xs sm:text-sm' key={session.id}>
                <TableCell>
                  <Link href={`/companions/${session.id}`}>
                    <div className='flex items-center space-x-4 truncate'>
                      <div style={{ backgroundColor: session.color }} className='size-[50px] rounded-lg justify-center hidden md:flex aspect-square'>
                        <Image src={`/icons/${session.subject}.svg`} alt={session.name} width={35} height={35} />
                      </div>
                      <div className='flex flex-col'>
                        <p className='font-semibold sm:font-bold text-sm sm:text-base truncate'>{session.name}</p>
                        <p className='truncate'> {session.topic} </p>
                      </div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell className='truncate'>
                  <div className='hidden md:inline'>
                    {session.subject}
                  </div>
                  <div style={{ backgroundColor: session.color }} className='size-[30px] rounded-lg flex items-center justify-center md:hidden'>
                    <Image src={`/icons/${session.subject}.svg`} alt={session.name} width={18} height={18} />
                  </div>
                </TableCell>
                <TableCell className='justify-end text-right flex items-center gap-1 font-bold'> 
                  {session.duration}  <span className='sm:hidden'> <Clock className='w-3'/> </span>
                  <span className='hidden sm:inline font-normal'> mins </span>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </article>
  )
}

export default CompanionsList