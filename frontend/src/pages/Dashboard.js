import React, { useState, useEffect } from 'react';
import productService from '../services/productService';

export default function Dashboard() {
  const [stats, setStats]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getDashboard()
      .then(res => setStats(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="loading"><div className="spinner" /> Loading dashboard…</div>
  );

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Overview of your inventory at a glance</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="label">Total Products</div>
          <div className="value">{stats?.totalProducts ?? 0}</div>
          <div className="sub">items in inventory</div>
        </div>
        <div className="stat-card success">
          <div className="label">Inventory Value</div>
          <div className="value">₹{(stats?.totalInventoryValue ?? 0).toLocaleString()}</div>
          <div className="sub">total worth</div>
        </div>
        <div className="stat-card warning">
          <div className="label">Low Stock</div>
          <div className="value">{stats?.lowStockCount ?? 0}</div>
          <div className="sub">items need restocking</div>
        </div>
        <div className="stat-card danger">
          <div className="label">Out of Stock</div>
          <div className="value">{stats?.outOfStockCount ?? 0}</div>
          <div className="sub">items unavailable</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><h2>📋 Quick Guide</h2></div>
        <div className="card-body">
          <ul style={{ paddingLeft: '20px', lineHeight: '2', color: 'var(--muted)' }}>
            <li>Go to <strong>Products</strong> to add, edit, or delete inventory items.</li>
            <li>Use the search bar to find products by name.</li>
            <li>Filter products by category using the dropdown.</li>
            <li>Go to <strong>Low Stock</strong> to view items that need restocking.</li>
            <li>Each product has a configurable low-stock threshold.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
