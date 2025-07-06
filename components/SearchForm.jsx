import { useState } from 'react'
import { getProvincesByRegion } from '../lib/provinces'

export default function SearchForm({ onSearch, loading }) {
  const [formData, setFormData] = useState({
    prefix: '',
    number: '',
    province: ''
  })

  const provinces = getProvincesByRegion()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.prefix && formData.number && formData.province) {
      onSearch(formData)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="card max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        ตรวจสอบคะแนนพฤติกรรมการขับขี่
      </h1>
      
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

        <button
          type="submit"
          disabled={loading || !formData.prefix || !formData.number || !formData.province}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'กำลังค้นหา...' : 'ค้นหา'}
        </button>
      </form>
    </div>
  )
}
