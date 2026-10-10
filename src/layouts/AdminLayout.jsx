import { Outlet, NavLink } from 'react-router-dom'

const links = [
  { to: '/admin', end: true, label: 'Dashboard', icon: 'dashboard' },
  { to: '/admin/categories', label: 'Categories', icon: 'category' },
  { to: '/admin/products', label: 'Products', icon: 'inventory_2' },
]

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-cream animate-fade-in">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-gradient-to-b from-brand to-brand-dark text-cream flex flex-col">
        <div className="flex items-center gap-2 px-6 py-6 border-b border-white/15">
          <span className="material-symbols-outlined text-gold text-2xl">storefront</span>
          <span className="font-display text-xl font-semibold text-gold tracking-wide">
            ANTIQOR
          </span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {links.map(({ to, end, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gold text-brand-dark shadow-lg shadow-black/20 translate-x-1'
                    : 'text-cream/80 hover:bg-white/10 hover:translate-x-1'
                }`
              }
            >
              <span className="material-symbols-outlined text-xl transition-transform duration-200 group-hover:scale-110">
                {icon}
              </span>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-6 py-4 border-t border-white/15 text-xs text-cream/60">
          © 2026 Admin Panel
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur border-b border-black/10 animate-fade-in">
          <h1 className="font-display text-lg font-semibold text-brand">
            Admin Panel
          </h1>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-ink/70">Admin</span>
            <span className="w-9 h-9 rounded-full bg-gold text-brand-dark grid place-content-center font-semibold shadow-sm">
              A
            </span>
          </div>
        </header>

        <main className="flex-1 p-8">
          <div className="animate-fade-up">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}