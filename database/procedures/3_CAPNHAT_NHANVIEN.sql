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