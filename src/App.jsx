import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ShieldAlert, LayoutDashboard, Settings } from 'lucide-react';
import { SimulationProvider } from './context/SimulationContext';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import './App.css';

const Navigation = () => {
  const location = useLocation();
  
  return (
    <header className="app-header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <ShieldAlert className="logo-icon" size={28} />
          SmartStadium AI
        </Link>
        <nav className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/admin" className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}>
            <Settings size={18} /> Admin Control
          </Link>
        </nav>
      </div>
    </header>
  );
};

function App() {
  return (
    <SimulationProvider>
      <Router>
        <div className="app-container">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </main>
        </div>
      </Router>
    </SimulationProvider>
  );
}

export default App;
