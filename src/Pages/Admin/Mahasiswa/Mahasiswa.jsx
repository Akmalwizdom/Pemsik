import { useState } from 'react';
import { mahasiswaList } from '@/Data/Dummy';
import Card from '@/Components/molecules/Card';
import Heading from '@/Components/atoms/Heading';
import Button from '@/Components/atoms/Button';
import MahasiswaModal from './MahasiswaModal';
import MahasiswaTable from './MahasiswaTable';

export default function Mahasiswa() {
  // State mahasiswa: menyimpan daftar mahasiswa
  const [mahasiswa, setMahasiswa] = useState(mahasiswaList);

  // State selected mahasiswa: menyimpan objek mahasiswa yang dipilih untuk edit
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);

  // State modal: mengatur buka/tutup modal
  const [isModalOpen, setModalOpen] = useState(false);

  // storeMahasiswa: tambah mahasiswa baru ke state mahasiswa
  const storeMahasiswa = (data) => {
    const newMahasiswa = {
      id: mahasiswa.length > 0 ? Math.max(...mahasiswa.map((m) => m.id)) + 1 : 1,
      nim: data.nim.trim(),
      nama: data.nama.trim(),
      status: true,
    };
    setMahasiswa([...mahasiswa, newMahasiswa]);
  };

  // updateMahasiswa: update mahasiswa berdasarkan nim dari state mahasiswa
  const updateMahasiswa = (data) => {
    setMahasiswa(
      mahasiswa.map((mhs) =>
        mhs.nim === data.nim
          ? { ...mhs, nama: data.nama.trim() }
          : mhs
      )
    );
  };

  // deleteMahasiswa: delete mahasiswa berdasarkan nim dari state mahasiswa
  const deleteMahasiswa = (nim) => {
    setMahasiswa(mahasiswa.filter((mhs) => mhs.nim !== nim));
  };

  // openAddModal: buka modal untuk tambah, set null pada selectedMahasiswa
  const openAddModal = () => {
    setModalOpen(true);
    setSelectedMahasiswa(null);
  };

  // openEditModal: buka modal untuk edit, set objek mahasiswa pada selectedMahasiswa
  const openEditModal = (mahasiswaObj) => {
    setModalOpen(true);
    setSelectedMahasiswa(mahasiswaObj);
  };

  // handleSubmit: kondisi ketika selectedMahasiswa terisi maka update, ketika tidak maka store
  const handleSubmit = (formData) => {
    if (selectedMahasiswa) {
      if (!window.confirm('Apakah Anda yakin ingin mengubah data mahasiswa ini?')) return;
      updateMahasiswa(formData);
      alert('Data mahasiswa berhasil diperbarui!');
    } else {
      // Cek apakah NIM sudah ada
      const nimExists = mahasiswa.find((mhs) => mhs.nim === formData.nim.trim());
      if (nimExists) {
        alert('NIM sudah terdaftar!');
        return;
      }
      storeMahasiswa(formData);
      alert('Mahasiswa berhasil ditambahkan!');
    }
    setModalOpen(false);
  };

  // handleDelete: menerima parameter nim mahasiswa untuk dipassing ke deleteMahasiswa
  const handleDelete = (nim) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus mahasiswa ini?')) return;
    deleteMahasiswa(nim);
    alert('Mahasiswa berhasil dihapus!');
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

        {/* Komponen MahasiswaTable: passing props mahasiswa, openEditModal, onDelete */}
        <MahasiswaTable
          mahasiswa={mahasiswa}
          openEditModal={openEditModal}
          onDelete={handleDelete}
        />
      </Card>

      {/* Komponen MahasiswaModal: passing props isModalOpen, onClose, onSubmit, selectedMahasiswa */}
      <MahasiswaModal
        isModalOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        selectedMahasiswa={selectedMahasiswa}
      />
    </>
  );
}
