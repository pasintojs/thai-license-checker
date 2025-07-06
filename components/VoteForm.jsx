import { useState } from 'react'
import axios from 'axios'

export default function VoteForm({ licenseId, userFingerprint, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    score: 0,
    comment: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await axios.post('/api/votes', {
        licenseId,
        score: parseInt(formData.score),
        comment: formData.comment.trim() || null,
        userFingerprint
      })

      onSuccess(response.data)
    } catch (err) {
      setError(err.response?.data?.error || 'เกิดข้อผิดพลาดในการส่งคะแนน')
    } finally {
      setLoading(false)
    }
  }

  const handleScoreChange = (e) => {
    setFormData({
      ...formData,
      score: parseInt(e.target.value)
    })
  }

  const getScoreLabel = (score) => {
    if (score >= 8) return 'ขับดีมาก'
    if (score >= 5) return 'ขับดี'
    if (score >= 1) return 'ขับปกติ'
    if (score === 0) return 'เฉยๆ'
    if (score >= -4) return 'ขับแย่'
    return 'ขับแย่มาก'
  }

  const getScoreColor = (score) => {
    if (score >= 5) return 'text-thai-green'
    if (score >= 1) return 'text-yellow-600'
    if (score === 0) return 'text-gray-600'
    return 'text-thai-red'
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 text-center">
        ให้คะแนนพฤติกรรมการขับขี่
      </h3>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            คะแนน (-10 ถึง +10)
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min="-10"
              max="10"
              value={formData.score}
              onChange={handleScoreChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>แย่มาก</span>
              <span>เฉยๆ</span>
              <span>ดีมาก</span>
            </div>
            <div className="text-center">
              <span className={`text-lg font-bold ${getScoreColor(formData.score)}`}>
                {formData.score > 0 ? '+' : ''}{formData.score}
              </span>
              <span className={`ml-2 text-sm ${getScoreColor(formData.score)}`}>
                ({getScoreLabel(formData.score)})
              </span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ความคิดเห็น (ไม่บังคับ)
          </label>
          <textarea
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            className="input-field"
            rows="3"
            placeholder="แชร์ประสบการณ์การขับขี่ของคุณ..."
            maxLength="500"
          />
          <div className="text-xs text-gray-500 text-right mt-1">
            {formData.comment.length}/500
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary flex-1"
            disabled={loading}
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            className="btn-primary flex-1"
            disabled={loading}
          >
            {loading ? 'กำลังส่ง...' : 'ส่งคะแนน'}
          </button>
        </div>
      </form>
    </div>
  )
}
