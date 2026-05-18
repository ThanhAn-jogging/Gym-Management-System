import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Eye, X, ShieldCheck, UserCheck, Users } from 'lucide-react';
import axios from 'axios';

const TaiKhoan = () => {
  const [accounts, setAccounts] = useState([]);
  
  // State lưu danh sách để làm DropBox (Đã bỏ Hội viên)
  const [pts, setPts] = useState([]);
  const [nvs, setNvs] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('Tất cả');
  const [sortOption, setSortOption] = useState('az');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  
  // Đặt mặc định trạng thái là "Hoạt động", quyền mặc định là "Lễ tân"
  const [formData, setFormData] = useState({
    tenDN: '', matKhau: '', quyenTruyCap: 'Lễ tân', maNV: '', maPT: '', trangThai: 'Hoạt động'
  });

  // GỌI CÙNG LÚC 3 API ĐỂ ĐỔ DỮ LIỆU VÀO DROPBOX
  const fetchData = async () => {
    try {
      const [resAcc, resPT, resNV] = await Promise.all([
        axios.get('http://localhost:8080/api/taikhoan'),
        axios.get('http://localhost:8080/api/huanluyenvien'),
        axios.get('http://localhost:8080/api/nhanvien')
      ]);
      setAccounts(resAcc.data);
      setPts(resPT.data);
      setNvs(resNV.data);
    } catch (error) { console.error('Lỗi tải dữ liệu:', error); }
  };

  useEffect(() => { fetchData(); }, []);

  // Xử lý Lọc và Sắp xếp
  let processedAccounts = accounts.filter(acc => {
    const matchSearch = acc.tenDN?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        acc.maNV?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        acc.maPT?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = filterRole === 'Tất cả' || acc.quyenTruyCap === filterRole;
    return matchSearch && matchRole;
  });

  processedAccounts.sort((a, b) => {
    if (sortOption === 'az') return a.tenDN.localeCompare(b.tenDN);
    if (sortOption === 'za') return b.tenDN.localeCompare(a.tenDN);
    return 0;
  });

  // Khi đổi Quyền, tự động xóa các mã liên kết cũ để tránh rác dữ liệu
  const handleRoleChange = (role) => {
    setFormData({ ...formData, quyenTruyCap: role, maNV: '', maPT: '', trangThai: 'Hoạt động' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalMode === 'add') {
        await axios.post('http://localhost:8080/api/taikhoan', formData);
      } else if (modalMode === 'edit') {
        await axios.put(`http://localhost:8080/api/taikhoan/${formData.tenDN}`, formData);
      }
      setIsModalOpen(false);
      fetchData(); // Load lại toàn bộ data
    } catch (error) { 
      alert(error.response?.data || "Lỗi khi lưu tài khoản! Vui lòng kiểm tra lại dữ liệu."); 
    }
  };

  const handleDelete = async (tenDN) => {
    if (window.confirm(`Bạn có chắc muốn xóa tài khoản [${tenDN}] vĩnh viễn không?`)) {
      try {
        await axios.delete(`http://localhost:8080/api/taikhoan/${tenDN}`);
        fetchData();
      } catch (error) { alert("Lỗi: Không thể xóa tài khoản này!"); }
    }
  };

  const totalAccounts = accounts.length;
  const activeAccounts = accounts.filter(a => a.trangThai === 'Hoạt động').length;

  const getRoleBadge = (role) => {
    switch (role) {
      case 'Quản lý': return <span className="px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-xs font-bold border border-red-500/20">{role}</span>;
      case 'Lễ tân': return <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-bold border border-green-500/20">{role}</span>;
      case 'Huấn luyện viên': return <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs font-bold border border-purple-500/20">PT</span>;
      default: return <span className="px-3 py-1 bg-gray-500/10 text-gray-400 rounded-full text-xs font-bold border border-gray-500/20">{role}</span>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative font-sans">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-black text-white tracking-tight">Tài khoản Nội bộ</h2>
        <p className="text-slate-400 font-medium">Quản lý hệ thống phân quyền nhân sự</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0f172a] border border-gray-800 p-6 rounded-[20px] flex justify-between items-center hover:border-gray-700 transition-all">
          <div><p className="text-slate-400 text-sm font-medium mb-2">Tổng số tài khoản</p><h3 className="text-4xl font-black text-white">{totalAccounts}</h3></div>
          <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20"><Users className="text-[#007BFF]" size={28} /></div>
        </div>
        <div className="bg-[#0f172a] border border-gray-800 p-6 rounded-[20px] flex justify-between items-center hover:border-gray-700 transition-all">
          <div><p className="text-slate-400 text-sm font-medium mb-2">Đang hoạt động</p><h3 className="text-4xl font-black text-green-500">{activeAccounts}</h3></div>
          <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center border border-green-500/20"><UserCheck className="text-green-500" size={28} /></div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-between items-center bg-[#0f172a] p-4 rounded-2xl border border-gray-800">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 text-slate-500" size={18} />
          <input type="text" placeholder="Tìm tên ĐN, mã liên kết..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#1e293b] border border-gray-700 rounded-xl text-white outline-none focus:border-[#007BFF] transition-all" />
        </div>
        <div className="flex gap-3 items-center w-full md:w-auto">
          <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="bg-[#1e293b] border border-gray-700 text-white px-4 py-2 rounded-xl outline-none focus:border-[#007BFF]">
            <option value="Tất cả">Lọc: Tất cả quyền</option>
            <option value="Quản lý">Quản lý</option>
            <option value="Lễ tân">Lễ tân</option>
            <option value="Huấn luyện viên">Huấn luyện viên</option>
          </select>
          <button onClick={() => { setModalMode('add'); setFormData({tenDN: '', matKhau: '', quyenTruyCap: 'Lễ tân', maNV: '', maPT: '', trangThai: 'Hoạt động'}); setIsModalOpen(true); }} 
            className="bg-[#007BFF] hover:bg-blue-600 text-white px-5 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 whitespace-nowrap">
            <Plus size={18} /> Thêm tài khoản
          </button>
        </div>
      </div>

      <div className="bg-[#0f172a] border border-gray-800 rounded-[20px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-xs font-bold text-slate-400 uppercase tracking-wider bg-gray-800/20">
                <th className="p-5">Tên Đăng Nhập</th>
                <th className="p-5">Quyền truy cập</th>
                <th className="p-5">Liên kết (Mã)</th>
                <th className="p-5">Trạng thái</th>
                <th className="p-5 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {processedAccounts.map((acc) => (
                <tr key={acc.tenDN} className="hover:bg-gray-800/30 transition-colors">
                  <td className="p-5 font-bold text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-slate-400"><ShieldCheck size={16} /></div>
                    {acc.tenDN}
                  </td>
                  <td className="p-5">{getRoleBadge(acc.quyenTruyCap)}</td>
                  <td className="p-5 text-slate-300 font-medium">
                    {(acc.quyenTruyCap === 'Quản lý' || acc.quyenTruyCap === 'Lễ tân') && <span className="bg-gray-800 px-2 py-1 rounded border border-gray-700">NV: {acc.maNV}</span>}
                    {acc.quyenTruyCap === 'Huấn luyện viên' && <span className="bg-gray-800 px-2 py-1 rounded border border-gray-700">PT: {acc.maPT}</span>}
                  </td>
                  <td className="p-5">
                    <span className={`text-sm font-bold flex items-center gap-1.5 ${acc.trangThai === 'Hoạt động' ? 'text-green-500' : 'text-red-500'}`}>
                      <span className={`w-2 h-2 rounded-full ${acc.trangThai === 'Hoạt động' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      {acc.trangThai}
                    </span>
                  </td>
                  <td className="p-5 flex justify-center gap-3">
                    <button onClick={() => { setModalMode('view'); setFormData(acc); setIsModalOpen(true); }} className="p-2 bg-gray-800 rounded-lg hover:bg-[#007BFF] hover:text-white transition-colors"><Eye size={16} /></button>
                    <button onClick={() => { setModalMode('edit'); setFormData(acc); setIsModalOpen(true); }} className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"><Edit size={16} /></button>
                    <button onClick={() => handleDelete(acc.tenDN)} className="p-2 bg-gray-800 rounded-lg hover:bg-red-600 hover:text-white transition-colors"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f172a] p-8 rounded-[24px] border border-gray-800 w-full max-w-md relative shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X size={24}/></button>
            <h3 className="text-2xl font-bold text-white mb-6">
              {modalMode === 'add' ? 'Thêm Tài Khoản Nhân Sự' : modalMode === 'edit' ? 'Sửa Tài Khoản' : 'Chi Tiết Tài Khoản'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Tên Đăng Nhập <span className="text-red-500">*</span></label>
                <input type="text" placeholder="VD: letan01" required disabled={modalMode !== 'add'}
                  className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:border-[#007BFF] disabled:opacity-50" 
                  value={formData.tenDN} onChange={(e)=>setFormData({...formData, tenDN: e.target.value})} />
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-1 block">Mật khẩu {modalMode !== 'view' && <span className="text-red-500">*</span>}</label>
                <input type="text" placeholder="Nhập mật khẩu" required={modalMode !== 'view'} disabled={modalMode === 'view'}
                  className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:border-[#007BFF] disabled:opacity-50" 
                  value={formData.matKhau || ''} onChange={(e)=>setFormData({...formData, matKhau: e.target.value})} />
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-1 block">Quyền Truy Cập (Vai trò)</label>
                <select disabled={modalMode === 'view'} 
                  className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:border-[#007BFF] disabled:opacity-50" 
                  value={formData.quyenTruyCap} onChange={(e) => handleRoleChange(e.target.value)}>
                  <option value="Lễ tân">Lễ tân</option>
                  <option value="Huấn luyện viên">Huấn luyện viên (PT)</option>
                  <option value="Quản lý">Quản lý (Admin)</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-1 block">Trạng thái tài khoản</label>
                <select disabled={modalMode === 'view'} 
                  className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:border-[#007BFF] disabled:opacity-50" 
                  value={formData.trangThai || 'Hoạt động'} onChange={(e) => setFormData({...formData, trangThai: e.target.value})}>
                  <option value="Hoạt động">Hoạt động (Được phép đăng nhập)</option>
                  <option value="Đã khóa">Đã khóa (Chặn đăng nhập)</option>
                </select>
              </div>

              {/* Bỏ mục Hội Viên, chỉ giữ PT và Nhân Viên (Quản lý/Lễ tân) */}
              {formData.quyenTruyCap === 'Huấn luyện viên' && (
                <div>
                  <label className="text-sm text-slate-400 mb-1 block">Chọn PT liên kết <span className="text-red-500">*</span></label>
                  <select required disabled={modalMode === 'view'}
                    className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:border-[#007BFF] disabled:opacity-50" 
                    value={formData.maPT || ''} onChange={(e)=>setFormData({...formData, maPT: e.target.value})}>
                    <option value="" disabled>-- Chọn Huấn luyện viên --</option>
                    {pts.map(pt => <option key={pt.maPT} value={pt.maPT}>{pt.maPT} - {pt.hoTen}</option>)}
                  </select>
                </div>
              )}

              {(formData.quyenTruyCap === 'Quản lý' || formData.quyenTruyCap === 'Lễ tân') && (
                <div>
                  <label className="text-sm text-slate-400 mb-1 block">Chọn Nhân Viên liên kết ({formData.quyenTruyCap}) <span className="text-red-500">*</span></label>
                  <select required disabled={modalMode === 'view'}
                    className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:border-[#007BFF] disabled:opacity-50" 
                    value={formData.maNV || ''} onChange={(e)=>setFormData({...formData, maNV: e.target.value})}>
                    <option value="" disabled>-- Chọn Nhân Viên --</option>
                    {nvs.filter(nv => nv.chucVu === formData.quyenTruyCap).map(nv => 
                      <option key={nv.maNV} value={nv.maNV}>{nv.maNV} - {nv.hoTen}</option>
                    )}
                  </select>
                </div>
              )}

              {modalMode === 'view' ? (
                <button type="button" onClick={() => setIsModalOpen(false)} className="w-full bg-gray-800 text-white py-3 rounded-xl hover:bg-gray-700 font-bold mt-4 transition-all">Đóng</button>
              ) : (
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 text-white border border-gray-600 py-3 rounded-xl hover:bg-gray-800 font-medium transition-all">Hủy</button>
                  <button type="submit" className="flex-1 bg-[#007BFF] text-white py-3 rounded-xl font-bold hover:bg-blue-600 shadow-lg shadow-blue-500/20 transition-all">Lưu dữ liệu</button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaiKhoan;