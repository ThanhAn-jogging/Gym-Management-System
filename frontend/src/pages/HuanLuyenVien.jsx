import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, X, Star, User } from 'lucide-react';
import axios from 'axios';

const HuanLuyenVien = () => {
  const [pts, setPts] = useState([]);
  const [availableStaff, setAvailableStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('rating-desc');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [formData, setFormData] = useState({
    maPT: '', maNV: '', chuyenMon: 'Thể hình cơ bản', bangCap: '', kinhNghiem: 0, rating: 0
  });

  const fetchPTs = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/huanluyenvien');
      setPts(response.data);
    } catch (error) { console.error('Lỗi lấy danh sách PT:', error); }
  };

  const fetchAvailableStaff = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/nhanvien/chuc-vu/Huấn luyện viên');
      setAvailableStaff(res.data);
    } catch (e) { console.error("Lỗi lấy danh sách NV:", e); }
  };

  useEffect(() => { 
    fetchPTs(); 
    fetchAvailableStaff(); 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalMode === 'add') {
        const finalData = { ...formData, maNV: formData.maNV || availableStaff[0]?.maNV };
        await axios.post('http://localhost:8080/api/huanluyenvien', finalData);
      } else {
        await axios.put(`http://localhost:8080/api/huanluyenvien/${formData.maPT}`, formData);
      }
      setIsModalOpen(false);
      fetchPTs();
    } catch (error) { 
      alert(error.response?.data || 'Có lỗi xảy ra, vui lòng kiểm tra lại!'); 
    }
  };

  const handleDelete = async (maPT) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa Huấn luyện viên này không?')) {
      try {
        await axios.delete(`http://localhost:8080/api/huanluyenvien/${maPT}`);
        fetchPTs();
      } catch (error) { alert('Không thể xóa! Có thể PT này đang có dữ liệu liên kết.'); }
    }
  };

  const handleOpenAdd = () => {
    setModalMode('add');
    const defaultMaNV = availableStaff.length > 0 ? availableStaff[0].maNV : '';
    setFormData({maPT: '', maNV: defaultMaNV, chuyenMon: 'Thể hình cơ bản', bangCap: '', kinhNghiem: 0, rating: 0});
    setIsModalOpen(true);
  };

  let processedPTs = pts.filter(pt => 
    (pt.hoTen && pt.hoTen.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (pt.maPT && pt.maPT.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (pt.maNV && pt.maNV.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (pt.chuyenMon && pt.chuyenMon.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  processedPTs.sort((a, b) => {
    if (sortOption === 'rating-desc') return (b.rating || 0) - (a.rating || 0);
    if (sortOption === 'exp-desc') return (b.kinhNghiem || 0) - (a.kinhNghiem || 0);
    return 0;
  });

  const cardGradients = ["from-indigo-900/50", "from-emerald-900/50", "from-blue-900/50", "from-purple-900/50"];
  const totalPTs = pts.length;
  const avgRating = pts.length > 0 ? (pts.reduce((sum, pt) => sum + (pt.rating || 0), 0) / pts.length).toFixed(1) : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative font-sans">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Huấn luyện viên</h2>
          <p className="text-slate-400 font-medium">Quản lý đội ngũ nhân sự chuyên môn</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-between items-center bg-[#0f172a] p-4 rounded-2xl border border-gray-800">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3 text-slate-500" size={18} />
          <input type="text" placeholder="Tìm tên, mã PT, mã NV..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#1e293b] border border-gray-700 rounded-xl text-white outline-none focus:border-[#007BFF]" />
        </div>
        <div className="flex gap-3 items-center">
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}
            className="bg-[#1e293b] border border-gray-700 text-white px-4 py-2 rounded-xl outline-none focus:border-[#007BFF]">
            <option value="rating-desc">Sắp xếp: Rating cao nhất</option>
            <option value="exp-desc">Sắp xếp: Kinh nghiệm nhiều nhất</option>
          </select>
          <button onClick={handleOpenAdd} className="bg-[#007BFF] hover:bg-blue-600 text-white px-5 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20">
            <Plus size={18} /> Thêm PT mới
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0f172a] border border-gray-800 p-6 rounded-[20px] transition-all hover:border-blue-500/30">
          <p className="text-slate-400 text-sm font-medium mb-1 uppercase tracking-wider">Tổng số PT</p>
          <h3 className="text-3xl font-black text-white">{totalPTs}</h3>
        </div>
        <div className="bg-[#0f172a] border border-gray-800 p-6 rounded-[20px] transition-all hover:border-yellow-500/30">
          <p className="text-slate-400 text-sm font-medium mb-1 uppercase tracking-wider">Rating trung bình</p>
          <div className="flex items-center gap-2">
            <h3 className="text-3xl font-black text-white">{avgRating}</h3>
            <Star size={24} className="text-yellow-500 fill-current" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {processedPTs.map((pt, index) => (
          <div key={pt.maPT} className={`bg-gradient-to-br ${cardGradients[index % 4]} to-[#0f172a] border border-gray-800 rounded-[20px] p-6 relative group hover:border-gray-600 transition-all`}>
            <div className="flex justify-between items-start mb-6">
              <div className="bg-black/40 text-yellow-500 text-xs font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1">
                <Star size={14} className="fill-current" /> {pt.rating || 0}/5
              </div>
              <div className="bg-blue-500/10 text-blue-400 text-xs font-bold px-3 py-1.5 rounded-full border border-blue-500/20">{pt.chuyenMon}</div>
            </div>
            <div className="w-full flex justify-center mb-6"><User size={64} className="text-slate-500/40" /></div>
            <div className="flex justify-between items-end mb-1">
              <h3 className="text-white font-bold text-xl">{pt.hoTen}</h3>
              <span className="text-slate-500 text-sm font-medium">{pt.maNV}</span>
            </div>
            <p className="text-slate-400 text-sm mb-4">{pt.maPT}</p>
            <div className="border border-blue-500/30 text-blue-400 text-[11px] font-bold px-3 py-1.5 rounded-full mb-6 inline-block">{pt.bangCap}</div>
            <div className="flex justify-center items-center pt-4 border-t border-gray-700/50">
              <span className="text-slate-400 text-sm font-bold uppercase tracking-widest italic">Kinh nghiệm: {pt.kinhNghiem || 0} năm</span>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => { setModalMode('edit'); setFormData({...pt, bangCap: pt.bangCap || ''}); setIsModalOpen(true); }} className="p-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-white shadow-lg"><Edit size={18}/></button>
              <button onClick={() => handleDelete(pt.maPT)} className="p-3 bg-red-600 hover:bg-red-500 rounded-xl text-white shadow-lg"><Trash2 size={18}/></button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f172a] p-8 rounded-[24px] border border-gray-800 w-full max-w-md shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X size={24}/></button>
            <h3 className="text-2xl font-bold text-white mb-6">{modalMode === 'add' ? 'Thêm PT mới' : 'Cập nhật PT'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* DROPBOX CHỌN NHÂN VIÊN */}
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Chọn Nhân Viên <span className="text-red-500">*</span></label>
                <select 
                  disabled={modalMode === 'edit'}
                  className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:border-[#007BFF]"
                  value={formData.maNV} 
                  onChange={(e) => setFormData({...formData, maNV: e.target.value})}
                >
                  {availableStaff.length > 0 ? (
                    availableStaff.map(staff => (
                      <option key={staff.maNV} value={staff.maNV}>
                        {staff.maNV} - {staff.hoTen}
                      </option>
                    ))
                  ) : (
                    <option disabled value="">Chưa có nhân viên chức vụ PT</option>
                  )}
                </select>
                <p className="text-[10px] text-blue-400 mt-1 italic">* Hệ thống chỉ hiển thị nhân viên có chức vụ "Huấn luyện viên"</p>
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-1 block">Chuyên môn</label>
                <input type="text" required className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none focus:border-[#007BFF]"
                  value={formData.chuyenMon} onChange={(e) => setFormData({...formData, chuyenMon: e.target.value})} />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Bằng cấp / Chứng chỉ</label>
                <input type="text" required className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none focus:border-[#007BFF]"
                  value={formData.bangCap} onChange={(e) => setFormData({...formData, bangCap: e.target.value})} />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Kinh nghiệm (Năm)</label>
                <input type="number" min="0" required className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none focus:border-[#007BFF]"
                  value={formData.kinhNghiem || ''} onChange={(e) => setFormData({...formData, kinhNghiem: parseInt(e.target.value) || 0})} />
              </div>

              <div className="flex gap-3 pt-4">
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

export default HuanLuyenVien;