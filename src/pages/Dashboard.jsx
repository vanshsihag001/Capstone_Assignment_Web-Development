import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSubscriptions } from '../context/SubscriptionContext'
import SubscriptionCard from '../components/SubscriptionCard'

export default function Dashboard() {
  const { subscriptions } = useSubscriptions()
  const [search, setSearch] = useState('')

  // Total monthly cost across ALL subscriptions
  const total = subscriptions.reduce(
    (sum, sub) => sum + parseFloat(sub.monthlyCost || 0),
    0
  )

  // Filter subscriptions by search term (case-insensitive)
  const filtered = subscriptions.filter((sub) =>
    sub.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold text-slate-800">📋 My Subscriptions</h1>
          <Link
            to="/add"
            className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors font-medium text-sm"
          >
            + Add New
          </Link>
        </div>

        {/* Summary bar */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-3 mb-5 flex justify-between items-center">
          <span className="text-sm text-emerald-700 font-medium">
            {subscriptions.length} subscription{subscriptions.length !== 1 ? 's' : ''}
          </span>
          <span className="text-emerald-700 font-bold text-lg">
            ₹{total.toFixed(2)}<span className="text-sm font-normal">/mo</span>
          </span>
        </div>

        {/* Search bar — only show if there's something to search */}
        {subscriptions.length > 0 && (
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍  Search subscriptions..."
            className="w-full border border-slate-300 rounded-lg px-4 py-2 mb-4 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm"
          />
        )}

        {/* List */}
        {subscriptions.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-lg">No subscriptions yet.</p>
            <p className="text-sm mt-1">Click "+ Add New" to get started.</p>
          </div>
        ) : filtered.length === 0 ? (
          // Search returned nothing
          <div className="text-center py-12 text-slate-400">
            <p className="text-3xl mb-3">🔍</p>
            <p>No results for "<span className="font-medium">{search}</span>"</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((sub) => (
              <SubscriptionCard key={sub.id} sub={sub} />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
