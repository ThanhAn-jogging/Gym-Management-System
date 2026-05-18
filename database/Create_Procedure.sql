--------------------------------------------------------
-- TỔNG HỢP CÁC STORED PROCEDURE XỬ LÝ NGHIỆP VỤ
--------------------------------------------------------

--------------------------------------------------------
-- 1. MODULE QUẢN LÝ HỘI VIÊN
--------------------------------------------------------

-- 1.1 Thêm Hội Viên
CREATE OR REPLACE PROCEDURE SP_THEM_HOIVIEN (
    p_MaHV IN VARCHAR2,
    p_HoTen IN NVARCHAR2,
    p_GioiTinh IN NVARCHAR2,
    p_NgaySinh IN DATE,
    p_Sdt IN VARCHAR2,
    p_DiaChi IN NVARCHAR2,
    p_Email IN VARCHAR2,
    p_TinhTrangSK IN NVARCHAR2
)
AS
BEGIN
    INSERT INTO HOIVIEN (
        MaHV, HoTen, GioiTinh, NgaySinh, SDT, 
        DiaChi, Email, TinhTrangSK, NgayDangKy, HangTV, TongChiTieu
    )
    VALUES (
        p_MaHV, p_HoTen, p_GioiTinh, p_NgaySinh, p_Sdt, 
        p_DiaChi, p_Email, p_TinhTrangSK, SYSDATE, 'Silver', 0
    );
    
    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE_APPLICATION_ERROR(-20018, 'Lỗi thêm hồ sơ hội viên: ' || SQLERRM);
END;
/

-- 1.2 Cập nhật Hội Viên
CREATE OR REPLACE PROCEDURE SP_CAPNHAT_HOIVIEN (
    p_MaHV IN VARCHAR2,
    p_HoTen IN NVARCHAR2,
    p_GioiTinh IN NVARCHAR2,
    p_Sdt IN VARCHAR2,
    p_DiaChi IN NVARCHAR2,
    p_Email IN VARCHAR2,
    p_TinhTrangSK IN NVARCHAR2
) AS
BEGIN
    UPDATE HOIVIEN 
    SET HOTEN = p_HoTen, 
        GIOITINH = p_GioiTinh,
        SDT = p_Sdt, 
        DIACHI = p_DiaChi,
        EMAIL = p_Email, 
        TINHTRANGSK = p_TinhTrangSK
    WHERE MAHV = p_MaHV;
    
    COMMIT;
END;
/

-- 1.3 Xóa Hội Viên
CREATE OR REPLACE PROCEDURE SP_XOA_HOIVIEN (
    p_MaHV IN VARCHAR2
) AS
BEGIN
    DELETE FROM HOIVIEN WHERE MAHV = p_MaHV;
    COMMIT;
END;
/

--------------------------------------------------------
-- 2. MODULE QUẢN LÝ NHÂN VIÊN
--------------------------------------------------------

-- 2.1 Thêm Nhân Viên
CREATE OR REPLACE PROCEDURE SP_THEM_NHANVIEN (
    p_HoTen IN NVARCHAR2,
    p_ChucVu IN NVARCHAR2,
    p_Sdt IN VARCHAR2,
    p_LuongCB IN NUMBER,
    p_NgayVaoLam IN DATE
) AS
    v_NewMaNV VARCHAR2(10);
BEGIN
    -- Tự sinh mã theo format NV + số thứ tự (ví dụ: NV001, NV002)
    v_NewMaNV := 'NV' || LPAD(SEQ_NHANVIEN.NEXTVAL, 3, '0');

    INSERT INTO NHANVIEN (MANV, HOTEN, CHUCVU, SDT, LUONGCB, NGAYVAOLAM)
    VALUES (v_NewMaNV, p_HoTen, p_ChucVu, p_Sdt, p_LuongCB, p_NgayVaoLam);
    
    COMMIT;
END;
/

-- 2.2 Cập nhật Nhân Viên
CREATE OR REPLACE PROCEDURE SP_CAPNHAT_NHANVIEN (
    p_MaNV IN VARCHAR2,
    p_HoTen IN NVARCHAR2,
    p_ChucVu IN NVARCHAR2,
    p_Sdt IN VARCHAR2,
    p_LuongCB IN NUMBER,
    p_NgayVaoLam IN DATE
) AS
BEGIN
    UPDATE NHANVIEN 
    SET HOTEN = p_HoTen, 
        CHUCVU = p_ChucVu, 
        SDT = p_Sdt, 
        LUONGCB = p_LuongCB, 
        NGAYVAOLAM = p_NgayVaoLam
    WHERE MANV = p_MaNV;
    
    COMMIT;
END;
/

-- 2.3 Xóa Nhân Viên
CREATE OR REPLACE PROCEDURE SP_XOA_NHANVIEN (
    p_MaNV IN VARCHAR2
) AS
BEGIN
    DELETE FROM NHANVIEN WHERE MANV = p_MaNV;
    COMMIT;
END;
/

--------------------------------------------------------
-- 3. MODULE QUẢN LÝ HUẤN LUYỆN VIÊN (PT)
--------------------------------------------------------

-- 3.1 Thêm Huấn Luyện Viên
CREATE OR REPLACE PROCEDURE SP_THEM_HLV (
    p_MaPT IN VARCHAR2,
    p_MaNV IN VARCHAR2,
    p_ChuyenMon IN NVARCHAR2,
    p_BangCap IN NVARCHAR2,
    p_KinhNghiem IN NUMBER,
    p_Rating IN NUMBER
    -- Đã xóa p_SoHocVien
) AS
    v_ChucVu NVARCHAR2(100);
BEGIN
    SELECT CHUCVU INTO v_ChucVu 
    FROM NHANVIEN 
    WHERE MANV = p_MaNV;

    IF v_ChucVu <> N'Huấn luyện viên' THEN
        RAISE_APPLICATION_ERROR(-20001, N'Lỗi: Nhân viên này không có chức vụ là Huấn luyện viên!');
    END IF;

    -- Đã xóa SoHocVien khỏi câu lệnh Insert
    INSERT INTO HUANLUYENVIEN (MAPT, MANV_LIENKET, CHUYENMON, BANGCAP, KINHNGHIEM, RATING)
    VALUES (p_MaPT, p_MaNV, p_ChuyenMon, p_BangCap, p_KinhNghiem, p_Rating);
    
    COMMIT;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20002, N'Lỗi: Không tìm thấy mã nhân viên này trong hệ thống!');
END;
/

-- 3.2 Cập nhật Huấn Luyện Viên
CREATE OR REPLACE PROCEDURE SP_CAPNHAT_HLV (
    p_MaPT IN VARCHAR2,
    p_MaNV IN VARCHAR2,
    p_ChuyenMon IN NVARCHAR2,
    p_BangCap IN NVARCHAR2,
    p_KinhNghiem IN NUMBER,
    p_Rating IN NUMBER
    -- Đã xóa p_SoHocVien
) AS
BEGIN
    UPDATE HUANLUYENVIEN
    SET MANV_LIENKET = p_MaNV,
        CHUYENMON = p_ChuyenMon,
        BANGCAP = p_BangCap,
        KINHNGHIEM = p_KinhNghiem,
        RATING = p_Rating
    WHERE MAPT = p_MaPT;
    COMMIT;
END;
/

-- 3.3 Xóa Huấn Luyện Viên
CREATE OR REPLACE PROCEDURE SP_XOA_HLV (
    p_MaPT IN VARCHAR2
) AS
BEGIN
    DELETE FROM HUANLUYENVIEN WHERE MAPT = p_MaPT;
    COMMIT;
END;
/

--------------------------------------------------------
-- 4. MODULE QUẢN LÝ TÀI KHOẢN HỆ THỐNG
--------------------------------------------------------

-- 4.1 Thêm Tài Khoản
CREATE OR REPLACE PROCEDURE SP_THEM_TAIKHOAN (
    p_TenDN IN VARCHAR2,
    p_MatKhau IN VARCHAR2,
    p_QuyenTruyCap IN NVARCHAR2,
    p_MaNV IN VARCHAR2,
    p_MaPT IN VARCHAR2,
    p_TrangThai IN NVARCHAR2
) AS
BEGIN
    IF p_QuyenTruyCap = N'Huấn luyện viên' AND p_MaPT IS NULL THEN
        RAISE_APPLICATION_ERROR(-20002, N'Lỗi: Tài khoản PT bắt buộc phải có Mã PT liên kết!');
    END IF;

    IF p_QuyenTruyCap IN (N'Quản lý', N'Lễ tân') AND p_MaNV IS NULL THEN
        RAISE_APPLICATION_ERROR(-20003, N'Lỗi: Tài khoản này bắt buộc phải có Mã Nhân Viên liên kết!');
    END IF;

    INSERT INTO TAIKHOAN (TENDN, MATKHAU, QUYENTRUYCAP, MANV, MAPT, TRANGTHAI)
    VALUES (p_TenDN, p_MatKhau, p_QuyenTruyCap, p_MaNV, p_MaPT, p_TrangThai);
    
    COMMIT;
END;
/

-- 4.2 Cập nhật Tài Khoản
CREATE OR REPLACE PROCEDURE SP_CAPNHAT_TAIKHOAN (
    p_TenDN IN VARCHAR2,
    p_MatKhau IN VARCHAR2,
    p_QuyenTruyCap IN NVARCHAR2,
    p_MaNV IN VARCHAR2,
    p_MaPT IN VARCHAR2,
    p_TrangThai IN NVARCHAR2
) AS
BEGIN
    UPDATE TAIKHOAN
    SET MATKHAU = p_MatKhau,
        QUYENTRUYCAP = p_QuyenTruyCap,
        MANV = p_MaNV,
        MAPT = p_MaPT,
        TRANGTHAI = p_TrangThai
    WHERE TENDN = p_TenDN;
    
    COMMIT;
END;
/

-- 4.3 Xóa Tài Khoản
CREATE OR REPLACE PROCEDURE SP_XOA_TAIKHOAN (
    p_TenDN IN VARCHAR2
) AS
BEGIN
    DELETE FROM TAIKHOAN WHERE TENDN = p_TenDN;
    COMMIT;
END;
/

--------------------------------------------------------
-- 5. MODULE QUẢN LÝ GÓI TẬP
--------------------------------------------------------

-- 5.1 Thêm Gói Tập
CREATE OR REPLACE PROCEDURE SP_THEM_GOITAP (
    p_TenGoi IN NVARCHAR2,
    p_DonGia IN NUMBER,
    p_ThoiGianHieuLuc IN NUMBER,
    p_MoTa IN NVARCHAR2,
    p_QuyenGoiTap IN VARCHAR2
) AS
    v_NewMaGoi VARCHAR2(10);
BEGIN
    -- Ràng buộc logic dữ liệu
    IF p_DonGia < 0 THEN
        RAISE_APPLICATION_ERROR(-20001, N'Lỗi: Đơn giá không được nhỏ hơn 0!');
    END IF;
    IF p_ThoiGianHieuLuc <= 0 THEN
        RAISE_APPLICATION_ERROR(-20002, N'Lỗi: Thời gian hiệu lực phải lớn hơn 0!');
    END IF;

    -- Tự sinh mã
    v_NewMaGoi := 'GT' || LPAD(SEQ_GOITAP.NEXTVAL, 3, '0');

    INSERT INTO GOITAP (MAGOI, TENGOI, DONGIA, THOIGIANHIEULUC, MOTA, QUYENGOITAP)
    VALUES (v_NewMaGoi, p_TenGoi, p_DonGia, p_ThoiGianHieuLuc, p_MoTa, p_QuyenGoiTap);

    COMMIT;
END;
/

-- 5.2 Cập nhật Gói Tập
CREATE OR REPLACE PROCEDURE SP_CAPNHAT_GOITAP (
    p_MaGoi IN VARCHAR2,
    p_TenGoi IN NVARCHAR2,
    p_DonGia IN NUMBER,
    p_ThoiGianHieuLuc IN NUMBER,
    p_MoTa IN NVARCHAR2,
    p_QuyenGoiTap IN VARCHAR2
) AS
BEGIN
    IF p_DonGia < 0 THEN
        RAISE_APPLICATION_ERROR(-20001, N'Lỗi: Đơn giá không được nhỏ hơn 0!');
    END IF;
    IF p_ThoiGianHieuLuc <= 0 THEN
        RAISE_APPLICATION_ERROR(-20002, N'Lỗi: Thời gian hiệu lực phải lớn hơn 0!');
    END IF;

    UPDATE GOITAP
    SET TENGOI = p_TenGoi, DONGIA = p_DonGia, THOIGIANHIEULUC = p_ThoiGianHieuLuc,
        MOTA = p_MoTa, QUYENGOITAP = p_QuyenGoiTap
    WHERE MAGOI = p_MaGoi;

    COMMIT;
END;
/

-- 5.3 Xóa Gói Tập
CREATE OR REPLACE PROCEDURE SP_XOA_GOITAP (
    p_MaGoi IN VARCHAR2
) AS
BEGIN
    DELETE FROM GOITAP WHERE MAGOI = p_MaGoi;
    COMMIT;
END;
/

--------------------------------------------------------
-- 6. MODULE QUẢN LÝ LỚP HỌC
--------------------------------------------------------

-- 6.1 Thêm Lớp Học
CREATE OR REPLACE PROCEDURE SP_THEM_LOPHOC (
    p_TenLop IN NVARCHAR2,
    p_MaPT IN VARCHAR2,
    p_MoTa IN NVARCHAR2,
    p_SoLuongToiDa IN NUMBER,
    p_NgayTap IN NVARCHAR2,
    p_KhungGio IN NVARCHAR2,
    p_LoaiLop IN VARCHAR2
) AS
    v_NewMaLop VARCHAR2(10);
BEGIN
    IF p_SoLuongToiDa <= 0 THEN
        RAISE_APPLICATION_ERROR(-20001, N'Lỗi: Sĩ số tối đa phải lớn hơn 0!');
    END IF;

    v_NewMaLop := 'LH' || LPAD(SEQ_LOPHOC.NEXTVAL, 3, '0');

    INSERT INTO LOPHOC (MALOP, TENLOP, MAPT, MOTA, SOLUONGTOIDA, SOLUONGHIENTAI, NGAYTAP, KHUNGGIO, LOAILOP)
    VALUES (v_NewMaLop, p_TenLop, p_MaPT, p_MoTa, p_SoLuongToiDa, 0, p_NgayTap, p_KhungGio, p_LoaiLop);

    COMMIT;
END;
/

-- 6.2 Cập nhật Lớp Học
CREATE OR REPLACE PROCEDURE SP_CAPNHAT_LOPHOC (
    p_MaLop IN VARCHAR2,
    p_TenLop IN NVARCHAR2,
    p_MaPT IN VARCHAR2,
    p_MoTa IN NVARCHAR2,
    p_SoLuongToiDa IN NUMBER,
    p_NgayTap IN NVARCHAR2,
    p_KhungGio IN NVARCHAR2,
    p_LoaiLop IN VARCHAR2
) AS
    v_HienTai NUMBER;
BEGIN
    SELECT SOLUONGHIENTAI INTO v_HienTai FROM LOPHOC WHERE MALOP = p_MaLop;

    IF p_SoLuongToiDa < v_HienTai THEN
        RAISE_APPLICATION_ERROR(-20002, N'Lỗi: Không thể giảm sĩ số tối đa xuống thấp hơn số học viên hiện tại (' || v_HienTai || ' người)!');
    END IF;

    UPDATE LOPHOC
    SET TENLOP = p_TenLop, MAPT = p_MaPT, MOTA = p_MoTa,
        SOLUONGTOIDA = p_SoLuongToiDa, NGAYTAP = p_NgayTap, KHUNGGIO = p_KhungGio, LOAILOP = p_LoaiLop
    WHERE MALOP = p_MaLop;

    COMMIT;
END;
/

-- 6.3 Xóa Lớp Học
CREATE OR REPLACE PROCEDURE SP_XOA_LOPHOC (
    p_MaLop IN VARCHAR2
) AS
    v_HienTai NUMBER;
BEGIN
    SELECT SOLUONGHIENTAI INTO v_HienTai FROM LOPHOC WHERE MALOP = p_MaLop;

    IF v_HienTai > 0 THEN
        RAISE_APPLICATION_ERROR(-20003, N'Lỗi: Lớp này đang có hội viên theo học, không thể xóa!');
    END IF;

    DELETE FROM LOPHOC WHERE MALOP = p_MaLop;
    COMMIT;
END;
/

--------------------------------------------------------
-- 7. MODULE QUẢN LÝ THIẾT BỊ
--------------------------------------------------------

-- 7.1 Thêm Thiết Bị
CREATE OR REPLACE PROCEDURE SP_THEM_THIETBI (
    p_TenTB IN NVARCHAR2,
    p_LoaiMay IN NVARCHAR2,
    p_NgayMua IN DATE,
    p_ViTri IN NVARCHAR2,
    p_TinhTrang IN NVARCHAR2
) AS
    v_NewMaTB VARCHAR2(10);
BEGIN
    -- Tự sinh mã
    v_NewMaTB := 'TB' || LPAD(SEQ_THIETBI.NEXTVAL, 3, '0');

    INSERT INTO THIETBI (MATB, TENTB, LOAIMAY, NGAYMUA, VITRI, TINHTRANG)
    VALUES (v_NewMaTB, p_TenTB, p_LoaiMay, p_NgayMua, p_ViTri, p_TinhTrang);

    COMMIT;
END;
/

-- 7.2 Cập nhật Thiết Bị
CREATE OR REPLACE PROCEDURE SP_CAPNHAT_THIETBI (
    p_MaTB IN VARCHAR2,
    p_TenTB IN NVARCHAR2,
    p_LoaiMay IN NVARCHAR2,
    p_NgayMua IN DATE,
    p_ViTri IN NVARCHAR2,
    p_TinhTrang IN NVARCHAR2
) AS
BEGIN
    UPDATE THIETBI
    SET TENTB = p_TenTB, LOAIMAY = p_LoaiMay, NGAYMUA = p_NgayMua, VITRI = p_ViTri
    WHERE MATB = p_MaTB;
    COMMIT;
END;
/

-- 7.3 Xóa Thiết Bị
CREATE OR REPLACE PROCEDURE SP_XOA_THIETBI (
    p_MaTB IN VARCHAR2
) AS
BEGIN
    DELETE FROM THIETBI WHERE MATB = p_MaTB;
    COMMIT;
END;
/

--------------------------------------------------------
-- 8. MODULE QUẢN LÝ BẢO TRÌ
--------------------------------------------------------

-- 8.1 Thêm Phiếu Bảo Trì
CREATE OR REPLACE PROCEDURE SP_THEM_BAOTRI (
    p_MaTB IN VARCHAR2,
    p_NgayBaoTri IN DATE,
    p_NoiDung IN NVARCHAR2,
    p_ChiPhi IN NUMBER
) AS
    v_NewMaPhieu VARCHAR2(10);
BEGIN
    -- Sinh mã tự động
    v_NewMaPhieu := 'BT' || LPAD(SEQ_BAOTRI.NEXTVAL, 3, '0');
    
    INSERT INTO BAOTRI (MAPHIEUBT, MATB, NGAYBAOTRI, NOIDUNG, CHIPHI)
    VALUES (v_NewMaPhieu, p_MaTB, p_NgayBaoTri, p_NoiDung, p_ChiPhi);
    COMMIT;
END;
/

-- 8.2 Cập nhật Phiếu Bảo Trì
CREATE OR REPLACE PROCEDURE SP_CAPNHAT_BAOTRI (
    p_MaPhieuBT IN VARCHAR2,
    p_MaTB IN VARCHAR2,
    p_NgayBaoTri IN DATE,
    p_NoiDung IN NVARCHAR2,
    p_ChiPhi IN NUMBER,
    p_TinhTrangMay IN NVARCHAR2 -- Tham số phụ để báo cho DB biết đã sửa xong chưa
) AS
BEGIN
    UPDATE BAOTRI
    SET MATB = p_MaTB, NGAYBAOTRI = p_NgayBaoTri, NOIDUNG = p_NoiDung, CHIPHI = p_ChiPhi
    WHERE MAPHIEUBT = p_MaPhieuBT;

    -- Nếu giao diện gởi lệnh "Đã sửa xong" -> Cập nhật lại máy thành Hoạt động
    UPDATE THIETBI SET TINHTRANG = p_TinhTrangMay WHERE MATB = p_MaTB;
    
    COMMIT;
END;
/

-- 8.3 Xóa Phiếu Bảo Trì
CREATE OR REPLACE PROCEDURE SP_XOA_BAOTRI (
    p_MaPhieuBT IN VARCHAR2
) AS
BEGIN
    DELETE FROM BAOTRI WHERE MAPHIEUBT = p_MaPhieuBT;
    COMMIT;
END;
/

--------------------------------------------------------
-- 9. MODULE QUẢN LÝ VOUCHER
--------------------------------------------------------

-- 9.1 Thêm Voucher
CREATE OR REPLACE PROCEDURE SP_THEM_VOUCHER (
    p_TenVoucher IN NVARCHAR2,
    p_LoaiVoucher IN NVARCHAR2,
    p_PhanTramGiam IN NUMBER,
    p_GiaTriToiThieu IN NUMBER,
    p_NgayHetHan IN DATE
) AS
    v_NewMaVoucher VARCHAR2(10);
BEGIN
    -- Các ràng buộc nghiệp vụ (Business Rules)
    IF p_PhanTramGiam <= 0 OR p_PhanTramGiam > 100 THEN
        RAISE_APPLICATION_ERROR(-20001, N'Lỗi: Phần trăm giảm giá phải nằm trong khoảng từ 1% đến 100%!');
    END IF;
    
    IF p_GiaTriToiThieu < 0 THEN
        RAISE_APPLICATION_ERROR(-20002, N'Lỗi: Giá trị đơn tối thiểu không được là số âm!');
    END IF;
    
    IF p_NgayHetHan < TRUNC(SYSDATE) THEN
        RAISE_APPLICATION_ERROR(-20003, N'Lỗi: Ngày hết hạn không thể nằm trong quá khứ!');
    END IF;

    -- Tự sinh mã
    v_NewMaVoucher := 'VC' || LPAD(SEQ_VOUCHER.NEXTVAL, 3, '0');

    INSERT INTO VOUCHER (MAVOUCHER, TENVOUCHER, LOAIVOUCHER, PHANTRAMGIAM, GIATRITOITHIEU, NGAYHETHAN)
    VALUES (v_NewMaVoucher, p_TenVoucher, p_LoaiVoucher, p_PhanTramGiam, p_GiaTriToiThieu, p_NgayHetHan);
    
    COMMIT;
END;
/

-- 9.2 Cập nhật Voucher
CREATE OR REPLACE PROCEDURE SP_CAPNHAT_VOUCHER (
    p_MaVoucher IN VARCHAR2,
    p_TenVoucher IN NVARCHAR2,
    p_LoaiVoucher IN NVARCHAR2,
    p_PhanTramGiam IN NUMBER,
    p_GiaTriToiThieu IN NUMBER,
    p_NgayHetHan IN DATE
) AS
BEGIN
    IF p_PhanTramGiam <= 0 OR p_PhanTramGiam > 100 THEN
        RAISE_APPLICATION_ERROR(-20001, N'Lỗi: Phần trăm giảm giá phải nằm trong khoảng từ 1% đến 100%!');
    END IF;
    
    IF p_GiaTriToiThieu < 0 THEN
        RAISE_APPLICATION_ERROR(-20002, N'Lỗi: Giá trị đơn tối thiểu không được là số âm!');
    END IF;
    
    -- Khi cập nhật cũng không được gia hạn lùi về quá khứ
    IF p_NgayHetHan < TRUNC(SYSDATE) THEN
        RAISE_APPLICATION_ERROR(-20003, N'Lỗi: Ngày hết hạn không thể nằm trong quá khứ!');
    END IF;

    UPDATE VOUCHER
    SET TENVOUCHER = p_TenVoucher, LOAIVOUCHER = p_LoaiVoucher, 
        PHANTRAMGIAM = p_PhanTramGiam, GIATRITOITHIEU = p_GiaTriToiThieu, NGAYHETHAN = p_NgayHetHan
    WHERE MAVOUCHER = p_MaVoucher;
    
    COMMIT;
END;
/

-- 9.3 Xóa Voucher
CREATE OR REPLACE PROCEDURE SP_XOA_VOUCHER (
    p_MaVoucher IN VARCHAR2
) AS
BEGIN
    DELETE FROM VOUCHER WHERE MAVOUCHER = p_MaVoucher;
    COMMIT;
END;
/


--------------------------------------------------------
-- 10. MODULE QUẢN LÝ ĐĂNG KÝ GÓI TẬP VÀ AUTO JOB
--------------------------------------------------------

-- 10.1 Thêm Đăng Ký Gói Tập (Có xử lý Voucher và Hóa đơn đi kèm)
CREATE OR REPLACE PROCEDURE SP_THEM_DANGKY_GOITAP (
    p_MaHV IN VARCHAR2,
    p_MaGoi IN VARCHAR2,
    p_NgayBatDau IN DATE,
    p_MaVoucher IN VARCHAR2,
    p_MaNV IN VARCHAR2,
    p_PhuongThucTT IN VARCHAR2
) AS
    v_MaDK VARCHAR2(10);
    v_MaHD VARCHAR2(10);
    v_DonGia NUMBER;
    v_ThoiGian NUMBER;
    v_PhanTramGiam NUMBER := 0;
    v_TongTien NUMBER;
    v_NgayKetThuc DATE;
BEGIN
    -- Lấy thông tin Gói tập (Giá và Ngày)
    SELECT DonGia, ThoiGianHieuLuc INTO v_DonGia, v_ThoiGian FROM GOITAP WHERE MaGoi = p_MaGoi;
    
    -- Tính toán Ngày Kết Thúc
    v_NgayKetThuc := p_NgayBatDau + v_ThoiGian;

    -- Tính Tiền
    IF p_MaVoucher IS NOT NULL THEN
        SELECT NVL(PhanTramGiam, 0) INTO v_PhanTramGiam FROM VOUCHER WHERE MaVoucher = p_MaVoucher;
    END IF;
    v_TongTien := v_DonGia * (1 - v_PhanTramGiam / 100);

    -- Sinh mã tự động
    v_MaDK := 'DK' || LPAD(SEQ_DANGKY_GOITAP.NEXTVAL, 3, '0');
    v_MaHD := 'HD' || LPAD(SEQ_HOADON.NEXTVAL, 3, '0');

    -- Insert Hóa Đơn (Trigger Hội viên sẽ tự động cộng điểm)
    INSERT INTO HOADON (MaHD, MaHV, MaNV, NgayLap, TongTien, MaVoucher, PhuongThucTT, TrangThaiHD, MAGOI)
    VALUES (v_MaHD, p_MaHV, p_MaNV, p_NgayBatDau, v_TongTien, p_MaVoucher, p_PhuongThucTT, 'Đã thanh toán', p_MaGoi);

    -- Insert Đăng Ký
    INSERT INTO DANGKY_GOITAP (MaDK, MaHV, MaGoi, NgayBatDau, NgayKetThuc, MaHD, TrangThai)
    VALUES (v_MaDK, p_MaHV, p_MaGoi, p_NgayBatDau, v_NgayKetThuc, v_MaHD, 'Đang hoạt động');

    COMMIT;
END;
/

-- 10.2 Xóa Đăng Ký Gói Tập
CREATE OR REPLACE PROCEDURE SP_XOA_DANGKY_GOITAP (
    p_MaDK IN VARCHAR2
) AS
    v_MaHD VARCHAR2(10);
BEGIN
    SELECT MaHD INTO v_MaHD FROM DANGKY_GOITAP WHERE MaDK = p_MaDK;

    -- Xóa Đăng ký trước để không dính khóa ngoại
    DELETE FROM DANGKY_GOITAP WHERE MaDK = p_MaDK;
    
    -- Xóa Hóa Đơn (Trigger sẽ tự động trừ tiền của Hội viên đi)
    IF v_MaHD IS NOT NULL THEN
        DELETE FROM HOADON WHERE MaHD = v_MaHD;
    END IF;

    COMMIT;
END;
/

-- 10.3 Procedure quét gói tập hết hạn hàng ngày
CREATE OR REPLACE PROCEDURE SP_QUET_HETHAN_HANGNGAY AS
BEGIN
    -- Tìm những người đang hoạt động mà ngày kết thúc nhỏ hơn ngày hôm nay thì khóa lại
    UPDATE DANGKY_GOITAP
    SET TRANGTHAI = N'Hết hạn'
    WHERE TRANGTHAI = N'Đang hoạt động' 
      AND TRUNC(NGAYKETTHUC) < TRUNC(SYSDATE);
    COMMIT;
END;
/

-- 10.4 Cài đặt Job (Lịch trình) tự động chạy lúc 00:00 hàng đêm
BEGIN
    -- Bỏ qua lỗi nếu Job cũ chưa tồn tại
    BEGIN DBMS_SCHEDULER.DROP_JOB('JOB_AUTO_UPDATE_STATUS'); EXCEPTION WHEN OTHERS THEN NULL; END;

    DBMS_SCHEDULER.CREATE_JOB (
        job_name        => 'JOB_AUTO_UPDATE_STATUS',
        job_type        => 'STORED_PROCEDURE',
        job_action      => 'SP_QUET_HETHAN_HANGNGAY',
        start_date      => TRUNC(SYSDATE) + 1, -- Bắt đầu chạy từ 00:00 đêm nay
        repeat_interval => 'FREQ=DAILY; BYHOUR=0; BYMINUTE=0; BYSECOND=0', -- Lặp lại HẰNG NGÀY lúc 00:00:00
        enabled         => TRUE, -- Kích hoạt cho chạy luôn
        comments        => 'Tu dong doi trang thai goi tap sang Het han vao nua dem'
    );
END;
/

--------------------------------------------------------
-- 11. MODULE QUẢN LÝ ĐĂNG KÝ LỚP HỌC
--------------------------------------------------------

-- 11.1 Ghi danh Lớp Học
CREATE OR REPLACE PROCEDURE SP_DANGKY_LOPHOC (
    p_MaHV IN VARCHAR2,
    p_MaLop IN VARCHAR2
) AS
    v_HienTai NUMBER;
    v_ToiDa NUMBER;
    v_LoaiLop LOPHOC.LoaiLop%TYPE;
    v_QuyenHopLe NUMBER;
    v_DaDangKy NUMBER;
BEGIN
    -- Kiểm tra xem HV đã đăng ký lớp này chưa
    SELECT COUNT(*) INTO v_DaDangKy FROM DANGKY_LOPHOC WHERE MaHV = p_MaHV AND MaLop = p_MaLop;
    IF v_DaDangKy > 0 THEN
        RAISE_APPLICATION_ERROR(-20004, N'Lỗi: Hội viên này đã ghi danh vào lớp này rồi!');
    END IF;

    -- Lấy thông tin lớp học và kiểm tra sĩ số
    SELECT NVL(SoLuongHienTai, 0), NVL(SoLuongToiDa, 0), LoaiLop
    INTO v_HienTai, v_ToiDa, v_LoaiLop
    FROM LOPHOC
    WHERE MaLop = p_MaLop;

    IF v_HienTai >= v_ToiDa THEN
        RAISE_APPLICATION_ERROR(-20001, N'Lỗi: Lớp học này đã đạt giới hạn tối đa (' || v_ToiDa || N' người).');
    END IF;

    -- Kiểm tra chéo Quyền lợi từ Gói tập còn hạn
    SELECT COUNT(*) INTO v_QuyenHopLe
    FROM DANGKY_GOITAP dk
    JOIN GOITAP gt ON dk.MaGoi = gt.MaGoi
    WHERE dk.MaHV = p_MaHV
      AND dk.TRANGTHAI = N'Đang hoạt động'
      AND (gt.QuyenGoiTap = v_LoaiLop OR gt.QuyenGoiTap = 'ALL'); 

    IF v_QuyenHopLe = 0 THEN
        RAISE_APPLICATION_ERROR(-20003, N'Từ chối: Hội viên không có Gói tập đang hoạt động hỗ trợ môn ' || v_LoaiLop || '!');
    END IF;

    -- Tiến hành ghi danh và cập nhật sĩ số
    INSERT INTO DANGKY_LOPHOC (MaHV, MaLop, NgayDangKy)
    VALUES (p_MaHV, p_MaLop, TRUNC(SYSDATE));
    
    UPDATE LOPHOC SET SoLuongHienTai = v_HienTai + 1 WHERE MaLop = p_MaLop;
    
    COMMIT;
END;
/

-- 11.2 Hủy Đăng Ký Lớp Học
CREATE OR REPLACE PROCEDURE SP_HUY_DANGKY_LOPHOC (
    p_MaHV IN VARCHAR2,
    p_MaLop IN VARCHAR2
) AS
BEGIN
    -- Xóa tên khỏi sổ đăng ký
    DELETE FROM DANGKY_LOPHOC WHERE MaHV = p_MaHV AND MaLop = p_MaLop;
    
    -- Chỉ giảm sĩ số nếu việc XÓA ở trên thực sự thành công
    IF SQL%ROWCOUNT > 0 THEN
        UPDATE LOPHOC 
        SET SoLuongHienTai = GREATEST(NVL(SoLuongHienTai, 0) - 1, 0) 
        WHERE MaLop = p_MaLop;
    END IF;
    
    COMMIT;
END;
/

--------------------------------------------------------
-- 12. MODULE QUẢN LÝ LỊCH TẬP PT (HUẤN LUYỆN VIÊN CÁ NHÂN)
--------------------------------------------------------

-- 12.1 Đặt Lịch Tập Mới
CREATE OR REPLACE PROCEDURE SP_DAT_LICH_PT (
    p_MaHV IN VARCHAR2,
    p_MaPT IN VARCHAR2,
    p_NgayTap IN DATE,
    p_KhungGio IN VARCHAR2
) AS
    v_NewMaLich VARCHAR2(10);
    v_CountPT NUMBER;
    v_CountHV NUMBER;
    v_CountLop NUMBER;
    v_DayOfWeek VARCHAR2(10);
    v_ThuVN VARCHAR2(20);
BEGIN
    -- Tự sinh mã lịch
    v_NewMaLich := 'LT' || LPAD(SEQ_LICHTAP_PT.NEXTVAL, 3, '0');

    -- Phân tích Thứ trong tuần
    v_DayOfWeek := TO_CHAR(p_NgayTap, 'DY', 'NLS_DATE_LANGUAGE=ENGLISH');
    v_ThuVN := CASE v_DayOfWeek
        WHEN 'MON' THEN '2' WHEN 'TUE' THEN '3' WHEN 'WED' THEN '4'
        WHEN 'THU' THEN '5' WHEN 'FRI' THEN '6' WHEN 'SAT' THEN '7' WHEN 'SUN' THEN 'Chủ Nhật'
    END;

    -- Ràng buộc 1: Kiểm tra trùng Lớp học nhóm của PT
    SELECT COUNT(*) INTO v_CountLop FROM LOPHOC
    WHERE MAPT = p_MaPT AND KHUNGGIO = p_KhungGio
      AND (UPPER(NGAYTAP) LIKE '%' || UPPER(v_ThuVN) || '%' OR UPPER(NGAYTAP) LIKE '%HẰNG NGÀY%');
    IF v_CountLop > 0 THEN
        RAISE_APPLICATION_ERROR(-20003, 'Lỗi: Huấn luyện viên đang kẹt dạy Lớp Học vào khung giờ này!');
    END IF;

    -- Ràng buộc 2: Kiểm tra trùng lịch PT cá nhân khác
    SELECT COUNT(*) INTO v_CountPT FROM LICHTAP_PT 
    WHERE MaPT = p_MaPT AND NgayTap = p_NgayTap AND KhungGio = p_KhungGio 
      AND (TrangThaiBuoiTap IS NULL OR TrangThaiBuoiTap != 'Đã hủy');
    IF v_CountPT > 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Lỗi: Huấn luyện viên đã có lịch dạy cá nhân khác!');
    END IF;

    -- Ràng buộc 3: Kiểm tra trùng lịch của Hội viên
    SELECT COUNT(*) INTO v_CountHV FROM LICHTAP_PT 
    WHERE MaHV = p_MaHV AND NgayTap = p_NgayTap AND KhungGio = p_KhungGio 
      AND (TrangThaiBuoiTap IS NULL OR TrangThaiBuoiTap != 'Đã hủy');
    IF v_CountHV > 0 THEN
        RAISE_APPLICATION_ERROR(-20002, 'Lỗi: Hội viên này đã bị trùng lịch tập khác!');
    END IF;

    -- Tiến hành Insert
    INSERT INTO LICHTAP_PT (MaLich, MaHV, MaPT, NgayTap, KhungGio, TrangThaiBuoiTap)
    VALUES (v_NewMaLich, p_MaHV, p_MaPT, p_NgayTap, p_KhungGio, 'Sắp diễn ra');

    COMMIT;
END;
/

-- 12.2 Cập nhật Lịch Tập
CREATE OR REPLACE PROCEDURE SP_CAPNHAT_LICHTAP_PT (
    p_MaLich IN VARCHAR2,
    p_MaHV IN VARCHAR2,
    p_MaPT IN VARCHAR2,
    p_NgayTap IN DATE,
    p_KhungGio IN VARCHAR2,
    p_TrangThai IN VARCHAR2
) AS
    v_CountPT NUMBER;
    v_CountHV NUMBER;
    v_CountLop NUMBER;
    v_DayOfWeek VARCHAR2(10);
    v_ThuVN VARCHAR2(20);
BEGIN
    -- Bỏ qua check trùng lịch nếu đang thao tác "Hủy"
    IF p_TrangThai != 'Đã hủy' THEN
        v_DayOfWeek := TO_CHAR(p_NgayTap, 'DY', 'NLS_DATE_LANGUAGE=ENGLISH');
        v_ThuVN := CASE v_DayOfWeek
            WHEN 'MON' THEN '2' WHEN 'TUE' THEN '3' WHEN 'WED' THEN '4'
            WHEN 'THU' THEN '5' WHEN 'FRI' THEN '6' WHEN 'SAT' THEN '7' WHEN 'SUN' THEN 'Chủ Nhật'
        END;

        SELECT COUNT(*) INTO v_CountLop FROM LOPHOC
        WHERE MAPT = p_MaPT AND KHUNGGIO = p_KhungGio
          AND (UPPER(NGAYTAP) LIKE '%' || UPPER(v_ThuVN) || '%' OR UPPER(NGAYTAP) LIKE '%HẰNG NGÀY%');
        IF v_CountLop > 0 THEN
            RAISE_APPLICATION_ERROR(-20003, 'Lỗi: Huấn luyện viên đang kẹt dạy Lớp Học vào khung giờ này!');
        END IF;

        SELECT COUNT(*) INTO v_CountPT FROM LICHTAP_PT 
        WHERE MaPT = p_MaPT AND NgayTap = p_NgayTap AND KhungGio = p_KhungGio 
          AND TrangThaiBuoiTap != 'Đã hủy' AND MaLich != p_MaLich;
        IF v_CountPT > 0 THEN
            RAISE_APPLICATION_ERROR(-20001, 'Lỗi: Huấn luyện viên đã có lịch dạy cá nhân khác!');
        END IF;

        SELECT COUNT(*) INTO v_CountHV FROM LICHTAP_PT 
        WHERE MaHV = p_MaHV AND NgayTap = p_NgayTap AND KhungGio = p_KhungGio 
          AND TrangThaiBuoiTap != 'Đã hủy' AND MaLich != p_MaLich;
        IF v_CountHV > 0 THEN
            RAISE_APPLICATION_ERROR(-20002, 'Lỗi: Hội viên này đã bị trùng lịch tập khác!');
        END IF;
    END IF;

    UPDATE LICHTAP_PT
    SET MaHV = p_MaHV, MaPT = p_MaPT, NgayTap = p_NgayTap, KhungGio = p_KhungGio, TrangThaiBuoiTap = p_TrangThai
    WHERE MaLich = p_MaLich;

    COMMIT;
END;
/

-- 12.3 Xóa Lịch Tập
CREATE OR REPLACE PROCEDURE SP_HUY_LICHTAP_PT (
    p_MaLich IN VARCHAR2
) AS
BEGIN
    DELETE FROM LICHTAP_PT WHERE MaLich = p_MaLich;
    COMMIT;
END;
/

--------------------------------------------------------
-- 13. MODULE QUẢN LÝ BẢO LƯU GÓI TẬP
--------------------------------------------------------

-- 13.1 Thêm Phiếu Bảo Lưu
CREATE OR REPLACE PROCEDURE SP_THEM_BAOLUU (
    p_MaDK IN VARCHAR2,
    p_NgayBatDau IN DATE,
    p_NgayKetThuc IN DATE,
    p_LyDo IN NVARCHAR2
) AS
    v_NgayBD_Goi DATE;
    v_NgayKT_Goi DATE;
    v_SoNgay NUMBER;
BEGIN
    -- Chốt 1: Ngày nghỉ phải hợp lý
    IF p_NgayBatDau > p_NgayKetThuc THEN
        RAISE_APPLICATION_ERROR(-20001, 'Lỗi: Ngày bắt đầu nghỉ không được lớn hơn ngày kết thúc!');
    END IF;

    -- Chốt 2: Chỉ được bảo lưu gói tập trong thời hạn đang có
    SELECT NgayBatDau, NgayKetThuc INTO v_NgayBD_Goi, v_NgayKT_Goi FROM DANGKY_GOITAP WHERE MaDK = p_MaDK;
    IF p_NgayBatDau < v_NgayBD_Goi OR p_NgayBatDau > v_NgayKT_Goi THEN
        RAISE_APPLICATION_ERROR(-20002, 'Lỗi: Ngày xin bảo lưu phải nằm trong thời hạn của gói tập!');
    END IF;

    v_SoNgay := p_NgayKetThuc - p_NgayBatDau;

    -- Lưu phiếu bảo lưu (Mã bảo lưu sẽ do Trigger TRG_BAOLUU_ID tự sinh)
    INSERT INTO BAOLUU (MaDK, NgayBatDauNghi, NgayKetThucNghi, LyDo)
    VALUES (p_MaDK, p_NgayBatDau, p_NgayKetThuc, p_LyDo);

    -- CỘNG BÙ ngày nghỉ vào hạn sử dụng của gói tập
    UPDATE DANGKY_GOITAP SET NgayKetThuc = NgayKetThuc + v_SoNgay WHERE MaDK = p_MaDK;
    COMMIT;
END;
/

-- 13.2 Sửa Phiếu Bảo Lưu
CREATE OR REPLACE PROCEDURE SP_SUA_BAOLUU (
    p_MaBaoLuu IN VARCHAR2,
    p_MaDK IN VARCHAR2,
    p_NgayBatDau_Moi IN DATE,
    p_NgayKetThuc_Moi IN DATE,
    p_LyDo IN NVARCHAR2
) AS
    v_NgayBatDau_Cu DATE;
    v_NgayKetThuc_Cu DATE;
    v_SoNgay_Cu NUMBER;
    v_SoNgay_Moi NUMBER;
BEGIN
    IF p_NgayBatDau_Moi > p_NgayKetThuc_Moi THEN
        RAISE_APPLICATION_ERROR(-20001, 'Lỗi: Ngày bắt đầu nghỉ không được lớn hơn ngày kết thúc!');
    END IF;

    SELECT NgayBatDauNghi, NgayKetThucNghi INTO v_NgayBatDau_Cu, v_NgayKetThuc_Cu
    FROM BAOLUU WHERE MaBaoLuu = p_MaBaoLuu;

    v_SoNgay_Cu := v_NgayKetThuc_Cu - v_NgayBatDau_Cu;
    v_SoNgay_Moi := p_NgayKetThuc_Moi - p_NgayBatDau_Moi;

    -- Lấy ngày cũ TRỪ đi số ngày bảo lưu cũ (trả về nguyên trạng), rồi CỘNG số ngày bảo lưu mới
    UPDATE DANGKY_GOITAP SET NgayKetThuc = NgayKetThuc - v_SoNgay_Cu + v_SoNgay_Moi WHERE MaDK = p_MaDK;
    
    -- Cập nhật thông tin phiếu
    UPDATE BAOLUU SET MaDK = p_MaDK, NgayBatDauNghi = p_NgayBatDau_Moi, NgayKetThucNghi = p_NgayKetThuc_Moi, LyDo = p_LyDo
    WHERE MaBaoLuu = p_MaBaoLuu;
    COMMIT;
END;
/

-- 13.3 Xóa Phiếu Bảo Lưu
CREATE OR REPLACE PROCEDURE SP_XOA_BAOLUU (
    p_MaBaoLuu IN VARCHAR2
) AS
    v_MaDK VARCHAR2(10);
    v_NgayBatDau DATE;
    v_NgayKetThuc DATE;
    v_SoNgay NUMBER;
BEGIN
    SELECT MaDK, NgayBatDauNghi, NgayKetThucNghi INTO v_MaDK, v_NgayBatDau, v_NgayKetThuc
    FROM BAOLUU WHERE MaBaoLuu = p_MaBaoLuu;

    v_SoNgay := v_NgayKetThuc - v_NgayBatDau;

    -- Xóa phiếu bảo lưu
    DELETE FROM BAOLUU WHERE MaBaoLuu = p_MaBaoLuu;

    -- TRỪ đi số ngày đã lỡ cộng bù vào gói tập
    UPDATE DANGKY_GOITAP SET NgayKetThuc = NgayKetThuc - v_SoNgay WHERE MaDK = v_MaDK;
    COMMIT;
END;
/

--------------------------------------------------------
-- 14. MODULE QUẢN LÝ CHECK-IN / CHECK-OUT (LỄ TÂN)
--------------------------------------------------------

-- 14.1 Xử lý Check-in Hội viên
CREATE OR REPLACE PROCEDURE SP_CHECKIN_HOIVIEN (
    p_MaCheckIn IN VARCHAR2,
    p_MaHV IN VARCHAR2,
    p_MaDK IN VARCHAR2
)
AS
    v_MaDK VARCHAR2(10);
    v_MaCheckIn VARCHAR2(10);
    v_DangBaoLuu NUMBER;
BEGIN
    -- [BƯỚC 1]: KIỂM TRA TÌNH TRẠNG GÓI TẬP CỦA KHÁCH
    BEGIN
        SELECT MaDK INTO v_MaDK
        FROM DANGKY_GOITAP
        WHERE MaHV = p_MaHV 
          AND TRANGTHAI = N'Đang hoạt động' 
          -- Dùng TRUNC để cắt bỏ giờ/phút/giây, so sánh cực chuẩn ngày hôm nay
          AND TRUNC(NgayKetThuc) >= TRUNC(SYSDATE)
          AND ROWNUM = 1;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(-20031, N'Từ chối: Hội viên không có Gói tập nào đang hoạt động hoặc gói đã hết hạn!');
    END;

    -- [BƯỚC 2]: KIỂM TRA ĐÓNG BĂNG (BẢO LƯU) - BAO GỒM CẢ NGÀY HÔM NAY
    -- Đếm xem có phiếu bảo lưu nào mà ngày hôm nay nằm trong vùng nghỉ không
    SELECT COUNT(*) INTO v_DangBaoLuu
    FROM BAOLUU
    WHERE MaDK = v_MaDK 
      AND TRUNC(SYSDATE) >= TRUNC(NgayBatDauNghi) 
      AND TRUNC(SYSDATE) <= TRUNC(NgayKetThucNghi);

    -- Nếu v_DangBaoLuu > 0 nghĩa là phát hiện đang nghỉ, giơ bảng cấm ngay!
    IF v_DangBaoLuu > 0 THEN
        RAISE_APPLICATION_ERROR(-20032, N'Từ chối: Gói tập của khách ĐANG BỊ BẢO LƯU, không thể Check-in!');
    END IF;

    -- [BƯỚC 3]: TỰ ĐỘNG SINH MÃ CHECK-IN TĂNG DẦN
    SELECT 'CI' || LPAD(NVL(MAX(TO_NUMBER(SUBSTR(MaCheckIn, 3))), 0) + 1, 3, '0') 
    INTO v_MaCheckIn 
    FROM CHECKIN;

    -- [BƯỚC 4]: MỞ CỬA CHO VÀO (LƯU XUỐNG DB)
    INSERT INTO CHECKIN(MaCheckIn, MaHV, MaDK, ThoiGianVao, ThoiGianRa) 
    VALUES (v_MaCheckIn, p_MaHV, v_MaDK, SYSDATE, NULL);

    COMMIT;
END;
/

-- 14.2 Xử lý Check-out (Quét thẻ ra về)
CREATE OR REPLACE PROCEDURE SP_CHECKOUT_HOIVIEN (
    p_MaCheckIn IN VARCHAR2
)
AS
BEGIN
    UPDATE CHECKIN
    SET ThoiGianRa = SYSDATE
    WHERE MaCheckIn = p_MaCheckIn;
    
    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE_APPLICATION_ERROR(-20017, 'Lỗi cập nhật thời gian ra: ' || SQLERRM);
END;
/
