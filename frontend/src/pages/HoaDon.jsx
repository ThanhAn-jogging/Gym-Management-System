import React, { useState, useEffect } from 'react';
import { Search, ReceiptText, CalendarDays, CreditCard, Banknote, Printer, DollarSign, FileText, X, Ticket } from 'lucide-react';
import axios from 'axios';

const HoaDon = () => {
  const [invoices, setInvoices] = useState([]);
  const [members, setMembers] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('date-desc'); 

  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [printData, setPrintData] = useState(null);

  const fetchInvoices = async () => {
    try {
      const [hdRes, hvRes] = await Promise.all([
        axios.get('http://localhost:8080/api/hoadon'),
        axios.get('http://localhost:8080/api/hoivien')
      ]);

      const hoadonData = hdRes.data;
      const hoivienData = hvRes.data;
      
      const enrichedData = hoadonData.map(hd => {
        const hvInfo = hoivienData.find(hv => String(hv.maHV).trim() === String(hd.maHV).trim());
        return {
          ...hd,
          hoTen: hvInfo ? hvInfo.hoTen : 'Khách vãng lai'
        };
      });

      setInvoices(enrichedData);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
    }
  };

  useEffect(() => { fetchInvoices(); }, []);

  let processedInvoices = invoices.filter(inv => 
    (inv.maHD && inv.maHD.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (inv.hoTen && inv.hoTen.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (inv.maHV && inv.maHV.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  processedInvoices.sort((a, b) => {
    if (sortOption === 'price-asc') return (a.tongTien || 0) - (b.tongTien || 0);
    if (sortOption === 'price-desc') return (b.tongTien || 0) - (a.tongTien || 0);
    if (sortOption === 'date-asc') return new Date(a.ngayLap) - new Date(b.ngayLap);
    if (sortOption === 'date-desc') return new Date(b.ngayLap) - new Date(a.ngayLap);
    return 0;
  });

  const formatCurrency = (amount) => amount ? amount.toLocaleString('vi-VN') : '0';
  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const d = new Date(dateString);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  };

  const totalInvoicesCount = invoices.length;
  const totalRevenue = invoices
    .filter(inv => inv.trangThaiHD === 'Đã thanh toán')
    .reduce((sum, inv) => sum + (inv.tongTien || 0), 0);

  const handlePrintPreview = (invoice) => {
    setPrintData(invoice);
    setIsPrintModalOpen(true);
  };

  const handleStatusChange = async (maHD, newStatus) => {
    try {
      await axios.put(`http://localhost:8080/api/hoadon/${maHD}/status`, null, {
        params: { status: newStatus }
      });
      alert('Cập nhật trạng thái thành công!');
      fetchInvoices(); 
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error);
      alert('Cập nhật thất bại, vui lòng thử lại!');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-black text-white tracking-tight">Hóa đơn</h2>
        <p className="text-slate-400 font-medium">Lịch sử giao dịch & Chứng từ (Chỉ xem)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0f172a] border border-gray-800 p-6 rounded-[20px] relative overflow-hidden group">
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-slate-400 text-sm font-medium mb-2">Tổng doanh thu thực nhận</p>
              <h3 className="text-4xl font-black text-white mb-2">{formatCurrency(totalRevenue)} đ</h3>
              <p className="text-green-500 text-sm font-medium flex items-center gap-1">Dữ liệu thật từ Database</p>
            </div>
            <DollarSign className="text-[#007BFF]" size={28} />
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#007BFF]/5 rounded-full blur-xl group-hover:bg-[#007BFF]/10 transition-all"></div>
        </div>

        <div className="bg-[#0f172a] border border-gray-800 p-6 rounded-[20px] relative overflow-hidden group">
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-slate-400 text-sm font-medium mb-2">Tổng số hóa đơn đã lập</p>
              <h3 className="text-4xl font-black text-white mb-2">{totalInvoicesCount}</h3>
              <p className="text-slate-500 text-sm font-medium">Toàn thời gian</p>
            </div>
            <FileText className="text-[#007BFF]" size={28} />
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#007BFF]/5 rounded-full blur-xl group-hover:bg-[#007BFF]/10 transition-all"></div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-between items-center bg-[#0f172a] p-4 rounded-2xl border border-gray-800">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3 text-slate-500" size={18} />
          <input type="text" placeholder="Tìm theo mã HĐ, mã Hội viên, Tên..." value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#1e293b] border border-gray-700 rounded-xl text-white outline-none focus:border-[#007BFF] transition-all" />
        </div>
        
        <div className="flex gap-3 items-center">
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}
            className="bg-[#1e293b] border border-gray-700 text-white px-4 py-2 rounded-xl outline-none focus:border-[#007BFF] cursor-pointer">
            <option value="date-desc">Ngày lập: Mới nhất</option>
            <option value="date-asc">Ngày lập: Cũ nhất</option>
            <option value="price-desc">Tổng tiền: Cao nhất</option>
            <option value="price-asc">Tổng tiền: Thấp nhất</option>
          </select>
        </div>
      </div>

      <div className="bg-[#0f172a] border border-gray-800 rounded-[20px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-xs font-bold text-slate-400 uppercase tracking-wider bg-gray-800/20">
                <th className="p-5">Mã HĐ</th>
                <th className="p-5">Hội viên</th>
                <th className="p-5">Nhân viên</th>
                <th className="p-5">Gói tập</th>
                <th className="p-5">Voucher</th>
                <th className="p-5">Ngày lập</th>
                <th className="p-5">Tổng tiền</th>
                <th className="p-5">Phương thức</th>
                <th className="p-5 text-center">Trạng thái</th>
                <th className="p-5 text-center">In HĐ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {processedInvoices.length > 0 ? (
                processedInvoices.map((inv) => (
                  <tr key={inv.maHD} className="hover:bg-gray-800/30 transition-colors">
                    <td className="p-5">
                      <div className="flex items-center gap-2 text-slate-300 font-medium bg-gray-800/50 w-fit px-2 py-1 rounded-md">
                        <ReceiptText size={16} className="text-[#007BFF]" /> {inv.maHD}
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="font-bold text-white mb-0.5">{inv.hoTen}</div>
                      <div className="text-xs text-slate-500 font-medium">{inv.maHV}</div>
                    </td>
                    <td className="p-5">
                      <div className="text-slate-300 text-sm font-medium">{inv.maNV}</div>
                    </td>
                    <td className="p-5">
                      <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-1 rounded text-xs font-bold font-mono">
                        {inv.maGoi || 'N/A'}
                      </span>
                    </td>
                    <td className="p-5">
                      {inv.maVoucher ? (
                        <span className="flex items-center gap-1 text-orange-400 text-sm font-bold bg-orange-500/10 px-2 py-1 rounded-md w-fit">
                          <Ticket size={14} /> {inv.maVoucher}
                        </span>
                      ) : (
                        <span className="text-slate-600 text-sm">—</span>
                      )}
                    </td>
                    <td className="p-5 text-slate-400">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={14} className="text-slate-500" />
                        {formatDate(inv.ngayLap)}
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="font-bold text-white text-base">{formatCurrency(inv.tongTien)} đ</div>
                    </td>
                    <td className="p-5 text-slate-300 text-sm">
                      <div className="flex items-center gap-2">
                        {inv.phuongThucTT === 'Chuyển khoản' ? <CreditCard size={16} className="text-[#007BFF]" /> : <Banknote size={16} className="text-green-500" />}
                        {inv.phuongThucTT}
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <select
                        value={inv.trangThaiHD}
                        onChange={(e) => handleStatusChange(inv.maHD, e.target.value)}
                        className={`outline-none cursor-pointer px-3 py-1.5 text-xs font-bold rounded-full border text-center text-center-last appearance-none ${
                          inv.trangThaiHD === 'Đã thanh toán' 
                            ? 'bg-blue-500/10 text-[#007BFF] border-blue-500/30' 
                            : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30'
                        }`}
                      >
                        <option value="Chưa thanh toán" className="bg-[#1e293b] text-yellow-500 font-bold">Chưa thanh toán</option>
                        <option value="Đã thanh toán" className="bg-[#1e293b] text-[#007BFF] font-bold">Đã thanh toán</option>
                      </select>
                    </td>
                    <td className="p-5 flex justify-center">
                      <button onClick={() => handlePrintPreview(inv)} className="p-2 bg-gray-800 rounded-lg hover:bg-[#007BFF] hover:text-white transition-colors" title="In hóa đơn">
                        <Printer size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="10" className="p-8 text-center text-slate-500">Không tìm thấy hóa đơn nào.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ----------------- MODAL IN HÓA ĐƠN (PREVIEW) ----------------- */}
      {isPrintModalOpen && printData && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white text-black p-8 rounded-lg w-full max-w-sm relative font-mono text-sm shadow-2xl">
            <button onClick={() => setIsPrintModalOpen(false)} className="absolute -top-12 right-0 text-white hover:text-red-400"><X size={32}/></button>
            
            <div className="text-center mb-6 border-b-2 border-dashed border-gray-300 pb-4">
              <h2 className="text-2xl font-black mb-1">GYM FITNESS</h2>
              <p className="text-xs text-gray-500">Khu B - Ký Túc Xá ĐHQG TPHCM</p>
              <p className="text-xs text-gray-500">Hotline: 1900 1234</p>
            </div>

            <h3 className="text-center font-bold text-lg mb-4">PHIẾU THU TIỀN</h3>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between"><span className="text-gray-500">Mã HĐ:</span> <b>{printData.maHD}</b></div>
              <div className="flex justify-between"><span className="text-gray-500">Ngày lập:</span> <b>{formatDate(printData.ngayLap)}</b></div>
              <div className="flex justify-between"><span className="text-gray-500">Hội viên:</span> <b>{printData.hoTen}</b></div>
              <div className="flex justify-between"><span className="text-gray-500">Nhân viên:</span> <b>{printData.maNV}</b></div>
              <div className="flex justify-between"><span className="text-gray-500">Gói tập:</span> <b>{printData.maGoi || 'N/A'}</b></div>
            </div>

            <div className="border-t-2 border-b-2 border-dashed border-gray-300 py-4 mb-6">
              {printData.maVoucher && (
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Voucher áp dụng:</span>
                  <span className="font-bold text-orange-500">{printData.maVoucher}</span>
                </div>
              )}
              <div className="flex justify-between items-end mt-2">
                <span className="font-bold text-gray-700">TỔNG CỘNG:</span>
                <span className="text-2xl font-black">{formatCurrency(printData.tongTien)} đ</span>
              </div>
              <div className="flex justify-between mt-2 text-xs">
                <span className="text-gray-500">Phương thức:</span>
                <span className="font-bold">{printData.phuongThucTT}</span>
              </div>
              <div className="flex justify-between mt-1 text-xs">
                <span className="text-gray-500">Trạng thái:</span>
                <span className="font-bold">{printData.trangThaiHD}</span>
              </div>
            </div>

            <div className="text-center text-xs text-gray-500 italic">
              <p>Cảm ơn quý khách đã sử dụng dịch vụ!</p>
              <p>Hóa đơn chỉ có giá trị xuất trong ngày.</p>
            </div>

            <button onClick={() => { alert('Đang kết nối máy in...'); setIsPrintModalOpen(false); }} className="w-full bg-black text-white font-bold py-3 mt-6 rounded-lg hover:bg-gray-800">
              XÁC NHẬN IN
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default HoaDon;