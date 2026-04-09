import { useState, useEffect } from 'react';
import Input from '@/Components/atoms/Input';
import Label from '@/Components/atoms/Label';
import Button from '@/Components/atoms/Button';

export default function MahasiswaModal({ isModalOpen, onClose, onSubmit, selectedMahasiswa }) {
  // State form: menyimpan data form (nim dan nama)
  const [form, setForm] = useState({ nim: '', nama: '' });

  // State errors: menyimpan pesan error validasi
  const [errors, setErrors] = useState({ nim: '', nama: '' });

  // useEffect: ketika selectedMahasiswa ada maka setForm diisi dengan detailnya,
  // ketika tidak maka setForm dengan null semua.
  // Dependency: selectedMahasiswa, isModalOpen
  useEffect(() => {
    if (selectedMahasiswa) {
      setForm({
        nim: selectedMahasiswa.nim,
        nama: selectedMahasiswa.nama,
      });
    } else {
      setForm({ nim: '', nama: '' });
    }
    setErrors({ nim: '', nama: '' });
  }, [selectedMahasiswa, isModalOpen]);

  // handleChange: mengupdate state form sesuai input yang berubah
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Reset error pada field yang sedang diubah
    setErrors({ ...errors, [name]: '' });
  };

  // validateForm: validasi field-field yang diperlukan
  const validateForm = () => {
    let newErrors = { nim: '', nama: '' };
    let isValid = true;

    if (!form.nim.trim()) {
      newErrors.nim = 'NIM wajib diisi!';
      isValid = false;
    } else if (!/^\d+$/.test(form.nim.trim())) {
      newErrors.nim = 'NIM harus berupa angka!';
      isValid = false;
    }

    if (!form.nama.trim()) {
      newErrors.nama = 'Nama wajib diisi!';
      isValid = false;
    } else if (form.nama.trim().length < 3) {
      newErrors.nama = 'Nama minimal 3 karakter!';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // handleSubmit: panggil onSubmit dengan parameter state form lalu panggil onClose
  const handleSubmit = (e) => {
    e.preventDefault();

    // Trigger form validasi
    if (!validateForm()) return;

    // Panggil onSubmit dari parent (Mahasiswa.jsx) dengan data form
    onSubmit(form);
  };

  // Kondisi: ketika isModalOpen false maka return null (tidak render)
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md animate-in fade-in">
        {/* Header Modal */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            {selectedMahasiswa ? 'Edit Mahasiswa' : 'Tambah Mahasiswa'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 cursor-pointer text-xl font-bold"
          >
            &times;
          </button>
        </div>

        {/* Form Modal */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Field NIM */}
          <div>
            <Label htmlFor="nim">NIM</Label>
            <Input
              type="text"
              id="nim"
              name="nim"
              placeholder="Masukkan NIM"
              value={form.nim}
              onChange={handleChange}
              disabled={!!selectedMahasiswa}
            />
            {errors.nim && <p className="text-red-500 text-xs mt-1">{errors.nim}</p>}
          </div>

          {/* Field Nama */}
          <div>
            <Label htmlFor="nama">Nama</Label>
            <Input
              type="text"
              id="nama"
              name="nama"
              placeholder="Masukkan Nama"
              value={form.nama}
              onChange={handleChange}
            />
            {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama}</p>}
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end space-x-2 pt-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" variant="primary">
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
