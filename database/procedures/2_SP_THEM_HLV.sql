CREATE OR REPLACE PROCEDURE SP_THEM_HLV (
    p_MaPT IN VARCHAR2,
    p_MaNV IN VARCHAR2,
    p_ChuyenMon IN NVARCHAR2,
    p_BangCap IN NVARCHAR2,
    p_KinhNghiem IN NUMBER,
    p_Rating IN NUMBER,
    p_SoHocVien IN NUMBER
) AS
    v_ChucVu NVARCHAR2(100);
BEGIN
    -- 1. Tìm chức vụ của nhân viên này
    SELECT CHUCVU INTO v_ChucVu 
    FROM NHANVIEN 
    WHERE MANV = p_MaNV;

    -- 2. Kiểm tra nếu không phải là 'Huấn luyện viên' thì báo lỗi ngay
    IF v_ChucVu <> N'Huấn luyện viên' THEN
        RAISE_APPLICATION_ERROR(-20001, N'Lỗi: Nhân viên này không có chức vụ là Huấn luyện viên!');
    END IF;

    -- 3. Nếu đúng chức vụ thì mới tiến hành Insert
    INSERT INTO HUANLUYENVIEN (MAPT, MANV_LIENKET, CHUYENMON, BANGCAP, KINHNGHIEM, RATING, SOHOCVIEN)
    VALUES (p_MaPT, p_MaNV, p_ChuyenMon, p_BangCap, p_KinhNghiem, p_Rating, p_SoHocVien);
    
    COMMIT;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20002, N'Lỗi: Không tìm thấy mã nhân viên này trong hệ thống!');
END;
/