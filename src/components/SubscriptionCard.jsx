import { useSubscriptions } from '../context/SubscriptionContext'

export default function SubscriptionCard({ sub }) {
  const { deleteSubscription } = useSubscriptions()

  // Format date nicely: "2024-06-15" → "Jun 15, 2024"
  function formatDate(dateStr) {
    if (!dateStr) return '—'
    const d = new Date(dateStr + 'T00:00:00') // avoid timezone shift
    return d.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  // Check if payment is due within 5 days
  function isDueSoon(dateStr) {
    if (!dateStr) return false
    const today = new Date()
    const due = new Date(dateStr + 'T00:00:00')
    const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24))
    return diffDays >= 0 && diffDays <= 5
  }

  const dueSoon = isDueSoon(sub.nextPaymentDate)

  return (
    <div className={`bg-white rounded-xl shadow-sm border p-5 flex justify-between items-center transition-all ${
      dueSoon ? 'border-amber-300 bg-amber-50' : 'border-slate-200'
    }`}>
      {/* Left: Name + Date */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-slate-800">{sub.name}</h2>
          {dueSoon && (
            <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full font-medium">
              Due soon
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500">
          Next payment: <span className="font-medium text-slate-600">{formatDate(sub.nextPaymentDate)}</span>
        </p>
      </div>

      {/* Right: Cost + Delete */}
      <div className="flex items-center gap-4 shrink-0 ml-4">
        <div className="text-right">
          <p className="text-lg font-bold text-emerald-600">
            ₹{parseFloat(sub.monthlyCost).toFixed(2)}
          </p>
          <p className="text-xs text-slate-400">per month</p>
        </div>
        <button
          onClick={() => deleteSubscription(sub.id)}
          className="text-xs text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
