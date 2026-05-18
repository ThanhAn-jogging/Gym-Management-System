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
    BEGIN
        SELECT MaDK INTO v_MaDK
        FROM DANGKY_GOITAP
        WHERE MaHV = p_MaHV 
          AND TRANGTHAI = N'Đang hoạt động' 
          AND TRUNC(NgayKetThuc) >= TRUNC(SYSDATE)
          AND ROWNUM = 1;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(-20031, N'Từ chối: Hội viên không có Gói tập nào đang hoạt động hoặc gói đã hết hạn!');
    END;


    SELECT COUNT(*) INTO v_DangBaoLuu
    FROM BAOLUU
    WHERE MaDK = v_MaDK 
      AND TRUNC(SYSDATE) >= TRUNC(NgayBatDauNghi) 
      AND TRUNC(SYSDATE) <= TRUNC(NgayKetThucNghi);

    IF v_DangBaoLuu > 0 THEN
        RAISE_APPLICATION_ERROR(-20032, N'Từ chối: Gói tập của khách ĐANG BỊ BẢO LƯU, không thể Check-in!');
    END IF;

    SELECT 'CI' || LPAD(NVL(MAX(TO_NUMBER(SUBSTR(MaCheckIn, 3))), 0) + 1, 3, '0') 
    INTO v_MaCheckIn 
    FROM CHECKIN;

    INSERT INTO CHECKIN(MaCheckIn, MaHV, MaDK, ThoiGianVao, ThoiGianRa) 
    VALUES (v_MaCheckIn, p_MaHV, v_MaDK, SYSDATE, NULL);

    COMMIT;
END;
/