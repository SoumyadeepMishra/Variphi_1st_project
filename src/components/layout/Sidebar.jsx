import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/posts', label: 'Posts', icon: '📝' },
    { path: '/contact', label: 'Contact Us', icon: '📞' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>MyApp</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-footer">
        <Link to="/login" className="logout-link">
          <span className="nav-icon">🚪</span>
          <span className="nav-label">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
