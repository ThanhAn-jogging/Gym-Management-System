import React, { useState, useEffect } from 'react';
import { Search, Plus, Clock, Calendar, User, Trash2, X, CalendarCheck, Edit } from 'lucide-react';
import axios from 'axios';

const LichTapPT = () => {
  const [schedules, setSchedules] = useState([]);
  const [hoivienList, setHoivienList] = useState([]);
  const [ptList, setPtList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' hoặc 'edit'
  const [formData, setFormData] = useState({
    maLich: '', maHV: '', maPT: '', ngayTap: new Date().toISOString().split('T')[0], khungGio: '08:00 - 09:30', trangThaiBuoiTap: 'Sắp diễn ra'
  });

  const fetchData = async () => {
    try {
      const [lichRes, hvRes, ptRes] = await Promise.all([
        axios.get('http://localhost:8080/api/lichtap'),
        axios.get('http://localhost:8080/api/hoivien').catch(() => ({ data: [] })), 
        axios.get('http://localhost:8080/api/huanluyenvien').catch(() => ({ data: [] }))
      ]);

      const enrichedData = lichRes.data.map(lich => {
        const hv = hvRes.data.find(h => h.maHV === lich.maHV);
        const pt = ptRes.data.find(p => p.maPT === lich.maPT);
        return {
          ...lich,
          tenHV: hv ? hv.hoTen : 'Hội viên',
          tenPT: pt ? pt.hoTen : 'Huấn luyện viên'
        };
      });

      // Sắp xếp lịch theo ngày giảm dần
      enrichedData.sort((a, b) => new Date(b.ngayTap) - new Date(a.ngayTap));
      
      setSchedules(enrichedData);
      setHoivienList(hvRes.data);
      setPtList(ptRes.data);
    } catch (error) { console.error("Lỗi tải dữ liệu lịch tập:", error); }
  };

  useEffect(() => { fetchData(); }, []);

  const filteredSchedules = schedules.filter(item => 
    (item.maHV && item.maHV.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.tenHV && item.tenHV.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.maPT && item.maPT.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalMode === 'add') {
        await axios.post('http://localhost:8080/api/lichtap', formData);
      } else {
        await axios.put(`http://localhost:8080/api/lichtap/${formData.maLich}`, formData);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      alert(error.response?.data || error.message);
    }
  };

  const handleEdit = (lich) => {
    setModalMode('edit');
    setFormData({
      maLich: lich.maLich,
      maHV: lich.maHV,
      maPT: lich.maPT,
      ngayTap: lich.ngayTap,
      khungGio: lich.khungGio,
      trangThaiBuoiTap: lich.trangThaiBuoiTap || 'Sắp diễn ra'
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (maLich) => {
    if (window.confirm(`Xóa lịch tập ${maLich} này khỏi hệ thống?`)) {
      try {
        await axios.delete(`http://localhost:8080/api/lichtap/${maLich}`);
        fetchData();
      } catch (error) { alert('Lỗi khi xóa lịch: ' + (error.response?.data || error.message)); }
    }
  };

  const getStatusStyle = (status) => {
    if (!status) return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    const s = status.toLowerCase();
    if (s.includes('đã tập') || s.includes('hoàn thành')) return 'bg-green-500/10 text-green-500 border-green-500/20';
    if (s.includes('chưa') || s.includes('sắp')) return 'bg-blue-500/10 text-[#007BFF] border-blue-500/20';
    if (s.includes('hủy') || s.includes('nghỉ')) return 'bg-red-500/10 text-red-500 border-red-500/20';
    return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const d = new Date(dateString);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-black text-white tracking-tight">Lịch Tập PT</h2>
        <p className="text-slate-400 font-medium">Quản lý và sắp xếp lịch dạy của huấn luyện viên cá nhân</p>
      </div>

      <div className="flex flex-wrap gap-4 justify-between items-center bg-[#0f172a] p-4 rounded-2xl border border-gray-800">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3 text-slate-500" size={18} />
          <input type="text" placeholder="Tìm mã HV, tên HV, mã PT..." 
            className="w-full pl-10 pr-4 py-2 bg-[#1e293b] border border-gray-700 rounded-xl text-white outline-none focus:border-[#007BFF]"
            onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <button onClick={() => { setModalMode('add'); setFormData({ maLich: '', maHV: '', maPT: '', ngayTap: new Date().toISOString().split('T')[0], khungGio: '08:00 - 09:30', trangThaiBuoiTap: 'Sắp diễn ra' }); setIsModalOpen(true); }}
          className="bg-[#007BFF] hover:bg-blue-600 text-white px-5 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20">
          <Plus size={18} /> Sắp lịch mới
        </button>
      </div>

      <div className="bg-[#0f172a] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs font-bold text-slate-500 uppercase border-b border-gray-800 bg-gray-800/20">
              <th className="px-6 py-4">Mã Lịch</th>
              <th className="px-6 py-4">Hội viên</th>
              <th className="px-6 py-4">Huấn luyện viên (PT)</th>
              <th className="px-6 py-4">Thời gian</th>
              <th className="px-6 py-4 text-center">Trạng thái</th>
              <th className="px-6 py-4 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 font-sans">
            {filteredSchedules.length > 0 ? (
              filteredSchedules.map((item) => (
                <tr key={item.maLich} className="hover:bg-gray-800/30 transition-all group">
                  <td className="px-6 py-4 text-slate-300 font-bold font-mono">{item.maLich}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold text-xs uppercase">{item.tenHV?.charAt(0)}</div>
                      <div>
                        <div className="text-white font-bold text-sm line-clamp-1">{item.tenHV}</div>
                        <div className="text-slate-500 text-xs font-mono">{item.maHV}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-300 font-medium">
                      <User size={14} className="text-slate-500" /> 
                      {item.tenPT} <span className="text-xs text-slate-500 font-mono">({item.maPT})</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-white text-sm font-bold"><Clock size={14} className="text-[#007BFF]" /> {item.khungGio}</div>
                      <div className="flex items-center gap-2 text-slate-500 text-xs"><Calendar size={14} /> {formatDate(item.ngayTap)}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${getStatusStyle(item.trangThaiBuoiTap)}`}>
                      {item.trangThaiBuoiTap || 'Chưa cập nhật'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                     <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEdit(item)} className="p-2 text-[#007BFF] hover:bg-blue-500/20 rounded-lg"><Edit size={16} /></button>
                        <button onClick={() => handleDelete(item.maLich)} className="p-2 text-red-500 hover:bg-red-500/20 rounded-lg"><Trash2 size={16} /></button>
                     </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" className="text-center py-8 text-slate-500">Chưa có lịch tập nào.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f172a] p-8 rounded-[24px] border border-gray-800 w-full max-w-md relative font-sans">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X size={24}/></button>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <CalendarCheck className="text-[#007BFF]"/> {modalMode === 'add' ? 'Sắp xếp Lịch PT mới' : 'Cập nhật Lịch PT'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-400 mb-1 block">Hội Viên <span className="text-red-500">*</span></label>
                  {hoivienList.length > 0 ? (
                    <select required className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none focus:border-[#007BFF]"
                      value={formData.maHV} onChange={(e) => setFormData({...formData, maHV: e.target.value})}>
                      <option value="">-- Chọn --</option>
                      {hoivienList.map(hv => <option key={hv.maHV} value={hv.maHV}>{hv.maHV} - {hv.hoTen}</option>)}
                    </select>
                  ) : (
                    <input type="text" required placeholder="Nhập Mã HV" className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none focus:border-[#007BFF]"
                      value={formData.maHV} onChange={(e) => setFormData({...formData, maHV: e.target.value})} />
                  )}
                </div>
                
                <div>
                  <label className="text-sm text-slate-400 mb-1 block">Huấn luyện viên <span className="text-red-500">*</span></label>
                  {ptList.length > 0 ? (
                    <select required className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none focus:border-[#007BFF]"
                      value={formData.maPT} onChange={(e) => setFormData({...formData, maPT: e.target.value})}>
                      <option value="">-- Chọn --</option>
                      {ptList.map(pt => <option key={pt.maPT} value={pt.maPT}>{pt.maPT} - {pt.hoTen}</option>)}
                    </select>
                  ) : (
                    <input type="text" required placeholder="Nhập Mã PT" className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none focus:border-[#007BFF]"
                      value={formData.maPT} onChange={(e) => setFormData({...formData, maPT: e.target.value})} />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-400 mb-1 block">Ngày tập <span className="text-red-500">*</span></label>
                  <input type="date" required className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none focus:border-[#007BFF]"
                    value={formData.ngayTap ? formData.ngayTap.split('T')[0] : ''} onChange={(e) => setFormData({...formData, ngayTap: e.target.value})} />
                </div>
                <div>
                  <label className="text-sm text-slate-400 mb-1 block">Khung giờ <span className="text-red-500">*</span></label>
                  <select required className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none font-mono font-bold"
                    value={formData.khungGio} onChange={(e) => setFormData({...formData, khungGio: e.target.value})}>
                    <option value="">-- Chọn ca tập cố định --</option>
                    <option value="06:00 - 07:30">Ca 1: 06:00 - 07:30</option>
                    <option value="08:00 - 09:30">Ca 2: 08:00 - 09:30</option>
                    <option value="10:00 - 11:30">Ca 3: 10:00 - 11:30</option>
                    <option value="14:00 - 15:30">Ca 4: 14:00 - 15:30</option>
                    <option value="16:00 - 17:30">Ca 5: 16:00 - 17:30</option>
                    <option value="17:30 - 18:30">Ca 6: 17:30 - 18:30</option>
                    <option value="18:30 - 20:00">Ca 7: 18:30 - 20:00</option>
                  </select>
                </div>
              </div>

              {modalMode === 'edit' && (
                <div className="p-4 bg-[#1e293b] rounded-xl border border-gray-700 mt-2">
                  <label className="text-xs text-[#007BFF] font-black uppercase block mb-2">Trạng thái buổi tập</label>
                  <select className="w-full bg-[#0f172a] border border-gray-700 text-white rounded-xl px-4 py-3 outline-none font-bold" 
                    value={formData.trangThaiBuoiTap} onChange={(e) => setFormData({...formData, trangThaiBuoiTap: e.target.value})}>
                    <option value="Sắp diễn ra" className="text-blue-500">Sắp diễn ra</option>
                    <option value="Đã hoàn thành" className="text-green-500">Đã hoàn thành</option>
                    <option value="Đã hủy" className="text-red-500">Đã hủy</option>
                  </select>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 text-white border border-gray-600 py-3 rounded-xl font-medium hover:bg-gray-800">Hủy</button>
                <button type="submit" className="flex-1 bg-[#007BFF] text-white py-3 rounded-xl font-bold hover:bg-blue-600">Xác nhận</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LichTapPT;