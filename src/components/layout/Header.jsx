import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="page-title">Welcome to MyApp</h1>
      </div>
      <div className="header-right">
        <div className="notifications">
          <span className="notification-icon">🔔</span>
          <span className="notification-badge">3</span>
        </div>
        <div className="user-profile">
          <div className="user-avatar">
            <span>👤</span>
          </div>
          <div className="user-info">
            <span className="user-name">John Doe</span>
            <span className="user-role">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
