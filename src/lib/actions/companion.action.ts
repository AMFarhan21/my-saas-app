'use server'

import { auth } from '@clerk/nextjs/server';
import prisma from '../prisma';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const createCompanion = async(companionData: Prisma.companionsCreateInput) => {
    const user = await auth()
    const userId = user.userId
    
    
    try {
        const companion = await prisma.companions.create({
            data: {
                ...companionData,
                author: userId
            }
        })

        if(!companion) throw new Error("Failed to create the companion")
        
        revalidatePath(`/companions/${companion.id}`)
        return {companion, success: true, message: "Companion Created Successfully"}

    } catch (error) {
        console.error("ERROR creating the companion", error)
        return {error, success: false, message: "Failed to create the companion"}
    }
}