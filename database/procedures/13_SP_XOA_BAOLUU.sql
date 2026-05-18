CREATE OR REPLACE PROCEDURE SP_XOA_BAOLUU (
    p_MaBaoLuu IN VARCHAR2
) AS
    v_MaDK VARCHAR2(10);
    v_NgayBatDau DATE;
    v_NgayKetThuc DATE;
    v_SoNgay NUMBER;
BEGIN
    SELECT MaDK, NgayBatDauNghi, NgayKetThucNghi INTO v_MaDK, v_NgayBatDau, v_NgayKetThuc
    FROM BAOLUU WHERE MaBaoLuu = p_MaBaoLuu;

    v_SoNgay := v_NgayKetThuc - v_NgayBatDau;

    -- Xóa phiếu bảo lưu
    DELETE FROM BAOLUU WHERE MaBaoLuu = p_MaBaoLuu;

    -- TRỪ đi số ngày đã lỡ cộng vào gói tập
    UPDATE DANGKY_GOITAP SET NgayKetThuc = NgayKetThuc - v_SoNgay WHERE MaDK = v_MaDK;
    COMMIT;
END;
/