import React, { useState, useEffect } from 'react';
import { Search, Plus, User, Edit, Trash2, Phone, MapPin, Mail, Activity, Calendar, Award, CreditCard, X, ChevronRight } from 'lucide-react';
import axios from 'axios';

const HoiVien = () => {
  const [hoivienList, setHoivienList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [formData, setFormData] = useState({
    maHV: '', hoTen: '', gioiTinh: 'Nam', ngaySinh: '', sdt: '', diaChi: '', 
    email: '', tinhTrangSK: '', ngayDangKy: new Date().toISOString().split('T')[0], 
    hangTV: 'Silver', tongChiTieu: 0
  });

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/hoivien');
      setHoivienList(res.data);
    } catch (error) {
      console.error('Lỗi khi tải danh sách hội viên:', error);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const filteredList = hoivienList.filter(hv => 
    hv.hoTen.toLowerCase().includes(searchTerm.toLowerCase()) || 
    hv.maHV.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalMode === 'add') {
        await axios.post('http://localhost:8080/api/hoivien', formData);
      } else {
        await axios.put(`http://localhost:8080/api/hoivien/${formData.maHV}`, formData);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      alert('Lỗi khi lưu dữ liệu!');
    }
  };

  const handleEdit = (hv) => {
    setModalMode('edit');
    setFormData(hv);
    setIsModalOpen(true);
  };

  const handleDelete = async (maHV) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa hội viên ${maHV}?`)) {
      try {
        await axios.delete(`http://localhost:8080/api/hoivien/${maHV}`);
        fetchData();
      } catch (error) {
        alert('Không thể xóa hội viên này do có các dữ liệu liên quan (Hóa đơn/Đăng ký)!');
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const d = new Date(dateString);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Quản lý Hội Viên</h2>
          <p className="text-slate-400 font-medium text-sm">Danh sách khách hàng đầy đủ từ hệ thống</p>
        </div>
        <button 
          onClick={() => { setModalMode('add'); setFormData({ maHV:'', hoTen:'', gioiTinh:'Nam', ngaySinh:'', sdt:'', diaChi:'', email:'', tinhTrangSK:'', ngayDangKy: new Date().toISOString().split('T')[0], hangTV:'Silver', tongChiTieu:0 }); setIsModalOpen(true); }}
          className="bg-[#007BFF] hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all"
        >
          <Plus size={20} /> Thêm hội viên mới
        </button>
      </div>

      {/* Thanh công cụ */}
      <div className="flex flex-wrap gap-4 justify-between items-center bg-[#0f172a] p-4 rounded-2xl border border-gray-800">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Tìm theo Mã hoặc Họ tên..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#1e293b] border border-gray-700 rounded-xl text-white outline-none focus:border-[#007BFF]" 
          />
        </div>
      </div>

      {/* Bảng Dữ Liệu - Có thanh cuộn ngang nếu màn hình nhỏ */}
      <div className="bg-[#0f172a] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead className="text-xs font-bold text-slate-500 uppercase border-b border-gray-800 bg-gray-800/20">
              <tr>
                <th className="px-5 py-4">Mã HV</th>
                <th className="px-5 py-4">Họ và Tên</th>
                <th className="px-5 py-4">G.Tính</th>
                <th className="px-5 py-4">Ngày sinh</th>
                <th className="px-5 py-4">Liên lạc</th>
                <th className="px-5 py-4">Địa chỉ</th>
                <th className="px-5 py-4">Hạng</th>
                <th className="px-5 py-4">Chi tiêu</th>
                <th className="px-5 py-4">Sức khỏe</th>
                <th className="px-5 py-4 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 font-sans text-sm">
              {filteredList.map((hv) => (
                <tr key={hv.maHV} className="hover:bg-gray-800/30 transition-all group">
                  <td className="px-5 py-4 text-[#007BFF] font-bold">{hv.maHV}</td>
                  <td className="px-5 py-4">
                    <div className="font-bold text-white">{hv.hoTen}</div>
                    <div className="text-[11px] text-slate-500 uppercase font-bold tracking-tighter">Tham gia: {formatDate(hv.ngayDangKy)}</div>
                  </td>
                  <td className="px-5 py-4 text-slate-400">{hv.gioiTinh}</td>
                  <td className="px-5 py-4 text-slate-400">{formatDate(hv.ngaySinh)}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 text-slate-300"><Phone size={12} className="text-slate-500" /> {hv.sdt}</div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 italic"><Mail size={12} /> {hv.email}</div>
                  </td>
                  <td className="px-5 py-4 text-slate-400 truncate max-w-[150px]">{hv.diaChi}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${
                      hv.hangTV === 'Platinum' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                      hv.hangTV === 'Gold' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                      'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                    }`}>
                      {hv.hangTV}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-bold text-white">{hv.tongChiTieu?.toLocaleString()} đ</td>
                  <td className="px-5 py-4 text-slate-500 text-xs italic">{hv.tinhTrangSK || '—'}</td>
                  <td className="px-5 py-4 text-center">
                    <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(hv)} className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"><Edit size={16}/></button>
                      <button onClick={() => handleDelete(hv.maHV)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Thêm/Sửa */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-[#0f172a] p-8 rounded-[32px] border border-gray-800 w-full max-w-2xl relative my-8">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white"><X size={24}/></button>
            <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
              <User className="text-[#007BFF]" /> {modalMode === 'add' ? 'Thêm Hội Viên Mới' : `Sửa Thông Tin: ${formData.maHV}`}
            </h3>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-1.5 block">Họ và Tên</label>
                  <input required className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none focus:border-[#007BFF]"
                    value={formData.hoTen} onChange={(e) => setFormData({...formData, hoTen: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase mb-1.5 block">Giới tính</label>
                    <select className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none"
                      value={formData.gioiTinh} onChange={(e) => setFormData({...formData, gioiTinh: e.target.value})}>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase mb-1.5 block">Ngày sinh</label>
                    <input type="date" required className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none"
                      value={formData.ngaySinh} onChange={(e) => setFormData({...formData, ngaySinh: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-1.5 block">Số điện thoại</label>
                  <input required className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none"
                    value={formData.sdt} onChange={(e) => setFormData({...formData, sdt: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-1.5 block">Email</label>
                  <input type="email" className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none"
                    value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-1.5 block">Địa chỉ</label>
                  <input className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none"
                    value={formData.diaChi} onChange={(e) => setFormData({...formData, diaChi: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-1.5 block">Tình trạng sức khỏe</label>
                  <textarea rows="3" className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none"
                    value={formData.tinhTrangSK} onChange={(e) => setFormData({...formData, tinhTrangSK: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase mb-1.5 block italic text-slate-600">Hạng (Tự động)</label>
                    <input disabled className="w-full bg-gray-800 border border-gray-700 text-slate-500 rounded-xl px-4 py-2.5 cursor-not-allowed"
                      value={formData.hangTV} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase mb-1.5 block italic text-slate-600">Chi tiêu (Tự động)</label>
                    <input disabled className="w-full bg-gray-800 border border-gray-700 text-slate-500 rounded-xl px-4 py-2.5 cursor-not-allowed"
                      value={formData.tongChiTieu + ' đ'} />
                  </div>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 flex gap-3 mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 text-white border border-gray-700 py-3 rounded-xl hover:bg-gray-800 transition-all">Hủy</button>
                <button type="submit" className="flex-1 bg-[#007BFF] text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20">
                  {modalMode === 'add' ? 'Thêm Hội Viên' : 'Lưu Thay Đổi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HoiVien;