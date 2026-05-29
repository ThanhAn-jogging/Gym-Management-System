CREATE OR REPLACE PROCEDURE SP_DANGKY_LOPHOC (
    p_MaHV IN VARCHAR2,
    p_MaLop IN VARCHAR2
) AS
    v_HienTai NUMBER;
    v_ToiDa NUMBER;
    v_LoaiLop LOPHOC.LoaiLop%TYPE;  
    v_QuyenHopLe NUMBER;
    v_DaDangKy NUMBER;
BEGIN
    SELECT NVL(SoLuongHienTai, 0), NVL(SoLuongToiDa, 0), LoaiLop
    INTO v_HienTai, v_ToiDa, v_LoaiLop
    FROM LOPHOC
    WHERE MaLop = p_MaLop
    FOR UPDATE;

    DBMS_SESSION.SLEEP(5);

    SELECT COUNT(*) INTO v_DaDangKy FROM DANGKY_LOPHOC WHERE MaHV = p_MaHV AND MaLop = p_MaLop;
    IF v_DaDangKy > 0 THEN
        RAISE_APPLICATION_ERROR(-20004, N'Lỗi: Hội viên này đã ghi danh vào lớp này rồi!');
    END IF;

    IF v_HienTai >= v_ToiDa THEN
        RAISE_APPLICATION_ERROR(-20001, N'Lỗi: Lớp học này đã đạt giới hạn tối đa (' || v_ToiDa || N' người).');
    END IF;

    SELECT COUNT(*)
    INTO v_QuyenHopLe
    FROM DANGKY_GOITAP dk
    JOIN GOITAP gt ON dk.MaGoi = gt.MaGoi
    WHERE dk.MaHV = p_MaHV
      AND dk.TRANGTHAI = N'Đang hoạt động'
      AND (gt.QuyenGoiTap = v_LoaiLop OR gt.QuyenGoiTap = 'ALL'); 

    IF v_QuyenHopLe = 0 THEN
        RAISE_APPLICATION_ERROR(-20003, N'Từ chối: Hội viên không có Gói tập đang hoạt động hỗ trợ môn ' || v_LoaiLop || '!');
    END IF;

    INSERT INTO DANGKY_LOPHOC (MaHV, MaLop, NgayDangKy)
    VALUES (p_MaHV, p_MaLop, TRUNC(SYSDATE));
    
    UPDATE LOPHOC SET SoLuongHienTai = v_HienTai + 1 WHERE MaLop = p_MaLop;
    
    COMMIT;
END;
/