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