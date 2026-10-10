import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/admin', label: 'Admin' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-brand text-cream shadow-sm'
        : 'text-ink/70 hover:bg-brand/10 hover:text-brand'
    }`

  return (
    <header className="sticky top-0 z-40 animate-fade-in">
      {/* Announcement strip */}
      <div className="bg-brand-dark text-gold text-[11px] uppercase tracking-[0.2em] text-center py-1.5">
        Handcrafted furniture · Free delivery over $499
      </div>

      {/* Main bar */}
      <div className="bg-cream/90 backdrop-blur border-b border-black/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <span className="w-9 h-9 grid place-content-center rounded-xl bg-brand text-gold shadow-md transition-transform duration-300 group-hover:rotate-12 group-hover:scale-105">
              <span className="material-symbols-outlined text-[20px]">chair</span>
            </span>
            <span className="font-display text-xl font-semibold text-brand">
              ANTIQOR
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-1 ml-4">
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Search */}
          <div className="hidden sm:flex flex-1 justify-center px-2">
            <div className="relative w-full max-w-sm">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 text-[20px]">
                search
              </span>
              <input
                type="text"
                placeholder="Search furniture..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-black/10 text-sm outline-none transition-all duration-200 focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 ml-auto">
            <button
              type="button"
              title="Wishlist"
              className="w-10 h-10 grid place-content-center rounded-full text-ink/70 hover:bg-brand/10 hover:text-brand transition-colors"
            >
              <span className="material-symbols-outlined">favorite</span>
            </button>

            <button
              type="button"
              title="Cart"
              className="relative w-10 h-10 grid place-content-center rounded-full text-ink/70 hover:bg-brand/10 hover:text-brand transition-colors"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
              <span className="absolute top-1 right-1 w-4 h-4 grid place-content-center rounded-full bg-brand text-cream text-[10px] font-semibold">
                0
              </span>
            </button>

            <button
              type="button"
              title="Menu"
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden w-10 h-10 grid place-content-center rounded-full text-ink/70 hover:bg-brand/10 hover:text-brand transition-colors"
            >
              <span className="material-symbols-outlined">
                {menuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="md:hidden px-4 pb-4 flex flex-col gap-1 animate-fade-in">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-brand text-cream'
                      : 'text-ink/70 hover:bg-brand/10 hover:text-brand'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
