import React, { useState, useEffect } from 'react';
import { Search, Plus, CalendarDays, X, ShieldCheck, Edit, Trash2 } from 'lucide-react';
import axios from 'axios';

const DangKyGoiTap = () => {
  const [dangKyList, setDangKyList] = useState([]);
  const [hoivienList, setHoivienList] = useState([]);
  const [goitapList, setGoitapList] = useState([]);
  const [voucherList, setVoucherList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Quản lý Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    maHV: '', maGoi: '', ngayBatDau: new Date().toISOString().split('T')[0], maVoucher: '', phuongThucTT: 'Tiền mặt'
  });

  const fetchData = async () => {
    try {
      const [dkRes, hvRes, gtRes, vcRes] = await Promise.all([
        axios.get('http://localhost:8080/api/dangky-goitap'),
        axios.get('http://localhost:8080/api/hoivien'),
        axios.get('http://localhost:8080/api/goitap'),
        axios.get('http://localhost:8080/api/voucher')
      ]);
      setDangKyList(dkRes.data.sort((a, b) => b.maDK.localeCompare(a.maDK)));
      setHoivienList(hvRes.data);
      setGoitapList(gtRes.data);
      setVoucherList(vcRes.data);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const filteredList = dangKyList.filter(dk => 
    (dk.maDK && dk.maDK.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (dk.maHV && dk.maHV.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let currentMaNV = localStorage.getItem('maNV');
      
      if (!currentMaNV || currentMaNV.toLowerCase() === 'admin') {
        currentMaNV = 'NV001';
      }

      const submitData = { 
        ...formData, 
        maVoucher: formData.maVoucher || null,
        maNV: currentMaNV 
      };
      
      if (isEditMode) {
        await axios.put(`http://localhost:8080/api/dangky-goitap/${editId}`, submitData);
      } else {
        await axios.post('http://localhost:8080/api/dangky-goitap', submitData);
      }
      
      setIsModalOpen(false);
      fetchData();
    } catch (error) { 
      alert('LỖI: ' + (error.response?.data || error.message)); 
    }
  };

  const handleEdit = (dk) => {
    setIsEditMode(true);
    setEditId(dk.maDK);
    setFormData({
      maHV: dk.maHV,
      maGoi: dk.maGoi,
      ngayBatDau: dk.ngayBatDau,
      maVoucher: '',
      phuongThucTT: 'Tiền mặt'
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa đăng ký ${id}? Thao tác này không xóa hóa đơn liên quan.`)) {
      try {
        await axios.delete(`http://localhost:8080/api/dangky-goitap/${id}`);
        fetchData();
      } catch (error) {
        alert('Lỗi khi xóa: ' + error.message);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const d = new Date(dateString);
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return `${d.getDate().toString().padStart(2, '0')}-${months[d.getMonth()]}-${d.getFullYear().toString().slice(-2)}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-black text-white tracking-tight">Đăng Ký Gói Tập</h2>
        <p className="text-slate-400 font-medium">Nhật ký giao dịch gói tập</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-4 justify-between items-center bg-[#0f172a] p-4 rounded-2xl border border-gray-800">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3 text-slate-500" size={18} />
          <input type="text" placeholder="Tìm theo Mã ĐK, Mã Hội viên..." 
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#1e293b] border border-gray-700 rounded-xl text-white outline-none focus:border-[#007BFF]" />
        </div>
        <button onClick={() => { setIsEditMode(false); setFormData({maHV:'', maGoi:'', ngayBatDau: new Date().toISOString().split('T')[0], maVoucher:'', phuongThucTT: 'Tiền mặt'}); setIsModalOpen(true); }} 
          className="bg-[#007BFF] hover:bg-blue-600 text-white px-5 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20">
          <Plus size={18} /> Thêm đăng ký mới
        </button>
      </div>

      {/* Bảng Dữ Liệu */}
      <div className="bg-[#0f172a] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead className="text-xs font-bold text-slate-500 uppercase border-b border-gray-800 bg-gray-800/20">
            <tr>
              <th className="px-6 py-4">MADK</th>
              <th className="px-6 py-4">MAHV</th>
              <th className="px-6 py-4">MAGOI</th>
              <th className="px-6 py-4">MAHD</th>
              <th className="px-6 py-4 text-center">NGAYBATDAU</th>
              <th className="px-6 py-4 text-center">NGAYKETTHUC</th>
              <th className="px-6 py-4">TRANGTHAI</th>
              <th className="px-6 py-4 text-center">HÀNH ĐỘNG</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 font-mono text-sm">
            {filteredList.map((dk) => (
              <tr key={dk.maDK} className="hover:bg-gray-800/30 transition-all group">
                <td className="px-6 py-4 text-slate-300 font-bold">{dk.maDK}</td>
                <td className="px-6 py-4 text-slate-300">{dk.maHV}</td>
                <td className="px-6 py-4 text-slate-300">{dk.maGoi}</td>
                <td className="px-6 py-4 text-[#007BFF] font-bold">{dk.maHD || '—'}</td>
                <td className="px-6 py-4 text-center text-slate-400">{formatDate(dk.ngayBatDau)}</td>
                <td className="px-6 py-4 text-center text-slate-400">{formatDate(dk.ngayKetThuc)}</td>
                <td className="px-6 py-4">
                   {/* Lấy trực tiếp trạng thái từ DB, giao diện cực kỳ nhẹ */}
                   <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                     dk.trangThai === 'Hết hạn' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'
                   }`}>
                    {dk.trangThai || 'Đang hoạt động'}
                   </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(dk)} className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg"><Edit size={16}/></button>
                    <button onClick={() => handleDelete(dk.maDK)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 size={16}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f172a] p-8 rounded-[24px] border border-gray-800 w-full max-w-md relative font-sans">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X size={24}/></button>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              {isEditMode ? <Edit className="text-[#007BFF]"/> : <ShieldCheck className="text-[#007BFF]"/>}
              {isEditMode ? `Sửa Đăng Ký: ${editId}` : 'Ghi nhận Đăng Ký'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Hội Viên</label>
                <select required className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none"
                  value={formData.maHV} onChange={(e) => setFormData({...formData, maHV: e.target.value})}>
                  <option value="">-- Chọn Hội Viên --</option>
                  {hoivienList.map(hv => <option key={hv.maHV} value={hv.maHV}>{hv.maHV} - {hv.hoTen}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-bold text-slate-400 mb-2 block uppercase">Chọn Gói Tập</label>
                <select required className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:border-[#007BFF]"
                  value={formData.maGoi} 
                  onChange={(e) => setFormData({...formData, maGoi: e.target.value})}>
                  <option value="">-- Click để chọn Gói tập --</option>
                  
                  {goitapList.map(gt => (
                    <option key={gt.maGoi} value={gt.maGoi}>
                      {gt.tenGoi} - Giá: {gt.donGia ? gt.donGia.toLocaleString('vi-VN') : '0'} VNĐ
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Ngày bắt đầu</label>
                <input type="date" required className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-2.5 outline-none"
                  value={formData.ngayBatDau} onChange={(e) => setFormData({...formData, ngayBatDau: e.target.value})} />
              </div>
              
              {/* Thêm phần chọn phương thức thanh toán */}
              <div>
                <label className="text-sm font-bold text-slate-400 mb-2 block uppercase">Phương thức thanh toán</label>
                <select required className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:border-[#007BFF]"
                  value={formData.phuongThucTT} 
                  onChange={(e) => setFormData({...formData, phuongThucTT: e.target.value})}>
                  <option value="Tiền mặt">Tiền mặt</option>
                  <option value="Chuyển khoản">Chuyển khoản</option>
                  <option value="Quẹt thẻ">Quẹt thẻ</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-400 mb-2 block uppercase">
                  {isEditMode ? 'Voucher áp dụng lại (Tùy chọn)' : 'Voucher (Tùy chọn)'}
                </label>
                <select className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:border-[#007BFF]"
                  value={formData.maVoucher || ''} 
                  onChange={(e) => setFormData({...formData, maVoucher: e.target.value})}>
                  <option value="">-- Không sử dụng Voucher --</option>
                  
                  {voucherList
                    .filter(vc => {
                      if (vc.ngayKetThuc) {
                        return new Date(vc.ngayKetThuc) >= new Date(new Date().setHours(0,0,0,0));
                      }
                      return true; 
                    })
                    .map(vc => (
                      <option key={vc.maVoucher} value={vc.maVoucher}>
                        {vc.maVoucher} - Giảm {vc.phanTramGiam || 0}% 
                        {vc.giaTriToiThieu ? ` (Đơn từ ${vc.giaTriToiThieu.toLocaleString('vi-VN')}đ)` : ' (Mọi giá trị)'}
                      </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 text-white border border-gray-600 py-3 rounded-xl">Hủy</button>
                <button type="submit" className="flex-1 bg-[#007BFF] text-white py-3 rounded-xl font-bold hover:bg-blue-600">
                  {isEditMode ? 'Cập nhật' : 'Xác nhận'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DangKyGoiTap;