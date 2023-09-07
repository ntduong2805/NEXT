import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import authApi from '../apis/auth';
import { toast } from 'react-hot-toast';
import { UserContext } from "../UserContext";
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false); // Thêm biến loading

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    
    try {
      setLoading(true);

      const response = await authApi.login(email, password);

      if (response?.data?.codeStatus === 200) {
        setUser(response?.data.user);
        toast.success("Login successful");
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred while logging in");
    } finally {
      setLoading(false);
    }
  }

  // Nếu user tồn tại, chuyển hướng về trang chủ
  if (user) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input type="email"
                 placeholder="Your email"
                 value={email}
                 onChange={ev => setEmail(ev.target.value)} />
          <input type="password"
                 placeholder="password"
                 value={password}
                 onChange={ev => setPassword(ev.target.value)} />
          <button className="primary" disabled={loading} >Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
