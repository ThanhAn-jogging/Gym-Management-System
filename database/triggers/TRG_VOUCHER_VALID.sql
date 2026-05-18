CREATE OR REPLACE TRIGGER TRG_VOUCHER_VALID
BEFORE INSERT OR UPDATE ON HOADON
FOR EACH ROW
DECLARE
    v_NgayHetHan DATE;
    v_GiaTriMin NUMBER;
BEGIN
    IF :NEW.MaVoucher IS NOT NULL THEN
        SELECT NgayHetHan, GiaTriToiThieu INTO v_NgayHetHan, v_GiaTriMin 
        FROM VOUCHER WHERE MaVoucher = :NEW.MaVoucher;
        
        IF :NEW.NgayLap > v_NgayHetHan THEN
            RAISE_APPLICATION_ERROR(-20004, 'Lỗi: Voucher đã hết hạn sử dụng.');
        END IF;
        
        IF :NEW.TongTien < v_GiaTriMin THEN
            RAISE_APPLICATION_ERROR(-20005, 'Lỗi: Tổng tiền hóa đơn chưa đạt giá trị tối thiểu để áp dụng Voucher.');
        END IF;
    END IF;
END;
/