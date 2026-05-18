import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Check, Clock, Zap, X } from 'lucide-react';
import axios from 'axios';

const GoiTap = () => {
  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('price-asc');
  
  // State quản lý Modal Thêm/Sửa (ĐÃ BỔ SUNG QUYỀN GÓI TẬP)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [formData, setFormData] = useState({
    maGoi: '', tenGoi: '', donGia: '', thoiGianHieuLuc: '', moTa: '', quyenGoiTap: 'GYM'
  });

  // Gọi API lấy dữ liệu gói tập
  const fetchPackages = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/goitap');
      setPackages(response.data);
    } catch (error) {
      console.error('Lỗi khi tải danh sách gói tập:', error);
    }
  };

  useEffect(() => { fetchPackages(); }, []);

  // LỌC: Tìm kiếm theo Tên Gói hoặc Mã Gói
  let processedPackages = packages.filter(pkg => 
    (pkg.tenGoi && pkg.tenGoi.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (pkg.maGoi && pkg.maGoi.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // SẮP XẾP: Theo Giá hoặc Thời gian
  processedPackages.sort((a, b) => {
    if (sortOption === 'price-asc') return (a.donGia || 0) - (b.donGia || 0);
    if (sortOption === 'price-desc') return (b.donGia || 0) - (a.donGia || 0);
    if (sortOption === 'time-asc') return (a.thoiGianHieuLuc || 0) - (b.thoiGianHieuLuc || 0);
    if (sortOption === 'time-desc') return (b.thoiGianHieuLuc || 0) - (a.thoiGianHieuLuc || 0);
    return 0;
  });

  // Format tiền tệ
  const formatCurrency = (amount) => {
    if (!amount) return '0';
    return amount.toLocaleString('vi-VN');
  };

  // Thống kê
  const totalPackages = packages.length;
  const totalRegistrations = packages.reduce((sum, pkg) => sum + (pkg.luotDangKy || 0), 0);
  const popularPackages = packages.filter(pkg => (pkg.luotDangKy || 0) > 0).length;

  // Xử lý mở Modal Sửa
  const handleOpenEdit = (pkg) => {
    setModalMode('edit');
    // Đảm bảo load đúng quyền gói tập cũ lên form, nếu không có mặc định là GYM
    setFormData({ ...pkg, quyenGoiTap: pkg.quyenGoiTap || 'GYM' }); 
    setIsModalOpen(true);
  };

  // Xử lý Thêm / Sửa
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalMode === 'add') {
        await axios.post('http://localhost:8080/api/goitap', formData);
      } else {
        await axios.put(`http://localhost:8080/api/goitap/${formData.maGoi}`, formData);
      }
      setIsModalOpen(false);
      fetchPackages();
    } catch (error) { 
      // SỬA CHỖ NÀY: Lấy lỗi trực tiếp từ Backend
      alert(error.response?.data || 'Có lỗi xảy ra khi lưu thông tin!'); 
    }
  };

  // Xử lý Xóa
  const handleDelete = async (maGoi) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa Gói tập này không?')) {
      try {
        await axios.delete(`http://localhost:8080/api/goitap/${maGoi}`);
        fetchPackages(); 
      } catch (error) {
        // SỬA CHỖ NÀY: Oracle báo khóa ngoại hay báo lỗi gì thì show lỗi đó ra
        alert(error.response?.data || 'Không thể xóa Gói tập này!');
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-black text-white tracking-tight">Gói tập</h2>
        <p className="text-slate-400 font-medium">Quản lý dịch vụ & bảng giá</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-4 justify-between items-center bg-[#0f172a] p-4 rounded-2xl border border-gray-800">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3 text-slate-500" size={18} />
          <input type="text" placeholder="Tìm tên hoặc mã gói tập..." 
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#1e293b] border border-gray-700 rounded-xl text-white outline-none focus:border-[#007BFF] transition-all" />
        </div>
        
        <div className="flex gap-3 items-center">
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}
            className="bg-[#1e293b] border border-gray-700 text-white px-4 py-2 rounded-xl outline-none focus:border-[#007BFF] cursor-pointer">
            <option value="price-asc">Sắp xếp: Giá từ thấp đến cao</option>
            <option value="price-desc">Sắp xếp: Giá từ cao đến thấp</option>
            <option value="time-asc">Sắp xếp: Thời gian ngắn nhất</option>
            <option value="time-desc">Sắp xếp: Thời gian dài nhất</option>
          </select>

          <button onClick={() => { setModalMode('add'); setFormData({maGoi:'', tenGoi:'', donGia:'', thoiGianHieuLuc:'', moTa:'', quyenGoiTap: 'GYM'}); setIsModalOpen(true); }} 
            className="bg-[#007BFF] hover:bg-blue-600 text-white px-5 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all">
            <Plus size={18} /> Thêm gói mới
          </button>
        </div>
      </div>

      {/* Thống kê */}
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-[#0f172a] border border-gray-800 p-5 rounded-[20px] flex justify-between items-center">
          <div>
            <p className="text-slate-400 text-sm font-medium mb-1">Tổng số gói tập đang cung cấp</p>
            <h3 className="text-3xl font-black text-white">{totalPackages}</h3>
          </div>
          <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20">
            <span className="text-blue-500 font-bold">GYM</span>
          </div>
        </div>
      </div>

      {/* Danh sách Gói tập */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pt-4">
        {processedPackages.map((pkg) => {
          const features = pkg.moTa ? pkg.moTa.split(',').map(f => f.trim()) : ["Đang cập nhật quyền lợi"];
          const isHot = pkg.thoiGianHieuLuc >= 365 || (pkg.luotDangKy || 0) >= 5;

          return (
            <div key={pkg.maGoi} className={`relative flex flex-col bg-[#0f172a] rounded-[24px] border ${isHot ? 'border-[#007BFF] shadow-[0_0_30px_rgba(0,123,255,0.1)]' : 'border-gray-800'} p-8 transition-all hover:border-gray-600`}>
              
              {isHot && (
                <div className="absolute -top-4 right-8 bg-[#007BFF] text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-blue-500/30">
                  <Zap size={14} className="fill-white" /> Khuyên dùng
                </div>
              )}

              {/* Thông tin chính */}
              <div className="text-center mb-8 border-b border-gray-800/50 pb-8">
                <h3 className="text-xl font-bold text-white mb-1">{pkg.tenGoi}</h3>
                <p className="text-slate-500 text-sm font-medium mb-3">{pkg.maGoi}</p>
                
                {/* --- HIỂN THỊ QUYỀN GÓI TẬP BẰNG BADGE TÍM --- */}
                <div className="mb-6 flex justify-center">
                  <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase">
                    Quyền Lớp: {pkg.quyenGoiTap || 'GYM'}
                  </span>
                </div>

                <div className="flex items-end justify-center gap-1 mb-3">
                  <span className="text-4xl font-black text-[#007BFF]">{formatCurrency(pkg.donGia)}</span>
                  <span className="text-slate-400 font-medium mb-1">đ</span>
                </div>
                
                <div className="flex justify-center items-center gap-1.5 text-slate-400 text-sm">
                  <Clock size={16} /> <span>{pkg.thoiGianHieuLuc} ngày</span>
                </div>
              </div>

              {/* Quyền lợi (Lấy từ mô tả) */}
              <div className="flex-1">
                <ul className="space-y-4 mb-8">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                      <Check size={18} className="text-[#007BFF] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer Thẻ */}
              <div className="mt-auto pt-4">
                <div className="flex gap-3">
                  <button onClick={() => handleOpenEdit(pkg)} className="flex-1 flex items-center justify-center gap-2 bg-[#1e293b] hover:bg-blue-600 text-white py-3 rounded-xl font-bold transition-all">
                    <Edit size={18} /> Sửa
                  </button>
                  <button onClick={() => handleDelete(pkg.maGoi)} className="p-3 border border-gray-700 hover:bg-red-500/20 hover:border-red-500 text-slate-400 hover:text-red-500 rounded-xl transition-all">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {processedPackages.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 border border-dashed border-gray-800 rounded-2xl">
            Không tìm thấy gói tập nào.
          </div>
        )}
      </div>

      {/* MODAL THÊM / SỬA GÓI TẬP */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f172a] p-8 rounded-[24px] border border-gray-800 w-full max-w-md shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X size={24}/></button>
            <h3 className="text-2xl font-bold text-white mb-6">{modalMode === 'add' ? 'Thêm Gói Tập' : 'Sửa Gói Tập'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Tên gói tập <span className="text-red-500">*</span></label>
                <input type="text" placeholder="VD: Gói PT Kèm Riêng" required
                  className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none focus:border-[#007BFF]"
                  value={formData.tenGoi} onChange={(e) => setFormData({...formData, tenGoi: e.target.value})} />
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-sm text-slate-400 mb-1 block">Giá tiền (VNĐ) <span className="text-red-500">*</span></label>
                  <input type="number" min="0" required
                    className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none focus:border-[#007BFF]"
                    value={formData.donGia} onChange={(e) => setFormData({...formData, donGia: Number(e.target.value)})} />
                </div>
                <div className="flex-1">
                  <label className="text-sm text-slate-400 mb-1 block">Thời hạn (Ngày) <span className="text-red-500">*</span></label>
                  <input type="number" min="1" required
                    className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none focus:border-[#007BFF]"
                    value={formData.thoiGianHieuLuc} onChange={(e) => setFormData({...formData, thoiGianHieuLuc: Number(e.target.value)})} />
                </div>
              </div>

              {/* --- BỔ SUNG DROPDOWN CHỌN QUYỀN GÓI TẬP --- */}
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Quyền Lớp Học <span className="text-red-500">*</span></label>
                <select required
                  className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none focus:border-[#007BFF]"
                  value={formData.quyenGoiTap} onChange={(e) => setFormData({...formData, quyenGoiTap: e.target.value})}>
                  <option value="ALL">ALL (Tham gia mọi lớp - Gói VIP)</option>
                  <option value="GYM">GYM (Chỉ tập tự do cơ bản)</option>
                  <option value="YOGA">YOGA (Được đăng ký các lớp Yoga/Pilates)</option>
                  <option value="BOXING">BOXING (Được đăng ký các lớp Võ thuật)</option>
                  <option value="CARDIO">CARDIO (Được đăng ký các lớp Cardio)</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-1 block">Mô tả quyền lợi</label>
                <textarea rows="3" placeholder="Cách nhau bằng dấu phẩy. VD: Được dùng PT, Tủ đồ miễn phí..." required
                  className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none focus:border-[#007BFF] resize-none"
                  value={formData.moTa} onChange={(e) => setFormData({...formData, moTa: e.target.value})} />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 text-white border border-gray-600 py-3 rounded-xl hover:bg-gray-800 font-medium">Hủy</button>
                <button type="submit" className="flex-1 bg-[#007BFF] text-white py-3 rounded-xl font-bold hover:bg-blue-600 shadow-lg shadow-blue-500/20">Lưu dữ liệu</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoiTap;