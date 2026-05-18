import React, { useState, useEffect } from 'react';
import { Search, Plus, CalendarOff, FileText, Clock, X, ShieldAlert, Edit, Trash2 } from 'lucide-react';
import axios from 'axios';

const BaoLuu = () => {
  const [baoLuuList, setBaoLuuList] = useState([]);
  const [dangKyList, setDangKyList] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const [formData, setFormData] = useState({
    maDK: '', ngayBatDauNghi: '', ngayKetThucNghi: '', lyDo: ''
  });

  const fetchData = async () => {
    try {
      const [resBaoLuu, resDangKy] = await Promise.all([
        axios.get('http://localhost:8080/api/baoluu'),
        axios.get('http://localhost:8080/api/dangky-goitap') 
      ]);
      setBaoLuuList(resBaoLuu.data);
      setDangKyList(resDangKy.data.filter(dk => dk.trangThai !== 'Hết hạn'));
    } catch (error) {
      console.error('Lỗi tải dữ liệu:', error);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const filteredBaoLuu = baoLuuList.filter(bl => 
    (bl.maBaoLuu && bl.maBaoLuu.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (bl.maDK && bl.maDK.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleOpenAdd = () => {
    setIsEditMode(false);
    setEditId(null);
    setFormData({ maDK: '', ngayBatDauNghi: '', ngayKetThucNghi: '', lyDo: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (bl) => {
    setIsEditMode(true);
    setEditId(bl.maBaoLuu);
    setFormData({
      maDK: bl.maDK,
      ngayBatDauNghi: bl.ngayBatDauNghi,
      ngayKetThucNghi: bl.ngayKetThucNghi,
      lyDo: bl.lyDo
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (maBaoLuu) => {
    if (window.confirm(`Xóa phiếu bảo lưu ${maBaoLuu}? (Gói tập sẽ bị trừ lại số ngày nghỉ này)`)) {
      try {
        await axios.delete(`http://localhost:8080/api/baoluu/${maBaoLuu}`);
        fetchData();
      } catch (error) { alert('Lỗi: ' + (error.response?.data || error.message)); }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await axios.put(`http://localhost:8080/api/baoluu/${editId}`, formData);
      } else {
        await axios.post('http://localhost:8080/api/baoluu', formData);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      alert(error.response?.data || error.message);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const d = new Date(dateString);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-black text-white tracking-tight">Bảo Lưu Gói Tập</h2>
        <p className="text-slate-400 font-medium">Quản lý tạm ngưng và dời ngày kết thúc gói tập</p>
      </div>

      <div className="flex flex-wrap gap-4 justify-between items-center bg-[#0f172a] p-4 rounded-2xl border border-gray-800">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3 text-slate-500" size={18} />
          <input type="text" placeholder="Tìm theo Mã Bảo Lưu hoặc Mã ĐK..." 
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#1e293b] border border-gray-700 rounded-xl text-white outline-none focus:border-[#007BFF]" />
        </div>
        <button onClick={handleOpenAdd} 
          className="bg-[#007BFF] hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20">
          <Plus size={18} /> Tạo Bảo Lưu
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBaoLuu.map((bl) => {
          const soNgay = (new Date(bl.ngayKetThucNghi) - new Date(bl.ngayBatDauNghi)) / (1000 * 60 * 60 * 24);
          
          return (
            <div key={bl.maBaoLuu} className="bg-[#0f172a] rounded-[24px] border border-gray-800 p-6 hover:border-[#007BFF]/50 transition-all group flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <span className="bg-blue-500/10 text-[#007BFF] border border-blue-500/20 px-3 py-1.5 rounded-lg text-xs font-black font-mono">
                  {bl.maBaoLuu}
                </span>
                <span className="bg-gray-800 text-slate-300 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase flex items-center gap-1.5">
                  <FileText size={12}/> {bl.maDK}
                </span>
              </div>

              <div className="space-y-4 mb-6 flex-1">
                <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex items-center gap-4">
                  <div className="bg-yellow-500/20 p-3 rounded-xl text-yellow-500"><CalendarOff size={24}/></div>
                  <div>
                    <div className="text-xs font-bold text-yellow-500/70 uppercase mb-1">Thời gian tạm nghỉ</div>
                    <div className="text-white font-mono font-bold text-sm">
                      {formatDate(bl.ngayBatDauNghi)} <span className="text-slate-500 mx-1">→</span> {formatDate(bl.ngayKetThucNghi)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <Clock size={16} className="text-[#007BFF]" />
                  <span>Tổng số ngày dời: <strong className="text-white font-black">{soNgay} ngày</strong></span>
                </div>

                <div className="bg-[#1e293b] p-4 rounded-xl text-sm border border-gray-800">
                  <strong className="text-slate-400 block mb-1">Lý do:</strong>
                  <span className="text-slate-200">{bl.lyDo}</span>
                </div>
              </div>

              <div className="flex gap-3 mt-auto pt-4 border-t border-gray-800/50">
                <button onClick={() => handleOpenEdit(bl)} className="flex-1 flex items-center justify-center gap-2 bg-[#1e293b] hover:bg-blue-600 text-white py-2.5 rounded-xl font-bold transition-all text-sm">
                  <Edit size={16} /> Sửa
                </button>
                <button onClick={() => handleDelete(bl.maBaoLuu)} className="p-2.5 border border-gray-700 hover:bg-red-500/20 hover:border-red-500 text-slate-400 hover:text-red-500 rounded-xl transition-all">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f172a] p-8 rounded-[24px] border border-gray-800 w-full max-w-lg relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X size={24}/></button>
            <h3 className="text-2xl font-bold text-white mb-6">{isEditMode ? 'Sửa Yêu Cầu Bảo Lưu' : 'Tạo Yêu Cầu Bảo Lưu'}</h3>
            
            <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 p-4 rounded-xl flex gap-3 mb-6">
              <ShieldAlert size={20} className="shrink-0" />
              <p className="text-xs">Hệ thống sẽ tự động tính toán số ngày nghỉ và <strong>Cộng thêm thời gian</strong> đó vào hạn sử dụng của gói tập tương ứng.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Mã Đăng Ký (Gói tập) <span className="text-red-500">*</span></label>
                {/* DROPDOWN CHỌN MÃ ĐĂNG KÝ */}
                <select required
                  className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:border-[#007BFF] font-mono font-bold"
                  value={formData.maDK} onChange={(e) => setFormData({...formData, maDK: e.target.value})}
                  disabled={isEditMode}>
                  <option value="">-- Chọn gói tập đang hoạt động --</option>
                  {dangKyList.map(dk => (
                    <option key={dk.maDK} value={dk.maDK}>
                      {dk.maDK} - Khách: {dk.maHV} (Hạn: {formatDate(dk.ngayKetThuc)})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-400 mb-1 block">Ngày bắt đầu nghỉ <span className="text-red-500">*</span></label>
                  <input type="date" required
                    className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:border-[#007BFF]"
                    value={formData.ngayBatDauNghi ? formData.ngayBatDauNghi.split('T')[0] : ''} onChange={(e) => setFormData({...formData, ngayBatDauNghi: e.target.value})} />
                </div>
                <div>
                  <label className="text-sm text-slate-400 mb-1 block">Ngày kết thúc nghỉ <span className="text-red-500">*</span></label>
                  <input type="date" required
                    className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:border-[#007BFF]"
                    value={formData.ngayKetThucNghi ? formData.ngayKetThucNghi.split('T')[0] : ''} onChange={(e) => setFormData({...formData, ngayKetThucNghi: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-1 block">Lý do bảo lưu <span className="text-red-500">*</span></label>
                <textarea rows="3" placeholder="Chấn thương, đi công tác xa..." required
                  className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:border-[#007BFF] resize-none"
                  value={formData.lyDo} onChange={(e) => setFormData({...formData, lyDo: e.target.value})} />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 text-white border border-gray-600 py-3 rounded-xl hover:bg-gray-800 font-medium">Hủy</button>
                <button type="submit" className="flex-1 bg-[#007BFF] text-white py-3 rounded-xl font-bold hover:bg-blue-600 shadow-lg shadow-blue-500/20">Lưu Thông Tin</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BaoLuu;