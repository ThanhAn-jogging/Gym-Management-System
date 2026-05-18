import React, { useState, useEffect } from 'react';
import { Search, Plus, X, Trash2, ClipboardList, CalendarDays, User, ShieldAlert } from 'lucide-react';
import axios from 'axios';

const DangKyLopHoc = () => {
  const [dangKyList, setDangKyList] = useState([]);
  const [hoivienList, setHoivienList] = useState([]);
  const [lophocList, setLophocList] = useState([]);
  
  // Thêm 2 danh sách này để phục vụ việc lọc "quyền"
  const [dangKyGoiTapList, setDangKyGoiTapList] = useState([]);
  const [goitapList, setGoitapList] = useState([]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ maHV: '', maLop: '' });

  const fetchData = async () => {
    try {
      const [dkRes, hvRes, lopRes, dkGoiRes, goiRes] = await Promise.all([
        axios.get('http://localhost:8080/api/dangky-lophoc'),
        axios.get('http://localhost:8080/api/hoivien'),
        axios.get('http://localhost:8080/api/lophoc'),
        axios.get('http://localhost:8080/api/dangky-goitap'), // Lấy danh sách đăng ký gói
        axios.get('http://localhost:8080/api/goitap')        // Lấy danh sách định nghĩa gói
      ]);

      setDangKyList(dkRes.data);
      setHoivienList(hvRes.data);
      setLophocList(lopRes.data);
      setDangKyGoiTapList(dkGoiRes.data);
      setGoitapList(goiRes.data);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // --- LOGIC LỌC LỚP HỌC THÔNG MINH ---
  const getAllowedClasses = () => {
    if (!formData.maHV) return [];

    // 1. Tìm gói tập ĐANG CÒN HẠN của hội viên này
    const activeDK = dangKyGoiTapList.find(dk => 
      dk.maHV === formData.maHV && 
      new Date(dk.ngayKetThuc) >= new Date()
    );

    if (!activeDK) return []; // Không có gói tập còn hạn thì không hiện lớp nào

    // 2. Lấy "Quyền gói tập" từ mã gói đó
    const packageInfo = goitapList.find(gt => gt.maGoi === activeDK.maGoi);
    const quyen = packageInfo?.quyenGoiTap;

    // 3. Lọc danh sách lớp học khớp với quyền (hoặc quyền là ALL)
    return lophocList.filter(lop => 
      quyen === 'ALL' || lop.loaiLop === quyen
    );
  };

  const allowedClasses = getAllowedClasses();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/dangky-lophoc', formData);
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      alert('LỖI: ' + (error.response?.data || error.message));
    }
  };

  const handleDelete = async (maHV, maLop) => {
    if (window.confirm(`Hủy đăng ký của hội viên ${maHV} khỏi lớp ${maLop}?`)) {
      try {
        await axios.delete(`http://localhost:8080/api/dangky-lophoc/huy`, {
          params: { maHV, maLop }
        });
        fetchData();
      } catch (error) {
        alert('Lỗi khi hủy: ' + error.message);
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-black text-white tracking-tight">Đăng ký lớp học</h2>
        <p className="text-slate-400 font-medium">Quản lý ghi danh dựa trên quyền hạn gói tập</p>
      </div>

      {/* Toolbar & Table (Giữ nguyên như bản cũ của bạn) */}
      <div className="flex flex-wrap gap-4 justify-between items-center bg-[#0f172a] p-4 rounded-2xl border border-gray-800">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3 text-slate-500" size={18} />
          <input type="text" placeholder="Tìm kiếm..." 
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#1e293b] border border-gray-700 rounded-xl text-white outline-none" />
        </div>
        <button onClick={() => { setFormData({maHV: '', maLop: ''}); setIsModalOpen(true); }} 
          className="bg-[#007BFF] hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2">
          <Plus size={20} /> Ghi danh mới
        </button>
      </div>

      <div className="bg-[#0f172a] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead className="text-xs font-bold text-slate-500 uppercase border-b border-gray-800 bg-gray-800/20">
            <tr>
              <th className="px-6 py-4">Hội Viên</th>
              <th className="px-6 py-4">Lớp Học</th>
              <th className="px-6 py-4 text-center">Ngày Đăng Ký</th>
              <th className="px-6 py-4 text-center">Hành Động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-sm">
            {dangKyList.filter(dk => dk.maHV.includes(searchTerm)).map((dk, index) => (
              <tr key={index} className="hover:bg-gray-800/30 group">
                <td className="px-6 py-4 font-bold text-white">{dk.maHV}</td>
                <td className="px-6 py-4 text-purple-400 font-bold">{dk.maLop}</td>
                <td className="px-6 py-4 text-center text-slate-400">{new Date(dk.ngayDangKy).toLocaleDateString('vi-VN')}</td>
                <td className="px-6 py-4 text-center">
                  <button onClick={() => handleDelete(dk.maHV, dk.maLop)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100"><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form - NƠI CÓ LOGIC LỌC THÔNG MINH */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f172a] p-8 rounded-[24px] border border-gray-800 w-full max-w-md relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X size={24}/></button>
            <h3 className="text-2xl font-black text-white mb-6">Ghi danh lớp học</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-bold text-slate-400 mb-2 block uppercase">1. Chọn Hội Viên</label>
                <select required className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-3 outline-none"
                  value={formData.maHV} onChange={(e) => setFormData({...formData, maHV: e.target.value, maLop: ''})}>
                  <option value="">-- Chọn Hội Viên --</option>
                  {hoivienList.map(hv => <option key={hv.maHV} value={hv.maHV}>{hv.maHV} - {hv.hoTen}</option>)}
                </select>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-400 mb-2 block uppercase">2. Chọn Lớp Học (Đã lọc theo quyền)</label>
                <select required 
                  disabled={!formData.maHV}
                  className={`w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-3 outline-none ${!formData.maHV && 'opacity-50 cursor-not-allowed'}`}
                  value={formData.maLop} onChange={(e) => setFormData({...formData, maLop: e.target.value})}>
                  
                  {!formData.maHV ? (
                    <option>-- Vui lòng chọn Hội viên trước --</option>
                  ) : allowedClasses.length > 0 ? (
                    <>
                      <option value="">-- Chọn Lớp khả dụng --</option>
                      {allowedClasses.map(lop => (
                        <option key={lop.maLop} value={lop.maLop} disabled={lop.soLuongHienTai >= lop.soLuongToiDa}>
                          {lop.tenLop} ({lop.soLuongHienTai}/{lop.soLuongToiDa})
                        </option>
                      ))}
                    </>
                  ) : (
                    <option disabled>Hội viên này không có quyền tham gia lớp nào</option>
                  )}
                </select>
                
                {formData.maHV && allowedClasses.length === 0 && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-red-400 bg-red-400/10 p-2 rounded-lg">
                    <ShieldAlert size={14} />
                    Hội viên chưa mua gói hoặc gói không hỗ trợ lớp học.
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 text-white border border-gray-600 py-3 rounded-xl">Hủy</button>
                <button type="submit" disabled={allowedClasses.length === 0}
                  className={`flex-1 py-3 rounded-xl font-bold shadow-lg transition-all ${allowedClasses.length === 0 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-[#007BFF] text-white hover:bg-blue-600 shadow-blue-500/20'}`}>
                  Xác nhận
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DangKyLopHoc;