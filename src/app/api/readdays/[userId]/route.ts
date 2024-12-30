import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const readDays = await prisma.daysRead.findMany({
      where: {
        userId: params.userId
      },
      select: {
        day: true,
      },
      orderBy: {
        day: 'asc'
      }
    })

    return NextResponse.json(readDays)
  } catch (error) {
    console.error('Error fetching user read days:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar dias lidos do usuário' },
      { status: 500 }
    )
  }
} 