import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Eye, X, Dumbbell, MapPin, CalendarDays, Activity, AlertTriangle } from 'lucide-react';
import axios from 'axios';

const ThietBi = () => {
  const [equipments, setEquipments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('Tất cả');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); 
  const [formData, setFormData] = useState({
    maTB: '', tenTB: '', loaiMay: 'Cardio', ngayMua: '', tinhTrang: 'Hoạt động', viTri: ''
  });

  const fetchEquipments = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/thietbi');
      setEquipments(res.data);
    } catch (error) { console.error('Lỗi tải dữ liệu thiết bị:', error); }
  };

  useEffect(() => { fetchEquipments(); }, []);

  const filteredEquipments = equipments.filter(tb => {
    const matchSearch = (tb.tenTB?.toLowerCase().includes(searchTerm.toLowerCase()) || tb.maTB?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchType = filterType === 'Tất cả' || tb.loaiMay === filterType;
    return matchSearch && matchType;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalMode === 'add') {
        await axios.post('http://localhost:8080/api/thietbi', formData);
      } else if (modalMode === 'edit') {
        await axios.put(`http://localhost:8080/api/thietbi/${formData.maTB}`, formData);
      }
      setIsModalOpen(false);
      fetchEquipments();
    } catch (error) { 
      alert(error.response?.data || "Lỗi khi lưu thông tin thiết bị!"); 
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Bạn có chắc muốn xóa thiết bị ${id}?`)) {
      try {
        await axios.delete(`http://localhost:8080/api/thietbi/${id}`);
        fetchEquipments();
      } catch (error) {
        alert(error.response?.data || "Không thể xóa thiết bị này!");
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const d = new Date(dateString);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  };

  const totalEquipments = equipments.length;
  const activeEquipments = equipments.filter(e => e.tinhTrang === 'Hoạt động').length;
  const brokenEquipments = equipments.filter(e => e.tinhTrang === 'Đang bảo trì').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative font-sans">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-black text-white tracking-tight">Thiết bị</h2>
        <p className="text-slate-400 font-medium">Quản lý cơ sở vật chất từng máy</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0f172a] border border-gray-800 p-6 rounded-[20px] flex justify-between items-center hover:border-gray-700 transition-all">
          <div><p className="text-slate-400 text-sm font-medium mb-2">Tổng số thiết bị lẻ</p><h3 className="text-4xl font-black text-white">{totalEquipments}</h3></div>
          <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20"><Dumbbell className="text-[#007BFF]" size={28} /></div>
        </div>
        <div className="bg-[#0f172a] border border-gray-800 p-6 rounded-[20px] flex justify-between items-center hover:border-gray-700 transition-all">
          <div><p className="text-slate-400 text-sm font-medium mb-2">Đang hoạt động</p><h3 className="text-4xl font-black text-green-500">{activeEquipments}</h3></div>
          <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center border border-green-500/20"><Activity className="text-green-500" size={28} /></div>
        </div>
        <div className="bg-[#0f172a] border border-gray-800 p-6 rounded-[20px] flex justify-between items-center hover:border-gray-700 transition-all">
          <div><p className="text-slate-400 text-sm font-medium mb-2">Đang bảo trì / Hỏng</p><h3 className="text-4xl font-black text-red-500">{brokenEquipments}</h3></div>
          <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center border border-red-500/20"><AlertTriangle className="text-red-500" size={28} /></div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-between items-center bg-[#0f172a] p-4 rounded-2xl border border-gray-800">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3 text-slate-500" size={18} />
          <input type="text" placeholder="Tìm theo mã máy, tên thiết bị..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#1e293b] border border-gray-700 rounded-xl text-white outline-none focus:border-[#007BFF] transition-all" />
        </div>
        <div className="flex gap-3 items-center w-full md:w-auto">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="bg-[#1e293b] border border-gray-700 text-white px-4 py-2 rounded-xl outline-none focus:border-[#007BFF]">
            <option value="Tất cả">Lọc: Tất cả loại máy</option>
            <option value="Cardio">Cardio</option>
            <option value="Tạ khối">Tạ khối</option>
            <option value="Tạ tự do">Tạ tự do</option>
            <option value="Phụ kiện">Phụ kiện</option>
            <option value="Võ thuật">Võ thuật</option>
            <option value="Thư giãn">Thư giãn</option>
          </select>
          <button onClick={() => { setModalMode('add'); setFormData({maTB: '', tenTB: '', loaiMay: 'Cardio', ngayMua: new Date().toISOString().split('T')[0], tinhTrang: 'Hoạt động', viTri: ''}); setIsModalOpen(true); }} 
            className="bg-[#007BFF] hover:bg-blue-600 text-white px-5 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 whitespace-nowrap">
            <Plus size={18} /> Thêm máy lẻ
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredEquipments.map(tb => (
          <div key={tb.maTB} className="bg-[#0f172a] border border-gray-800 rounded-[20px] p-5 hover:border-[#007BFF]/40 transition-all group relative overflow-hidden flex flex-col h-full">
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 rounded-xl bg-gray-800/80 flex items-center justify-center text-[#007BFF] border border-gray-700"><Dumbbell size={20}/></div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${tb.tinhTrang === 'Hoạt động' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                {tb.tinhTrang}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg mb-1 group-hover:text-[#007BFF] transition-colors line-clamp-1">{tb.tenTB}</h3>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">{tb.maTB}</span>
                <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                <span className="text-[#007BFF] text-xs font-bold uppercase">{tb.loaiMay}</span>
              </div>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-slate-400 text-sm"><MapPin size={16} className="text-slate-500" /> <span className="line-clamp-1">{tb.viTri || 'Chưa xếp vị trí'}</span></div>
                <div className="flex items-center gap-2 text-slate-400 text-sm"><CalendarDays size={16} className="text-slate-500" /> <span>{formatDate(tb.ngayMua)}</span></div>
              </div>
            </div>
            <div className="flex justify-end items-center pt-4 border-t border-gray-800/80 gap-2">
              <button onClick={() => { setModalMode('view'); setFormData(tb); setIsModalOpen(true); }} className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 text-white"><Eye size={16}/></button>
              <button onClick={() => { setModalMode('edit'); setFormData(tb); setIsModalOpen(true); }} className="p-2 bg-gray-800 rounded-lg hover:bg-[#007BFF] text-white"><Edit size={16}/></button>
              <button onClick={() => handleDelete(tb.maTB)} className="p-2 bg-gray-800 rounded-lg hover:bg-red-600 text-white"><Trash2 size={16}/></button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f172a] p-8 rounded-[24px] border border-gray-800 w-full max-w-md relative shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X size={24}/></button>
            <h3 className="text-2xl font-bold text-white mb-6">{modalMode === 'add' ? 'Thêm Máy Mới' : modalMode === 'edit' ? 'Cập Nhật Máy' : 'Chi Tiết Thiết Bị'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {modalMode !== 'add' && (
                <div>
                  <label className="text-sm text-slate-400 mb-1 block">Mã thiết bị</label>
                  <input type="text" disabled className="w-full bg-[#1e293b] border border-gray-700 text-slate-500 rounded-xl px-4 py-2.5 outline-none font-bold cursor-not-allowed" value={formData.maTB} />
                </div>
              )}
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Tên máy tập <span className="text-red-500">*</span></label>
                <input type="text" placeholder="VD: Máy chạy bộ Elip" required disabled={modalMode === 'view'}
                  className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none focus:border-[#007BFF] disabled:opacity-50" 
                  value={formData.tenTB} onChange={(e)=>setFormData({...formData, tenTB: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-400 mb-1 block">Chủng loại</label>
                  <select disabled={modalMode === 'view'} className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none focus:border-[#007BFF] disabled:opacity-50" 
                    value={formData.loaiMay} onChange={(e) => setFormData({...formData, loaiMay: e.target.value})}>
                    <option value="Cardio">Cardio</option>
                    <option value="Tạ khối">Tạ khối</option>
                    <option value="Tạ tự do">Tạ tự do</option>
                    <option value="Phụ kiện">Phụ kiện</option>
                    <option value="Võ thuật">Võ thuật</option>
                    <option value="Thư giãn">Thư giãn</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-slate-400 mb-1 block">Ngày mua</label>
                  <input type="date" disabled={modalMode === 'view'} required
                    className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none focus:border-[#007BFF] disabled:opacity-50" 
                    value={formData.ngayMua ? formData.ngayMua.split('T')[0] : ''} onChange={(e)=>setFormData({...formData, ngayMua: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Vị trí đặt máy <span className="text-red-500">*</span></label>
                <input type="text" placeholder="VD: Khu Cardio Tầng 1" required disabled={modalMode === 'view'}
                  className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none focus:border-[#007BFF] disabled:opacity-50" 
                  value={formData.viTri} onChange={(e)=>setFormData({...formData, viTri: e.target.value})} />
              </div>
              
              {/* Ô TÌNH TRẠNG LUÔN KHÓA */}
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Tình trạng (Tự động theo quy trình bảo trì)</label>
                <input type="text" disabled 
                  className={`w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-2.5 outline-none font-bold cursor-not-allowed ${formData.tinhTrang === 'Hoạt động' ? 'text-green-500' : 'text-red-500'}`} 
                  value={formData.tinhTrang} />
              </div>

              {modalMode === 'view' ? (
                <button type="button" onClick={() => setIsModalOpen(false)} className="w-full bg-gray-800 text-white py-3 rounded-xl hover:bg-gray-700 font-bold mt-4 transition-colors">Đóng</button>
              ) : (
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 text-white border border-gray-600 py-3 rounded-xl hover:bg-gray-800 font-medium transition-colors">Hủy</button>
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

export default ThietBi;