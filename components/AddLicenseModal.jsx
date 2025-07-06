import { useState } from 'react'
import { getProvincesByRegion } from '../lib/provinces'
import axios from 'axios'

export default function AddLicenseModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  userFingerprint,
  initialData = {} 
}) {
  const [formData, setFormData] = useState({
    prefix: initialData?.prefix || '',
    number: initialData?.number || '',
    province: initialData?.province || '',
    score: 0,
    comment: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const provinces = getProvincesByRegion()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await axios.post('/api/licenses', {
        prefix: formData.prefix,
        number: formData.number,
        province: formData.province,
        initialScore: parseInt(formData.score),
        initialComment: formData.comment.trim() || null,
        userFingerprint
      })

      onSuccess(response.data)
      onClose()
    } catch (err) {
      setError(err.response?.data?.error || 'เกิดข้อผิดพลาดในการเพิ่มทะเบียน')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              เพิ่มทะเบียนรถใหม่
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              disabled={loading}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                อักษรนำหน้า (เช่น กข, นค)
              </label>
              <input
                type="text"
                name="prefix"
                value={formData.prefix}
                onChange={handleChange}
                className="input-field"
                placeholder="กข"
                maxLength="3"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                หมายเลขทะเบียน
              </label>
              <input
                type="text"
                name="number"
                value={formData.number}
                onChange={handleChange}
                className="input-field"
                placeholder="1234"
                maxLength="4"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                จังหวัด
              </label>
              <select
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="input-field"
                required
                disabled={loading}
              >
                <option value="">เลือกจังหวัด</option>
                {Object.entries(provinces).map(([region, provinceList]) => (
                  <optgroup key={region} label={region}>
                    {provinceList.map((province) => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                คะแนนเริ่มต้น (-10 ถึง +10)
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="-10"
                  max="10"
                  value={formData.score}
                  onChange={handleScoreChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  disabled={loading}
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
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                className="input-field"
                rows="3"
                placeholder="แชร์ประสบการณ์การขับขี่ของคุณ..."
                maxLength="500"
                disabled={loading}
              />
              <div className="text-xs text-gray-500 text-right mt-1">
                {formData.comment.length}/500
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary flex-1"
                disabled={loading}
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="btn-primary flex-1"
                disabled={loading || !formData.prefix || !formData.number || !formData.province}
              >
                {loading ? 'กำลังเพิ่ม...' : 'เพิ่มทะเบียน'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
