import React, { useState, useEffect } from 'react';

const EMPTY = { name: '', description: '', category: '', price: '', quantity: '', lowStockThreshold: 10 };

export default function ProductModal({ product, onClose, onSave }) {
  const [form, setForm]     = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        description: product.description || '',
        category: product.category || '',
        price: product.price ?? '',
        quantity: product.quantity ?? '',
        lowStockThreshold: product.lowStockThreshold ?? 10,
      });
    } else {
      setForm(EMPTY);
    }
    setErrors({});
  }, [product]);

  const validate = () => {
    const e = {};
    if (!form.name.trim())       e.name     = 'Name is required';
    if (!form.category.trim())   e.category = 'Category is required';
    if (!form.price || Number(form.price) <= 0) e.price = 'Enter a valid price';
    if (form.quantity === '' || Number(form.quantity) < 0) e.quantity = 'Enter a valid quantity';
    return e;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setErrors(er => ({ ...er, [name]: '' }));
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSaving(true);
    try {
      await onSave({
        ...form,
        price: parseFloat(form.price),
        quantity: parseInt(form.quantity, 10),
        lowStockThreshold: parseInt(form.lowStockThreshold, 10),
      });
    } finally {
      setSaving(false);
    }
  };

  const isEdit = Boolean(product?.id);

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3>{isEdit ? 'Edit Product' : 'Add New Product'}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="form-grid">
            <div className="form-group">
              <label>Product Name *</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Wireless Mouse" />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>Category *</label>
              <input name="category" value={form.category} onChange={handleChange} placeholder="e.g. Electronics" />
              {errors.category && <span className="error-text">{errors.category}</span>}
            </div>

            <div className="form-group">
              <label>Price (₹) *</label>
              <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} placeholder="0.00" />
              {errors.price && <span className="error-text">{errors.price}</span>}
            </div>

            <div className="form-group">
              <label>Quantity *</label>
              <input name="quantity" type="number" min="0" value={form.quantity} onChange={handleChange} placeholder="0" />
              {errors.quantity && <span className="error-text">{errors.quantity}</span>}
            </div>

            <div className="form-group">
              <label>Low Stock Threshold</label>
              <input name="lowStockThreshold" type="number" min="0" value={form.lowStockThreshold} onChange={handleChange} />
            </div>

            <div className="form-group full">
              <label>Description</label>
              <textarea name="description" rows="3" value={form.description} onChange={handleChange} placeholder="Optional product description…" />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={saving}>
            {saving ? 'Saving…' : isEdit ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </div>
    </div>
  );
}
