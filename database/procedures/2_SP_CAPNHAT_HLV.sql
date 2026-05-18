CREATE OR REPLACE PROCEDURE SP_CAPNHAT_HLV (
    p_MaPT IN VARCHAR2,
    p_MaNV IN VARCHAR2,
    p_ChuyenMon IN NVARCHAR2,
    p_BangCap IN NVARCHAR2,
    p_KinhNghiem IN NUMBER,
    p_Rating IN NUMBER
) AS
BEGIN
    UPDATE HUANLUYENVIEN
    SET MANV_LIENKET = p_MaNV,
        CHUYENMON = p_ChuyenMon,
        BANGCAP = p_BangCap,
        KINHNGHIEM = p_KinhNghiem,
        RATING = p_Rating
    WHERE MAPT = p_MaPT;
    COMMIT;
END;
/