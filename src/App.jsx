import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme.js'
import './App.css'

import UserLayout from './layouts/UserLayout.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'

import Home from './Pages/User/Home.jsx'
import ProductDetail from './Pages/User/ProductDetail.jsx'
import Dashboard from './Pages/Admin/Dashboard.jsx'
import ManageCategories from './Pages/Admin/ManageCategories.jsx'
import ManageProducts from './Pages/Admin/ManageProducts.jsx'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {/* ===== User side ===== */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Route>

          {/* ===== Admin side ===== */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="categories" element={<ManageCategories />} />
            <Route path="products" element={<ManageProducts />} />
          </Route>

          {/* ===== 404 Fallback ===== */}
          <Route path="*" element={<h2 className="p-8 text-center">404 - Page Not Found</h2>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}