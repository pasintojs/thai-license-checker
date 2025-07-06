import { prisma } from '../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { licenseId, userFingerprint } = req.query

    if (!licenseId || !userFingerprint) {
      return res.status(400).json({ error: 'Missing required parameters' })
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

    return res.status(200).json({
      canVote: !existingVote,
      hasVotedToday: !!existingVote
    })
  } catch (error) {
    console.error('Check vote error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
