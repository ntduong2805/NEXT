import {Link} from "react-router-dom";
import {useState} from "react";
import authApi from '../apis/auth';
import { toast } from 'react-hot-toast';
export default function RegisterPage() {
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Thêm biến loading

  const register = async (event) => {
    event.preventDefault(); // Ngăn chặn việc submit form mặc định

    try {
      setLoading(true); // Bắt đầu quá trình loading

      // Gọi API để đăng nhập
      const response = await authApi.register(email, username, password);
      console.log(response?.data?.codeStatus);
      // Xử lý thành công
      if (response?.data?.codeStatus === 200) {
        console.log("yes")
        // Xử lý logic sau khi đăng nhập thành công, ví dụ chuyển hướng trang
        toast.success("Register successful");
        setRedirect(true)
      } else {
        // Xử lý khi đăng nhập thất bại
        toast.error("Register failed");
      }
    } catch (error) {
      console.error("Register error:", error);
      toast.error("An error occurred while logging in");
    } finally {
      setLoading(false); // Kết thúc quá trình loading
    }
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={register}>
          <input type="text"
                 placeholder="John Doe"
                 value={username}
                 onChange={ev => setUsername(ev.target.value)}
                 required />
          <input type="email"
                 placeholder="your@email.com"
                 value={email}
                 onChange={ev => setEmail(ev.target.value)} 
                 required/>
          <input type="password"
                 placeholder="password"
                 value={password}
                 onChange={ev => setPassword(ev.target.value)} 
                 required/>
          <button className="primary" disabled={loading} >Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}