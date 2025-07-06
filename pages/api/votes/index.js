import { prisma } from '../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { licenseId, score, comment, userFingerprint } = req.body

    if (!licenseId || score === undefined || !userFingerprint) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    if (score < -10 || score > 10) {
      return res.status(400).json({ error: 'Score must be between -10 and 10' })
    }

    // Check if user has already voted today for this license
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const existingVote = await prisma.vote.findFirst({
      where: {
        licenseId,
        userFingerprint,
        createdAt: {
          gte: today,
          lt: tomorrow
        }
      }
    })

    if (existingVote) {
      return res.status(409).json({ error: 'You have already voted for this license plate today' })
    }

    // Create new vote
    const newVote = await prisma.vote.create({
      data: {
        licenseId,
        score: parseInt(score),
        comment: comment?.trim() || null,
        userFingerprint
      }
    })

    return res.status(201).json(newVote)
  } catch (error) {
    console.error('Create vote error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
