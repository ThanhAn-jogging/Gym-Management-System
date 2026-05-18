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