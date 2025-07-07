// Mock API endpoint for testing UI without database
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { licenseId, userFingerprint } = req.query

    if (!licenseId || !userFingerprint) {
      return res.status(400).json({ error: 'Missing required parameters' })
    }

    // Mock response - allow voting
    return res.status(200).json({
      canVote: true
    })
  } catch (error) {
    console.error('Mock vote check error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
