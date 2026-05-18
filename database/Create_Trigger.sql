--------------------------------------------------------
-- TỔNG HỢP CÁC TRIGGER XỬ LÝ NGHIỆP VỤ (BUSINESS LOGIC)
-- Lưu ý: Sử dụng CREATE OR REPLACE để tự động ghi đè bản cũ
--------------------------------------------------------

--------------------------------------------------------
-- 1. NHÓM TRIGGER TRÊN BẢNG HỘI VIÊN
--------------------------------------------------------

-- 1.1 Kiểm tra độ tuổi hợp lệ (Từ 15 tuổi trở lên)
CREATE OR REPLACE TRIGGER TRG_CHECK_AGE_LIMIT
BEFORE INSERT OR UPDATE ON HOIVIEN
FOR EACH ROW
BEGIN
    -- Tính tuổi dựa trên NgayDangKy và NgaySinh
    IF EXTRACT(YEAR FROM :NEW.NgayDangKy) - EXTRACT(YEAR FROM :NEW.NgaySinh) < 15 THEN
        RAISE_APPLICATION_ERROR(-20009, 'Lỗi: Hội viên phải từ 15 tuổi trở lên.');
    END IF;
END;
/

--------------------------------------------------------
-- 2. NHÓM TRIGGER TRÊN BẢNG HÓA ĐƠN
--------------------------------------------------------

-- 2.1 Kiểm tra tính hợp lệ của Voucher khi thanh toán
CREATE OR REPLACE TRIGGER TRG_VOUCHER_VALID
BEFORE INSERT OR UPDATE ON HOADON
FOR EACH ROW
DECLARE
    v_NgayHetHan DATE;
    v_GiaTriMin NUMBER;
BEGIN
    IF :NEW.MaVoucher IS NOT NULL THEN
        SELECT NgayHetHan, GiaTriToiThieu INTO v_NgayHetHan, v_GiaTriMin 
        FROM VOUCHER WHERE MaVoucher = :NEW.MaVoucher;
        
        IF :NEW.NgayLap > v_NgayHetHan THEN
            RAISE_APPLICATION_ERROR(-20004, 'Lỗi: Voucher đã hết hạn sử dụng.');
        END IF;
        
        IF :NEW.TongTien < v_GiaTriMin THEN
            RAISE_APPLICATION_ERROR(-20005, 'Lỗi: Tổng tiền hóa đơn chưa đạt giá trị tối thiểu để áp dụng Voucher.');
        END IF;
    END IF;
END;
/

-- 2.2 Tự động tính tổng chi tiêu và nâng hạng Thành viên
CREATE OR REPLACE TRIGGER TRG_UPDATE_MEMBERSHIP
AFTER INSERT OR UPDATE OR DELETE ON HOADON
FOR EACH ROW
DECLARE
    v_ChenhLech NUMBER := 0;
    v_MaHV VARCHAR2(10);
BEGIN
    IF INSERTING THEN
        v_ChenhLech := :NEW.TongTien;
        v_MaHV := :NEW.MaHV;
    ELSIF UPDATING THEN
        -- Chỉ cộng/trừ phần tiền chênh lệch khi đổi gói hoặc đổi voucher
        v_ChenhLech := :NEW.TongTien - :OLD.TongTien;
        v_MaHV := :NEW.MaHV;
    ELSIF DELETING THEN
        -- Hoàn lại tiền chi tiêu khi xóa hóa đơn
        v_ChenhLech := - :OLD.TongTien;
        v_MaHV := :OLD.MaHV;
    END IF;

    -- Cập nhật Tổng chi tiêu
    UPDATE HOIVIEN 
    SET TongChiTieu = GREATEST(NVL(TongChiTieu, 0) + v_ChenhLech, 0)
    WHERE MaHV = v_MaHV;
    
    -- Cập nhật Hạng TV ngay lập tức
    UPDATE HOIVIEN
    SET HangTV = CASE 
        WHEN (NVL(TongChiTieu, 0)) >= 20000000 THEN 'Platinum'
        WHEN (NVL(TongChiTieu, 0)) >= 10000000 THEN 'Gold'
        ELSE 'Silver'
    END
    WHERE MaHV = v_MaHV;
END;
/

--------------------------------------------------------
-- 3. NHÓM TRIGGER TRÊN BẢNG ĐĂNG KÝ GÓI TẬP
--------------------------------------------------------

-- 3.1 Tự động tính ngày kết thúc gói tập dựa theo thời gian hiệu lực
CREATE OR REPLACE TRIGGER TRG_CALC_EXPIRY
BEFORE INSERT ON DANGKY_GOITAP
FOR EACH ROW
DECLARE
    v_ThoiHan NUMBER;
BEGIN
    SELECT ThoiGianHieuLuc INTO v_ThoiHan FROM GOITAP WHERE MaGoi = :NEW.MaGoi;
    IF :NEW.NgayKetThuc IS NULL THEN
        :NEW.NgayKetThuc := :NEW.NgayBatDau + v_ThoiHan;
    END IF;
END;
/

--------------------------------------------------------
-- 4. NHÓM TRIGGER TRÊN BẢNG BẢO TRÌ & THIẾT BỊ
--------------------------------------------------------

-- 4.1 Kiểm tra logic thời gian bảo trì (Phải sau ngày mua máy)
CREATE OR REPLACE TRIGGER TRG_CHECK_NGAYBAOTRI
BEFORE INSERT OR UPDATE ON BAOTRI
FOR EACH ROW
DECLARE
    v_NgayMua DATE;
BEGIN
    SELECT NGAYMUA INTO v_NgayMua FROM THIETBI WHERE MATB = :NEW.MATB;
    IF :NEW.NGAYBAOTRI < v_NgayMua THEN
        RAISE_APPLICATION_ERROR(-20001, N'Lỗi: Ngày bảo trì không được diễn ra trước ngày mua máy (' || TO_CHAR(v_NgayMua, 'DD/MM/YYYY') || ')!');
    END IF;
END;
/

-- 4.2 Đổi tình trạng máy thành 'Đang bảo trì' khi thêm phiếu bảo trì
CREATE OR REPLACE TRIGGER TRG_AFTER_INSERT_BAOTRI
AFTER INSERT ON BAOTRI
FOR EACH ROW
BEGIN
    UPDATE THIETBI SET TINHTRANG = N'Đang bảo trì' WHERE MATB = :NEW.MATB;
END;
/

-- 4.3 Khôi phục tình trạng máy thành 'Hoạt động' khi xóa phiếu bảo trì
CREATE OR REPLACE TRIGGER TRG_AFTER_DELETE_BAOTRI
AFTER DELETE ON BAOTRI
FOR EACH ROW
BEGIN
    UPDATE THIETBI SET TINHTRANG = N'Hoạt động' WHERE MATB = :OLD.MATB;
END;
/

--------------------------------------------------------
-- 5. NHÓM TRIGGER TRÊN BẢNG CHECK-IN
--------------------------------------------------------

-- 5.1 Kiểm tra logic thời gian ra vào phòng tập
CREATE OR REPLACE TRIGGER TRG_CHECK_CHECKIN
BEFORE INSERT OR UPDATE ON CHECKIN
FOR EACH ROW
BEGIN
    IF :NEW.ThoiGianRa IS NOT NULL AND :NEW.ThoiGianRa <= :NEW.ThoiGianVao THEN
        RAISE_APPLICATION_ERROR(-20002, 'Lỗi: Thời gian ra phải sau thời gian vào.');
    END IF;
END;
/