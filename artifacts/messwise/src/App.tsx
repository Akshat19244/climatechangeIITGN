import { useState, useEffect } from 'react';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'student' | 'admin' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    const role = localStorage.getItem('userRole');
    if (auth && role) {
      setIsAuthenticated(true);
      setUserRole(role as 'student' | 'admin');
    }
    setLoading(false);
  }, []);

  const handleLogin = (role: 'student' | 'admin') => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('auth', 'true');
    localStorage.setItem('userRole', role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('auth');
    localStorage.removeItem('userRole');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  if (userRole === 'admin') {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return <StudentDashboard onLogout={handleLogout} />;
}

export default App;
