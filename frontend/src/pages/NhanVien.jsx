import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, X } from 'lucide-react';
import axios from 'axios';

const NhanVien = () => {
  const [staffs, setStaffs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  
  const [formData, setFormData] = useState({
    maNV: '', hoTen: '', chucVu: 'Huấn luyện viên', sdt: '', 
    luongCB: 7000000, ngayVaoLam: new Date().toISOString().split('T')[0]
  });

  const fetchStaffs = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/nhanvien');
      setStaffs(res.data.sort((a, b) => a.maNV.localeCompare(b.maNV)));
    } catch (e) { console.error(e); }
  };

  useEffect(() => { fetchStaffs(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { ...formData, luongCB: Number(formData.luongCB) };
    try {
      if (modalMode === 'add') {
        await axios.post('http://localhost:8080/api/nhanvien', dataToSend);
      } else {
        await axios.put(`http://localhost:8080/api/nhanvien/${formData.maNV}`, dataToSend);
      }
      setIsModalOpen(false);
      fetchStaffs();
    } catch (error) {
      alert(error.response?.data || "Có lỗi xảy ra!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Xác nhận xóa nhân viên ${id}?`)) {
      try {
        await axios.delete(`http://localhost:8080/api/nhanvien/${id}`);
        fetchStaffs();
      } catch (e) { alert("Lỗi xóa: Nhân viên đang có dữ liệu liên kết."); }
    }
  };

  const filteredStaffs = staffs.filter(s => 
    s.hoTen?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.maNV?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.chucVu?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Hàm chia màu cho từng chức vụ
  const getRoleColor = (role) => {
    switch (role) {
      case 'Quản lý':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Huấn luyện viên':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Lễ tân':
        return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
      case 'Kế toán':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Bảo vệ':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 font-sans">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-white">Nhân viên</h2>
          <p className="text-slate-400">Quản lý đội ngũ nhân sự hệ thống</p>
        </div>
        <button onClick={() => { setModalMode('add'); setFormData({maNV:'', hoTen:'', chucVu:'Huấn luyện viên', sdt:'', luongCB:7000000, ngayVaoLam: new Date().toISOString().split('T')[0]}); setIsModalOpen(true); }}
          className="bg-[#007BFF] hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20">
          <Plus size={20} /> Thêm nhân viên mới
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 text-slate-500" size={18} />
        <input type="text" placeholder="Tìm tên, mã nhân viên, hoặc chức vụ..." value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-[#0f172a] border border-gray-800 rounded-xl text-white focus:border-[#007BFF] outline-none" />
      </div>

      <div className="bg-[#0f172a] border border-gray-800 rounded-[20px] overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#1e293b]/50 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-gray-800">
            <tr>
              <th className="p-5">Mã NV</th>
              <th className="p-5">Họ và Tên</th>
              <th className="p-5">Chức vụ</th>
              <th className="p-5">Số điện thoại</th>
              <th className="p-5 text-right">Lương cơ bản</th>
              <th className="p-5 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {filteredStaffs.map(s => (
              <tr key={s.maNV} className="hover:bg-gray-800/30 transition-colors group">
                <td className="p-5 font-bold text-[#007BFF]">{s.maNV}</td>
                <td className="p-5">
                   <div className="text-white font-bold">{s.hoTen}</div>
                   <div className="text-[10px] text-slate-500 italic">Vào làm: {s.ngayVaoLam}</div>
                </td>
                <td className="p-5">
                  {/* Áp dụng hàm gọi màu tại đây */}
                  <span className={`px-3 py-1 border rounded-full text-xs font-bold ${getRoleColor(s.chucVu)}`}>
                    {s.chucVu}
                  </span>
                </td>
                <td className="p-5 text-slate-400">{s.sdt}</td>
                <td className="p-5 text-right font-bold text-white">
                  {s.luongCB?.toLocaleString('vi-VN')} đ
                </td>
                <td className="p-5">
                  <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={()=> { setModalMode('edit'); setFormData(s); setIsModalOpen(true); }} className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded-lg transition-colors"><Edit size={16}/></button>
                    <button onClick={()=>handleDelete(s.maNV)} className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors"><Trash2 size={16}/></button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredStaffs.length === 0 && (
              <tr>
                <td colSpan="6" className="p-8 text-center text-slate-500 font-medium">Không tìm thấy nhân viên nào!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f172a] p-8 rounded-[24px] border border-gray-800 w-full max-w-lg relative shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X size={24}/></button>
            <h3 className="text-2xl font-bold text-white mb-6">{modalMode === 'add' ? 'Thêm Nhân Viên' : `Sửa NV: ${formData.maNV}`}</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Họ và Tên</label>
                <input required className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none focus:border-[#007BFF]"
                  value={formData.hoTen} onChange={(e)=>setFormData({...formData, hoTen: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Chức vụ</label>
                  <select className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none focus:border-[#007BFF]"
                    value={formData.chucVu} onChange={(e)=>setFormData({...formData, chucVu: e.target.value})}>
                    <option value="Quản lý">Quản lý</option>
                    <option value="Huấn luyện viên">Huấn luyện viên</option>
                    <option value="Lễ tân">Lễ tân</option>
                    <option value="Kế toán">Kế toán</option>
                    <option value="Bảo vệ">Bảo vệ</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Số điện thoại</label>
                  <input required className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none focus:border-[#007BFF]"
                    value={formData.sdt} onChange={(e)=>setFormData({...formData, sdt: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Lương cơ bản (VNĐ)</label>
                  <input type="number" required min="0" className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none focus:border-[#007BFF]"
                    value={formData.luongCB} onChange={(e)=>setFormData({...formData, luongCB: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Ngày vào làm</label>
                  <input type="date" required className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none focus:border-[#007BFF]"
                    value={formData.ngayVaoLam} onChange={(e)=>setFormData({...formData, ngayVaoLam: e.target.value})} />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 border border-gray-700 text-white py-3 rounded-xl hover:bg-gray-800 font-bold transition-all">Hủy</button>
                <button type="submit" className="flex-1 bg-[#007BFF] text-white py-3 rounded-xl font-bold hover:bg-blue-600 shadow-lg shadow-blue-500/20 transition-all">Lưu dữ liệu</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NhanVien;