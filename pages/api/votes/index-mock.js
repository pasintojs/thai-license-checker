// Mock API endpoint for testing UI without database
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

    // Mock response - simulate successful vote creation
    const mockVote = {
      id: 'mock-vote-' + Date.now(),
      licenseId,
      score: parseInt(score),
      comment: comment?.trim() || null,
      userFingerprint,
      createdAt: new Date().toISOString()
    }

    return res.status(201).json(mockVote)
  } catch (error) {
    console.error('Mock vote creation error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
