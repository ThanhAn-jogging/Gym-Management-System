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