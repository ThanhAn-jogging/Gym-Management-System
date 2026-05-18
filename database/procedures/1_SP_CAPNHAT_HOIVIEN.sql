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