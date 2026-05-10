import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query') || ''
    const type = searchParams.get('type')
    const tag = searchParams.get('tag')
    const sortBy = searchParams.get('sortBy') || 'rating'
    const order = searchParams.get('order') || 'desc'
    
    const accommodations = await prisma.accommodation.findMany({
      where: {
        AND: [
          {
            OR: [
              { name: { contains: query } },
              { description: { contains: query } },
            ],
          },
          type ? {
            OR: [
              { type: type },
              { accommodationType: { slug: type } }
            ]
          } : {},
          tag ? { locationTags: { some: { slug: tag } } } : {},
        ],
      },
      orderBy: [
        { isPremium: 'desc' },
        { [sortBy]: order === 'desc' ? 'desc' : 'asc' },
      ],
      include: {
        accommodationType: true,
        locationTags: true,
        amenities: true,
      },
    })
    
    return NextResponse.json(accommodations)
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
