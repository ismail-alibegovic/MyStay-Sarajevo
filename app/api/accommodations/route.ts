import { NextRequest, NextResponse } from 'next/server'
import { getAccommodations, type Accommodation } from '@/lib/accommodations'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query') || ''
    const type = searchParams.get('type')
    const tag = searchParams.get('tag')
    const sortBy = searchParams.get('sortBy') || 'rating'
    const order = searchParams.get('order') || 'desc'
    
    let results = await getAccommodations()

    if (query) {
      const q = query.toLowerCase()
      results = results.filter(a =>
        a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)
      )
    }

    if (type) {
      results = results.filter(a =>
        a.type.toLowerCase() === type.toLowerCase() ||
        a.accommodationType?.slug.toLowerCase() === type.toLowerCase()
      )
    }

    if (tag) {
      results = results.filter(a =>
        a.locationTags.some(t => t.slug === tag)
      )
    }

    results.sort((a: any, b: any) => {
      const aVal = a[sortBy] || 0
      const bVal = b[sortBy] || 0
      return order === 'desc' ? Number(bVal) - Number(aVal) : Number(aVal) - Number(bVal)
    })
    
    return NextResponse.json(results)
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
