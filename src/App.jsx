import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from '@/Components/templates/AuthLayout';
import AdminLayout from '@/Components/templates/AdminLayout';
import ProtectedRoute from '@/Components/ProtectedRoute';
import Login from '@/Pages/Auth/Login/Login';
import Dashboard from '@/Pages/Admin/Dashboard/Dashboard';
import Mahasiswa from '@/Pages/Admin/Mahasiswa/Mahasiswa';
import MahasiswaDetail from '@/Pages/Admin/Mahasiswa/MahasiswaDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="login" element={<Login />} />
        </Route>

        {/* Admin Routes - Protected */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="mahasiswa" element={<Mahasiswa />} />
          <Route path="mahasiswa/:nim" element={<MahasiswaDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
