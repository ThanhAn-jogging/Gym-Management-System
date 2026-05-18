CREATE OR REPLACE FUNCTION F_TINH_TIEN_SAU_GIAM_GIA (
    p_MaGoi IN VARCHAR2,
    p_MaVoucher IN VARCHAR2 DEFAULT NULL
) RETURN NUMBER AS
    v_DonGia NUMBER := 0;
    v_PhanTramGiam NUMBER := 0;
    v_ThanhTien NUMBER := 0;
BEGIN
    -- [2] Truy vấn đơn giá gốc của gói tập
    SELECT NVL(DonGia, 0) INTO v_DonGia FROM GOITAP WHERE MaGoi = p_MaGoi;

    -- [3] Xác định tỷ lệ giảm giá chiết khấu của chiến dịch Voucher
    IF p_MaVoucher IS NOT NULL THEN
        BEGIN
            SELECT NVL(PhanTramGiam, 0) INTO v_PhanTramGiam 
            FROM VOUCHER 
            WHERE MaVoucher = p_MaVoucher;
        EXCEPTION
            WHEN NO_DATA_FOUND THEN v_PhanTramGiam := 0;
        END;
    END IF;

    -- [4] Thực thi công thức tính toán tiền tệ sau ưu đãi
    v_ThanhTien := v_DonGia * (1 - (v_PhanTramGiam / 100));
    
    -- [5] Trả về kết quả số tiền thực thu
    RETURN v_ThanhTien;
END;
/