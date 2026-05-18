CREATE OR REPLACE TRIGGER TRG_UPDATE_MEMBERSHIP
AFTER INSERT OR UPDATE OR DELETE ON HOADON
FOR EACH ROW
DECLARE
    v_ChenhLech NUMBER := 0;
    v_MaHV VARCHAR2(10);
BEGIN
    IF INSERTING THEN
        v_ChenhLech := :NEW.TongTien;
        v_MaHV := :NEW.MaHV;
    ELSIF UPDATING THEN
        -- Chỉ cộng/trừ phần tiền chênh lệch khi đổi gói hoặc đổi voucher
        v_ChenhLech := :NEW.TongTien - :OLD.TongTien;
        v_MaHV := :NEW.MaHV;
    ELSIF DELETING THEN
        -- Hoàn lại tiền chi tiêu khi xóa hóa đơn
        v_ChenhLech := - :OLD.TongTien;
        v_MaHV := :OLD.MaHV;
    END IF;

    -- Cập nhật Tổng chi tiêu
    UPDATE HOIVIEN 
    SET TongChiTieu = GREATEST(NVL(TongChiTieu, 0) + v_ChenhLech, 0)
    WHERE MaHV = v_MaHV;
    
    -- Cập nhật Hạng TV ngay lập tức
    UPDATE HOIVIEN
    SET HangTV = CASE 
        WHEN (NVL(TongChiTieu, 0)) >= 20000000 THEN 'Platinum'
        WHEN (NVL(TongChiTieu, 0)) >= 10000000 THEN 'Gold'
        ELSE 'Silver'
    END
    WHERE MaHV = v_MaHV;
END;
/