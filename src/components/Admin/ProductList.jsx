import { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { deleteProduct, IMAGE_BASE } from '../../services/api.js'

const formatPrice = (value) =>
  `$${Number(value || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

export default function ProductList({ products, loading, onEdit, onDeleted }) {
  const [target, setTarget] = useState(null) // jise delete karna hai
  const [deleting, setDeleting] = useState(false)

  const confirmDelete = async () => {
    setDeleting(true)
    try {
      await deleteProduct(target._id)
      setTarget(null)
      onDeleted('Product deleted ✅')
    } catch (err) {
      onDeleted(
        err.response?.data?.message || 'Delete failed',
        'error'
      )
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="pop-card animate-fade-up bg-white rounded-xl border border-black/10 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-black/10 flex items-center justify-between bg-brand/5">
        <h2 className="font-display text-xl font-semibold text-brand">
          All Products
        </h2>
        <span className="text-sm text-ink/50">{products.length} total</span>
      </div>

      {loading ? (
        <div className="py-16 grid place-content-center">
          <CircularProgress size={28} />
        </div>
      ) : products.length === 0 ? (
        <p className="py-16 text-center text-ink/50">
          No products yet — add your first one 👈
        </p>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ '& th': { bgcolor: '#fdf3e0', fontWeight: 600, color: '#8f4700' } }}>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow
                  key={product._id}
                  hover
                  sx={{ '&:hover': { bgcolor: '#fff8e6' }, transition: 'background-color .2s ease' }}
                >
                  <TableCell>
                    {product.image && product.image !== 'null' ? (
                      <img
                        src={`${IMAGE_BASE}/${product.image}`}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover border border-black/10"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-cream grid place-content-center">
                        <span className="material-symbols-outlined text-brand/40 text-[20px]">
                          image
                        </span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium max-w-[180px]">
                    <span className="line-clamp-1">{product.name}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-ink/70">
                      {product.category?.name || '—'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-brand">
                      {formatPrice(product.price)}
                    </span>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => onEdit(product)}
                      title="Edit"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        edit
                      </span>
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setTarget(product)}
                      title="Delete"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        delete
                      </span>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Delete confirm dialog */}
      <Dialog open={!!target} onClose={() => setTarget(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Delete Product?</DialogTitle>
        <DialogContent>
          <p className="text-sm text-ink/70">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-ink">"{target?.name}"</span>?
            This cannot be undone.
          </p>
        </DialogContent>
        <DialogActions className="px-6 pb-4">
          <Button onClick={() => setTarget(null)} sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            color="error"
            variant="contained"
            disabled={deleting}
            sx={{ textTransform: 'none' }}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
