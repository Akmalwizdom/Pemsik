import { useParams, Link } from 'react-router-dom';
import { mahasiswaList } from '@/Data/Dummy';
import Card from '@/Components/molecules/Card';
import Heading from '@/Components/atoms/Heading';
import Button from '@/Components/atoms/Button';

export default function MahasiswaDetail() {
  const { nim } = useParams();
  const mahasiswa = mahasiswaList.find((mhs) => mhs.nim === nim);

  if (!mahasiswa) {
    return (
      <Card>
        <Heading as="h2" align="center" spacing="mb-4">Data Tidak Ditemukan</Heading>
        <p className="text-gray-500 text-center">Mahasiswa dengan NIM <strong>{nim}</strong> tidak ditemukan.</p>
        <div className="text-center mt-4">
          <Link to="/admin/mahasiswa">
            <Button variant="primary" size="md">← Kembali</Button>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <Heading as="h2" align="left" spacing="mb-0">Detail Mahasiswa</Heading>
        <Link to="/admin/mahasiswa">
          <Button variant="secondary" size="md">← Kembali</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">NIM</p>
          <p className="text-lg font-semibold text-gray-800">{mahasiswa.nim}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Nama</p>
          <p className="text-lg font-semibold text-gray-800">{mahasiswa.nama}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Status</p>
          <span className={`px-2 py-1 rounded text-xs font-semibold ${mahasiswa.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {mahasiswa.status ? 'Aktif' : 'Tidak Aktif'}
          </span>
        </div>
      </div>
    </Card>
  );
}
