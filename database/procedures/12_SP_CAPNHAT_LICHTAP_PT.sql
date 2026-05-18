CREATE OR REPLACE PROCEDURE SP_CAPNHAT_LICHTAP_PT (
    p_MaLich IN VARCHAR2,
    p_MaHV IN VARCHAR2,
    p_MaPT IN VARCHAR2,
    p_NgayTap IN DATE,
    p_KhungGio IN VARCHAR2,
    p_TrangThai IN VARCHAR2
) AS
    v_CountPT NUMBER;
    v_CountHV NUMBER;
    v_CountLop NUMBER;
    v_DayOfWeek VARCHAR2(10);
    v_ThuVN VARCHAR2(20);
BEGIN
    -- Nếu người ta chuyển sang 'Đã hủy' thì cho qua luôn, không cần check trùng lịch nữa
    IF p_TrangThai != 'Đã hủy' THEN
        v_DayOfWeek := TO_CHAR(p_NgayTap, 'DY', 'NLS_DATE_LANGUAGE=ENGLISH');
        v_ThuVN := CASE v_DayOfWeek
            WHEN 'MON' THEN '2' WHEN 'TUE' THEN '3' WHEN 'WED' THEN '4'
            WHEN 'THU' THEN '5' WHEN 'FRI' THEN '6' WHEN 'SAT' THEN '7' WHEN 'SUN' THEN 'Chủ Nhật'
        END;

        -- 1. Trùng Lớp học
        SELECT COUNT(*) INTO v_CountLop FROM LOPHOC
        WHERE MAPT = p_MaPT AND KHUNGGIO = p_KhungGio
          AND (UPPER(NGAYTAP) LIKE '%' || UPPER(v_ThuVN) || '%' OR UPPER(NGAYTAP) LIKE '%HẰNG NGÀY%');
        IF v_CountLop > 0 THEN
            RAISE_APPLICATION_ERROR(-20003, 'Lỗi: Huấn luyện viên đang kẹt dạy Lớp Học vào khung giờ này!');
        END IF;

        -- 2. Trùng PT (Loại trừ chính cái lịch đang sửa)
        SELECT COUNT(*) INTO v_CountPT FROM LICHTAP_PT 
        WHERE MaPT = p_MaPT AND NgayTap = p_NgayTap AND KhungGio = p_KhungGio 
          AND TrangThaiBuoiTap != 'Đã hủy' AND MaLich != p_MaLich;
        IF v_CountPT > 0 THEN
            RAISE_APPLICATION_ERROR(-20001, 'Lỗi: Huấn luyện viên đã có lịch dạy cá nhân khác!');
        END IF;

        -- 3. Trùng HV (Loại trừ chính cái lịch đang sửa)
        SELECT COUNT(*) INTO v_CountHV FROM LICHTAP_PT 
        WHERE MaHV = p_MaHV AND NgayTap = p_NgayTap AND KhungGio = p_KhungGio 
          AND TrangThaiBuoiTap != 'Đã hủy' AND MaLich != p_MaLich;
        IF v_CountHV > 0 THEN
            RAISE_APPLICATION_ERROR(-20002, 'Lỗi: Hội viên này đã bị trùng lịch tập khác!');
        END IF;
    END IF;

    -- UPDATE DỮ LIỆU
    UPDATE LICHTAP_PT
    SET MaHV = p_MaHV, MaPT = p_MaPT, NgayTap = p_NgayTap, KhungGio = p_KhungGio, TrangThaiBuoiTap = p_TrangThai
    WHERE MaLich = p_MaLich;

    COMMIT;
END;
/