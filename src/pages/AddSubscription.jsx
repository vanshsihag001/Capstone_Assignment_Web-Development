import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSubscriptions } from '../context/SubscriptionContext'

export default function AddSubscription() {
  const { addSubscription } = useSubscriptions()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    monthlyCost: '',
    nextPaymentDate: '',
  })

  // Per-field error messages
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    // Clear the error for this field as the user types
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  function validate() {
    const newErrors = {}

    if (!form.name.trim()) {
      newErrors.name = 'Service name is required.'
    }

    if (!form.monthlyCost) {
      newErrors.monthlyCost = 'Monthly cost is required.'
    } else if (isNaN(form.monthlyCost) || parseFloat(form.monthlyCost) < 0) {
      newErrors.monthlyCost = 'Enter a valid positive number.'
    }

    if (!form.nextPaymentDate) {
      newErrors.nextPaymentDate = 'Next payment date is required.'
    }

    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()

    const validationErrors = validate()

    // If there are any errors, show them and stop
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // All good — save and redirect
    try {
      addSubscription(form)
      navigate('/')
    } catch (err) {
      // Catch unexpected errors (e.g. localStorage full)
      setErrors({ general: 'Something went wrong. Please try again.' })
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6 flex items-start justify-center">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="mb-6">
          <Link to="/" className="text-slate-500 text-sm hover:text-slate-700">
            ← Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-slate-800 mt-2">Add Subscription</h1>
        </div>

        {/* General error (e.g. save failed) */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
            {errors.general}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5"
        >
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
              Service Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Netflix, Spotify"
              className={`border rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 ${
                errors.name ? 'border-red-400 bg-red-50' : 'border-slate-300'
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-0.5">{errors.name}</p>
            )}
          </div>

          {/* Monthly Cost */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
              Monthly Cost (₹) <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              name="monthlyCost"
              value={form.monthlyCost}
              onChange={handleChange}
              placeholder="e.g. 499"
              min="0"
              step="0.01"
              className={`border rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 ${
                errors.monthlyCost ? 'border-red-400 bg-red-50' : 'border-slate-300'
              }`}
            />
            {errors.monthlyCost && (
              <p className="text-red-500 text-xs mt-0.5">{errors.monthlyCost}</p>
            )}
          </div>

          {/* Next Payment Date */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
              Next Payment Date <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              name="nextPaymentDate"
              value={form.nextPaymentDate}
              onChange={handleChange}
              className={`border rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 ${
                errors.nextPaymentDate ? 'border-red-400 bg-red-50' : 'border-slate-300'
              }`}
            />
            {errors.nextPaymentDate && (
              <p className="text-red-500 text-xs mt-0.5">{errors.nextPaymentDate}</p>
            )}
          </div>

          {/* Helper text */}
          <p className="text-xs text-slate-400"><span className="text-red-400">*</span> Required fields</p>

          {/* Submit */}
          <button
            type="submit"
            className="bg-slate-800 text-white py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors"
          >
            Save Subscription
          </button>
        </form>

      </div>
    </div>
  )
}
