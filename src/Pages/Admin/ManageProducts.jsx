import { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import ProductForm from '../../components/Admin/ProductForm.jsx'
import ProductList from '../../components/Admin/ProductList.jsx'
import { getProducts } from '../../services/api.js'

export default function ManageProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)   // null = add mode
  const [open, setOpen] = useState(false)         // modal open/close
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' })

  const showToast = (message, severity = 'success') =>
    setToast({ open: true, message, severity })

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await getProducts()
      setProducts(res.data.products || res.data.data || [])
    } catch {
      showToast('Failed to load products', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const openAdd = () => {
    setEditing(null)
    setOpen(true)
  }

  const openEdit = (product) => {
    setEditing(product)
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
    setEditing(null)
  }

  const handleSaved = (msg) => {
    closeModal()
    fetchProducts()
    showToast(msg)
  }

  const handleDeleted = (msg, severity = 'success') => {
    fetchProducts()
    showToast(msg, severity)
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-brand">
            Manage Products
          </h1>
          <p className="text-sm text-ink/60 mt-1">
            Create, edit and delete products
          </p>
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={openAdd}
          startIcon={<span className="material-symbols-outlined">add</span>}
          sx={{
            bgcolor: '#b85e00',
            '&:hover': { bgcolor: '#8f4700' },
            textTransform: 'none',
            px: 2.5,
            boxShadow: '0 8px 20px -10px rgba(184, 94, 0, 0.8)',
          }}
        >
          Add Product
        </Button>
      </div>

      <ProductList
        products={products}
        loading={loading}
        onEdit={openEdit}
        onDeleted={handleDeleted}
      />

      {/* Add / Edit modal */}
      <Dialog
        open={open}
        onClose={closeModal}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            className: 'animate-pop',
            sx: { borderRadius: 3, overflow: 'hidden' },
          },
        }}
      >
        <ProductForm
          key={editing ? editing._id : 'new'}
          editing={editing}
          onSaved={handleSaved}
          onCancel={closeModal}
        />
      </Dialog>

      {/* Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setToast({ ...toast, open: false })}
          severity={toast.severity}
          variant="filled"
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  )
}
