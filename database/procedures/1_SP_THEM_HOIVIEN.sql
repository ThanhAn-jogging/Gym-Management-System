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