"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "../prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createCompanion = async (
  companionData: Prisma.companionsCreateInput
) => {
  const user = await auth();
  const userId = user.userId;

  try {
    const companion = await prisma.companions.create({
      data: {
        ...companionData,
        author: userId,
      },
    });

    if (!companion) throw new Error("Failed to create the companion");

    revalidatePath(`/companions/${companion.id}`);
    return {
      companion,
      success: true,
      message: "Companion Created Successfully",
    };
  } catch (error) {
    console.error("ERROR creating the companion", error);
    return { error, success: false, message: "Failed to create the companion" };
  }
};

export const getAllCompanions = async () => {
  try {
    const companions = await prisma.companions.findMany();

    return companions;
  } catch (error) {
    console.error("ERROR fetching all companions", error);
  }
};

export const getCompanion = async (id: string) => {
  try {
    const companion = await prisma.companions.findFirst({
      where: {
        id,
      },
    });

    return companion;
  } catch (error) {
    console.error("ERROR fetching the companion: ", error);
  }
};

export const addToSessionHistory = async (companionId: string) => {
  const user = await auth();
  const userId = user.userId;

  try {
    const response = await prisma.session_history.create({
      data: {
        user_id: userId,
        companion_id: companionId,
      },
    });

    revalidatePath("/");
    return response;
  } catch (error) {
    console.error("ERROR storing it into session history: ", error);
  }
};

export const getRecentSessions = async (limit: number) => {
  try {
    const response = await prisma.session_history.findMany({
      take: limit,
      include: {
        companions: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return response.map((session) => session.companions);
  } catch (error) {
    console.error("ERROR fetching the recent sessions", error);
  }
};

export const getUserSessions = async (userId: string, limit: number) => {
  try {
    const response = await prisma.session_history.findMany({
      take: limit,
      where: {
        user_id: userId,
      },
      include: {
        companions: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return response.map((session) => session.companions);
  } catch (error) {
    console.error("ERROR on fetching user session", error);
  }
};

export const getUserCompanion = async (userId: string) => {
  try {
    const response = await prisma.companions.findMany({
      where: {
        author: userId,
      },
    });

    return response;
  } catch (error) {
    console.error("ERROR on fetching user's companions", error);
  }
};

export const newCompanionPermissions = async () => {
  const user = await auth();
  const userId = user.userId;
  const has = user.has;
  let limit = 0;

  try {
    if (has({ plan: "pro" })) {
      return true;
    } else if (has({ feature: "3_active_companions" })) {
      limit = 3;
    } else if (has({ feature: "10_active_companions" })) {
      limit = 10 ;
    }

    const companionCount = await prisma.companions.count({
      where: {
        author: userId,
      },
    });


    return companionCount < limit
  } catch (error) {
    console.error("ERROR", error);
  }
};
