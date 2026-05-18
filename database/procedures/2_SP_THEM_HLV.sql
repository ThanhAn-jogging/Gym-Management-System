CREATE OR REPLACE PROCEDURE SP_THEM_HLV (
    p_MaPT IN VARCHAR2,
    p_MaNV IN VARCHAR2,
    p_ChuyenMon IN NVARCHAR2,
    p_BangCap IN NVARCHAR2,
    p_KinhNghiem IN NUMBER,
    p_Rating IN NUMBER
) AS
    v_ChucVu NVARCHAR2(100);
BEGIN
    SELECT CHUCVU INTO v_ChucVu 
    FROM NHANVIEN 
    WHERE MANV = p_MaNV;

    IF v_ChucVu <> N'Huấn luyện viên' THEN
        RAISE_APPLICATION_ERROR(-20001, N'Lỗi: Nhân viên này không có chức vụ là Huấn luyện viên!');
    END IF;

    INSERT INTO HUANLUYENVIEN (MAPT, MANV_LIENKET, CHUYENMON, BANGCAP, KINHNGHIEM, RATING)
    VALUES (p_MaPT, p_MaNV, p_ChuyenMon, p_BangCap, p_KinhNghiem, p_Rating);
    
    COMMIT;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20002, N'Lỗi: Không tìm thấy mã nhân viên này trong hệ thống!');
END;
/