import React, { useState, useEffect } from 'react';
import { Activity, Users, QrCode, LogIn, LogOut, Clock } from 'lucide-react';
import axios from 'axios';

const CheckIn = () => {
  const [checkinData, setCheckinData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [hoivienList, setHoivienList] = useState([]);

  const fetchCheckins = async () => {
    try {
      const [checkinRes, hoivienRes] = await Promise.all([
        axios.get('http://localhost:8080/api/checkin'),
        axios.get('http://localhost:8080/api/hoivien')
      ]);

      const checkins = checkinRes.data;
      const members = hoivienRes.data;

      setHoivienList(members);

      const enrichedCheckins = checkins.map(ci => {
        const memberInfo = members.find(m => 
          String(m.maHV || '').trim() === String(ci.maHV || '').trim()
        );
        
        return {
          ...ci,
          hoTen: memberInfo ? memberInfo.hoTen : 'Hội viên không xác định',
        };
      });

      enrichedCheckins.sort((a, b) => new Date(b.thoiGianVao) - new Date(a.thoiGianVao));
      setCheckinData(enrichedCheckins);

    } catch (error) {
      console.error('Lỗi khi tải dữ liệu check-in:', error);
    }
  };

  useEffect(() => {
    fetchCheckins();
  }, []);

  const handleCheckIn = async () => {
    if (!inputValue.trim()) return alert("Vui lòng nhập mã hội viên!");
    const maHoiVien = inputValue.trim().toUpperCase();

    const isTraining = checkinData.find(ci => ci.maHV === maHoiVien && !ci.thoiGianRa);
    if (isTraining) {
      return alert("Hội viên này hiện đang ở trong phòng tập! Vui lòng Check-out trước.");
    }

    try {
      await axios.post('http://localhost:8080/api/checkin/vao', {
        maCheckIn: '', 
        maHV: maHoiVien,
        maDK: '' 
      });
      setInputValue('');
      fetchCheckins();  
    } catch (error) {
      alert(error.response?.data || "Lỗi Check-in: Hội viên không tồn tại hoặc gói tập đã hết hạn!");
    }
  };

  const handleCheckOut = async () => {
    if (!inputValue.trim()) return alert("Vui lòng nhập mã hội viên!");
    const maHoiVien = inputValue.trim().toUpperCase();

    const activeSession = checkinData.find(ci => ci.maHV === maHoiVien && !ci.thoiGianRa);
    if (!activeSession) {
      return alert("Hội viên này chưa Check-in hoặc đã Check-out rồi!");
    }

    thucHienCheckOut(activeSession.maCheckIn);
  };

  const thucHienCheckOut = async (maCheckIn) => {
    try {
      await axios.post(`http://localhost:8080/api/checkin/ra/${maCheckIn}`);
      setInputValue('');
      fetchCheckins();
    } catch (error) {
      alert("Lỗi Check-out: Không thể ghi nhận thời gian ra.");
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const todayCheckins = checkinData.filter(ci => ci.thoiGianVao && ci.thoiGianVao.startsWith(todayStr));
  
  const totalToday = todayCheckins.length;
  const currentlyActive = checkinData.filter(ci => !ci.thoiGianRa).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-black text-white tracking-tight">Check-in</h2>
        <p className="text-slate-400 font-medium">Quản lý check-in</p>
      </div>

      {/* 2 Thẻ thống kê nổi bật */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0f172a] border border-gray-800 p-6 rounded-[20px] flex justify-between items-center transition-all hover:border-gray-700">
          <div>
            <p className="text-slate-400 text-sm font-medium mb-2">Đang tập hiện tại</p>
            <h3 className="text-4xl font-black text-white mb-2">{currentlyActive}</h3>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span className="w-2 h-2 rounded-full bg-[#007BFF] animate-pulse"></span>
              Đang hoạt động (Dữ liệu thật)
            </div>
          </div>
          <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
            <Activity className="text-[#007BFF]" size={28} />
          </div>
        </div>

        <div className="bg-[#0f172a] border border-gray-800 p-6 rounded-[20px] flex justify-between items-center transition-all hover:border-gray-700">
          <div>
            <p className="text-slate-400 text-sm font-medium mb-2">Tổng lượt vào hôm nay</p>
            <h3 className="text-4xl font-black text-white mb-2">{totalToday}</h3>
            <div className="h-5"></div>
          </div>
          <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center border border-green-500/20">
            <Users className="text-green-500" size={28} />
          </div>
        </div>
      </div>

      {/* Khu vực Ghi nhận Check-in */}
      <div className="bg-[#0f172a] border border-gray-800 p-6 rounded-[20px]">
        <h3 className="text-lg font-bold text-white mb-4">Ghi nhận Check-in</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            {/* DROPDOWN CHỌN MÃ HỘI VIÊN MỚI */}
            <select
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:border-[#007BFF] font-mono"
            >
              <option value="">-- Chọn Hội viên cần Check-in --</option>
              {hoivienList.map((hv) => (
                <option key={hv.maHV} value={hv.maHV}>
                  {hv.maHV} - {hv.hoTen}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <QrCode size={20} className="text-[#007BFF]" />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleCheckIn} className="flex items-center gap-2 bg-[#007BFF] hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 whitespace-nowrap">
              <LogIn size={20} /> Check-in Vào
            </button>
            <button onClick={handleCheckOut} className="flex items-center gap-2 bg-transparent border border-[#007BFF] text-[#007BFF] hover:bg-blue-500/10 px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap">
              <LogOut size={20} /> Check-out Ra
            </button>
          </div>
        </div>
      </div>

      {/* Bảng Lịch sử Check-in */}
      <div className="bg-[#0f172a] border border-gray-800 rounded-[20px] overflow-hidden">
        <div className="p-5 border-b border-gray-800">
          <h3 className="text-lg font-bold text-white">Lịch sử Check-in (Tất cả)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-5">Mã Check-in</th>
                <th className="p-5">Hội viên</th>
                <th className="p-5">Giờ vào</th>
                <th className="p-5">Giờ ra</th>
                <th className="p-5 text-center">Trạng thái</th>
                <th className="p-5 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {checkinData.length > 0 ? (
                checkinData.map((ci) => {
                  const isTraining = !ci.thoiGianRa;

                  return (
                    <tr key={ci.maCheckIn} className="hover:bg-gray-800/20 transition-colors">
                      <td className="p-5 font-medium text-slate-300">{ci.maCheckIn}</td>
                      <td className="p-5 font-bold text-white">
                        {ci.hoTen}
                        <div className="text-xs text-slate-500 font-normal">{ci.maHV}</div>
                      </td>
                      <td className="p-5 text-green-500 font-medium">
                        <div className="flex items-center gap-2 mt-1">
                          <Clock size={14} /> {formatTime(ci.thoiGianVao)}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">{new Date(ci.thoiGianVao).toLocaleDateString('vi-VN')}</div>
                      </td>
                      <td className="p-5 text-slate-400">
                        {isTraining ? '—' : formatTime(ci.thoiGianRa)}
                      </td>
                      <td className="p-5 text-center">
                        {isTraining ? (
                          <span className="inline-flex items-center justify-center px-3 py-1 text-xs font-bold rounded-full bg-blue-500/10 text-[#007BFF] border border-blue-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#007BFF] mr-2"></span> Đang tập
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center px-3 py-1 text-xs font-bold rounded-full bg-gray-500/10 text-slate-400 border border-gray-500/30">
                            Đã về
                          </span>
                        )}
                      </td>
                      <td className="p-5 flex justify-center">
                        {isTraining ? (
                          <button onClick={() => thucHienCheckOut(ci.maCheckIn)} className="text-[#007BFF] hover:text-blue-400 transition-colors bg-blue-500/10 p-2 rounded-lg" title="Check-out ngay">
                            <LogOut size={20} />
                          </button>
                        ) : (
                          <span className="text-slate-600">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-500">
                    Chưa có lượt check-in nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default CheckIn;