import { useState } from 'react'
import VoteForm from './VoteForm'

export default function ResultCard({ license, onVoteSubmit, canVote, userFingerprint }) {
  const [showVoteForm, setShowVoteForm] = useState(false)

  const totalScore = license.votes.reduce((sum, vote) => sum + vote.score, 0)
  const latestComment = license.votes
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]?.comment

  const getScoreClass = (score) => {
    if (score > 0) return 'score-positive'
    if (score < 0) return 'score-negative'
    return 'score-neutral'
  }

  const handleVoteSuccess = (newVote) => {
    onVoteSubmit(newVote)
    setShowVoteForm(false)
  }

  return (
    <div className="card max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          ผลการค้นหา
        </h2>
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <div className="text-2xl font-bold text-gray-800">
            {license.prefix} {license.number}
          </div>
          <div className="text-sm text-gray-600">
            {license.province}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-1">คะแนนรวม</div>
          <div className={`text-3xl font-bold ${getScoreClass(totalScore)}`}>
            {totalScore > 0 ? '+' : ''}{totalScore}
          </div>
          <div className="text-xs text-gray-500">
            จาก {license.votes.length} การโหวต
          </div>
        </div>

        {latestComment && (
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm text-gray-600 mb-1">ความคิดเห็นล่าสุด</div>
            <div className="text-gray-800">{latestComment}</div>
          </div>
        )}

        <div className="pt-4 border-t">
          {canVote ? (
            !showVoteForm ? (
              <button
                onClick={() => setShowVoteForm(true)}
                className="btn-primary w-full"
              >
                ให้คะแนนพฤติกรรม
              </button>
            ) : (
              <VoteForm
                licenseId={license.id}
                userFingerprint={userFingerprint}
                onSuccess={handleVoteSuccess}
                onCancel={() => setShowVoteForm(false)}
              />
            )
          ) : (
            <div className="text-center text-sm text-gray-500 bg-gray-100 rounded-lg p-3">
              คุณได้ให้คะแนนทะเบียนนี้แล้ววันนี้
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
