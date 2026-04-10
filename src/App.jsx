import { createBrowserRouter, Navigate } from 'react-router-dom';
import AuthLayout from '@/Components/templates/AuthLayout';
import AdminLayout from '@/Components/templates/AdminLayout';
import ProtectedRoute from '@/Components/ProtectedRoute';
import Login from '@/Pages/Auth/Login/Login';
import Dashboard from '@/Pages/Admin/Dashboard/Dashboard';
import Mahasiswa from '@/Pages/Admin/Mahasiswa/Mahasiswa';
import MahasiswaDetail from '@/Pages/Admin/Mahasiswa/MahasiswaDetail';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: "login", element: <Login /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "mahasiswa", element: <Mahasiswa /> },
      { path: "mahasiswa/:nim", element: <MahasiswaDetail /> },
    ],
  },
]);

export default router;
