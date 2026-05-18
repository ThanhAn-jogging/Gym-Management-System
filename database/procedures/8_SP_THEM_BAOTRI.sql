CREATE OR REPLACE PROCEDURE SP_THEM_BAOTRI (
    p_MaTB IN VARCHAR2,
    p_NgayBaoTri IN DATE,
    p_NoiDung IN NVARCHAR2,
    p_ChiPhi IN NUMBER
) AS
    v_NewMaPhieu VARCHAR2(10);
BEGIN
    -- Sinh mã tự động
    v_NewMaPhieu := 'BT' || LPAD(SEQ_BAOTRI.NEXTVAL, 3, '0');
    
    INSERT INTO BAOTRI (MAPHIEUBT, MATB, NGAYBAOTRI, NOIDUNG, CHIPHI)
    VALUES (v_NewMaPhieu, p_MaTB, p_NgayBaoTri, p_NoiDung, p_ChiPhi);
    COMMIT;
END;
/