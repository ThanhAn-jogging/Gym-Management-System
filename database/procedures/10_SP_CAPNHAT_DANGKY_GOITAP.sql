CREATE OR REPLACE PROCEDURE SP_CAPNHAT_DANGKY_GOITAP (
    p_MaDK IN VARCHAR2,
    p_MaHV_Moi IN VARCHAR2,
    p_MaGoi_Moi IN VARCHAR2,
    p_NgayBatDau_Moi IN DATE,
    p_MaVoucher_Moi IN VARCHAR2
) AS
    v_MaHD VARCHAR2(10);
    v_DonGiaMoi NUMBER;
    v_ThoiGianMoi NUMBER;
    v_GiamGiaMoi NUMBER := 0;
    v_TongTienMoi NUMBER;
BEGIN
    SELECT MaHD INTO v_MaHD FROM DANGKY_GOITAP WHERE MaDK = p_MaDK;

    -- Tính toán lại giá và ngày
    SELECT DonGia, ThoiGianHieuLuc INTO v_DonGiaMoi, v_ThoiGianMoi FROM GOITAP WHERE MaGoi = p_MaGoi_Moi;
    IF p_MaVoucher_Moi IS NOT NULL THEN
        SELECT NVL(PhanTramGiam, 0) INTO v_GiamGiaMoi FROM VOUCHER WHERE MaVoucher = p_MaVoucher_Moi;
    END IF;
    v_TongTienMoi := v_DonGiaMoi * (1 - v_GiamGiaMoi / 100);

    -- Cập nhật Hóa Đơn (Trigger tự lo phần tiền chênh lệch)
    UPDATE HOADON 
    SET MaHV = p_MaHV_Moi, NgayLap = p_NgayBatDau_Moi, TongTien = v_TongTienMoi, MaVoucher = p_MaVoucher_Moi, MAGOI = p_MaGoi_Moi
    WHERE MaHD = v_MaHD;
    
    -- Cập nhật Đăng Ký
    UPDATE DANGKY_GOITAP 
    SET MaHV = p_MaHV_Moi, MaGoi = p_MaGoi_Moi, NgayBatDau = p_NgayBatDau_Moi, 
        NgayKetThuc = p_NgayBatDau_Moi + v_ThoiGianMoi
    WHERE MaDK = p_MaDK;

    COMMIT;
END;
/