import { useNavigate } from 'react-router-dom';
import { dummyUser } from '@/Data/Dummy';
import { toastSuccess, toastError } from '@/Utils/Helpers/ToastHelpers';
import Card from '@/Components/molecules/Card';
import Form from '@/Components/molecules/Form';
import Heading from '@/Components/atoms/Heading';
import Link from '@/Components/atoms/Link';
import Label from '@/Components/atoms/Label';
import Input from '@/Components/atoms/Input';
import Button from '@/Components/atoms/Button';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    if (email === dummyUser.email && password === dummyUser.password) {
      localStorage.setItem('user', JSON.stringify({ email: dummyUser.email, nama: dummyUser.nama }));
      toastSuccess('Login Berhasil!');
      navigate('/admin');
    } else {
      toastError('Login Gagal! Email atau password salah.');
    }
  };

  return (
    <Card>
      <Heading>Login</Heading>
      
      <Form onSubmit={handleLogin}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" name="email" placeholder="Masukkan email" required />
        </div>
        
        <div>
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" name="password" placeholder="Masukkan password" required />
        </div>
        
        <div className="flex justify-between items-center">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-600">Ingat saya</span>
          </label>
          <Link to="#">Lupa password?</Link>
        </div>
        
        <Button type="submit" className="w-full">Login</Button>
      </Form>
      
      <p className="text-sm text-center text-gray-600 mt-4">
        Belum punya akun? <Link to="#">Daftar</Link>
      </p>
    </Card>
  );
}
