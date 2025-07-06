import { prisma } from '../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { prefix, number, province, initialScore, initialComment, userFingerprint } = req.body

    if (!prefix || !number || !province || !userFingerprint) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Check if license already exists
    const existingLicense = await prisma.license.findFirst({
      where: {
        prefix: prefix.trim(),
        number: number.trim(),
        province: province.trim()
      }
    })

    if (existingLicense) {
      return res.status(409).json({ error: 'License plate already exists' })
    }

    // Create new license with initial vote
    const result = await prisma.$transaction(async (tx) => {
      const newLicense = await tx.license.create({
        data: {
          prefix: prefix.trim(),
          number: number.trim(),
          province: province.trim()
        }
      })

      const initialVote = await tx.vote.create({
        data: {
          licenseId: newLicense.id,
          score: initialScore || 0,
          comment: initialComment,
          userFingerprint
        }
      })

      return {
        ...newLicense,
        votes: [initialVote]
      }
    })

    return res.status(201).json(result)
  } catch (error) {
    console.error('Create license error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
