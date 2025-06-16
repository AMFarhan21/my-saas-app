'use client'
import { Search } from 'lucide-react'
import React, { SetStateAction } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'


function SearchInput({searchQuery, setSearchQuery, searchSubject, setSearchSubject, setCurrentPage}: {searchQuery: string, setSearchQuery: React.Dispatch<SetStateAction<string>>, searchSubject: string, setSearchSubject: React.Dispatch<SetStateAction<string>>, setCurrentPage: React.Dispatch<SetStateAction<number>>}) {
    return (

        <div className='flex gap-1'>
            <Label className=''>
                <Search className='absolute ml-2 p-1' />
                <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='px-10'
                    placeholder='Search Companions'
                />
            </Label>
            <Select value={searchSubject} onValueChange={(value) => {
                setSearchSubject(value)
                setCurrentPage(1)
            }}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Subjects</SelectLabel>
                            <SelectItem value="science">Science</SelectItem>
                            <SelectItem value="maths">Maths</SelectItem>
                            <SelectItem value="language">Language</SelectItem>
                            <SelectItem value="history">History</SelectItem>
                            <SelectItem value="coding">Coding</SelectItem>
                            <SelectItem value="economics">Economics</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
        </div>
    )

}

export default SearchInput