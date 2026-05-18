CREATE OR REPLACE FUNCTION F_TINH_CHI_PHI_BAO_TRI_MAY (
    p_MaTB IN VARCHAR2
) RETURN NUMBER AS
    v_TongChiPhi NUMBER := 0;
    v_CheckTonTai NUMBER := 0;
BEGIN
    -- [2] Kiểm tra sự tồn tại thực tế của máy móc thiết bị trong kho
    SELECT COUNT(*) INTO v_CheckTonTai FROM THIETBI WHERE MaTB = p_MaTB;
    IF v_CheckTonTai = 0 THEN
        RETURN 0;
    END IF;

    -- [3] Thực hiện tính toán gom tổng chi phí tài chính sửa chữa lũy kế
    SELECT NVL(SUM(ChiPhi), 0) INTO v_TongChiPhi 
    FROM BAOTRI 
    WHERE MaTB = p_MaTB;

    -- [4] Trả về kết quả tổng tiền chi phí bảo dưỡng kỹ thuật
    RETURN v_TongChiPhi;
END;
/