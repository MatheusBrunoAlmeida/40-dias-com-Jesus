// app/actions/userActions.ts
'use server';

import { prisma } from '../../lib/prisma';

export async function getUserReadDays(userId: string) {
  try {
    const readDays = await prisma.daysRead.findMany({
      where: {
        userId,
      },
      select: {
        day: true,
      },
      orderBy: {
        day: 'asc',
      },
    });

    return { data: readDays };
  } catch (error) {
    console.error('Error fetching user read days:', error);
    return { error: 'Erro ao buscar dias lidos do usuário' };
  }
}