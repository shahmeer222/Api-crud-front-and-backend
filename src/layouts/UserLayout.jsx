import { Outlet } from 'react-router-dom'
import Navbar from '../components/User/Navbar.jsx'

export default function UserLayout() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
}
