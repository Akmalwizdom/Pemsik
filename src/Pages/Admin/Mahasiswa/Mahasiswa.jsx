import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mahasiswaList } from '@/Data/Dummy';
import Modal from '@/Components/organisms/Modal';
import Button from '@/Components/atoms/Button';
import Card from '@/Components/molecules/Card';
import Heading from '@/Components/atoms/Heading';

export default function Mahasiswa() {
  // State mahasiswa dan setMahasiswa
  const [mahasiswa, setMahasiswa] = useState(mahasiswaList);

  // State isModalOpen dan setModalOpen
  const [isModalOpen, setModalOpen] = useState(false);

  // State untuk mode edit
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  // State untuk form data
  const [formData, setFormData] = useState({ nim: '', nama: '' });

  // State untuk errors validasi
  const [errors, setErrors] = useState({ nim: '', nama: '' });

  // handleChange: menangkap perubahan data ke state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Hapus error saat user mulai mengetik
    setErrors({ ...errors, [name]: '' });
  };

  // Validasi form
  const validateForm = () => {
    let newErrors = { nim: '', nama: '' };
    let isValid = true;

    if (!formData.nim.trim()) {
      newErrors.nim = 'NIM wajib diisi!';
      isValid = false;
    }

    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama wajib diisi!';
      isValid = false;
    }

    // Validasi NIM unique (kecuali saat edit NIM yang sama)
    const nimExists = mahasiswa.find(
      (mhs) => mhs.nim === formData.nim.trim() && mhs.id !== editId
    );
    if (formData.nim.trim() && nimExists) {
      newErrors.nim = 'NIM sudah terdaftar!';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Buka modal untuk tambah
  const openAddModal = () => {
    setIsEdit(false);
    setEditId(null);
    setFormData({ nim: '', nama: '' });
    setErrors({ nim: '', nama: '' });
    setModalOpen(true);
  };

  // Buka modal untuk edit
  const openEditModal = (student) => {
    setIsEdit(true);
    setEditId(student.id);
    setFormData({ nim: student.nim, nama: student.nama });
    setErrors({ nim: '', nama: '' });
    setModalOpen(true);
  };

  // Tutup modal
  const closeModal = () => {
    setModalOpen(false);
    setFormData({ nim: '', nama: '' });
    setErrors({ nim: '', nama: '' });
  };

  // handleSubmit: memperbarui data ke state
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (isEdit) {
      // Validasi konfirmasi ketika update
      if (!window.confirm('Apakah Anda yakin ingin mengubah data mahasiswa ini?')) return;

      // Update data menggunakan .map()
      setMahasiswa(
        mahasiswa.map((mhs) =>
          mhs.id === editId
            ? { ...mhs, nim: formData.nim.trim(), nama: formData.nama.trim() }
            : mhs
        )
      );
      alert('Data mahasiswa berhasil diperbarui!');
    } else {
      // Tambah data baru menggunakan spread operator
      const newMahasiswa = {
        id: mahasiswa.length > 0 ? Math.max(...mahasiswa.map((m) => m.id)) + 1 : 1,
        nim: formData.nim.trim(),
        nama: formData.nama.trim(),
        status: true,
      };
      setMahasiswa([...mahasiswa, newMahasiswa]);
      alert('Mahasiswa berhasil ditambahkan!');
    }

    closeModal();
  };

  // Hapus data menggunakan .filter()
  const handleDelete = (id) => {
    // Validasi konfirmasi ketika delete
    if (!window.confirm('Apakah Anda yakin ingin menghapus mahasiswa ini?')) return;

    setMahasiswa(mahasiswa.filter((mhs) => mhs.id !== id));
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
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 text-left">NIM</th>
              <th className="py-2 px-4 text-left">Nama</th>
              <th className="py-2 px-4 text-center">Status</th>
              <th className="py-2 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {mahasiswa.map((student) => (
              <tr key={student.id} className="even:bg-gray-100 odd:bg-white">
                <td className="py-2 px-4">{student.nim}</td>
                <td className="py-2 px-4">{student.nama}</td>
                <td className="py-2 px-4 text-center">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${student.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {student.status ? 'Aktif' : 'Tidak Aktif'}
                  </span>
                </td>
                <td className="py-2 px-4 text-center space-x-2">
                  <Link to={`/admin/mahasiswa/${student.nim}`}>
                    <Button variant="info" size="sm">Detail</Button>
                  </Link>
                  <Button variant="warning" size="sm" onClick={() => openEditModal(student)}>Edit</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(student.id)}>Hapus</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Modal
        isOpen={isModalOpen}
        title={isEdit ? 'Edit Mahasiswa' : 'Tambah Mahasiswa'}
        onClose={closeModal}
        onSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
        errors={errors}
      />
    </>
  );
}
