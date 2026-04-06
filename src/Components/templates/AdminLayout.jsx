import { Outlet } from 'react-router-dom';
import Sidebar from '@/Components/organisms/Sidebar';
import Header from '@/Components/organisms/Header';
import Footer from '@/Components/organisms/Footer';

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 p-6 overflow-x-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
