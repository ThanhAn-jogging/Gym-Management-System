import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, CalendarDays, Clock, Users, UserSquare2, Info, X } from 'lucide-react';
import axios from 'axios';

const LopHoc = () => {
  const [classes, setClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  
  const [formData, setFormData] = useState({
    maLop: '', tenLop: '', maPT: '', moTa: '', soLuongToiDa: 15, ngayTap: '', khungGio: '', loaiLop: 'YOGA'
  });

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/lophoc');
      setClasses(response.data);
    } catch (error) {
      console.error('Lỗi khi tải danh sách lớp học:', error);
    }
  };

  useEffect(() => { fetchClasses(); }, []);

  const filteredClasses = classes.filter(c => 
    (c.tenLop && c.tenLop.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (c.maLop && c.maLop.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleOpenEdit = (c) => {
    setModalMode('edit');
    setFormData({ ...c, loaiLop: c.loaiLop || 'YOGA' });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalMode === 'add') {
        await axios.post('http://localhost:8080/api/lophoc', formData);
      } else {
        await axios.put(`http://localhost:8080/api/lophoc/${formData.maLop}`, formData);
      }
      setIsModalOpen(false);
      fetchClasses();
    } catch (error) { 
      alert(error.response?.data || error.message); 
    }
  };

  const handleDelete = async (maLop) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa Lớp học này?')) {
      try {
        await axios.delete(`http://localhost:8080/api/lophoc/${maLop}`);
        fetchClasses();
      } catch (error) {
        alert(error.response?.data || 'Không thể xóa!');
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-black text-white tracking-tight">Lớp học</h2>
        <p className="text-slate-400 font-medium">Quản lý lịch học và phân bổ phòng tập</p>
      </div>

      <div className="flex flex-wrap gap-4 justify-between items-center bg-[#0f172a] p-4 rounded-2xl border border-gray-800">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3 text-slate-500" size={18} />
          <input type="text" placeholder="Tìm tên hoặc mã lớp..." 
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#1e293b] border border-gray-700 rounded-xl text-white outline-none focus:border-[#007BFF] transition-all" />
        </div>
        <button onClick={() => { setModalMode('add'); setFormData({maLop:'', tenLop:'', maPT:'', moTa:'', soLuongToiDa: 15, ngayTap:'', khungGio:'', loaiLop: 'YOGA'}); setIsModalOpen(true); }} 
          className="bg-[#007BFF] hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all">
          <Plus size={18} /> Mở lớp mới
        </button>
      </div>

      {/* Grid thẻ Lớp học */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-2">
        {filteredClasses.map((c) => (
          <div key={c.maLop} className="bg-[#0f172a] rounded-[24px] border border-gray-800 p-6 hover:border-[#007BFF]/50 transition-all group flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="bg-blue-500/10 text-[#007BFF] border border-blue-500/20 px-2.5 py-1 rounded-md text-xs font-bold font-mono uppercase">
                  {c.maLop}
                </span>
              </div>
              <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                LOẠI: {c.loaiLop || 'N/A'}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 min-h-[56px]">{c.tenLop}</h3>

            <div className="space-y-4 mb-6 flex-1">
              
              {/* THANH PROGRESS BAR SĨ SỐ */}
              <div className="bg-gray-800/40 p-3 rounded-xl border border-gray-700/50">
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-400">Sĩ số lớp học</span>
                  <span className={c.soLuongHienTai >= c.soLuongToiDa ? "text-red-400 font-black" : "text-green-400 font-black"}>
                    {c.soLuongHienTai || 0} / {c.soLuongToiDa}
                  </span>
                </div>
                <div className="w-full bg-gray-900 rounded-full h-2 overflow-hidden border border-gray-800">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${c.soLuongHienTai >= c.soLuongToiDa ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]'}`} 
                    style={{ width: `${Math.min(((c.soLuongHienTai || 0) / c.soLuongToiDa) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* TÁCH HIỂN THỊ THÀNH 2 DÒNG: NGÀY TẬP & KHUNG GIỜ */}
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CalendarDays size={18} className="text-slate-500" />
                <span>Ngày tập: <strong className="text-white font-mono">{c.ngayTap || 'Chưa xếp ngày'}</strong></span>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Clock size={18} className="text-slate-500" />
                <span>Khung giờ: <strong className="text-slate-400 font-mono">{c.khungGio || 'Chưa xếp giờ'}</strong></span>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-300">
                <UserSquare2 size={18} className="text-slate-500" />
                <span>Giảng viên: <strong className="text-white font-mono">{c.maPT}</strong></span>
              </div>
            </div>

            <div className="flex gap-3 mt-auto pt-4 border-t border-gray-800/50">
              <button onClick={() => handleOpenEdit(c)} className="flex-1 flex items-center justify-center gap-2 bg-[#1e293b] hover:bg-blue-600 text-white py-2.5 rounded-xl font-bold transition-all text-sm">
                <Edit size={16} /> Sửa
              </button>
              <button onClick={() => handleDelete(c.maLop)} className="p-2.5 border border-gray-700 hover:bg-red-500/20 hover:border-red-500 text-slate-400 hover:text-red-500 rounded-xl transition-all">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Mở Lớp */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f172a] p-8 rounded-[24px] border border-gray-800 w-full max-w-lg shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X size={24}/></button>
            <h3 className="text-2xl font-bold text-white mb-6">{modalMode === 'add' ? 'Mở Lớp Học Mới' : 'Sửa Thông Tin Lớp'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-sm text-slate-400 mb-1 block">Tên lớp học <span className="text-red-500">*</span></label>
                  <input type="text" required
                    className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none focus:border-[#007BFF]"
                    value={formData.tenLop} onChange={(e) => setFormData({...formData, tenLop: e.target.value})} />
                </div>
                
                <div>
                  <label className="text-sm text-slate-400 mb-1 block">Mã Giảng viên (PT) <span className="text-red-500">*</span></label>
                  <input type="text" required placeholder="VD: PT001"
                    className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none focus:border-[#007BFF]"
                    value={formData.maPT} onChange={(e) => setFormData({...formData, maPT: e.target.value.toUpperCase()})} />
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-1 block">Phân Loại Lớp <span className="text-red-500">*</span></label>
                  <select required
                    className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none focus:border-[#007BFF] font-bold text-purple-400"
                    value={formData.loaiLop} onChange={(e) => setFormData({...formData, loaiLop: e.target.value})}>
                    <option value="YOGA">YOGA (Yoga, Pilates, Thiền)</option>
                    <option value="BOXING">BOXING (Boxing, Kickfit)</option>
                    <option value="CARDIO">CARDIO (Đạp xe, HIIT, Aerobic)</option>
                    <option value="GYM">GYM (Cử tạ, Form chuẩn)</option>
                    <option value="ZUMBA">ZUMBA (Nhảy hiện đại)</option>
                  </select>
                </div>
              </div>

              {/* PHẦN CHIA ĐÔI Ô NHẬP: NGÀY TẬP & KHUNG GIỜ */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="text-sm text-slate-400 mb-1 block">Ngày Tập <span className="text-red-500">*</span></label>
                  <input type="text" required placeholder="VD: Thứ 2-4-6 hoặc 05-MAY-26"
                    className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none focus:border-[#007BFF]"
                    value={formData.ngayTap} onChange={(e) => setFormData({...formData, ngayTap: e.target.value})} />
                </div>
                <div>
                  <label className="text-sm text-slate-400 mb-1 block">Sĩ số tối đa</label>
                  <input type="number" min="1" required
                    className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none focus:border-[#007BFF]"
                    value={formData.soLuongToiDa} onChange={(e) => setFormData({...formData, soLuongToiDa: Number(e.target.value)})} />
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-1 block">Khung Giờ Tập <span className="text-red-500">*</span></label>
                <select required
                  className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:border-[#007BFF] font-mono font-bold"
                  value={formData.khungGio} onChange={(e) => setFormData({...formData, khungGio: e.target.value})}>
                  <option value="">-- Chọn ca học cố định --</option>
                  <option value="06:00 - 07:30">Ca 1: 06:00 - 07:30</option>
                  <option value="08:00 - 09:30">Ca 2: 08:00 - 09:30</option>
                  <option value="10:00 - 11:30">Ca 3: 10:00 - 11:30</option>
                  <option value="14:00 - 15:30">Ca 4: 14:00 - 15:30</option>
                  <option value="16:00 - 17:30">Ca 5: 16:00 - 17:30</option>
                  <option value="17:30 - 18:30">Ca 6: 17:30 - 18:30</option>
                  <option value="18:30 - 20:00">Ca 7: 18:30 - 20:00</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-1 block">Mô tả nội dung</label>
                <textarea rows="2" placeholder="Ghi chú thêm về lớp học..."
                  className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none focus:border-[#007BFF] resize-none"
                  value={formData.moTa} onChange={(e) => setFormData({...formData, moTa: e.target.value})} />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 text-white border border-gray-600 py-3 rounded-xl hover:bg-gray-800 font-medium">Hủy</button>
                <button type="submit" className="flex-1 bg-[#007BFF] text-white py-3 rounded-xl font-bold hover:bg-blue-600 shadow-lg shadow-blue-500/20">Lưu thông tin</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LopHoc;