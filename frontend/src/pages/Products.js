import React, { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'react-toastify';
import productService from '../services/productService';
import ProductModal from '../components/ProductModal';

function stockBadge(qty, threshold) {
  if (qty === 0)        return <span className="badge badge-red">Out of Stock</span>;
  if (qty <= threshold) return <span className="badge badge-yellow">Low Stock</span>;
  return                       <span className="badge badge-green">In Stock</span>;
}

export default function Products() {
  const [products,   setProducts]   = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [search,     setSearch]     = useState('');
  const [category,   setCategory]   = useState('');
  const [modal,      setModal]      = useState(false);
  const [editing,    setEditing]    = useState(null);
  const [deleting,   setDeleting]   = useState(null);

  // Debounce search — only call API 400ms after user stops typing
  const debounceRef = useRef(null);

  const load = useCallback((searchVal, categoryVal) => {
    setLoading(true);
    const params = {};
    if (searchVal)   params.search   = searchVal;
    if (categoryVal) params.category = categoryVal;
    productService.getAll(params)
      .then(res => setProducts(res.data || []))
      .catch(() => toast.error('Failed to load products'))
      .finally(() => setLoading(false));
  }, []);

  // Load on category change immediately
  useEffect(() => {
    load(search, category);
  }, [category]); // eslint-disable-line

  // Load on mount
  useEffect(() => {
    load('', '');
  }, []); // eslint-disable-line

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    // Debounce: wait 400ms after user stops typing
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      load(val, category);
    }, 400);
  };

  useEffect(() => {
    productService.getCategories()
      .then(res => setCategories(res.data || []))
      .catch(() => {});
  }, []);

  const handleSave = async (data) => {
    try {
      if (editing?.id) {
        await productService.update(editing.id, data);
        toast.success('Product updated!');
      } else {
        await productService.create(data);
        toast.success('Product added!');
      }
      setModal(false);
      setEditing(null);
      load(search, category);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async () => {
    if (!deleting?.id) return;           // guard against undefined id
    try {
      await productService.delete(deleting.id);
      toast.success('Product deleted');
      setDeleting(null);
      load(search, category);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const openEdit = p => { setEditing(p); setModal(true); };
  const openAdd  = () => { setEditing(null); setModal(true); };

  return (
    <div>
      <div className="page-header">
        <h1>Products</h1>
        <p>Manage all products in your inventory</p>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="toolbar">
            <div className="search-box">
              <span className="icon">🔍</span>
              <input
                placeholder="Search products…"
                value={search}
                onChange={handleSearchChange}
              />
            </div>
            <select
              className="filter-select"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button className="btn btn-primary" onClick={openAdd}>
            ＋ Add Product
          </button>
        </div>

        {loading ? (
          <div className="loading"><div className="spinner" /> Loading…</div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <div className="icon">📦</div>
            <p>No products found. Add your first product!</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.id}>
                    <td style={{ color: 'var(--muted)' }}>{i + 1}</td>
                    <td>
                      <strong>{p.name}</strong>
                      {p.description && (
                        <div style={{ color: 'var(--muted)', fontSize: '12px', marginTop: '2px' }}>
                          {p.description.slice(0, 50)}{p.description.length > 50 ? '…' : ''}
                        </div>
                      )}
                    </td>
                    <td>
                      <span style={{ background: 'var(--bg)', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>
                        {p.category}
                      </span>
                    </td>
                    <td>₹{p.price.toLocaleString()}</td>
                    <td>{p.quantity}</td>
                    <td>{stockBadge(p.quantity, p.lowStockThreshold)}</td>
                    <td>
                      <div className="actions">
                        <button className="btn btn-outline btn-sm" onClick={() => openEdit(p)}>✏️ Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => setDeleting(p)}>🗑️ Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {modal && (
        <ProductModal
          product={editing}
          onClose={() => { setModal(false); setEditing(null); }}
          onSave={handleSave}
        />
      )}

      {/* Delete Confirm Modal */}
      {deleting && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setDeleting(null)}>
          <div className="modal">
            <div className="modal-header">
              <h3>Confirm Delete</h3>
              <button className="modal-close" onClick={() => setDeleting(null)}>✕</button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete <strong>{deleting.name}</strong>? This action cannot be undone.
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setDeleting(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
