CREATE OR REPLACE PROCEDURE SP_HUY_DANGKY_LOPHOC (
    p_MaHV IN VARCHAR2,
    p_MaLop IN VARCHAR2
) AS
BEGIN
    -- 1. Xóa tên khỏi sổ đăng ký
    DELETE FROM DANGKY_LOPHOC WHERE MaHV = p_MaHV AND MaLop = p_MaLop;
    
    -- 2. Chỉ giảm sĩ số nếu việc XÓA ở trên thực sự thành công (có dòng bị xóa)
    IF SQL%ROWCOUNT > 0 THEN
        UPDATE LOPHOC 
        SET SoLuongHienTai = GREATEST(NVL(SoLuongHienTai, 0) - 1, 0) 
        WHERE MaLop = p_MaLop;
    END IF;
    
    COMMIT;
END;
/