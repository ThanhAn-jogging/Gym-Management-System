CREATE OR REPLACE FUNCTION F_KIEM_TRA_TRANG_THAI_THE (
    p_MaHV IN VARCHAR2
) RETURN NVARCHAR2 AS
    v_MaDK VARCHAR2(10);
    v_NgayKetThuc DATE;
    v_TrangThaiGoc NVARCHAR2(50);
    v_CountBaoLuu NUMBER := 0;
BEGIN
    SELECT MaDK, NgayKetThuc, TrangThai 
    INTO v_MaDK, v_NgayKetThuc, v_TrangThaiGoc
    FROM DANGKY_GOITAP 
    WHERE MaHV = p_MaHV AND ROWNUM = 1
    ORDER BY NgayBatDau DESC;

    IF TRUNC(SYSDATE) > TRUNC(v_NgayKetThuc) OR v_TrangThaiGoc = N'Hết hạn' THEN
        RETURN N'Hết hạn';
    END IF;

    SELECT COUNT(*) INTO v_CountBaoLuu 
    FROM BAOLUU 
    WHERE MaDK = v_MaDK 
      AND TRUNC(SYSDATE) >= TRUNC(NgayBatDauNghi) 
      AND TRUNC(SYSDATE) <= TRUNC(NgayKetThucNghi);

    IF v_CountBaoLuu > 0 THEN
        RETURN N'Đang bảo lưu';
    ELSE
        RETURN N'Đang hoạt động';
    END IF;

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN N'Chưa mua gói';
END;
/