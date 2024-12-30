import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST - Mark a day as read
export async function POST(request: Request) {
  try {
    const { userId, day, timestamp } = await request.json()

    if (!userId || !day) {
      return NextResponse.json(
        { error: 'UserId e day são obrigatórios' },
        { status: 400 }
      )
    }

    const readDay = await prisma.daysRead.create({
      data: {
        userId,
        day,
        timestamp
      }
    })

    return NextResponse.json(readDay, { status: 201 })
  } catch (error) {
    console.error('Error creating read day:', error)
    return NextResponse.json(
      { error: 'Erro ao marcar dia como lido' },
      { status: 500 }
    )
  }
}

// GET - Get all read days with users who read them
export async function GET() {
  try {
    const readDays = await prisma.daysRead.findMany({
      include: {
        user: {
          select: {
            name: true
          }
        }
      }
    })

    // Group by day
    const groupedByDay = readDays.reduce((acc, curr) => {
      if (!acc[curr.day]) {
        acc[curr.day] = {
          day: curr.day,
          readers: []
        }
      }
      acc[curr.day].readers.push(curr.user.name)
      return acc
    }, {} as Record<number, { day: number, readers: string[] }>)

    return NextResponse.json(Object.values(groupedByDay))
  } catch (error) {
    console.error('Error fetching read days:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar dias lidos' },
      { status: 500 }
    )
  }
} 