CREATE OR REPLACE PROCEDURE SP_CAPNHAT_GOITAP (
    p_MaGoi IN VARCHAR2,
    p_TenGoi IN NVARCHAR2,
    p_DonGia IN NUMBER,
    p_ThoiGianHieuLuc IN NUMBER,
    p_MoTa IN NVARCHAR2,
    p_QuyenGoiTap IN VARCHAR2
) AS
BEGIN
    IF p_DonGia < 0 THEN
        RAISE_APPLICATION_ERROR(-20001, N'Lỗi: Đơn giá không được nhỏ hơn 0!');
    END IF;
    IF p_ThoiGianHieuLuc <= 0 THEN
        RAISE_APPLICATION_ERROR(-20002, N'Lỗi: Thời gian hiệu lực phải lớn hơn 0!');
    END IF;

    UPDATE GOITAP
    SET TENGOI = p_TenGoi, DONGIA = p_DonGia, THOIGIANHIEULUC = p_ThoiGianHieuLuc,
        MOTA = p_MoTa, QUYENGOITAP = p_QuyenGoiTap
    WHERE MAGOI = p_MaGoi;

    COMMIT;
END;
/