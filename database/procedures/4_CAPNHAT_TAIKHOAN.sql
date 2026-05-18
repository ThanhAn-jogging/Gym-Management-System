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