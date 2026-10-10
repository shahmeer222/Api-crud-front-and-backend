import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCategories, getProducts, getOrders } from '../../services/api.js'

const cards = [
  { key: 'categories', label: 'Categories', icon: 'category', to: '/admin/categories' },
  { key: 'products', label: 'Products', icon: 'inventory_2', to: '/admin/products' },
  { key: 'orders', label: 'Orders', icon: 'receipt_long' },
]

const listOf = (res) => {
  const body = res?.data
  if (Array.isArray(body?.data)) return body.data
  if (Array.isArray(body?.products)) return body.products
  if (Array.isArray(body)) return body
  return []
}

export default function Dashboard() {
  const [stats, setStats] = useState({ categories: 0, products: 0, orders: 0 })
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const fetchStats = async () => {
      setLoading(true)
      const [cats, prods, orders] = await Promise.allSettled([
        getCategories(),
        getProducts(),
        getOrders(),
      ])
      if (!active) return

      const categories = cats.status === 'fulfilled' ? listOf(cats.value) : []
      const products = prods.status === 'fulfilled' ? listOf(prods.value) : []
      const orderList = orders.status === 'fulfilled' ? listOf(orders.value) : []

      setStats({
        categories: categories.length,
        products: products.length,
        orders: orderList.length,
      })
      setRecent(categories)
      setLoading(false)
    }

    fetchStats()
    return () => {
      active = false
    }
  }, [])

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-brand">Dashboard</h1>
        <p className="text-sm text-ink/60 mt-1">Overview of your store</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((c, i) => {
          const inner = (
            <div
              className="pop-card animate-fade-up bg-white rounded-xl border border-black/10 p-5 h-full"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-ink/60">{c.label}</p>
                <span className="material-symbols-outlined text-brand bg-brand/10 rounded-lg p-1.5">
                  {c.icon}
                </span>
              </div>
              <p className="font-display text-3xl text-brand mt-1">
                {loading ? '…' : stats[c.key]}
              </p>
            </div>
          )

          return c.to ? (
            <Link key={c.key} to={c.to} className="block">
              {inner}
            </Link>
          ) : (
            <div key={c.key}>{inner}</div>
          )
        })}
      </div>

      {/* Recent categories */}
      <div className="pop-card animate-fade-up bg-white rounded-xl border border-black/10 shadow-sm mt-6 overflow-hidden">
        <div className="px-6 py-4 border-b border-black/10 flex items-center justify-between bg-brand/5">
          <h2 className="font-display text-lg font-semibold text-brand">
            All Categories
          </h2>
          <Link
            to="/admin/categories"
            className="text-sm font-medium text-brand hover:text-brand-dark transition-colors"
          >
            View all
          </Link>
        </div>

        {loading ? (
          <p className="py-10 text-center text-ink/50">Loading…</p>
        ) : recent.length === 0 ? (
          <p className="py-10 text-center text-ink/50">No categories yet</p>
        ) : (
          <ul className="divide-y divide-black/10">
            {recent.map((cat) => (
              <li
                key={cat._id}
                className="flex items-center gap-4 px-6 py-3 hover:bg-[#fff8e6] transition-colors"
              >
                <span className="w-9 h-9 rounded-lg bg-brand/10 grid place-content-center text-brand">
                  <span className="material-symbols-outlined text-[20px]">
                    category
                  </span>
                </span>
                <span className="flex-1 font-medium text-ink truncate">
                  {cat.name}
                </span>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    cat.isActive !== false
                      ? 'bg-brand text-cream'
                      : 'bg-black/5 text-ink/60'
                  }`}
                >
                  {cat.isActive !== false ? 'Active' : 'Inactive'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
