import React, { useState, useEffect } from 'react';
import productService from '../services/productService';

export default function LowStock() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    productService.getLowStock()
      .then(res => setProducts(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>⚠️ Low Stock Alerts</h1>
        <p>Products that need to be restocked soon</p>
      </div>

      {!loading && products.length > 0 && (
        <div className="alert-bar">
          ⚠️ <strong>{products.length} product{products.length > 1 ? 's' : ''}</strong> &nbsp;
          {products.length > 1 ? 'are' : 'is'} below the low-stock threshold and need restocking.
        </div>
      )}

      <div className="card">
        <div className="card-header"><h2>Low Stock Products</h2></div>

        {loading ? (
          <div className="loading"><div className="spinner" /> Loading…</div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <div className="icon">✅</div>
            <p>All products are sufficiently stocked!</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Current Qty</th>
                  <th>Threshold</th>
                  <th>Status</th>
                  <th>Value at Risk</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id}>
                    <td><strong>{p.name}</strong></td>
                    <td>{p.category}</td>
                    <td style={{ color: p.quantity === 0 ? 'var(--danger)' : 'var(--warning)', fontWeight: 600 }}>
                      {p.quantity}
                    </td>
                    <td>{p.lowStockThreshold}</td>
                    <td>
                      {p.quantity === 0
                        ? <span className="badge badge-red">Out of Stock</span>
                        : <span className="badge badge-yellow">Low Stock</span>
                      }
                    </td>
                    <td>₹{(p.price * p.quantity).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
