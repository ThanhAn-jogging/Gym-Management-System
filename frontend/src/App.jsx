import React, { useState } from 'react';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import HoiVien from './pages/HoiVien';
import NhanVien from './pages/NhanVien';
import HuanLuyenVien from './pages/HuanLuyenVien';
import LichTapPT from './pages/LichTapPT';
import TaiKhoan from './pages/TaiKhoan';
import GoiTap from './pages/GoiTap';
import LopHoc from './pages/LopHoc';
import CheckIn from './pages/CheckIn';	
import BaoLuu from './pages/BaoLuu';
import HoaDon from './pages/HoaDon';
import ThietBi from './pages/ThietBi';
import BaoTri from './pages/BaoTri';
import Voucher from './pages/Voucher';
import DangKyGoiTap from './pages/DangKyGoiTap';
import DangKyLopHoc from './pages/DangKyLopHoc';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [userRole, setUserRole] = useState(''); 
  const [activePage, setActivePage] = useState('Dashboard'); 

  const renderContent = () => {
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Hội viên':
        return <HoiVien />;
      case 'Nhân viên': 
        return <NhanVien />;
      case 'Huấn luyện viên':
        return <HuanLuyenVien />;
      case 'Lịch tập PT':
        return <LichTapPT />;
      case 'Tài khoản':
        return <TaiKhoan />;
      case 'Gói tập':
        return <GoiTap />;
      case 'Lớp học':
        return <LopHoc />;
      case 'Check-in':     
        return <CheckIn />;  
      case 'Bảo lưu':
        return <BaoLuu />; 
      case 'Hóa đơn':      
        return <HoaDon />; 
      case 'Thiết bị': 
        return <ThietBi />;
      case 'Bảo trì':
        return <BaoTri />;
      case 'Voucher': 
        return <Voucher />;
      case 'Đăng ký gói':
        return <DangKyGoiTap />;
      case 'Đăng ký lớp học':
        return <DangKyLopHoc />;
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return (
      <Login 
        onLoginSuccess={(role) => {
          setIsAuthenticated(true);
          setUserRole(role);
        }} 
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-[#080c14] text-white overflow-hidden">
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        userRole={userRole} 
      />
      
      <main className="flex-1 p-8 overflow-y-auto relative">
        <div className="absolute top-4 right-8 bg-[#0f172a] border border-gray-800 px-4 py-1.5 rounded-full text-xs font-medium text-slate-400">
          Đang đăng nhập: <span className="text-[#007BFF] font-bold">{userRole}</span>
        </div>
        
        <div className="mt-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;