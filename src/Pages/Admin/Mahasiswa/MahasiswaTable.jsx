import { Link } from 'react-router-dom';
import Button from '@/Components/atoms/Button';

export default function MahasiswaTable({ mahasiswa, openEditModal, onDelete }) {

  const handleDelete = (nim) => {
    onDelete(nim);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-gray-700">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-2 px-4 text-left">No</th>
            <th className="py-2 px-4 text-left">NIM</th>
            <th className="py-2 px-4 text-left">Nama</th>
            <th className="py-2 px-4 text-center">Status</th>
            <th className="py-2 px-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswa.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-6 text-center text-gray-400 italic">
                Belum ada data mahasiswa.
              </td>
            </tr>
          ) : (
            mahasiswa.map((student, index) => (
              <tr key={student.id} className="even:bg-gray-100 odd:bg-white hover:bg-blue-50 transition">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{student.nim}</td>
                <td className="py-2 px-4">{student.nama}</td>
                <td className="py-2 px-4 text-center">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      student.status
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {student.status ? 'Aktif' : 'Tidak Aktif'}
                  </span>
                </td>
                <td className="py-2 px-4 text-center space-x-2">
                  <Link to={`/admin/mahasiswa/${student.nim}`}>
                    <Button variant="info" size="sm">Detail</Button>
                  </Link>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => openEditModal(student)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(student.nim)}
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
