import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Ticket, Calendar, Ban, CheckCircle, X, Info } from 'lucide-react';
import axios from 'axios';

const Voucher = () => {
  const [vouchers, setVouchers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [formData, setFormData] = useState({
    maVoucher: '', tenVoucher: '', phanTramGiam: 0, giaTriToiThieu: 0, ngayHetHan: ''
  });

  const fetchVouchers = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/voucher');
      setVouchers(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchVouchers(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalMode === 'add') {
        await axios.post('http://localhost:8080/api/voucher', formData);
      } else {
        await axios.put(`http://localhost:8080/api/voucher/${formData.maVoucher}`, formData);
      }
      setIsModalOpen(false);
      fetchVouchers();
    } catch (error) { 
      alert(error.response?.data || "Lỗi khi lưu dữ liệu Voucher!"); 
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa mã giảm giá này?")) {
      try {
        await axios.delete(`http://localhost:8080/api/voucher/${id}`);
        fetchVouchers();
      } catch (error) { 
        alert(error.response?.data || "Lỗi: Không thể xóa dữ liệu này!"); 
      }
    }
  };

  const isExpired = (date) => new Date(date) < new Date();

  const activeCount = vouchers.filter(v => !isExpired(v.ngayHetHan)).length;
  const expiredCount = vouchers.length - activeCount;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-black text-white">Mã giảm giá</h2>
        <p className="text-slate-400 font-medium">Quản lý chiến dịch khuyến mãi và Voucher</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0f172a] border border-gray-800 p-6 rounded-[20px] flex justify-between items-center">
          <div><p className="text-slate-400 text-sm mb-1">Tổng số mã</p><h3 className="text-4xl font-black text-white">{vouchers.length}</h3></div>
          <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-[#007BFF]"><Ticket size={24} /></div>
        </div>
        <div className="bg-[#0f172a] border border-gray-800 p-6 rounded-[20px] flex justify-between items-center text-green-500">
          <div><p className="text-slate-400 text-sm mb-1">Đang hiệu lực</p><h3 className="text-4xl font-black">{activeCount}</h3></div>
          <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center"><CheckCircle size={24} /></div>
        </div>
        <div className="bg-[#0f172a] border border-gray-800 p-6 rounded-[20px] flex justify-between items-center text-red-500">
          <div><p className="text-slate-400 text-sm mb-1">Đã hết hạn</p><h3 className="text-4xl font-black">{expiredCount}</h3></div>
          <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center"><Ban size={24} /></div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-4 justify-between items-center bg-[#0f172a] p-4 rounded-2xl border border-gray-800">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 text-slate-500" size={18} />
          <input type="text" placeholder="Tìm tên hoặc mã voucher..." value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#1e293b] border border-gray-700 rounded-xl text-white outline-none focus:border-[#007BFF]" />
        </div>
        <button onClick={() => { setModalMode('add'); setFormData({maVoucher:'', tenVoucher:'', phanTramGiam:0, giaTriToiThieu:0, ngayHetHan:''}); setIsModalOpen(true); }}
          className="bg-[#007BFF] text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2">
          <Plus size={18} /> Tạo Voucher mới
        </button>
      </div>

      {/* Voucher Grid - TICKET STYLE */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {vouchers.filter(v => v.maVoucher.toLowerCase().includes(searchTerm.toLowerCase()) || v.tenVoucher.toLowerCase().includes(searchTerm.toLowerCase())).map(v => {
          const expired = isExpired(v.ngayHetHan);
          return (
            <div key={v.maVoucher} className={`relative flex h-36 rounded-2xl overflow-hidden border ${expired ? 'border-gray-800 opacity-60' : 'border-[#007BFF]/30 hover:border-[#007BFF]/60'} transition-all group`}>
              {/* Left Side (Discount) */}
              <div className={`w-1/3 flex flex-col items-center justify-center border-r border-dashed border-gray-700 ${expired ? 'bg-gray-800' : 'bg-blue-500/10'}`}>
                <span className={`text-3xl font-black ${expired ? 'text-slate-500' : 'text-[#007BFF]'}`}>{v.phanTramGiam}%</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">OFF</span>
              </div>

              {/* Right Side (Info) */}
              <div className="flex-1 bg-[#0f172a] p-5 flex flex-col justify-between relative">
                {/* Decorative Circles (Ticket effect) */}
                <div className="absolute -left-2 -top-2 w-4 h-4 bg-[#080c14] rounded-full"></div>
                <div className="absolute -left-2 -bottom-2 w-4 h-4 bg-[#080c14] rounded-full"></div>
                
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-white font-bold text-lg leading-tight">{v.tenVoucher}</h3>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded ${expired ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                      {expired ? 'HẾT HẠN' : 'CÒN HẠN'}
                    </span>
                  </div>
                  <p className="text-[#007BFF] font-mono font-bold text-sm mt-1">{v.maVoucher}</p>
                </div>

                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                      <Info size={12}/> Tối thiểu: {v.giaTriToiThieu.toLocaleString()}đ
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                      <Calendar size={12}/> HSD: {new Date(v.ngayHetHan).toLocaleDateString('vi-VN')}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setModalMode('edit'); setFormData(v); setIsModalOpen(true); }} className="p-2 bg-gray-800 rounded-lg text-slate-400 hover:text-white hover:bg-blue-600 transition-all"><Edit size={14}/></button>
                    <button onClick={() => handleDelete(v.maVoucher)} className="p-2 bg-gray-800 rounded-lg text-slate-400 hover:text-white hover:bg-red-600 transition-all"><Trash2 size={14}/></button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Thêm/Sửa */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f172a] p-8 rounded-[32px] border border-gray-800 w-full max-w-md relative shadow-2xl font-sans">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white"><X size={24}/></button>
            <h3 className="text-2xl font-black text-white mb-6 uppercase">{modalMode === 'add' ? 'Tạo mã mới' : 'Sửa mã giảm giá'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* CHỈ HIỆN MÃ VOUCHER KHI SỬA HOẶC XEM (ẨN KHI THÊM) */}
              {modalMode !== 'add' && (
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Mã Voucher</label>
                  <input type="text" disabled className="w-full bg-[#1e293b] border border-gray-700 text-slate-500 rounded-xl px-4 py-3 mt-1 outline-none font-mono font-bold" value={formData.maVoucher || ''} />
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Tên chương trình</label>
                <input type="text" required disabled={modalMode === 'view'} className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-3 mt-1 outline-none focus:border-[#007BFF]" value={formData.tenVoucher || ''} onChange={(e)=>setFormData({...formData, tenVoucher: e.target.value})} />
              </div>

              {/* THÊM Ô NHẬP LOẠI VOUCHER MỚI */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Loại Voucher</label>
                <input type="text" placeholder="VD: Khuyến mãi mùa, Ưu đãi nhóm..." disabled={modalMode === 'view'} className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-3 mt-1 outline-none focus:border-[#007BFF]" value={formData.loaiVoucher || ''} onChange={(e)=>setFormData({...formData, loaiVoucher: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">% Giảm</label>
                  <input type="number" max="100" min="1" required disabled={modalMode === 'view'} className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-3 mt-1 outline-none focus:border-[#007BFF]" value={formData.phanTramGiam || ''} onChange={(e)=>setFormData({...formData, phanTramGiam: parseFloat(e.target.value)})} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Hạn dùng</label>
                  <input type="date" required disabled={modalMode === 'view'} className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-3 mt-1 outline-none focus:border-[#007BFF]" value={formData.ngayHetHan ? formData.ngayHetHan.split('T')[0] : ''} onChange={(e)=>setFormData({...formData, ngayHetHan: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Giá trị đơn tối thiểu (VNĐ)</label>
                <input type="number" required disabled={modalMode === 'view'} className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-3 mt-1 outline-none focus:border-[#007BFF]" value={formData.giaTriToiThieu || ''} onChange={(e)=>setFormData({...formData, giaTriToiThieu: parseFloat(e.target.value)})} />
              </div>

              {modalMode !== 'view' && (
                <button type="submit" className="w-full bg-[#007BFF] text-white py-4 rounded-2xl font-black mt-4 shadow-lg shadow-blue-500/40 uppercase tracking-wider">
                  {modalMode === 'add' ? 'Kích hoạt Voucher mới' : 'Lưu thay đổi'}
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Voucher;