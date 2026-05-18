-- 1. Viết Procedure thực hiện hành động quét và cập nhật
CREATE OR REPLACE PROCEDURE SP_QUET_HETHAN_HANGNGAY AS
BEGIN
    UPDATE DANGKY_GOITAP
    SET TRANGTHAI = N'Hết hạn'
    WHERE TRANGTHAI = N'Đang hoạt động' 
      AND TRUNC(NGAYKETTHUC) < TRUNC(SYSDATE);

    COMMIT;
END;
/

BEGIN
    BEGIN DBMS_SCHEDULER.DROP_JOB('JOB_AUTO_UPDATE_STATUS'); EXCEPTION WHEN OTHERS THEN NULL; END;

    DBMS_SCHEDULER.CREATE_JOB (
        job_name        => 'JOB_AUTO_UPDATE_STATUS',
        job_type        => 'STORED_PROCEDURE',
        job_action      => 'SP_QUET_HETHAN_HANGNGAY',
        start_date      => TRUNC(SYSDATE) + 1,
        repeat_interval => 'FREQ=DAILY; BYHOUR=0; BYMINUTE=0; BYSECOND=0', 
        enabled         => TRUE, 
        comments        => 'Tu dong doi trang thai goi tap sang Het han vao nua dem'
    );
END;
/