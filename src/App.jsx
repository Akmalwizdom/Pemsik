import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/Pages/Auth/Login/Login.jsx';
import Mahasiswa from '@/Pages/Admin/Mahasiswa/Mahasiswa.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Mahasiswa />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
