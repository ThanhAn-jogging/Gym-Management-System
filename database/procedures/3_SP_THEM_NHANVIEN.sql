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