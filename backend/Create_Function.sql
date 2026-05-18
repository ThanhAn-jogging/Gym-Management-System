--------------------------------------------------------
-- TỔNG HỢP CÁC FUNCTION (HÀM TÍNH TOÁN & TRUY VẤN)
-- Lưu ý: Chạy lệnh tạo TYPE trước khi tạo FUNCTION
--------------------------------------------------------

--------------------------------------------------------
-- 1. NHÓM HÀM TÍNH TOÁN NGHIỆP VỤ CƠ BẢN (SCALAR FUNCTIONS)
--------------------------------------------------------

-- 1.1 Hàm kiểm tra trạng thái thẻ tập của Hội viên
CREATE OR REPLACE FUNCTION F_KIEM_TRA_TRANG_THAI_THE (
    p_MaHV IN VARCHAR2
) RETURN NVARCHAR2 AS
    v_MaDK VARCHAR2(10);
    v_NgayKetThuc DATE;
    v_TrangThaiGoc NVARCHAR2(50);
    v_CountBaoLuu NUMBER := 0;
BEGIN
    -- Lấy thông tin lượt đăng ký gói tập gần nhất của hội viên
    SELECT MaDK, NgayKetThuc, TrangThai 
    INTO v_MaDK, v_NgayKetThuc, v_TrangThaiGoc
    FROM DANGKY_GOITAP 
    WHERE MaHV = p_MaHV AND ROWNUM = 1
    ORDER BY NgayBatDau DESC;

    -- Kiểm tra chốt chặn điều kiện hết hạn thời gian
    IF TRUNC(SYSDATE) > TRUNC(v_NgayKetThuc) OR v_TrangThaiGoc = N'Hết hạn' THEN
        RETURN N'Hết hạn';
    END IF;

    -- Kiểm tra rà soát thời gian đóng băng bảo lưu gói dịch vụ
    SELECT COUNT(*) INTO v_CountBaoLuu 
    FROM BAOLUU 
    WHERE MaDK = v_MaDK 
      AND TRUNC(SYSDATE) >= TRUNC(NgayBatDauNghi) 
      AND TRUNC(SYSDATE) <= TRUNC(NgayKetThucNghi);

    -- Phân định chuỗi trạng thái nghiệp vụ trả về
    IF v_CountBaoLuu > 0 THEN
        RETURN N'Đang bảo lưu';
    ELSE
        RETURN N'Đang hoạt động';
    END IF;

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN N'Chưa mua gói';
END;
/

-- 1.2 Hàm tính tổng chi phí bảo trì lũy kế của một máy
CREATE OR REPLACE FUNCTION F_TINH_CHI_PHI_BAO_TRI_MAY (
    p_MaTB IN VARCHAR2
) RETURN NUMBER AS
    v_TongChiPhi NUMBER := 0;
    v_CheckTonTai NUMBER := 0;
BEGIN
    -- Kiểm tra sự tồn tại thực tế của máy móc thiết bị trong kho
    SELECT COUNT(*) INTO v_CheckTonTai FROM THIETBI WHERE MaTB = p_MaTB;
    IF v_CheckTonTai = 0 THEN
        RETURN 0;
    END IF;

    -- Thực hiện tính toán gom tổng chi phí tài chính sửa chữa lũy kế
    SELECT NVL(SUM(ChiPhi), 0) INTO v_TongChiPhi 
    FROM BAOTRI 
    WHERE MaTB = p_MaTB;

    -- Trả về kết quả tổng tiền chi phí bảo dưỡng kỹ thuật
    RETURN v_TongChiPhi;
END;
/

-- 1.3 Hàm tính toán số tiền thực thu sau khi áp dụng Voucher
CREATE OR REPLACE FUNCTION F_TINH_TIEN_SAU_GIAM_GIA (
    p_MaGoi IN VARCHAR2,
    p_MaVoucher IN VARCHAR2 DEFAULT NULL
) RETURN NUMBER AS
    v_DonGia NUMBER := 0;
    v_PhanTramGiam NUMBER := 0;
    v_ThanhTien NUMBER := 0;
BEGIN
    -- Truy vấn đơn giá gốc của gói tập
    SELECT NVL(DonGia, 0) INTO v_DonGia FROM GOITAP WHERE MaGoi = p_MaGoi;

    -- Xác định tỷ lệ giảm giá chiết khấu của chiến dịch Voucher
    IF p_MaVoucher IS NOT NULL THEN
        BEGIN
            SELECT NVL(PhanTramGiam, 0) INTO v_PhanTramGiam 
            FROM VOUCHER 
            WHERE MaVoucher = p_MaVoucher;
        EXCEPTION
            WHEN NO_DATA_FOUND THEN v_PhanTramGiam := 0;
        END;
    END IF;

    -- Thực thi công thức tính toán tiền tệ sau ưu đãi
    v_ThanhTien := v_DonGia * (1 - (v_PhanTramGiam / 100));
    
    -- Trả về kết quả số tiền thực thu
    RETURN v_ThanhTien;
END;
/

--------------------------------------------------------
-- 2. NHÓM HÀM ĐƯỜNG ỐNG (PIPELINED FUNCTIONS) PHỤC VỤ DASHBOARD
--------------------------------------------------------

-- 2.1 Hàm Pipelined lấy thống kê tổng quan động theo thời gian
-- Tạo kiểu dữ liệu (Object và Table) trước
CREATE OR REPLACE TYPE TYPE_STAT_ROW AS OBJECT (
    TONG_HOI_VIEN NUMBER,
    CHECKIN_HOM_NAY NUMBER,
    DOANH_THU_THANG NUMBER
);
/
CREATE OR REPLACE TYPE TYPE_STAT_TABLE AS TABLE OF TYPE_STAT_ROW;
/

-- Khởi tạo Function Pipelined
CREATE OR REPLACE FUNCTION FN_GET_DASHBOARD_STATS(p_TimeFilter IN VARCHAR2)
RETURN TYPE_STAT_TABLE PIPELINED
IS
    v_tong_hv NUMBER;
    v_checkin NUMBER;
    v_doanh_thu NUMBER;
BEGIN
    -- Số check-in luôn là của ngày hôm nay
    SELECT COUNT(*) INTO v_checkin FROM CHECKIN WHERE TRUNC(THOIGIANVAO) = TRUNC(SYSDATE);
    
    -- Xử lý rẽ nhánh logic thống kê tùy theo tham số truyền vào
    IF p_TimeFilter = 'MONTH' THEN
        SELECT COUNT(*) INTO v_tong_hv FROM HOIVIEN WHERE TO_CHAR(NGAYDANGKY, 'MM/YYYY') = TO_CHAR(SYSDATE, 'MM/YYYY');
        SELECT NVL(SUM(TONGTIEN), 0) INTO v_doanh_thu FROM HOADON WHERE TO_CHAR(NGAYLAP, 'MM/YYYY') = TO_CHAR(SYSDATE, 'MM/YYYY');
    ELSIF p_TimeFilter = 'YEAR' THEN
        SELECT COUNT(*) INTO v_tong_hv FROM HOIVIEN WHERE TO_CHAR(NGAYDANGKY, 'YYYY') = TO_CHAR(SYSDATE, 'YYYY');
        SELECT NVL(SUM(TONGTIEN), 0) INTO v_doanh_thu FROM HOADON WHERE TO_CHAR(NGAYLAP, 'YYYY') = TO_CHAR(SYSDATE, 'YYYY');
    ELSE
        SELECT COUNT(*) INTO v_tong_hv FROM HOIVIEN;
        SELECT NVL(SUM(TONGTIEN), 0) INTO v_doanh_thu FROM HOADON;
    END IF;
    
    PIPE ROW(TYPE_STAT_ROW(v_tong_hv, v_checkin, v_doanh_thu));
    RETURN;
END;
/

-- 2.2 Hàm Pipelined lấy báo cáo doanh thu gom cụm (ROLLUP) động
-- Tạo kiểu dữ liệu (Object và Table) trước
CREATE OR REPLACE TYPE TYPE_REVENUE_ROW AS OBJECT (
    TEN_GOI NVARCHAR2(100),
    SO_LUOT NUMBER,
    TONG_DOANH_THU NUMBER
);
/
CREATE OR REPLACE TYPE TYPE_REVENUE_TABLE AS TABLE OF TYPE_REVENUE_ROW;
/

-- Khởi tạo Function Pipelined
CREATE OR REPLACE FUNCTION FN_GET_REVENUE_REPORT(p_TimeFilter IN VARCHAR2)
RETURN TYPE_REVENUE_TABLE PIPELINED
IS
BEGIN
    FOR rec IN (
        SELECT NVL(gt.TENGOI, 'TỔNG CỘNG (GRAND TOTAL)') AS TEN_GOI,
               COUNT(dk.MADK) AS SO_LUOT,
               SUM(hd.TONGTIEN) AS TONG_DOANH_THU
        FROM HOADON hd
        JOIN DANGKY_GOITAP dk ON hd.MAHD = dk.MAHD
        JOIN GOITAP gt ON dk.MAGOI = gt.MAGOI
        -- LOGIC LỌC ĐỘNG NẰM HOÀN TOÀN TẠI ĐÂY
        WHERE (p_TimeFilter = 'ALL')
           OR (p_TimeFilter = 'MONTH' AND TO_CHAR(hd.NGAYLAP, 'MM/YYYY') = TO_CHAR(SYSDATE, 'MM/YYYY'))
           OR (p_TimeFilter = 'YEAR' AND TO_CHAR(hd.NGAYLAP, 'YYYY') = TO_CHAR(SYSDATE, 'YYYY'))
        GROUP BY ROLLUP(gt.TENGOI)
    ) LOOP
        -- Đẩy từng dòng kết quả ra ngoài
        PIPE ROW(TYPE_REVENUE_ROW(rec.TEN_GOI, rec.SO_LUOT, rec.TONG_DOANH_THU));
    END LOOP;
    RETURN;
END;
/