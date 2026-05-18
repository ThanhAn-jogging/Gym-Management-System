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