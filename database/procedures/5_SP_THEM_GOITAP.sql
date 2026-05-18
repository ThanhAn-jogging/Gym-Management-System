CREATE OR REPLACE PROCEDURE SP_THEM_GOITAP (
    p_TenGoi IN NVARCHAR2,
    p_DonGia IN NUMBER,
    p_ThoiGianHieuLuc IN NUMBER,
    p_MoTa IN NVARCHAR2,
    p_QuyenGoiTap IN VARCHAR2
) AS
    v_NewMaGoi VARCHAR2(10);
BEGIN
    IF p_DonGia < 0 THEN
        RAISE_APPLICATION_ERROR(-20001, N'Lỗi: Đơn giá không được nhỏ hơn 0!');
    END IF;
    IF p_ThoiGianHieuLuc <= 0 THEN
        RAISE_APPLICATION_ERROR(-20002, N'Lỗi: Thời gian hiệu lực phải lớn hơn 0!');
    END IF;

    v_NewMaGoi := 'GT' || LPAD(SEQ_GOITAP.NEXTVAL, 3, '0');

    INSERT INTO GOITAP (MAGOI, TENGOI, DONGIA, THOIGIANHIEULUC, MOTA, QUYENGOITAP)
    VALUES (v_NewMaGoi, p_TenGoi, p_DonGia, p_ThoiGianHieuLuc, p_MoTa, p_QuyenGoiTap);

    COMMIT;
END;
/