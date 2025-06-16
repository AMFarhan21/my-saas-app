'use client'

import { cn, configureAssistant } from '@/lib/utils';
import { vapi } from '@/lib/vapi.sdk';
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import soundWaves from "../constants/soundwaves.json"
import { getSubjectColors } from '@/constants';
import { Button } from './ui/button';
import { Mic, MicOff } from 'lucide-react';
import { addToSessionHistory } from '@/lib/actions/companion.action';

interface CompanionComponentProps {
    companion: {
        id: string;
        subject: string | null;
        name?: string | null;
        topic?: string | null;
        duration: bigint | null;
        voice: string | null,
        style: string | null
        // color: string;
    },
    userName: string,
    userImage: string,
}

interface SavedMessages {
    role: string,
    content: string
}

enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED"
}

const CompanionComponent = ({ companion, userName, userImage }: CompanionComponentProps) => {

    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [messages, setMessages] = useState<SavedMessages[]>([])

    const lottieRef = useRef<LottieRefCurrentProps>(null)
    useEffect(() => {
        if (lottieRef) {
            if (isSpeaking) {
                lottieRef.current?.play()
            }
            else {
                lottieRef.current?.stop()
            }
        }
    }, [isSpeaking, lottieRef])

    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE)
        const onCallEnd = () => {
            setCallStatus(CallStatus.FINISHED)

            // Add to session history
            addToSessionHistory(companion.id)
        }
        const onMessage = (message) => {
            if (message.type === "transcript" && message.transcriptType === 'final') {
                const newMessage = {
                    role: message.role,
                    content: message.transcript
                }

                setMessages((prev) => [newMessage, ...prev])
            }
        }
        const onSpeechStart = () => setIsSpeaking(true)
        const onSpeechEnd = () => setIsSpeaking(false)

        const onError = (error: Error) => console.error("ERROR on call: ", error)

        vapi.on('call-start', onCallStart)
        vapi.on('call-end', onCallEnd)
        vapi.on('message', onMessage)
        vapi.on('error', onError)
        vapi.on('speech-start', onSpeechStart)
        vapi.on('speech-end', onSpeechEnd)


        return () => {
            vapi.off('call-start', onCallStart)
            vapi.off('call-end', onCallEnd)
            vapi.off('message', onMessage)
            vapi.off('error', onError)
            vapi.off('speech-start', onSpeechStart)
            vapi.off('speech-end', onSpeechEnd)
        }
    }, [])

    const toggleMicrophone = () => {
        const isMuted = vapi.isMuted();
        vapi.setMuted(!isMuted)
        setIsMuted(!isMuted)
    }


    const handleCall = async () => {
        setCallStatus(CallStatus.CONNECTING)

        const assistantOverrides = {
            variableValues: {
                subject: companion.subject,
                topic: companion.topic,
                style: companion.style
            },
            clientMessages: ['transcript'],
            serverMessages: []
        }

        // @ts-expect-error: assistantOverrides
        vapi.start(configureAssistant(companion.voice!, companion.style!), assistantOverrides)
    }


    const handleDisconnect = () => {
        setCallStatus(CallStatus.FINISHED)
        vapi.stop()
    }


    return (
        <section className='my-4'>
            <section className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2'>
                <div className='border-1 border-amber-600 p-4 col-span-1 sm:col-span-2 md:col-span-1 xl:col-span-2 rounded-2xl text-center items-center justify-center flex flex-col h-[70vh]'>
                    <div style={{ backgroundColor: getSubjectColors(companion.subject!) }} className={cn('transition-opacity duration-1000 size-60 justify-center items-center text-center flex rounded-2xl', callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE ? "opacity-100" : "opacity-0", callStatus === CallStatus.CONNECTING && "opacity-100 animate-pulse")}>
                        <Image src={`/icons/${companion.subject}.svg`} alt={companion.subject!} width={35} height={35} />
                    </div>
                    <div className={cn('absolute transition-opacity duration-1000', callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0")}>
                        <Lottie
                            lottieRef={lottieRef}
                            animationData={soundWaves}
                        />
                        {/* <DotLottieReact
                            src="https://lottie.host/129344c1-30ec-4767-9477-cedea4e0d15a/6CPqNRlY7S.lottie"
                            loop
                            autoplay
                        /> */}
                    </div>
                    <p className='text-xl sm:text-2xl font-bold'>
                        {companion.name}
                    </p>
                </div>
                <div className='justify-center items-center flex col-span-2 md:col-span-1 xl:col-span-1 p-4 border-1 border-amber-600 rounded-2xl'>
                    <div className='flex flex-col justify-center items-center space-y-2'>
                        <Image src={userImage} alt={userImage} width={130} height={130} className='rounded-full' />
                        <p>
                            {userName}
                        </p>
                        <div className='flex flex-wrap justify-center gap-2'>
                            {
                                isMuted ? (
                                    <Button onClick={toggleMicrophone} disabled={callStatus !== CallStatus.ACTIVE}>
                                        <MicOff />
                                        <p className='hidden sm:inline'>Turn on microphone</p>
                                    </Button>
                                ) : (
                                    <Button onClick={toggleMicrophone} disabled={callStatus !== CallStatus.ACTIVE}>
                                        <Mic />
                                        <p className='hidden sm:inline'>Turn off microphone</p>
                                    </Button>
                                )
                            }

                            <Button
                                variant={callStatus === CallStatus.ACTIVE ? "destructive" : "default"}
                                className={cn('rounded-lg py-2 cursor-pointer transition-colors w-full text-white', callStatus === CallStatus.CONNECTING && "animate-pulse")}
                                onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
                            >
                                {
                                    callStatus === CallStatus.ACTIVE ? "End Session" : callStatus === CallStatus.CONNECTING ? "Connecting" : "Start Session"
                                }
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div>
                    {
                        messages.map((message, idx) => {
                            if (message.role === "assistant") {
                                return (
                                    <p key={idx} className='text-black'>
                                        <span className='font-semibold text-blue-400'>{message.role}</span>: {message.content}
                                    </p>
                                )
                            } else {
                                return (
                                    <p key={idx} className='text-black'>
                                        <span className='font-semibold text-amber-600'>{userName}</span>: {message.content}
                                    </p>
                                )
                            }
                        })
                    }
                </div>
                <div>
                    Fading
                </div>
            </section>
        </section>
    )
}

export default CompanionComponent