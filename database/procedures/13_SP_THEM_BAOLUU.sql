CREATE OR REPLACE PROCEDURE SP_THEM_BAOLUU (
    p_MaDK IN VARCHAR2,
    p_NgayBatDau IN DATE,
    p_NgayKetThuc IN DATE,
    p_LyDo IN NVARCHAR2
) AS
    v_NgayBD_Goi DATE;
    v_NgayKT_Goi DATE;
    v_SoNgay NUMBER;
BEGIN
    IF p_NgayBatDau > p_NgayKetThuc THEN
        RAISE_APPLICATION_ERROR(-20001, 'Lỗi: Ngày bắt đầu nghỉ không được lớn hơn ngày kết thúc!');
    END IF;

    SELECT NgayBatDau, NgayKetThuc INTO v_NgayBD_Goi, v_NgayKT_Goi FROM DANGKY_GOITAP WHERE MaDK = p_MaDK;
    IF p_NgayBatDau < v_NgayBD_Goi OR p_NgayBatDau > v_NgayKT_Goi THEN
        RAISE_APPLICATION_ERROR(-20002, 'Lỗi: Ngày xin bảo lưu phải nằm trong thời hạn của gói tập!');
    END IF;

    v_SoNgay := p_NgayKetThuc - p_NgayBatDau;

    INSERT INTO BAOLUU (MaDK, NgayBatDauNghi, NgayKetThucNghi, LyDo)
    VALUES (p_MaDK, p_NgayBatDau, p_NgayKetThuc, p_LyDo);

    UPDATE DANGKY_GOITAP SET NgayKetThuc = NgayKetThuc + v_SoNgay WHERE MaDK = p_MaDK;
    COMMIT;
END;
/