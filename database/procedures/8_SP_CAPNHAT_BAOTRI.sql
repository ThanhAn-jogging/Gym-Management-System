CREATE OR REPLACE PROCEDURE SP_CAPNHAT_BAOTRI (
    p_MaPhieuBT IN VARCHAR2,
    p_MaTB IN VARCHAR2,
    p_NgayBaoTri IN DATE,
    p_NoiDung IN NVARCHAR2,
    p_ChiPhi IN NUMBER,
    p_TinhTrangMay IN NVARCHAR2 -- Tham số phụ để báo cho DB biết đã sửa xong chưa
) AS
BEGIN
    UPDATE BAOTRI
    SET MATB = p_MaTB, NGAYBAOTRI = p_NgayBaoTri, NOIDUNG = p_NoiDung, CHIPHI = p_ChiPhi
    WHERE MAPHIEUBT = p_MaPhieuBT;

    -- Nếu giao diện gởi lệnh "Đã sửa xong" -> Cập nhật lại máy thành Hoạt động
    UPDATE THIETBI SET TINHTRANG = p_TinhTrangMay WHERE MATB = p_MaTB;
    
    COMMIT;
END;
/