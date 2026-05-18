import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Eye, X, Wrench, Calendar, DollarSign, Activity, AlertCircle } from 'lucide-react';
import axios from 'axios';

const BaoTri = () => {
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const [equipments, setEquipments] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); 
  const [formData, setFormData] = useState({
    maPhieuBT: '', maTB: '', ngayBaoTri: new Date().toISOString().split('T')[0], 
    noiDung: '', chiPhi: 0, tinhTrangMay: 'Đang bảo trì' 
  });

  const fetchData = async () => {
    try {
      const [btRes, tbRes] = await Promise.all([
        axios.get('http://localhost:8080/api/baotri'),
        axios.get('http://localhost:8080/api/thietbi')
      ]);

      setEquipments(tbRes.data);

      const enrichedData = btRes.data.map(bt => {
        const matchingMachine = tbRes.data.find(tb => tb.maTB === bt.maTB);
        return {
          ...bt,
          tenTB: matchingMachine ? matchingMachine.tenTB : 'Máy không tồn tại',
          tinhTrang: matchingMachine ? matchingMachine.tinhTrang : 'Không xác định'
        };
      });

      enrichedData.sort((a, b) => new Date(b.ngayBaoTri) - new Date(a.ngayBaoTri));
      setMaintenanceRecords(enrichedData);
    } catch (error) { console.error('Lỗi khi tải dữ liệu:', error); }
  };

  useEffect(() => { fetchData(); }, []);

  const filteredRecords = maintenanceRecords.filter(bt => 
    (bt.maPhieuBT && bt.maPhieuBT.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (bt.maTB && bt.maTB.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (bt.tenTB && bt.tenTB.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Đóng gói dữ liệu gửi xuống Backend
      const payloadBT = {
        maPhieuBT: formData.maPhieuBT,
        maTB: formData.maTB,
        ngayBaoTri: formData.ngayBaoTri,
        noiDung: formData.noiDung,
        chiPhi: formData.chiPhi,
        tinhTrangMay: formData.tinhTrangMay // Gửi kèm để nếu đang Sửa thì báo máy đã hoạt động lại
      };

      if (modalMode === 'add') {
        // GỌI DUY NHẤT 1 API NÀY, BẢNG THIẾT BỊ SẼ DO ORACLE TỰ ĐỘNG CHUYỂN TRẠNG THÁI
        await axios.post('http://localhost:8080/api/baotri', payloadBT);
      } else {
        await axios.put(`http://localhost:8080/api/baotri/${formData.maPhieuBT}`, payloadBT);
      }

      setIsModalOpen(false);
      fetchData(); 
    } catch (error) { 
      alert(error.response?.data || "Lỗi khi lưu dữ liệu!"); 
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Xóa phiếu bảo trì [${id}] vĩnh viễn?`)) {
      try {
        await axios.delete(`http://localhost:8080/api/baotri/${id}`);
        fetchData();
      } catch (error) { alert("Không thể xóa phiếu bảo trì này!"); }
    }
  };

  const formatCurrency = (amount) => amount ? amount.toLocaleString('vi-VN') : '0';
  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const d = new Date(dateString);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  };

  const totalCost = maintenanceRecords.reduce((sum, r) => sum + (r.chiPhi || 0), 0);
  const brokenMachinesCount = equipments.filter(tb => tb.tinhTrang === 'Đang bảo trì').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative font-sans">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-black text-white tracking-tight">Bảo trì</h2>
        <p className="text-slate-400 font-medium">Quản lý lịch sử sửa chữa thiết bị</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0f172a] border border-gray-800 p-6 rounded-[20px] flex justify-between items-center group">
          <div><p className="text-slate-400 text-sm mb-2">Tổng chi phí bảo trì</p><h3 className="text-3xl font-black text-white">{formatCurrency(totalCost)} đ</h3></div>
          <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-[#007BFF]"><DollarSign size={28} /></div>
        </div>
        <div className="bg-[#0f172a] border border-gray-800 p-6 rounded-[20px] flex justify-between items-center text-red-500">
          <div><p className="text-slate-400 text-sm mb-2">Máy đang hỏng/bảo trì</p><h3 className="text-3xl font-black">{brokenMachinesCount} <span className="text-sm font-medium text-slate-500">máy</span></h3></div>
          <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center"><AlertCircle size={28} /></div>
        </div>
        <div className="bg-[#0f172a] border border-gray-800 p-6 rounded-[20px] flex justify-between items-center">
          <div><p className="text-slate-400 text-sm mb-2">Tổng số phiếu</p><h3 className="text-3xl font-black text-white">{maintenanceRecords.length}</h3></div>
          <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-[#007BFF]"><Wrench size={28} /></div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-between items-center bg-[#0f172a] p-4 rounded-2xl border border-gray-800">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3 text-slate-500" size={18} />
          <input type="text" placeholder="Tìm mã phiếu, mã máy, tên máy..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#1e293b] border border-gray-700 rounded-xl text-white outline-none focus:border-[#007BFF]" />
        </div>
        <button onClick={() => { 
          setModalMode('add'); 
          setFormData({maPhieuBT: '', maTB: equipments[0]?.maTB || '', ngayBaoTri: new Date().toISOString().split('T')[0], noiDung: '', chiPhi: 0, tinhTrangMay: 'Đang bảo trì'}); 
          setIsModalOpen(true); 
        }} 
          className="bg-[#007BFF] hover:bg-blue-600 text-white px-5 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20">
          <Plus size={18} /> Lập phiếu bảo trì
        </button>
      </div>

      <div className="bg-[#0f172a] border border-gray-800 rounded-[20px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-xs font-bold text-slate-400 uppercase bg-gray-800/20">
                <th className="p-5">Mã Phiếu</th>
                <th className="p-5">Thông tin máy</th>
                <th className="p-5">Ngày sửa</th>
                <th className="p-5">Nội dung</th>
                <th className="p-5">Chi phí (VNĐ)</th>
                <th className="p-5 text-center">Tình trạng máy</th>
                <th className="p-5 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {filteredRecords.map((r) => (
                <tr key={r.maPhieuBT} className="hover:bg-gray-800/30 transition-colors">
                  <td className="p-5 font-bold text-slate-300">{r.maPhieuBT}</td>
                  <td className="p-5">
                    <div className="font-bold text-white mb-0.5 line-clamp-1">{r.tenTB}</div>
                    <div className="text-xs text-[#007BFF] font-medium uppercase tracking-wider">{r.maTB}</div>
                  </td>
                  <td className="p-5 text-slate-400"><div className="flex items-center gap-2"><Calendar size={14}/>{formatDate(r.ngayBaoTri)}</div></td>
                  <td className="p-5 text-sm text-slate-300 max-w-[200px] truncate" title={r.noiDung}>{r.noiDung || '—'}</td>
                  <td className="p-5 font-bold text-white">{formatCurrency(r.chiPhi)}</td>
                  
                  <td className="p-5 text-center">
                    <span className={`inline-flex px-3 py-1 text-[10px] font-black uppercase rounded-full border ${
                      r.tinhTrang === 'Hoạt động' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
                    }`}>
                      {r.tinhTrang}
                    </span>
                  </td>

                  <td className="p-5 flex justify-center gap-3">
                    <button onClick={() => { setModalMode('view'); setFormData({...r, tinhTrangMay: r.tinhTrang}); setIsModalOpen(true); }} className="p-2 bg-gray-800 rounded-lg hover:bg-[#007BFF] text-white" title="Xem chi tiết"><Eye size={16}/></button>
                    <button onClick={() => { setModalMode('edit'); setFormData({...r, tinhTrangMay: r.tinhTrang}); setIsModalOpen(true); }} className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 text-white" title="Sửa"><Edit size={16}/></button>
                    <button onClick={() => handleDelete(r.maPhieuBT)} className="p-2 bg-gray-800 rounded-lg hover:bg-red-600 text-white" title="Xóa"><Trash2 size={16}/></button>
                  </td>
                </tr>
              ))}
              {filteredRecords.length === 0 && <tr><td colSpan="7" className="p-8 text-center text-slate-500">Không có dữ liệu phiếu bảo trì.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f172a] p-8 rounded-[24px] border border-gray-800 w-full max-w-lg relative shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X size={24}/></button>
            <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight">
              {modalMode === 'add' ? 'Lập Phiếu Bảo Trì' : modalMode === 'edit' ? 'Cập Nhật Phiếu' : 'Chi Tiết Phiếu'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {modalMode !== 'add' && (
                <div>
                  <label className="text-xs text-slate-400 font-bold uppercase block mb-1">Mã Phiếu</label>
                  <input type="text" disabled className="w-full bg-[#1e293b] border border-gray-700 text-slate-500 rounded-xl px-4 py-2.5 outline-none font-bold cursor-not-allowed" value={formData.maPhieuBT} />
                </div>
              )}

              <div>
                <label className="text-xs text-slate-400 font-bold uppercase block mb-1">Chọn Máy Tập <span className="text-red-500">*</span></label>
                <select required disabled={modalMode === 'view'} className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:border-[#007BFF] disabled:opacity-50" 
                  value={formData.maTB} onChange={(e) => setFormData({...formData, maTB: e.target.value})}>
                  {equipments.map(tb => (
                    <option key={tb.maTB} value={tb.maTB}>{tb.maTB} - {tb.tenTB} ({tb.tinhTrang})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 font-bold uppercase block mb-1">Ngày Sửa Chữa <span className="text-red-500">*</span></label>
                  <input type="date" required disabled={modalMode === 'view'}
                    className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:border-[#007BFF] disabled:opacity-50" 
                    value={formData.ngayBaoTri ? formData.ngayBaoTri.split('T')[0] : ''} onChange={(e)=>setFormData({...formData, ngayBaoTri: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-bold uppercase block mb-1">Chi phí (VNĐ)</label>
                  <input type="number" min="0" disabled={modalMode === 'view'}
                    className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:border-[#007BFF] disabled:opacity-50 font-bold text-green-400" 
                    value={formData.chiPhi} onChange={(e)=>setFormData({...formData, chiPhi: parseFloat(e.target.value) || 0})} />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-bold uppercase block mb-1">Nội dung sửa chữa</label>
                <textarea rows="3" disabled={modalMode === 'view'} placeholder="VD: Thay dây curoa máy chạy, tra dầu mỡ..."
                  className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:border-[#007BFF] disabled:opacity-50 resize-none" 
                  value={formData.noiDung} onChange={(e)=>setFormData({...formData, noiDung: e.target.value})} />
              </div>

              {/* CHỈ HIỆN KHI Ở CHẾ ĐỘ SỬA ĐỂ BÁO ĐÃ SỬA XONG MÁY */}
              {modalMode === 'edit' && (
                <div className="p-4 bg-[#1e293b] rounded-xl border border-[#007BFF]/30 mt-2">
                  <label className="text-xs text-[#007BFF] font-black uppercase block mb-2">Cập nhật trạng thái máy</label>
                  <select className="w-full bg-[#0f172a] border border-gray-700 text-white rounded-xl px-4 py-3 outline-none font-bold" 
                    value={formData.tinhTrangMay} onChange={(e) => setFormData({...formData, tinhTrangMay: e.target.value})}>
                    <option value="Đang bảo trì" className="text-red-500">Đang bảo trì (Chưa sửa xong)</option>
                    <option value="Hoạt động" className="text-green-500">Hoạt động (Đã sửa xong, đưa vào dùng)</option>
                  </select>
                </div>
              )}

              {modalMode === 'view' ? (
                <button type="button" onClick={() => setIsModalOpen(false)} className="w-full bg-gray-800 text-white py-4 rounded-xl hover:bg-gray-700 font-black mt-4">ĐÓNG</button>
              ) : (
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="w-1/3 text-white border border-gray-600 py-4 rounded-xl hover:bg-gray-800 font-medium">Hủy</button>
                  <button type="submit" className="w-2/3 bg-[#007BFF] text-white py-4 rounded-xl font-black hover:bg-blue-600 shadow-lg shadow-blue-500/30 uppercase tracking-wider">
                    Lưu Phiếu Bảo Trì
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BaoTri;