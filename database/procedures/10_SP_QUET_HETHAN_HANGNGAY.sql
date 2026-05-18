-- 1. Viết Procedure thực hiện hành động quét và cập nhật
CREATE OR REPLACE PROCEDURE SP_QUET_HETHAN_HANGNGAY AS
BEGIN
    -- Tìm những ông đang hoạt động mà ngày kết thúc nhỏ hơn ngày hôm nay thì khóa lại
    UPDATE DANGKY_GOITAP
    SET TRANGTHAI = N'Hết hạn'
    WHERE TRANGTHAI = N'Đang hoạt động' 
      AND TRUNC(NGAYKETTHUC) < TRUNC(SYSDATE);

    COMMIT;
END;
/

-- 2. Cài đặt "Báo thức" (Job) cho Oracle tự chạy Procedure trên lúc 00:00 hàng đêm
BEGIN
    -- Xóa job cũ nếu lỡ trùng tên
    BEGIN DBMS_SCHEDULER.DROP_JOB('JOB_AUTO_UPDATE_STATUS'); EXCEPTION WHEN OTHERS THEN NULL; END;

    DBMS_SCHEDULER.CREATE_JOB (
        job_name        => 'JOB_AUTO_UPDATE_STATUS',
        job_type        => 'STORED_PROCEDURE',
        job_action      => 'SP_QUET_HETHAN_HANGNGAY',
        start_date      => TRUNC(SYSDATE) + 1, -- Bắt đầu chạy từ 00:00 đêm nay
        repeat_interval => 'FREQ=DAILY; BYHOUR=0; BYMINUTE=0; BYSECOND=0', -- Lặp lại HẰNG NGÀY lúc 00:00:00
        enabled         => TRUE, -- Kích hoạt cho chạy luôn
        comments        => 'Tu dong doi trang thai goi tap sang Het han vao nua dem'
    );
END;
/