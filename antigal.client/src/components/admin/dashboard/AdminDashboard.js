// src/components/admin/dashboard/AdminDashboard.js
import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
