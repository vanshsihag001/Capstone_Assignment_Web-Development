import { createContext, useContext, useState, useEffect } from 'react'

// 1. Create the context
const SubscriptionContext = createContext()

// 2. Provider component — wraps the whole app
export function SubscriptionProvider({ children }) {
  // Load from localStorage on first render, or start with empty array
  const [subscriptions, setSubscriptions] = useState(() => {
    const saved = localStorage.getItem('subscriptions')
    return saved ? JSON.parse(saved) : []
  })

  // Save to localStorage whenever subscriptions change
  useEffect(() => {
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions))
  }, [subscriptions])

  // Add a new subscription
  function addSubscription(sub) {
    const newSub = {
      id: Date.now(), // simple unique id using timestamp
      ...sub,
    }
    setSubscriptions((prev) => [...prev, newSub])
  }

  // Delete a subscription by id
  function deleteSubscription(id) {
    setSubscriptions((prev) => prev.filter((sub) => sub.id !== id))
  }

  return (
    <SubscriptionContext.Provider
      value={{ subscriptions, addSubscription, deleteSubscription }}
    >
      {children}
    </SubscriptionContext.Provider>
  )
}

// 3. Custom hook — easy to use in any component
export function useSubscriptions() {
  return useContext(SubscriptionContext)
}
