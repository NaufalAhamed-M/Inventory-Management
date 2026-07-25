import React from 'react';

const navItems = [
  { id: 'dashboard',  label: 'Dashboard',  icon: '📊' },
  { id: 'products',   label: 'Products',   icon: '📦' },
  { id: 'low-stock',  label: 'Low Stock',  icon: '⚠️' },
];

export default function Sidebar({ active, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span>🗄️</span> InvenTrack
      </div>
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <div
            key={item.id}
            className={`nav-item ${active === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="icon">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </nav>
      <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)', color: 'var(--muted)', fontSize: '12px' }}>
        Inventory Management v1.0
      </div>
    </aside>
  );
}
