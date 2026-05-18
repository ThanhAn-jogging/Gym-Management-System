import React, { useState } from 'react';
import { User, Lock, Dumbbell, ArrowRight, AlertCircle } from 'lucide-react';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
  e.preventDefault();
  setError('');
  setIsLoading(true);

  try {
    const response = await axios.post('http://localhost:8080/api/taikhoan/login', {
      tenDN: username,
      matKhau: password
    });

    console.log("Đăng nhập thành công:", response.data);
    

    onLoginSuccess(response.data.quyenTruyCap); 

  } catch (err) {

    const message = err.response?.data || 'Có lỗi xảy ra, vui lòng thử lại!';
    setError(message); 
    
    console.error("Lỗi đăng nhập:", message);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#080c14] flex items-center justify-center relative overflow-hidden">
      
      {/* Hiệu ứng nền */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#007BFF]/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-[#007BFF]/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Form Đăng nhập */}
      <div className="relative z-10 w-full max-w-md p-8 bg-[#0f172a]/80 backdrop-blur-xl rounded-[24px] border border-gray-800 shadow-2xl">
        
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-[#007BFF]/10 rounded-2xl flex items-center justify-center border border-[#007BFF]/30 mb-4 shadow-[0_0_20px_rgba(0,123,255,0.2)]">
            <Dumbbell className="text-[#007BFF]" size={32} />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Gym Manager</h1>
          <p className="text-slate-400 font-medium mt-2">Đăng nhập để quản lý hệ thống</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-500 text-sm font-medium animate-in fade-in slide-in-from-top-2">
            <AlertCircle size={18} />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Ô Tên đăng nhập */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300 ml-1">Tên đăng nhập hoặc Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User size={18} className="text-slate-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-3.5 border border-gray-700 rounded-xl bg-[#1e293b] text-white placeholder-slate-500 focus:outline-none focus:border-[#007BFF] focus:ring-1 focus:ring-[#007BFF] transition-all"
                placeholder="Nhập tên đăng nhập hoặc email..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Ô Mật khẩu */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300 ml-1">Mật khẩu</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-slate-500" />
              </div>
              <input
                type="password"
                className="block w-full pl-11 pr-4 py-3.5 border border-gray-700 rounded-xl bg-[#1e293b] text-white placeholder-slate-500 focus:outline-none focus:border-[#007BFF] focus:ring-1 focus:ring-[#007BFF] transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Nút Submit */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-[#007BFF] hover:bg-blue-600 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(0,123,255,0.3)] hover:shadow-[0_0_30px_rgba(0,123,255,0.5)] mt-2 disabled:opacity-70"
          >
            {isLoading ? 'Đang xử lý...' : 'Đăng nhập'} 
            {!isLoading && <ArrowRight size={20} />}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;