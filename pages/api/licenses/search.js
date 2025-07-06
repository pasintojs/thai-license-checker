import { prisma } from '../../../lib/prisma'

// Add environment check
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set')
}

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.error('NEXT_PUBLIC_SUPABASE_URL is not set')
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { prefix, number, province } = req.query

    if (!prefix || !number || !province) {
      return res.status(400).json({ error: 'Missing required parameters' })
    }

    const license = await prisma.license.findFirst({
      where: {
        prefix: prefix.trim(),
        number: number.trim(),
        province: province.trim()
      },
      include: {
        votes: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    if (license) {
      return res.status(200).json({
        found: true,
        license
      })
    } else {
      return res.status(200).json({
        found: false
      })
    }
  } catch (error) {
    console.error('Search error:', error)
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    })
    return res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
}
