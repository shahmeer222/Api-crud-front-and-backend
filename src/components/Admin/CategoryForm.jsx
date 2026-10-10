import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import CircularProgress from '@mui/material/CircularProgress'
import { createCategory, updateCategory, IMAGE_BASE } from '../../services/api.js'

export default function CategoryForm({ editing, onSaved, onCancel }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const reset = () => {
    setName('')
    setDescription('')
    setIsActive(true)
    setImageFile(null)
    setPreview('')
    setError('')
  }

  // Edit mode: purani category ka data form me bhar do
  useEffect(() => {
    if (editing) {
      setName(editing.name || '')
      setDescription(editing.description || '')
      setIsActive(editing.isActive !== false)
      setImageFile(null)
      setPreview(
        editing.image && editing.image !== 'null'
          ? `${IMAGE_BASE}/${editing.image}`
          : ''
      )
    } else {
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing])

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Category name is required')
      return
    }
    setError('')
    setSaving(true)
    try {
      const formData = new FormData()
      formData.append('name', name.trim())
      formData.append('description', description.trim())
      formData.append('isActive', isActive)      // "true"/"false" string
      if (imageFile) formData.append('image', imageFile)

      if (editing) {
        await updateCategory(editing._id, formData)
      } else {
        await createCategory(formData)
      }

      const msg = editing
        ? 'Category updated successfully ✅'
        : 'Category created successfully ✅'
      reset()
      onSaved(msg)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    reset()
    onCancel()
  }

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4 border-b border-black/10">
        <div>
          <h2 className="font-display text-xl font-semibold text-brand">
            {editing ? 'Edit Category' : 'Add New Category'}
          </h2>
          <p className="text-xs text-ink/50 mt-0.5">
            {editing
              ? 'Update the category details below'
              : 'Fill the details to create a new category'}
          </p>
        </div>
        <button
          type="button"
          onClick={handleCancel}
          title="Close"
          className="w-9 h-9 grid place-content-center rounded-full text-ink/50 hover:bg-black/5 hover:text-brand transition-colors -mr-1 -mt-1"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      {/* Body */}
      <div className="px-6 py-5">
        {/* Image preview / picker */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-20 h-20 rounded-lg border border-dashed border-brand/40 bg-cream grid place-content-center overflow-hidden shrink-0 transition-colors">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-20 h-20 object-cover"
              />
            ) : (
              <span className="material-symbols-outlined text-brand/50">
                photo_camera
              </span>
            )}
          </div>
          <label className="text-sm text-ink/70 cursor-pointer">
            <span className="inline-block px-3 py-2 rounded-lg border border-black/15 transition-all duration-200 hover:border-brand hover:bg-brand hover:text-cream hover:-translate-y-0.5">
              Choose image
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <span className="block mt-1 text-xs text-ink/50">
              {imageFile ? imageFile.name : 'JPG / PNG / WEBP — max 5MB'}
            </span>
          </label>
        </div>

        <div className="space-y-4">
          <TextField
            label="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            size="small"
            error={!!error}
            helperText={error}
          />

          <div className="pt-3">
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              minRows={3}
              size="small"
            />
          </div>

          <FormControlLabel
            control={
              <Switch
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                color="primary"
              />
            }
            label="Active"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-black/10 bg-brand/5">
        <Button
          type="button"
          variant="outlined"
          color="inherit"
          onClick={handleCancel}
          sx={{ textTransform: 'none', borderRadius: 2 }}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={saving}
          startIcon={
            saving ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              <span className="material-symbols-outlined">save</span>
            )
          }
          sx={{
            bgcolor: '#b85e00',
            '&:hover': { bgcolor: '#8f4700' },
            textTransform: 'none',
            px: 2.5,
            boxShadow: '0 8px 20px -10px rgba(184, 94, 0, 0.8)',
          }}
        >
          {saving ? 'Saving...' : editing ? 'Update Category' : 'Create Category'}
        </Button>
      </div>
    </form>
  )
}
