CREATE OR REPLACE PROCEDURE SP_THEM_DANGKY_GOITAP (
    p_MaHV IN VARCHAR2,
    p_MaGoi IN VARCHAR2,
    p_NgayBatDau IN DATE,
    p_MaVoucher IN VARCHAR2,
    p_MaNV IN VARCHAR2,
    p_PhuongThucTT IN VARCHAR2
) AS
    v_MaDK VARCHAR2(10);
    v_MaHD VARCHAR2(10);
    v_DonGia NUMBER;
    v_ThoiGian NUMBER;
    v_PhanTramGiam NUMBER := 0;
    v_TongTien NUMBER;
    v_NgayKetThuc DATE;
BEGIN
    SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

    SELECT DonGia, ThoiGianHieuLuc INTO v_DonGia, v_ThoiGian FROM GOITAP WHERE MaGoi = p_MaGoi;

    DBMS_SESSION.SLEEP(10);
    
    v_NgayKetThuc := p_NgayBatDau + v_ThoiGian;

    IF p_MaVoucher IS NOT NULL THEN
        SELECT NVL(PhanTramGiam, 0) INTO v_PhanTramGiam FROM VOUCHER WHERE MaVoucher = p_MaVoucher;
    END IF;
    
    v_TongTien := v_DonGia * (1 - v_PhanTramGiam / 100);

    v_MaDK := 'DK' || LPAD(SEQ_DANGKY_GOITAP.NEXTVAL, 3, '0');
    v_MaHD := 'HD' || LPAD(SEQ_HOADON.NEXTVAL, 3, '0');

    INSERT INTO HOADON (MaHD, MaHV, MaNV, NgayLap, TongTien, MaVoucher, PhuongThucTT, TrangThaiHD, MAGOI)
    VALUES (v_MaHD, p_MaHV, p_MaNV, p_NgayBatDau, v_TongTien, p_MaVoucher, p_PhuongThucTT, 'Chưa thanh toán', p_MaGoi);

    INSERT INTO DANGKY_GOITAP (MaDK, MaHV, MaGoi, NgayBatDau, NgayKetThuc, MaHD, TrangThai)
    VALUES (v_MaDK, p_MaHV, p_MaGoi, p_NgayBatDau, v_NgayKetThuc, v_MaHD, 'Chưa kích hoạt');

    COMMIT;
END;
/