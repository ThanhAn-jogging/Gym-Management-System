CREATE OR REPLACE PROCEDURE SP_XOA_DANGKY_GOITAP (
    p_MaDK IN VARCHAR2
) AS
    v_MaHD VARCHAR2(10);
BEGIN
    SELECT MaHD INTO v_MaHD FROM DANGKY_GOITAP WHERE MaDK = p_MaDK;

    -- Xóa Đăng ký trước để không dính khóa ngoại
    DELETE FROM DANGKY_GOITAP WHERE MaDK = p_MaDK;
    
    -- Xóa Hóa Đơn (Trigger sẽ tự động trừ tiền của Hội viên đi)
    IF v_MaHD IS NOT NULL THEN
        DELETE FROM HOADON WHERE MaHD = v_MaHD;
    END IF;

    COMMIT;
END;
/