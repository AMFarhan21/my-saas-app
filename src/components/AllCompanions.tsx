'use client'
import React, { useState } from 'react'
import { getSubjectColors } from '@/constants'
import CompanionCard from './CompanionsCard'
import SearchInput from './SearchInput'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { XIcon } from 'lucide-react'
import { Button } from './ui/button'

type Companions = {
    id: string;
    subject: string | null;
    name?: string | null;
    topic?: string | null;
    duration: bigint | null;
    color?: string;
    created_at: Date;
}

interface AllCompanionProps {
    companions: Companions[]
}

const AllCompanions = ({ companions }: AllCompanionProps) => {
    const [searchQuery, setSearchQuery] = useState("")
    const [searchSubject, setSearchSubject] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const filteredCompanions = companions.filter((companion) => (
        companion.name?.toLowerCase().includes(searchQuery.toLowerCase()) &&
        companion.subject?.includes(searchSubject) ||
        companion.topic?.toLowerCase().includes(searchQuery.toLowerCase()) &&
        companion.subject?.includes(searchSubject)
    )).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    const itemsPerPage = 6
    const totalPage = Math.ceil(filteredCompanions.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage

    const currentCompanions = filteredCompanions.slice(startIndex, startIndex + itemsPerPage)

    const pageNumber = Array.from({ length: totalPage }, (_, i) => i + 1)

    return (
        <div className='space-y-4 mb-10'>
            <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchSubject={searchSubject} setSearchSubject={setSearchSubject} setCurrentPage={setCurrentPage} />
            {
                searchSubject && (
                    <Button className='flex items-center' onClick={() => setSearchSubject("")}>
                        Filter: {searchSubject.slice(0, 1).toUpperCase() + searchSubject.slice(1)}
                        <XIcon className='' />
                    </Button>
                )
            }
            <div className='gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-col-3'>
                {
                    currentCompanions.map((companion) => (
                        <CompanionCard
                            key={companion.id}
                            id={companion.id}
                            name={companion.name}
                            subject={companion.subject}
                            topic={companion.topic}
                            duration={companion?.duration}
                            color={getSubjectColors(companion.subject as string)}
                        />
                    ))
                }
            </div>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    {
                        pageNumber.map((page) => (
                            <PaginationItem
                                key={page}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setCurrentPage(page)
                                }}
                            >
                                <PaginationLink href="#" isActive={currentPage === page}>
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))
                    }
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

        </div>
    )
}

export default AllCompanions