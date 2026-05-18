CREATE OR REPLACE PROCEDURE SP_XOA_LOPHOC (
    p_MaLop IN VARCHAR2
) AS
    v_HienTai NUMBER;
BEGIN
    SELECT SOLUONGHIENTAI INTO v_HienTai FROM LOPHOC WHERE MALOP = p_MaLop;

    IF v_HienTai > 0 THEN
        RAISE_APPLICATION_ERROR(-20003, N'Lỗi: Lớp này đang có hội viên theo học, không thể xóa!');
    END IF;

    DELETE FROM LOPHOC WHERE MALOP = p_MaLop;
    COMMIT;
END;
/