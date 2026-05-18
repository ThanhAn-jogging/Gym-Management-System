CREATE OR REPLACE PROCEDURE SP_CHECKIN_HOIVIEN (
    p_MaCheckIn IN VARCHAR2,
    p_MaHV IN VARCHAR2,
    p_MaDK IN VARCHAR2
)
AS
    v_MaDK VARCHAR2(10);
    v_MaCheckIn VARCHAR2(10);
    v_DangBaoLuu NUMBER;
BEGIN
    -- [BƯỚC 1]: KIỂM TRA TÌNH TRẠNG GÓI TẬP CỦA KHÁCH
    BEGIN
        SELECT MaDK INTO v_MaDK
        FROM DANGKY_GOITAP
        WHERE MaHV = p_MaHV 
          AND TRANGTHAI = N'Đang hoạt động' 
          -- Dùng TRUNC để cắt bỏ giờ/phút/giây, so sánh cực chuẩn ngày hôm nay
          AND TRUNC(NgayKetThuc) >= TRUNC(SYSDATE)
          AND ROWNUM = 1;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(-20031, N'Từ chối: Hội viên không có Gói tập nào đang hoạt động hoặc gói đã hết hạn!');
    END;

    -- [BƯỚC 2]: KIỂM TRA ĐÓNG BĂNG (BẢO LƯU) - BAO GỒM CẢ NGÀY HÔM NAY
    -- Đếm xem có phiếu bảo lưu nào mà ngày hôm nay nằm trong vùng nghỉ không
    SELECT COUNT(*) INTO v_DangBaoLuu
    FROM BAOLUU
    WHERE MaDK = v_MaDK 
      AND TRUNC(SYSDATE) >= TRUNC(NgayBatDauNghi) 
      AND TRUNC(SYSDATE) <= TRUNC(NgayKetThucNghi);

    -- Nếu v_DangBaoLuu > 0 nghĩa là phát hiện đang nghỉ, giơ bảng cấm ngay!
    IF v_DangBaoLuu > 0 THEN
        RAISE_APPLICATION_ERROR(-20032, N'Từ chối: Gói tập của khách ĐANG BỊ BẢO LƯU, không thể Check-in!');
    END IF;

    -- [BƯỚC 3]: TỰ ĐỘNG SINH MÃ CHECK-IN TĂNG DẦN (CI001, CI002...)
    SELECT 'CI' || LPAD(NVL(MAX(TO_NUMBER(SUBSTR(MaCheckIn, 3))), 0) + 1, 3, '0') 
    INTO v_MaCheckIn 
    FROM CHECKIN;

    -- [BƯỚC 4]: MỞ CỬA CHO VÀO (LƯU XUỐNG DB)
    INSERT INTO CHECKIN(MaCheckIn, MaHV, MaDK, ThoiGianVao, ThoiGianRa) 
    VALUES (v_MaCheckIn, p_MaHV, v_MaDK, SYSDATE, NULL);

    COMMIT;
END;
/