// Mock API endpoint for testing UI without database
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { prefix, number, province } = req.query

    if (!prefix || !number || !province) {
      return res.status(400).json({ error: 'Missing required parameters' })
    }

    // Mock response - simulate finding a license
    const mockLicense = {
      id: 'mock-id-123',
      prefix: prefix.trim(),
      number: number.trim(),
      province: province.trim(),
      votes: [
        {
          id: 'vote-1',
          score: 5,
          comment: 'ขับดีมาก รอบคอบ',
          createdAt: new Date().toISOString()
        },
        {
          id: 'vote-2',
          score: -3,
          comment: 'ขับเร็วเกินไป',
          createdAt: new Date().toISOString()
        }
      ],
      createdAt: new Date().toISOString()
    }

    return res.status(200).json({
      found: true,
      license: mockLicense
    })
  } catch (error) {
    console.error('Mock search error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
