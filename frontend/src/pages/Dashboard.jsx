import React, { useState, useEffect } from 'react';
import { Users, CalendarCheck, TrendingUp, DollarSign, UserPlus, CheckCircle, CreditCard, ShieldAlert, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const StatCard = ({ icon: Icon, title, value, trend, color }) => (
  <div className="bg-[#0f172a] p-6 rounded-[20px] border border-gray-800 transition-all hover:border-blue-500/50">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-blue-500/10 ${color}`}><Icon size={24} /></div>
      <span className="text-green-500 text-sm font-bold">{trend}</span>
    </div>
    <p className="text-slate-400 text-sm font-medium">{title}</p>
    <h3 className="text-3xl font-black mt-1 text-white">{value}</h3>
  </div>
);

const ActivityItem = ({ icon: Icon, title, desc, time, color }) => (
  <div className="flex gap-4 items-start py-4 border-b border-gray-800 last:border-0">
    <div className={`p-2 rounded-lg bg-gray-800/50 ${color}`}><Icon size={18} /></div>
    <div className="flex-1">
      <h4 className="text-sm font-bold text-slate-200">{title}</h4>
      <p className="text-xs text-slate-400">{desc}</p>
      <span className="text-[10px] text-[#007BFF] font-medium">{time}</span>
    </div>
  </div>
);

const Dashboard = () => {
  const [data, setData] = useState({ 
    stats: {}, activities: [], chart: [], revenueChart: [], expiringMembers: [], packageDistribution: [], revenueReport: []
  });

  const [timeFilter, setTimeFilter] = useState('ALL');
  const [chartMode, setChartMode] = useState('members');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/dashboard/summary?timeFilter=${timeFilter}`);
        setData({
          stats: { 
            total: res.data.tongHoiVien, 
            checkin: res.data.checkInHomNay, 
            rev: res.data.doanhThuThang, 
            growth: res.data.tangTruong 
          },
          activities: res.data.activities || [],
          chart: res.data.chartData || [],
          revenueChart: res.data.revenueChartData || [],
          expiringMembers: res.data.expiringMembers || [],
          packageDistribution: res.data.packageDistribution || [],
          
          revenueReport: res.data.revenueReport || []
        });
      } catch (e) { console.error(e); }
    };
    load();
  }, [timeFilter]);

  const formatMoney = (n) => n >= 1000000 ? (n/1000000).toFixed(1) + 'M' : n >= 1000 ? (n/1000).toFixed(1) + 'K' : n;

  const totalPackageOrders = data.packageDistribution.reduce((sum, item) => sum + (item.value || 0), 0) || 1;

  return (
    <div className="space-y-8 p-2 font-sans pb-10">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-black text-white">Dashboard</h2>
        <p className="text-slate-400">Dữ liệu đồng bộ hoàn toàn từ Oracle Database Views</p>
      </div>

    {/* THANH CÔNG CỤ TƯƠNG TÁC */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Tổng quan hệ thống</h2>
        <select 
          value={timeFilter} 
          onChange={(e) => setTimeFilter(e.target.value)}
          className="bg-[#1e293b] text-white border border-gray-700 rounded-lg px-4 py-2 font-medium focus:outline-none focus:border-blue-500 transition-colors"
        >
          <option value="ALL">🗓️ Toàn thời gian</option>
          <option value="YEAR">📅 Trong năm nay</option>
          <option value="MONTH">📅 Trong tháng này</option>
        </select>
      </div>

      {/* CARD SỐ LIỆU TỪ VIEW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Users} title="Tổng hội viên" value={data.stats.total || 0} trend={data.stats.growth} color="text-blue-500" />
        <StatCard icon={CalendarCheck} title="Check-in hôm nay" value={data.stats.checkin || 0} trend="Live" color="text-green-500" />
        <StatCard icon={DollarSign} title="Doanh thu tháng" value={formatMoney(data.stats.rev || 0)} trend="Tháng này" color="text-yellow-500" />
        <StatCard icon={TrendingUp} title="Tăng trưởng" value={data.stats.growth} trend="Tháng này" color="text-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* VÙNG CHÍNH BÊN TRÁI: CHỨA BIỂU ĐỒ ĐƯỜNG VÀ KHUNG TỶ LỆ GÓI TẬP */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* KHUNG BIỂU ĐỒ 6 THÁNG */}
          <div className="bg-[#0f172a] p-6 rounded-[20px] border border-gray-800">
            <h3 className="text-lg font-bold mb-6 text-white text-center">Tăng trưởng hội viên (6 Tháng)</h3>
            <h3 className="text-base font-bold mb-4 text-white">Xu hướng & Tăng trưởng</h3>
            
            {/* MỚI THÊM: NÚT CHUYỂN ĐỔI BIỂU ĐỒ */}
            <div className="flex gap-2 mb-6 bg-gray-800/50 w-fit p-1 rounded-lg">
              <button 
                onClick={() => setChartMode('members')}
                className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${chartMode === 'members' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                👥 Hội viên mới
              </button>
              <button 
                onClick={() => setChartMode('revenue')}
                className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${chartMode === 'revenue' ? 'bg-green-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                💰 Doanh thu
              </button>
            </div>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartMode === 'members' ? data.chart : data.revenueChart}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  
                  {/* CẬP NHẬT TOOLTIP ĐỂ HIỂN THỊ ĐÚNG ĐƠN VỊ KHI RÊ CHUỘT */}
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', color: '#fff' }} 
                    formatter={(value) => [
                      chartMode === 'members' ? `${value} người` : `${formatMoney(value)} đ`, 
                      chartMode === 'members' ? 'Hội viên mới' : 'Doanh thu'
                    ]}
                  />
                  
                  {/* CẬP NHẬT MÀU SẮC ĐƯỜNG LINE DỰA THEO NÚT ĐANG BẤM */}
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={chartMode === 'members' ? "#3b82f6" : "#22c55e"} 
                    strokeWidth={4} 
                    dot={{ fill: chartMode === 'members' ? "#3b82f6" : "#22c55e", r: 6, strokeWidth: 2 }} 
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#0f172a] p-6 rounded-[20px] border border-gray-800">
            <h3 className="text-base font-bold mb-5 flex items-center gap-2 text-white">
              <DollarSign size={18} className="text-green-500" /> Báo Cáo Doanh Thu (Grouping & Totals)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-700 text-slate-400 text-sm">
                    <th className="p-3 font-bold uppercase tracking-wider">Phân Khúc Gói Tập</th>
                    <th className="p-3 text-center font-bold uppercase tracking-wider">Lượt Mua</th>
                    <th className="p-3 text-right font-bold uppercase tracking-wider">Tổng Doanh Thu</th>
                  </tr>
                </thead>
                <tbody>
                  {data.revenueReport?.map((row, index) => {
                    const isGrandTotal = row.tenGoi === 'TỔNG CỘNG (GRAND TOTAL)';
                    return (
                      <tr key={index} className={`border-b border-gray-800/50 transition-colors ${
                        isGrandTotal ? 'bg-[#007BFF]/10 border-[#007BFF]/30' : 'hover:bg-gray-800/30'
                      }`}>
                        <td className={`p-3 ${isGrandTotal ? 'text-orange-400 font-black' : 'text-slate-300 font-bold'}`}>
                          {row.tenGoi}
                        </td>
                        <td className={`p-3 text-center ${isGrandTotal ? 'text-orange-400 font-black' : 'text-slate-400'}`}>
                          {row.soLuot}
                        </td>
                        <td className={`p-3 text-right ${isGrandTotal ? 'text-green-400 font-black text-lg' : 'text-white font-mono'}`}>
                          {formatMoney(row.tongDoanhThu || 0)} {isGrandTotal ? 'VNĐ' : 'đ'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-4 italic text-right">* Báo cáo được tự động gom nhóm và tính tổng bằng lệnh ROLLUP từ Oracle.</p>
          </div>

          {/* KHUNG TỶ LỆ CHỌN GÓI TẬP (MỚI THÊM THEO YÊU CẦU 1.3.1.5 - STT 4) */}
          <div className="bg-[#0f172a] p-6 rounded-[20px] border border-gray-800">
            <h3 className="text-base font-bold mb-5 flex items-center gap-2 text-white">
              <BarChart3 size={18} className="text-[#007BFF]" /> Tỷ Lệ Chọn Gói Tập (Thị hiếu thị trường)
            </h3>
            <div className="space-y-4">
              {data.packageDistribution.length > 0 ? (
                data.packageDistribution.map((item, index) => {
                  const percentage = Math.round((item.value / totalPackageOrders) * 100);
                  return (
                    <div key={index} className="space-y-1.5">
                      <div className="flex justify-between text-sm font-semibold">
                        <span className="text-slate-300">{item.name}</span>
                        <span className="text-white font-mono">{item.value} lượt ({percentage}%)</span>
                      </div>
                      <div className="w-full h-3 bg-[#1e293b] rounded-full overflow-hidden border border-gray-800">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${
                            index === 0 ? 'bg-[#007BFF]' : index === 1 ? 'bg-emerald-500' : 'bg-amber-500'
                          }`} 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-slate-500 text-center py-4">Chưa ghi nhận số liệu mua gói tập.</p>
              )}
            </div>
          </div>

        </div>

        {/* CỘT BÊN PHẢI CHỨA CÁC KHUNG THÔNG TIN PHỤ */}
        <div className="space-y-8">
          
          {/* KHUNG NHẮC GIA HẠN */}
          <div className="bg-[#0f172a] p-6 rounded-[20px] border border-gray-800">
            <h3 className="text-base font-bold mb-4 flex items-center gap-2 text-white">
              <ShieldAlert size={18} className="text-yellow-500" /> Sắp hết hạn (5 ngày)
            </h3>
            <div className="space-y-3 max-h-[200px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-800">
              {data.expiringMembers.length > 0 ? (
                data.expiringMembers.map((mem, i) => (
                  <div key={i} className="bg-[#1e293b] p-3 rounded-xl border border-gray-800">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-bold text-white">{mem.hoTen}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${mem.soNgayConLai === 0 ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'}`}>
                        {mem.soNgayConLai === 0 ? 'Hết hạn hôm nay' : `Còn ${mem.soNgayConLai} ngày`}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">SĐT: {mem.sdt}</p>
                    <p className="text-xs text-blue-400 font-medium mt-1">Gói: {mem.tenGoi}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 text-center py-4">Chưa có hội viên sắp hết hạn.</p>
              )}
            </div>
          </div>

          {/* KHUNG HOẠT ĐỘNG GẦN ĐÂY */}
          <div className="bg-[#0f172a] p-6 rounded-[20px] border border-gray-800">
            <h3 className="text-base font-bold mb-4 text-white">Hoạt động từ Oracle</h3>
            <div className="flex flex-col">
              {data.activities.map((act, i) => (
                <ActivityItem 
                  key={i} title={act.tieuDe} desc={act.moTa} time={act.thoiGian} color={act.mau}
                  icon={act.tieuDe?.includes('Thanh') ? CreditCard : (act.tieuDe?.includes('Check') ? CheckCircle : UserPlus)}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;