CREATE TABLE VOUCHER (
    MaVoucher VARCHAR2(20),
    TenVoucher NVARCHAR2(100),
    LoaiVoucher NVARCHAR2(50),
    PhanTramGiam NUMBER(5, 2),
    NgayHetHan DATE,
    GiaTriToiThieu NUMBER(15, 2),
    CONSTRAINT PK_VOUCHER PRIMARY KEY (MaVoucher)
);