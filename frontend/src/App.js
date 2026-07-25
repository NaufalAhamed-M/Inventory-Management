import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Products  from './pages/Products';
import LowStock  from './pages/LowStock';

export default function App() {
  const [page, setPage] = useState('dashboard');

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <Dashboard />;
      case 'products':  return <Products />;
      case 'low-stock': return <LowStock />;
      default:          return <Dashboard />;
    }
  };

  return (
    <div className="layout">
      <Sidebar active={page} onNavigate={setPage} />
      <main className="main">{renderPage()}</main>
    </div>
  );
}
