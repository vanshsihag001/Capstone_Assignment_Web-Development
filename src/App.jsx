import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SubscriptionProvider } from './context/SubscriptionContext'
import Dashboard from './pages/Dashboard'
import AddSubscription from './pages/AddSubscription'

export default function App() {
  return (
    // Wrap everything in the provider so all pages can access subscriptions
    <SubscriptionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddSubscription />} />
        </Routes>
      </BrowserRouter>
    </SubscriptionProvider>
  )
}
