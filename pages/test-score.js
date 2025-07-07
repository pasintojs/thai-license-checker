import { useState } from 'react'
import Head from 'next/head'
import VoteForm from '../components/VoteForm'
import AddLicenseModal from '../components/AddLicenseModal'

export default function TestScore() {
  const [showVoteForm, setShowVoteForm] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)

  const mockLicense = {
    id: 'test-license-123',
    prefix: 'กข',
    number: '1234',
    province: 'กรุงเทพมหานคร',
    votes: [
      { id: '1', score: 5, comment: 'ขับดี', createdAt: new Date().toISOString() },
      { id: '2', score: -2, comment: 'ขับเร็ว', createdAt: new Date().toISOString() }
    ]
  }

  const handleVoteSuccess = (vote) => {
    console.log('Vote submitted:', vote)
    alert(`คะแนนที่ส่ง: ${vote.score}`)
    setShowVoteForm(false)
  }

  const handleAddSuccess = (license) => {
    console.log('License added:', license)
    alert(`เพิ่มทะเบียนสำเร็จ คะแนน: ${license.initialScore}`)
    setShowAddModal(false)
  }

  return (
    <>
      <Head>
        <title>Test Score Bar - Thai License Checker</title>
        <meta name="description" content="Test the new click-only score bar" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 font-thai">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              🧪 Test Score Bar
            </h1>
            <p className="text-gray-600">
              Test the new click-only score selection functionality
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Test Vote Form */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Test Vote Form
              </h2>
              <p className="text-gray-600 mb-4">
                Test the score selection in the voting form
              </p>
              
              {!showVoteForm ? (
                <button
                  onClick={() => setShowVoteForm(true)}
                  className="btn-primary w-full"
                >
                  เปิดฟอร์มให้คะแนน
                </button>
              ) : (
                <VoteForm
                  licenseId={mockLicense.id}
                  userFingerprint="test-fingerprint"
                  onSuccess={handleVoteSuccess}
                  onCancel={() => setShowVoteForm(false)}
                />
              )}
            </div>

            {/* Test Add License Modal */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Test Add License Modal
              </h2>
              <p className="text-gray-600 mb-4">
                Test the score selection when adding a new license
              </p>
              
              <button
                onClick={() => setShowAddModal(true)}
                className="btn-primary w-full"
              >
                เปิดฟอร์มเพิ่มทะเบียน
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="card mt-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              🎯 Testing Instructions
            </h2>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start space-x-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Click on any score button from -10 to +10</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Verify that you <strong>cannot drag</strong> the score selection</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Check that the selected button highlights with the correct color</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Verify the score display updates immediately</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Test both forms: Vote Form and Add License Modal</span>
              </div>
            </div>
          </div>

          {/* Color Legend */}
          <div className="card mt-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              🎨 Color Legend
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-thai-green rounded"></div>
                <span>Positive (5-10)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span>Neutral+ (1-4)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-500 rounded"></div>
                <span>Neutral (0)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-thai-red rounded"></div>
                <span>Negative (-10 to -1)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Add License Modal */}
        {showAddModal && (
          <AddLicenseModal
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
            onSuccess={handleAddSuccess}
            userFingerprint="test-fingerprint"
            initialData={{
              prefix: 'กข',
              number: '1234',
              province: 'กรุงเทพมหานคร'
            }}
          />
        )}
      </main>
    </>
  )
}
