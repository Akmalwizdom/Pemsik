import { useState } from 'react';
import AdminLayout from '@/Components/templates/AdminLayout';
import Modal from '@/Components/organisms/Modal';
import Button from '@/Components/atoms/Button';
import Card from '@/Components/molecules/Card';
import Heading from '@/Components/atoms/Heading';

export default function Mahasiswa() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [students, setStudents] = useState([
    { id: 1, nim: '20211002', nama: 'Siti Aminah' },
    { id: 2, nim: '20211003', nama: 'Ahmad Fauzi' },
    { id: 3, nim: '20211004', nama: 'Dewi Lestari' },
    { id: 4, nim: '20211005', nama: 'Rudi Hartono' },
    { id: 5, nim: '20211001', nama: 'Budi Santoso' },
  ]);

  const handleAddStudent = (e) => {
    e.preventDefault();
    alert('Mahasiswa berhasil ditambah!');
    setIsModalOpen(false);
  };

  const handleEdit = () => {
    alert('Mahasiswa berhasil di-edit! hehe');
  };

  const handleDelete = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus mahasiswa ini?')) {
      alert('Mahasiswa berhasil terhapus!');
    }
  };

  return (
    <AdminLayout>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2" spacing="mb-0" align="left">Daftar Mahasiswa</Heading>
          <Button variant="primary" size="md" onClick={() => setIsModalOpen(true)}>
            + Tambah Mahasiswa
          </Button>
        </div>
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 text-left">NIM</th>
              <th className="py-2 px-4 text-left">Nama</th>
              <th className="py-2 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => (
              <tr key={idx} className="even:bg-gray-100 odd:bg-white">
                <td className="py-2 px-4">{student.nim}</td>
                <td className="py-2 px-4">{student.nama}</td>
                <td className="py-2 px-4 text-center space-x-2">
                  <Button variant="warning" size="sm" onClick={handleEdit}>Edit</Button>
                  <Button variant="danger" size="sm" onClick={handleDelete}>Hapus</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Modal 
        isOpen={isModalOpen} 
        title="Tambah Mahasiswa" 
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddStudent}
      />
    </AdminLayout>
  );
}
