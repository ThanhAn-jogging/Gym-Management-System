import React from 'react';
import { 
  LayoutDashboard, Users, UserCog, Dumbbell, 
  CalendarCheck, Receipt, LogOut, ShieldCheck, Box, Wrench, Ticket, ShieldAlert, ClipboardCheck, CalendarDays
} from 'lucide-react';

const Sidebar = ({ activePage, setActivePage, userRole }) => {
  const menuItems = [
    { 
      icon: <LayoutDashboard size={20} />, 
      label: 'Dashboard', 
      roles: ['Quản lý', 'Lễ tân', 'Huấn luyện viên', 'Hội viên'] 
    },
    { 
      icon: <Users size={20} />, 
      label: 'Hội viên', 
      roles: ['Quản lý', 'Lễ tân', 'Huấn luyện viên'] 
    },
    { 
      icon: <UserCog size={20} />, 
      label: 'Nhân viên', 
      roles: ['Quản lý'] 
    },
    { 
      icon: <Dumbbell size={20} />, 
      label: 'Huấn luyện viên', 
      roles: ['Quản lý', 'Lễ tân', 'Huấn luyện viên'] 
    },
    { 
      icon: <CalendarDays size={20} />, 
      label: 'Lịch tập PT', 
      roles: ['Quản lý', 'Lễ tân', 'Huấn luyện viên'] 
    },
    { 
      icon: <ShieldCheck size={20} />, 
      label: 'Tài khoản', 
      roles: ['Quản lý'] 
    },
    { 
      icon: <Dumbbell size={20} />, 
      label: 'Gói tập', 
      roles: ['Quản lý', 'Lễ tân'] 
    },
    { 
      icon: <CalendarCheck size={20} />, 
      label: 'Lớp học', 
      roles: ['Quản lý', 'Lễ tân', 'Hội viên'] 
    },
    { 
      icon: <CalendarCheck size={20} />, 
      label: 'Check-in', 
      roles: ['Quản lý', 'Lễ tân', 'Hội viên'] 
    },
    { 
      icon: <ShieldAlert size={20} />, 
      label: 'Bảo lưu', 
      roles: ['Quản lý', 'Lễ tân'] 
    },
    { 
      icon: <Receipt size={20} />, 
      label: 'Hóa đơn', 
      roles: ['Quản lý', 'Lễ tân', 'Hội viên'] 
    },
    { 
      icon: <Box size={20} />, 
      label: 'Thiết bị', 
      roles: ['Quản lý', 'Lễ tân'] 
    },
    { 
      icon: <Wrench size={20} />, 
      label: 'Bảo trì', 
      roles: ['Quản lý', 'Lễ tân'] 
    },
    { 
      icon: <Ticket size={20} />, 
      label: 'Voucher', 
      roles: ['Quản lý'] 
    },
    { 
      icon: <Receipt size={20} />, 
      label: 'Đăng ký gói', 
      roles: ['Quản lý', 'Lễ tân'] 
    },
    { 
      icon: <ClipboardCheck size={20} />, 
      label: 'Đăng ký lớp học', 
      roles: ['Quản lý', 'Lễ tân'] 
    },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(userRole));

  const handleLogout = () => {
    window.location.reload();
  };

  return (
    <div className="w-64 h-screen bg-[#0f172a] border-r border-gray-800 flex flex-col p-4 z-10 shrink-0">
      <div className="flex items-center gap-3 mb-10 px-2 mt-2">
        <div className="w-8 h-8 bg-[#007BFF] rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Dumbbell className="text-white" size={20} />
        </div>
        <h1 className="text-2xl font-black tracking-tight text-white">
          <span className="text-[#007BFF]">Gym</span> Manager
        </h1>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto pr-2 pb-4 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
        {filteredMenu.map((item, index) => {
          const isActive = activePage === item.label;
          return (
            <div 
              key={index} 
              onClick={() => setActivePage(item.label)} 
              className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all ${
                isActive 
                  ? 'bg-blue-500/10 text-[#007BFF] font-bold' 
                  : 'text-slate-400 hover:bg-gray-800 hover:text-slate-200'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </div>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-gray-800 space-y-2">
        <div 
          onClick={handleLogout}
          className="flex items-center gap-4 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl cursor-pointer transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium">Đăng xuất</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;