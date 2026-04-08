import Input from '@/Components/atoms/Input';
import Label from '@/Components/atoms/Label';
import Form from '@/Components/molecules/Form';
import Button from '@/Components/atoms/Button';

export default function Modal({ isOpen, title, onClose, onSubmit, formData, handleChange, errors }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-red-500 cursor-pointer">&times;</button>
        </div>
        <Form className="p-4" onSubmit={onSubmit}>
          <div>
            <Label htmlFor="nim">NIM</Label>
            <Input 
              type="text" 
              id="nim" 
              name="nim" 
              placeholder="Masukkan NIM" 
              value={formData.nim} 
              onChange={handleChange} 
            />
            {errors.nim && <p className="text-red-500 text-xs mt-1">{errors.nim}</p>}
          </div>
          <div>
            <Label htmlFor="nama">Nama</Label>
            <Input 
              type="text" 
              id="nama" 
              name="nama" 
              placeholder="Masukkan Nama" 
              value={formData.nama} 
              onChange={handleChange} 
            />
            {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama}</p>}
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="secondary" onClick={onClose}>Batal</Button>
            <Button type="submit" variant="primary">Simpan</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
