import api from '../Api';
import { useState } from 'react';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { email, password });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-center text-purple-700">Login</h1>
                <p className="mb-6 text-gray-600 text-center">Welcome back! Please enter your credentials to access your account.</p>
                <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400" />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400" />
                    <button type="submit" className="mt-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded transition-colors">Register</button>
                </form>
            <p className="text-center text-gray-600">Don't have an account? <a href="/" className="text-purple-600 hover:underline">Register</a>.</p>
            </div>
        </div>
    );
};
 
export default Login;