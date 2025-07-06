import { useState, useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'
import { getFingerprint } from '../lib/fingerprint'
import SearchForm from '../components/SearchForm'
import ResultCard from '../components/ResultCard'
import AddLicenseModal from '../components/AddLicenseModal'

export default function Home() {
  const [searchResult, setSearchResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [userFingerprint, setUserFingerprint] = useState('')
  const [canVote, setCanVote] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchData, setSearchData] = useState(null)

  useEffect(() => {
    // Get user fingerprint on component mount
    const initFingerprint = async () => {
      try {
        const fingerprint = await getFingerprint()
        setUserFingerprint(fingerprint)
      } catch (err) {
        console.error('Failed to get fingerprint:', err)
      }
    }
    initFingerprint()
  }, [])

  const handleSearch = async (formData) => {
    setLoading(true)
    setError('')
    setSearchResult(null)
    setSearchData(formData)

    try {
      const response = await axios.get('/api/licenses/search', {
        params: formData
      })

      if (response.data.found) {
        setSearchResult(response.data.license)
        
        // Check if user can vote
        if (userFingerprint) {
          const voteCheckResponse = await axios.get('/api/votes/check', {
            params: {
              licenseId: response.data.license.id,
              userFingerprint
            }
          })
          setCanVote(voteCheckResponse.data.canVote)
        }
      } else {
        setSearchResult(null)
        setShowAddModal(true)
      }
    } catch (err) {
      setError(err.response?.data?.error || 'เกิดข้อผิดพลาดในการค้นหา')
    } finally {
      setLoading(false)
    }
  }

  const handleVoteSubmit = (newVote) => {
    // Update the search result with the new vote
    setSearchResult(prev => ({
      ...prev,
      votes: [...prev.votes, newVote]
    }))
    setCanVote(false)
  }

  const handleAddLicenseSuccess = (newLicense) => {
    setSearchResult(newLicense)
    setCanVote(false) // User just voted when creating the license
    setShowAddModal(false)
  }

  const handleNewSearch = () => {
    setSearchResult(null)
    setError('')
    setSearchData(null)
    setCanVote(false)
  }

  return (
    <>
      <Head>
        <title>ตรวจสอบคะแนนพฤติกรรมการขับขี่</title>
        <meta name="description" content="ตรวจสอบและให้คะแนนพฤติกรรมการขับขี่ของทะเบียนรถในประเทศไทย" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {!searchResult ? (
            <SearchForm onSearch={handleSearch} loading={loading} />
          ) : (
            <div className="space-y-6">
              <ResultCard
                license={searchResult}
                onVoteSubmit={handleVoteSubmit}
                canVote={canVote}
                userFingerprint={userFingerprint}
              />
              
              <div className="text-center">
                <button
                  onClick={handleNewSearch}
                  className="btn-secondary"
                >
                  ค้นหาทะเบียนอื่น
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto">
              {error}
            </div>
          )}

          <AddLicenseModal
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
            onSuccess={handleAddLicenseSuccess}
            userFingerprint={userFingerprint}
            initialData={searchData}
          />
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>ระบบตรวจสอบคะแนนพฤติกรรมการขับขี่</p>
          <p className="mt-1">ช่วยกันสร้างถนนที่ปลอดภัยสำหรับทุกคน</p>
        </footer>
      </main>
    </>
  )
}
