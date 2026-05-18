CREATE OR REPLACE PROCEDURE SP_SUA_BAOLUU (
    p_MaBaoLuu IN VARCHAR2,
    p_MaDK IN VARCHAR2,
    p_NgayBatDau_Moi IN DATE,
    p_NgayKetThuc_Moi IN DATE,
    p_LyDo IN NVARCHAR2
) AS
    v_NgayBatDau_Cu DATE;
    v_NgayKetThuc_Cu DATE;
    v_SoNgay_Cu NUMBER;
    v_SoNgay_Moi NUMBER;
BEGIN
    IF p_NgayBatDau_Moi > p_NgayKetThuc_Moi THEN
        RAISE_APPLICATION_ERROR(-20001, 'Lỗi: Ngày bắt đầu nghỉ không được lớn hơn ngày kết thúc!');
    END IF;

    SELECT NgayBatDauNghi, NgayKetThucNghi INTO v_NgayBatDau_Cu, v_NgayKetThuc_Cu
    FROM BAOLUU WHERE MaBaoLuu = p_MaBaoLuu;

    v_SoNgay_Cu := v_NgayKetThuc_Cu - v_NgayBatDau_Cu;
    v_SoNgay_Moi := p_NgayKetThuc_Moi - p_NgayBatDau_Moi;

    UPDATE DANGKY_GOITAP SET NgayKetThuc = NgayKetThuc - v_SoNgay_Cu + v_SoNgay_Moi WHERE MaDK = p_MaDK;
    
    UPDATE BAOLUU SET MaDK = p_MaDK, NgayBatDauNghi = p_NgayBatDau_Moi, NgayKetThucNghi = p_NgayKetThuc_Moi, LyDo = p_LyDo
    WHERE MaBaoLuu = p_MaBaoLuu;
    COMMIT;
END;
/