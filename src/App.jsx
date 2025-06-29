import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Pages and Components
import Homepage from './pages/Homepage';
import Menu from './pages/Menu';
import Subscription from './pages/Subscription';
import Register from './pages/Register';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';

// Placeholder untuk Protected Routes
const ProtectedRoute = ({ children }) => children;
const AdminRoute = ({ children }) => children;

const App = () => {
  const [theme, setTheme] = useState('light');
  // Logika state untuk auth (user, token) akan ada di sini
  // const [user, setUser] = useState(null);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(`${theme}-theme`);
  }, [theme]);

  return (
    <BrowserRouter>
      <Navbar theme={theme} toggleTheme={toggleTheme} /* user={user} */ />
      <main>
        <Routes>
          {/* Rute Publik */}
          <Route path="/" element={<Homepage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Rute Terproteksi untuk Pengguna */}
          <Route path="/subscription" element={<ProtectedRoute><Subscription /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />

          {/* Rute Terproteksi untuk Admin */}
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;