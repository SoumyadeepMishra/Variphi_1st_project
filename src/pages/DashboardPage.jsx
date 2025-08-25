import React from 'react';
import './DashboardPage.css';

const DashboardPage = () => {
  const stats = [
    { title: 'Total Posts', value: '156', icon: '📝', color: '#3498db' },
    { title: 'Active Users', value: '2,847', icon: '👥', color: '#2ecc71' },
    { title: 'Comments', value: '892', icon: '💬', color: '#f39c12' },
    { title: 'Views', value: '45.2K', icon: '👁️', color: '#e74c3c' },
  ];

  const recentActivities = [
    { action: 'New post created', user: 'John Doe', time: '2 hours ago', type: 'post' },
    { action: 'User registered', user: 'Jane Smith', time: '4 hours ago', type: 'user' },
    { action: 'Comment added', user: 'Mike Johnson', time: '6 hours ago', type: 'comment' },
    { action: 'Post updated', user: 'Sarah Wilson', time: '8 hours ago', type: 'update' },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's what's happening with your application.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderLeftColor: stat.color }}>
            <div className="stat-icon" style={{ backgroundColor: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <h3>{stat.title}</h3>
              <p className="stat-value">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="content-grid">
          <div className="content-card">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              {recentActivities.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-icon">
                    {activity.type === 'post' && '📝'}
                    {activity.type === 'user' && '👤'}
                    {activity.type === 'comment' && '💬'}
                    {activity.type === 'update' && '✏️'}
                  </div>
                  <div className="activity-content">
                    <p className="activity-action">{activity.action}</p>
                    <p className="activity-user">{activity.user}</p>
                  </div>
                  <span className="activity-time">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="content-card">
            <h3>Quick Actions</h3>
            <div className="quick-actions">
              <button className="action-btn primary">Create New Post</button>
              <button className="action-btn secondary">View Analytics</button>
              <button className="action-btn secondary">Manage Users</button>
              <button className="action-btn secondary">Settings</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
