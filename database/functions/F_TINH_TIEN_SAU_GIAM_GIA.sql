CREATE OR REPLACE FUNCTION F_TINH_TIEN_SAU_GIAM_GIA (
    p_MaGoi IN VARCHAR2,
    p_MaVoucher IN VARCHAR2 DEFAULT NULL
) RETURN NUMBER AS
    v_DonGia NUMBER := 0;
    v_PhanTramGiam NUMBER := 0;
    v_ThanhTien NUMBER := 0;
BEGIN
    SELECT NVL(DonGia, 0) INTO v_DonGia FROM GOITAP WHERE MaGoi = p_MaGoi;

    IF p_MaVoucher IS NOT NULL THEN
        BEGIN
            SELECT NVL(PhanTramGiam, 0) INTO v_PhanTramGiam 
            FROM VOUCHER 
            WHERE MaVoucher = p_MaVoucher;
        EXCEPTION
            WHEN NO_DATA_FOUND THEN v_PhanTramGiam := 0;
        END;
    END IF;

    v_ThanhTien := v_DonGia * (1 - (v_PhanTramGiam / 100));
    
    RETURN v_ThanhTien;
END;
/