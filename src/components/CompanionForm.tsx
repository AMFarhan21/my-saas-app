'use client'
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { createCompanion } from '@/lib/actions/companion.action'
import { useRouter } from 'next/navigation'

const CompanionForm = () => {
  const [name, setName] = useState("")
  const [subject, setSubject] = useState("")
  const [topic, setTopic] = useState("")
  const [voice, setVoice] = useState("")
  const [style, setStyle] = useState("")
  const [duration, setDuration] = useState(15)
  const [error, setError] = useState<{ [key: string]: string }>({})
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newError: { [key: string]: string } = {}
    if (name.trim() === "") newError.name = ("Name field required");
    if (subject.trim() === "") newError.subject = ("Subject field required");
    if (topic.trim() === "") newError.topic = ("Topic field required");
    if (voice.trim() === "") newError.voice = ("Voice field required");
    if (style.trim() === "") newError.style = ("Style field required");
    if (!duration || duration <= 0 || isNaN(duration)) newError.duration = ("Duration field is required")
    setError(newError)
    if (Object.keys(newError).length > 0) return;

    try {
      const companionData = {
        name: name,
        subject: subject,
        topic: topic,
        voice: voice,
        style: style,
        duration: duration
      }

      const companion = await createCompanion(companionData)
      router.push(`/companions/${companion.companion?.id}`)
      
    } catch (error) {
      console.error("ERROR creating companions", error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='space-y-6'>
        <div className='space-y-2'>
          <Label className='font-semibold ml-2'>
            Companion Name
          </Label>
          <Input className='text-sm' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter companion name' />
          <div className="text-red-600 text-sm">{error.name}</div>
        </div>
        <div className='space-y-2'>
          <Label className='font-semibold ml-2'>
            Subject
          </Label>
          <Select onValueChange={(value) => setSubject(value)} value={subject}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Companion Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="maths">Maths</SelectItem>
              <SelectItem value="language">Language</SelectItem>
              <SelectItem value="coding">Coding</SelectItem>
            </SelectContent>
          </Select>
          <div> {subject} </div>
          <div className="text-red-600 text-sm">{error.subject}</div>
        </div>
        <div className='space-y-2'>
          <Label className='font-semibold ml-2'>
            What should the companion help with?
          </Label>
          <Textarea value={topic} onChange={(e) => setTopic(e.target.value)} placeholder='Ex. Derivates & Integrals' />
          <div className="text-red-600 text-sm">{error.topic}</div>
        </div>
        <div className='space-y-2'>
          <Label className='font-semibold ml-2'>
            Companion Voice
          </Label>
          <Select onValueChange={(value) => setVoice(value)} value={voice}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select the voice" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
          <div className="text-red-600 text-sm">{error.voice}</div>
        </div>
        <div className='space-y-2'>
          <Label className='font-semibold ml-2'>
            Companion Style
          </Label>
          <Select onValueChange={(value) => setStyle(value)} value={style}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select the style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="formal">Formal</SelectItem>
              <SelectItem value="informal">Informal</SelectItem>
            </SelectContent>
          </Select>
          <div className="text-red-600 text-sm">{error.style}</div>
        </div>
        <div className='space-y-2'>
          <Label className='font-semibold ml-2'>
            Estimated session duration in minutes
          </Label>
          <Input className='text-sm' value={duration} onChange={(e) => setDuration(e.target.valueAsNumber)} type='number' placeholder='Enter the duration of this companion' />
          <div className="text-red-600 text-sm">{error.duration}</div>
        </div>
        <Button className='w-full' type='submit'>
          Build your companion
        </Button>
      </div>
    </form>
  )
}

export default CompanionForm