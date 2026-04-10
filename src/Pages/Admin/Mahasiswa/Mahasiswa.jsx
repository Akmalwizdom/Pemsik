import { useState, useEffect } from 'react';
import { mahasiswaList } from '@/Data/Dummy';
import { confirmDelete, confirmUpdate } from '@/Utils/Helpers/SwalHelpers';
import { toastSuccess, toastError } from '@/Utils/Helpers/ToastHelpers';
import Card from '@/Components/molecules/Card';
import Heading from '@/Components/atoms/Heading';
import Button from '@/Components/atoms/Button';
import Input from '@/Components/atoms/Input';
import MahasiswaModal from './MahasiswaModal';
import MahasiswaTable from './MahasiswaTable';

export default function Mahasiswa() {
  const [mahasiswa, setMahasiswa] = useState(mahasiswaList);
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMahasiswa, setFilteredMahasiswa] = useState(mahasiswa);
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredMahasiswa(mahasiswa);
    } else {
      const keyword = searchTerm.toLowerCase();
      const filtered = mahasiswa.filter(
        (mhs) =>
          mhs.nim.toLowerCase().includes(keyword) ||
          mhs.nama.toLowerCase().includes(keyword)
      );
      setFilteredMahasiswa(filtered);
    }
  }, [searchTerm, mahasiswa]);

  const storeMahasiswa = (data) => {
    const newMahasiswa = {
      id: mahasiswa.length > 0 ? Math.max(...mahasiswa.map((m) => m.id)) + 1 : 1,
      nim: data.nim.trim(),
      nama: data.nama.trim(),
      status: true,
    };
    setMahasiswa([...mahasiswa, newMahasiswa]);
  };

  const updateMahasiswa = (data) => {
    setMahasiswa(
      mahasiswa.map((mhs) =>
        mhs.nim === data.nim
          ? { ...mhs, nama: data.nama.trim() }
          : mhs
      )
    );
  };

  const deleteMahasiswa = (nim) => {
    setMahasiswa(mahasiswa.filter((mhs) => mhs.nim !== nim));
  };

  const openAddModal = () => {
    setModalOpen(true);
    setSelectedMahasiswa(null);
  };

  const openEditModal = (mahasiswaObj) => {
    setModalOpen(true);
    setSelectedMahasiswa(mahasiswaObj);
  };

  const handleSubmit = (formData) => {
    if (selectedMahasiswa) {
      confirmUpdate(() => {
        updateMahasiswa(formData);
        toastSuccess('Data mahasiswa berhasil diperbarui!');
        setModalOpen(false);
      });
    } else {
      const nimExists = mahasiswa.find((mhs) => mhs.nim === formData.nim.trim());
      if (nimExists) {
        toastError('NIM sudah terdaftar!');
        return;
      }
      confirmUpdate(() => {
        storeMahasiswa(formData);
        toastSuccess('Mahasiswa berhasil ditambahkan!');
        setModalOpen(false);
      });
    }
  };

  const handleDelete = (nim) => {
    confirmDelete(() => {
      deleteMahasiswa(nim);
      toastSuccess('Mahasiswa berhasil dihapus!');
    });
  };

  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2" spacing="mb-0" align="left">Daftar Mahasiswa</Heading>
          <Button variant="primary" size="md" onClick={openAddModal}>
            + Tambah Mahasiswa
          </Button>
        </div>

        <div className="mb-4">
          <Input
            type="text"
            placeholder="🔍 Cari berdasarkan NIM atau Nama..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <MahasiswaTable
          mahasiswa={filteredMahasiswa}
          openEditModal={openEditModal}
          onDelete={handleDelete}
        />
      </Card>

      <MahasiswaModal
        isModalOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        selectedMahasiswa={selectedMahasiswa}
      />
    </>
  );
}
