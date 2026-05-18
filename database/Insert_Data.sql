DELETE FROM TAIKHOAN;
DELETE FROM BAOTRI;
DELETE FROM CHECKIN;
DELETE FROM BAOLUU;
DELETE FROM DANGKY_LOPHOC;
DELETE FROM LICHTAP_PT;
DELETE FROM DANGKY_GOITAP;
DELETE FROM HOADON;
DELETE FROM LOPHOC;
DELETE FROM HUANLUYENVIEN;
DELETE FROM NHANVIEN;
DELETE FROM HOIVIEN;
DELETE FROM THIETBI;
DELETE FROM VOUCHER;
DELETE FROM GOITAP;

INSERT INTO GOITAP (TenGoi, ThoiGianHieuLuc, DonGia, MoTa, QuyenGoiTap) VALUES ('Gói Trải Nghiệm 1 Tháng', 30, 500000, 'Gói tập cơ bản không kèm dịch vụ PT', 'GYM');
INSERT INTO GOITAP (TenGoi, ThoiGianHieuLuc, DonGia, MoTa, QuyenGoiTap) VALUES ('Gói Tiết Kiệm 3 Tháng', 90, 1350000, 'Tiết kiệm 10% so với gói tháng', 'GYM');
INSERT INTO GOITAP (TenGoi, ThoiGianHieuLuc, DonGia, MoTa, QuyenGoiTap) VALUES ('Gói Tiêu Chuẩn 6 Tháng', 180, 2500000, 'Gói tập chuẩn, sử dụng mọi thiết bị', 'GYM');
INSERT INTO GOITAP (TenGoi, ThoiGianHieuLuc, DonGia, MoTa, QuyenGoiTap) VALUES ('Gói Hội Viên 1 Năm', 365, 4500000, 'Miễn phí tủ đồ và khăn tắm', 'ALL');
INSERT INTO GOITAP (TenGoi, ThoiGianHieuLuc, DonGia, MoTa, QuyenGoiTap) VALUES ('Gói Sinh Viên VIP', 30, 300000, 'Chỉ áp dụng cho sinh viên có thẻ', 'ALL');
INSERT INTO GOITAP (TenGoi, ThoiGianHieuLuc, DonGia, MoTa, QuyenGoiTap) VALUES ('Gói Weekend Năng Động', 30, 200000, 'Chỉ tập vào Thứ 7 và Chủ Nhật', 'GYM');
INSERT INTO GOITAP (TenGoi, ThoiGianHieuLuc, DonGia, MoTa, QuyenGoiTap) VALUES ('Gói Combo Bạn Bè 3 Tháng', 90, 2200000, 'Gói cho 2 người đăng ký cùng lúc', 'GYM');
INSERT INTO GOITAP (TenGoi, ThoiGianHieuLuc, DonGia, MoTa, QuyenGoiTap) VALUES ('Gói Tập Sáng', 30, 350000, 'Khung giờ từ 5h00 đến 12h00 trưa', 'GYM');
INSERT INTO GOITAP (TenGoi, ThoiGianHieuLuc, DonGia, MoTa, QuyenGoiTap) VALUES ('Gói Yoga Cơ Bản', 30, 600000, 'Bao gồm các lớp Yoga buổi tối', 'YOGA');
INSERT INTO GOITAP (TenGoi, ThoiGianHieuLuc, DonGia, MoTa, QuyenGoiTap) VALUES ('Gói Boxing Combat', 60, 1500000, 'Gói chuyên sâu võ thuật', 'BOXING');
INSERT INTO GOITAP (TenGoi, ThoiGianHieuLuc, DonGia, MoTa, QuyenGoiTap) VALUES ('Gói Cardio Burn', 30, 550000, 'Chỉ dùng khu vực Cardio', 'CARDIO');
INSERT INTO GOITAP (TenGoi, ThoiGianHieuLuc, DonGia, MoTa, QuyenGoiTap) VALUES ('Gói Muscle Up 3 Tháng', 90, 1600000, 'Khu vực tạ tự do', 'GYM');
INSERT INTO GOITAP (TenGoi, ThoiGianHieuLuc, DonGia, MoTa, QuyenGoiTap) VALUES ('Gói Thể Hình Nữ', 30, 400000, 'Gói ưu đãi thiết kế riêng cho phái nữ', 'GYM');
INSERT INTO GOITAP (TenGoi, ThoiGianHieuLuc, DonGia, MoTa, QuyenGoiTap) VALUES ('Gói Vip 2 Năm', 730, 8000000, 'Khách hàng VIP, phục vụ 24/7', 'ALL');
INSERT INTO GOITAP (TenGoi, ThoiGianHieuLuc, DonGia, MoTa, QuyenGoiTap) VALUES ('Gói Family', 365, 12000000, 'Gói dành cho gia đình 4 người', 'ALL');
INSERT INTO GOITAP (TenGoi, ThoiGianHieuLuc, DonGia, MoTa, QuyenGoiTap) VALUES ('Gói Tập Nhanh 1 Tuần', 7, 150000, 'Gói cho khách du lịch', 'GYM');
INSERT INTO GOITAP (TenGoi, ThoiGianHieuLuc, DonGia, MoTa, QuyenGoiTap) VALUES ('Gói Phục Hồi', 30, 800000, 'Gói tập nhẹ, hỗ trợ chức năng', 'GYM');
INSERT INTO GOITAP (TenGoi, ThoiGianHieuLuc, DonGia, MoTa, QuyenGoiTap) VALUES ('Gói Doanh Nghiệp', 365, 10000000, 'Dành cho nhóm 5 nhân viên', 'ALL');
INSERT INTO GOITAP (TenGoi, ThoiGianHieuLuc, DonGia, MoTa, QuyenGoiTap) VALUES ('Gói Nâng Cao PT', 30, 2000000, 'Kèm PT 3 buổi/tuần', 'GYM');
INSERT INTO GOITAP (TenGoi, ThoiGianHieuLuc, DonGia, MoTa, QuyenGoiTap) VALUES ('Gói Dùng Thử 1 Ngày', 1, 50000, 'Trải nghiệm toàn bộ phòng tập', 'GYM');

COMMIT;

INSERT INTO NHANVIEN (HoTen, NgaySinh, GioiTinh, SDT, DiaChi, ChucVu, LuongCB, NgayVaoLam) VALUES ('Hoàng Văn Thái', TO_DATE('1990-05-15', 'YYYY-MM-DD'), 'Nam', '0901111222', 'Quận 1, TP.HCM', 'Quản lý', 15000000, TO_DATE('2020-01-10', 'YYYY-MM-DD'));
INSERT INTO NHANVIEN (HoTen, NgaySinh, GioiTinh, SDT, DiaChi, ChucVu, LuongCB, NgayVaoLam) VALUES ('Lê Thị Thu Thủy', TO_DATE('1995-10-20', 'YYYY-MM-DD'), 'Nữ', '0912222333', 'Dĩ An, Bình Dương', 'Lễ tân', 7000000, TO_DATE('2022-03-15', 'YYYY-MM-DD'));
INSERT INTO NHANVIEN (HoTen, NgaySinh, GioiTinh, SDT, DiaChi, ChucVu, LuongCB, NgayVaoLam) VALUES ('Nguyễn Tấn Đạt', TO_DATE('1998-02-28', 'YYYY-MM-DD'), 'Nam', '0923333444', 'Thủ Đức, TP.HCM', 'Bảo vệ', 6500000, TO_DATE('2023-05-05', 'YYYY-MM-DD'));
INSERT INTO NHANVIEN (HoTen, NgaySinh, GioiTinh, SDT, DiaChi, ChucVu, LuongCB, NgayVaoLam) VALUES ('Trần Ngọc Trâm', TO_DATE('1997-12-05', 'YYYY-MM-DD'), 'Nữ', '0934444555', 'Quận 9, TP.HCM', 'Lễ tân', 7000000, TO_DATE('2022-08-20', 'YYYY-MM-DD'));
INSERT INTO NHANVIEN (HoTen, NgaySinh, GioiTinh, SDT, DiaChi, ChucVu, LuongCB, NgayVaoLam) VALUES ('Đinh Hữu Phước', TO_DATE('1992-07-12', 'YYYY-MM-DD'), 'Nam', '0945555666', 'Biên Hòa, Bình Dương', 'Nhân viên Sale', 8000000, TO_DATE('2021-11-11', 'YYYY-MM-DD'));
INSERT INTO NHANVIEN (HoTen, NgaySinh, GioiTinh, SDT, DiaChi, ChucVu, LuongCB, NgayVaoLam) VALUES ('Phạm Minh Châu', TO_DATE('2000-04-18', 'YYYY-MM-DD'), 'Nữ', '0956666777', 'Quận 2, TP.HCM', 'Nhân viên Sale', 8000000, TO_DATE('2024-02-10', 'YYYY-MM-DD'));
INSERT INTO NHANVIEN (HoTen, NgaySinh, GioiTinh, SDT, DiaChi, ChucVu, LuongCB, NgayVaoLam) VALUES ('Vũ Đức Trường', TO_DATE('1994-09-09', 'YYYY-MM-DD'), 'Nam', '0967777888', 'Gò Vấp, TP.HCM', 'Huấn luyện viên', 12000000, TO_DATE('2021-06-01', 'YYYY-MM-DD'));
INSERT INTO NHANVIEN (HoTen, NgaySinh, GioiTinh, SDT, DiaChi, ChucVu, LuongCB, NgayVaoLam) VALUES ('Ngô Lan Hương', TO_DATE('1996-01-25', 'YYYY-MM-DD'), 'Nữ', '0978888999', 'Quận Bình Thạnh, TP.HCM', 'Huấn luyện viên', 11000000, TO_DATE('2023-01-15', 'YYYY-MM-DD'));
INSERT INTO NHANVIEN (HoTen, NgaySinh, GioiTinh, SDT, DiaChi, ChucVu, LuongCB, NgayVaoLam) VALUES ('Lý Tấn Phong', TO_DATE('1991-11-30', 'YYYY-MM-DD'), 'Nam', '0989999000', 'Quận 10, TP.HCM', 'Huấn luyện viên', 13000000, TO_DATE('2020-09-10', 'YYYY-MM-DD'));
INSERT INTO NHANVIEN (HoTen, NgaySinh, GioiTinh, SDT, DiaChi, ChucVu, LuongCB, NgayVaoLam) VALUES ('Đỗ Thanh Tú', TO_DATE('1985-08-14', 'YYYY-MM-DD'), 'Nữ', '0990000111', 'Quận 3, TP.HCM', 'Tạp vụ', 6000000, TO_DATE('2019-12-01', 'YYYY-MM-DD'));
INSERT INTO NHANVIEN (HoTen, NgaySinh, GioiTinh, SDT, DiaChi, ChucVu, LuongCB, NgayVaoLam) VALUES ('Bùi Xuân Hải', TO_DATE('1988-03-03', 'YYYY-MM-DD'), 'Nam', '0902222333', 'Quận Tân Bình, TP.HCM', 'Bảo vệ', 6500000, TO_DATE('2021-04-20', 'YYYY-MM-DD'));
INSERT INTO NHANVIEN (HoTen, NgaySinh, GioiTinh, SDT, DiaChi, ChucVu, LuongCB, NgayVaoLam) VALUES ('Hà Bích Ngọc', TO_DATE('1999-06-22', 'YYYY-MM-DD'), 'Nữ', '0913333444', 'Quận Phú Nhuận, TP.HCM', 'Lễ tân', 7000000, TO_DATE('2024-01-05', 'YYYY-MM-DD'));
INSERT INTO NHANVIEN (HoTen, NgaySinh, GioiTinh, SDT, DiaChi, ChucVu, LuongCB, NgayVaoLam) VALUES ('Đoàn Nhật Nam', TO_DATE('1993-10-10', 'YYYY-MM-DD'), 'Nam', '0924444555', 'Dĩ An, Bình Dương', 'Kỹ thuật viên', 9000000, TO_DATE('2022-07-15', 'YYYY-MM-DD'));
INSERT INTO NHANVIEN (HoTen, NgaySinh, GioiTinh, SDT, DiaChi, ChucVu, LuongCB, NgayVaoLam) VALUES ('Phan Quỳnh Anh', TO_DATE('1995-12-18', 'YYYY-MM-DD'), 'Nữ', '0935555666', 'Thủ Đức, TP.HCM', 'Huấn luyện viên', 11500000, TO_DATE('2023-08-01', 'YYYY-MM-DD'));
INSERT INTO NHANVIEN (HoTen, NgaySinh, GioiTinh, SDT, DiaChi, ChucVu, LuongCB, NgayVaoLam) VALUES ('Trương Vĩnh Phát', TO_DATE('1990-02-14', 'YYYY-MM-DD'), 'Nam', '0946666777', 'Quận 4, TP.HCM', 'Kế toán', 10000000, TO_DATE('2020-05-12', 'YYYY-MM-DD'));
INSERT INTO NHANVIEN (HoTen, NgaySinh, GioiTinh, SDT, DiaChi, ChucVu, LuongCB, NgayVaoLam) VALUES ('Tạ Thanh Sang', TO_DATE('1997-05-25', 'YYYY-MM-DD'), 'Nam', '0957777888', 'Quận 5, TP.HCM', 'Huấn luyện viên', 10500000, TO_DATE('2022-11-20', 'YYYY-MM-DD'));
INSERT INTO NHANVIEN (HoTen, NgaySinh, GioiTinh, SDT, DiaChi, ChucVu, LuongCB, NgayVaoLam) VALUES ('Lâm Diệu Nhi', TO_DATE('2001-09-08', 'YYYY-MM-DD'), 'Nữ', '0968888999', 'Quận 7, TP.HCM', 'Nhân viên Sale', 8000000, TO_DATE('2024-03-01', 'YYYY-MM-DD'));
INSERT INTO NHANVIEN (HoTen, NgaySinh, GioiTinh, SDT, DiaChi, ChucVu, LuongCB, NgayVaoLam) VALUES ('Vương Trí Hùng', TO_DATE('1989-11-11', 'YYYY-MM-DD'), 'Nam', '0979999000', 'Bình Chánh, TP.HCM', 'Kỹ thuật viên', 9000000, TO_DATE('2021-08-10', 'YYYY-MM-DD'));
INSERT INTO NHANVIEN (HoTen, NgaySinh, GioiTinh, SDT, DiaChi, ChucVu, LuongCB, NgayVaoLam) VALUES ('Mai Thu Huyền', TO_DATE('1986-04-04', 'YYYY-MM-DD'), 'Nữ', '0980000111', 'Nhà Bè, TP.HCM', 'Tạp vụ', 6000000, TO_DATE('2019-10-15', 'YYYY-MM-DD'));
INSERT INTO NHANVIEN (HoTen, NgaySinh, GioiTinh, SDT, DiaChi, ChucVu, LuongCB, NgayVaoLam) VALUES ('Châu Kiến Quốc', TO_DATE('1998-12-20', 'YYYY-MM-DD'), 'Nam', '0991111222', 'Quận 8, TP.HCM', 'Bảo vệ', 6500000, TO_DATE('2023-09-05', 'YYYY-MM-DD'));

COMMIT;

INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Máy Chạy Bộ Kingsport', 'Cardio', TO_DATE('2022-01-10', 'YYYY-MM-DD'), 'Hoạt động', 'Khu Cardio Tầng 1');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Máy Đạp Xe Elip', 'Cardio', TO_DATE('2022-01-12', 'YYYY-MM-DD'), 'Hoạt động', 'Khu Cardio Tầng 1');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Máy Trượt Tuyết', 'Cardio', TO_DATE('2022-02-15', 'YYYY-MM-DD'), 'Hoạt động', 'Khu Cardio Tầng 1');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Giàn Tạ Đa Năng', 'Tạ khối', TO_DATE('2022-03-20', 'YYYY-MM-DD'), 'Hoạt động', 'Khu Thể Hình Tầng 2');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Máy Đẩy Ngực Ngang', 'Tạ khối', TO_DATE('2022-04-05', 'YYYY-MM-DD'), 'Bảo trì', 'Khu Thể Hình Tầng 2');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Máy Kéo Xô Dài', 'Tạ khối', TO_DATE('2022-04-10', 'YYYY-MM-DD'), 'Hoạt động', 'Khu Thể Hình Tầng 2');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Máy Tập Đùi Trước', 'Tạ khối', TO_DATE('2022-05-15', 'YYYY-MM-DD'), 'Hoạt động', 'Khu Thể Hình Tầng 2');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Máy Tập Đùi Sau', 'Tạ khối', TO_DATE('2022-05-20', 'YYYY-MM-DD'), 'Hoạt động', 'Khu Thể Hình Tầng 2');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Ghế Đẩy Ngực Dốc Lên', 'Tạ tự do', TO_DATE('2022-06-10', 'YYYY-MM-DD'), 'Hoạt động', 'Khu Tạ Tự Do Tầng 2');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Ghế Tập Bụng', 'Tạ tự do', TO_DATE('2022-06-15', 'YYYY-MM-DD'), 'Hư hỏng', 'Khu Tạ Tự Do Tầng 2');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Giá Đỡ Thanh Đòn', 'Tạ tự do', TO_DATE('2022-07-05', 'YYYY-MM-DD'), 'Hoạt động', 'Khu Tạ Tự Do Tầng 2');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Bộ Tạ Tay Ziva 5-30kg', 'Tạ tự do', TO_DATE('2022-08-10', 'YYYY-MM-DD'), 'Hoạt động', 'Khu Tạ Tay Tầng 2');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Thảm Tập Yoga Đỏ', 'Phụ kiện', TO_DATE('2023-01-15', 'YYYY-MM-DD'), 'Hoạt động', 'Phòng Yoga Tầng 3');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Thảm Tập Yoga Xanh', 'Phụ kiện', TO_DATE('2023-01-15', 'YYYY-MM-DD'), 'Hoạt động', 'Phòng Yoga Tầng 3');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Bóng Gai Tập Pilates', 'Phụ kiện', TO_DATE('2023-02-20', 'YYYY-MM-DD'), 'Hoạt động', 'Phòng Yoga Tầng 3');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Bao Cát Boxing Lớn', 'Võ thuật', TO_DATE('2023-03-10', 'YYYY-MM-DD'), 'Hoạt động', 'Khu Combat Tầng 3');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Bao Cát Boxing Nhỏ', 'Võ thuật', TO_DATE('2023-03-12', 'YYYY-MM-DD'), 'Hoạt động', 'Khu Combat Tầng 3');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Găng Tay Boxing', 'Phụ kiện', TO_DATE('2023-04-05', 'YYYY-MM-DD'), 'Hoạt động', 'Khu Combat Tầng 3');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Máy Rung Bụng', 'Thư giãn', TO_DATE('2023-05-20', 'YYYY-MM-DD'), 'Hoạt động', 'Khu Thư Giãn Tầng 1');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Máy Massage Vai Cổ', 'Thư giãn', TO_DATE('2023-06-15', 'YYYY-MM-DD'), 'Hoạt động', 'Khu Thư Giãn Tầng 1');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Máy Chạy Bộ Kingsport', 'Cardio', TO_DATE('2025-05-01', 'YYYY-MM-DD'), 'Hoạt động', 'Khu Cardio Tầng 1');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Máy Chạy Bộ Kingsport', 'Cardio', TO_DATE('2025-05-01', 'YYYY-MM-DD'), 'Hoạt động', 'Khu Cardio Tầng 1');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Máy Chạy Bộ Kingsport', 'Cardio', TO_DATE('2025-05-01', 'YYYY-MM-DD'), 'Hoạt động', 'Khu Cardio Tầng 1');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Máy Đạp Xe Elip', 'Cardio', TO_DATE('2025-05-02', 'YYYY-MM-DD'), 'Hoạt động', 'Khu Cardio Tầng 1');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Máy Đạp Xe Elip', 'Cardio', TO_DATE('2025-05-02', 'YYYY-MM-DD'), 'Hoạt động', 'Khu Cardio Tầng 1');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Giàn Tạ Đa Năng', 'Tạ khối', TO_DATE('2025-05-03', 'YYYY-MM-DD'), 'Hoạt động', 'Khu Thể Hình Tầng 2');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Giàn Tạ Đa Năng', 'Tạ khối', TO_DATE('2025-05-03', 'YYYY-MM-DD'), 'Hoạt động', 'Khu Thể Hình Tầng 2');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Máy Đẩy Ngực Ngang', 'Tạ khối', TO_DATE('2025-05-04', 'YYYY-MM-DD'), 'Hoạt động', 'Khu Thể Hình Tầng 2');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Thảm Tập Yoga Đỏ', 'Phụ kiện', TO_DATE('2025-05-05', 'YYYY-MM-DD'), 'Hoạt động', 'Phòng Yoga Tầng 3');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Thảm Tập Yoga Đỏ', 'Phụ kiện', TO_DATE('2025-05-05', 'YYYY-MM-DD'), 'Hoạt động', 'Phòng Yoga Tầng 3');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Thảm Tập Yoga Xanh', 'Phụ kiện', TO_DATE('2025-05-05', 'YYYY-MM-DD'), 'Hoạt động', 'Phòng Yoga Tầng 3');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Thảm Tập Yoga Xanh', 'Phụ kiện', TO_DATE('2025-05-05', 'YYYY-MM-DD'), 'Hoạt động', 'Phòng Yoga Tầng 3');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Găng Tay Boxing', 'Phụ kiện', TO_DATE('2025-05-06', 'YYYY-MM-DD'), 'Hoạt động', 'Khu Combat Tầng 3');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Găng Tay Boxing', 'Phụ kiện', TO_DATE('2025-05-06', 'YYYY-MM-DD'), 'Hoạt động', 'Khu Combat Tầng 3');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Găng Tay Boxing', 'Phụ kiện', TO_DATE('2025-05-06', 'YYYY-MM-DD'), 'Hoạt động', 'Khu Combat Tầng 3');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Máy Rung Bụng', 'Thư giãn', TO_DATE('2025-05-07', 'YYYY-MM-DD'), 'Hoạt động', 'Khu Thư Giãn Tầng 1');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Máy Rung Bụng', 'Thư giãn', TO_DATE('2025-05-07', 'YYYY-MM-DD'), 'Hoạt động', 'Khu Thư Giãn Tầng 1');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Máy Massage Vai Cổ', 'Thư giãn', TO_DATE('2025-05-08', 'YYYY-MM-DD'), 'Hoạt động', 'Khu Thư Giãn Tầng 1');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Máy Massage Vai Cổ', 'Thư giãn', TO_DATE('2025-05-08', 'YYYY-MM-DD'), 'Hoạt động', 'Khu Thư Giãn Tầng 1');
INSERT INTO THIETBI (TenTB, LoaiMay, NgayMua, TinhTrang, ViTri) VALUES ('Máy Massage Vai Cổ', 'Thư giãn', TO_DATE('2025-05-08', 'YYYY-MM-DD'), 'Hoạt động', 'Khu Thư Giãn Tầng 1');

COMMIT;

INSERT INTO VOUCHER (TenVoucher, LoaiVoucher, PhanTramGiam, NgayHetHan, GiaTriToiThieu) VALUES ('Giảm 10% Hè Sôi Động', 'Khuyến mãi mùa', 10, TO_DATE('2026-08-31', 'YYYY-MM-DD'), 500000);
INSERT INTO VOUCHER (TenVoucher, LoaiVoucher, PhanTramGiam, NgayHetHan, GiaTriToiThieu) VALUES ('Giảm 20% Học Sinh', 'Ưu đãi đối tượng', 20, TO_DATE('2026-12-31', 'YYYY-MM-DD'), 300000);
INSERT INTO VOUCHER (TenVoucher, LoaiVoucher, PhanTramGiam, NgayHetHan, GiaTriToiThieu) VALUES ('Sinh Nhật Hội Viên', 'Quà tặng', 15, TO_DATE('2026-12-31', 'YYYY-MM-DD'), 1000000);
INSERT INTO VOUCHER (TenVoucher, LoaiVoucher, PhanTramGiam, NgayHetHan, GiaTriToiThieu) VALUES ('Flash Sale 50%', 'Khuyến mãi chớp nhoáng', 50, TO_DATE('2026-05-15', 'YYYY-MM-DD'), 2000000);
INSERT INTO VOUCHER (TenVoucher, LoaiVoucher, PhanTramGiam, NgayHetHan, GiaTriToiThieu) VALUES ('Giảm 5% Bạn Bè', 'Ưu đãi nhóm', 5, TO_DATE('2026-10-31', 'YYYY-MM-DD'), 1000000);
INSERT INTO VOUCHER (TenVoucher, LoaiVoucher, PhanTramGiam, NgayHetHan, GiaTriToiThieu) VALUES ('Chào Bạn Mới 15%', 'Thành viên mới', 15, TO_DATE('2026-12-31', 'YYYY-MM-DD'), 500000);
INSERT INTO VOUCHER (TenVoucher, LoaiVoucher, PhanTramGiam, NgayHetHan, GiaTriToiThieu) VALUES ('Giảm 30% Lễ 30/4', 'Khuyến mãi lễ', 30, TO_DATE('2026-05-02', 'YYYY-MM-DD'), 1500000);
INSERT INTO VOUCHER (TenVoucher, LoaiVoucher, PhanTramGiam, NgayHetHan, GiaTriToiThieu) VALUES ('Voucher Doanh Nghiệp', 'Hợp tác', 25, TO_DATE('2027-01-01', 'YYYY-MM-DD'), 5000000);
INSERT INTO VOUCHER (TenVoucher, LoaiVoucher, PhanTramGiam, NgayHetHan, GiaTriToiThieu) VALUES ('Giảm 10% Tập Sáng', 'Khuyến khích giờ vắng', 10, TO_DATE('2026-09-30', 'YYYY-MM-DD'), 300000);
INSERT INTO VOUCHER (TenVoucher, LoaiVoucher, PhanTramGiam, NgayHetHan, GiaTriToiThieu) VALUES ('Giảm 12% Yoga', 'Ưu đãi dịch vụ', 12, TO_DATE('2026-11-30', 'YYYY-MM-DD'), 600000);
INSERT INTO VOUCHER (TenVoucher, LoaiVoucher, PhanTramGiam, NgayHetHan, GiaTriToiThieu) VALUES ('Black Friday 40%', 'Siêu sale', 40, TO_DATE('2026-11-28', 'YYYY-MM-DD'), 3000000);
INSERT INTO VOUCHER (TenVoucher, LoaiVoucher, PhanTramGiam, NgayHetHan, GiaTriToiThieu) VALUES ('Giáng Sinh Ấm Áp', 'Khuyến mãi lễ', 20, TO_DATE('2026-12-25', 'YYYY-MM-DD'), 1500000);
INSERT INTO VOUCHER (TenVoucher, LoaiVoucher, PhanTramGiam, NgayHetHan, GiaTriToiThieu) VALUES ('Lì Xì Năm Mới', 'Quà tặng', 18, TO_DATE('2027-02-15', 'YYYY-MM-DD'), 1000000);
INSERT INTO VOUCHER (TenVoucher, LoaiVoucher, PhanTramGiam, NgayHetHan, GiaTriToiThieu) VALUES ('Voucher VIP Tái Ký', 'Khách quen', 15, TO_DATE('2027-12-31', 'YYYY-MM-DD'), 2500000);
INSERT INTO VOUCHER (TenVoucher, LoaiVoucher, PhanTramGiam, NgayHetHan, GiaTriToiThieu) VALUES ('Tặng 5% Phục Hồi', 'Dịch vụ sức khỏe', 5, TO_DATE('2026-12-31', 'YYYY-MM-DD'), 800000);
INSERT INTO VOUCHER (TenVoucher, LoaiVoucher, PhanTramGiam, NgayHetHan, GiaTriToiThieu) VALUES ('Sale 11/11', 'Siêu sale', 35, TO_DATE('2026-11-12', 'YYYY-MM-DD'), 2000000);
INSERT INTO VOUCHER (TenVoucher, LoaiVoucher, PhanTramGiam, NgayHetHan, GiaTriToiThieu) VALUES ('Khai Trương Trở Lại', 'Sự kiện đặc biệt', 25, TO_DATE('2026-06-30', 'YYYY-MM-DD'), 1000000);
INSERT INTO VOUCHER (TenVoucher, LoaiVoucher, PhanTramGiam, NgayHetHan, GiaTriToiThieu) VALUES ('Voucher Nữ Quyền 8/3', 'Khuyến mãi lễ', 20, TO_DATE('2027-03-09', 'YYYY-MM-DD'), 500000);
INSERT INTO VOUCHER (TenVoucher, LoaiVoucher, PhanTramGiam, NgayHetHan, GiaTriToiThieu) VALUES ('Phần Thưởng Cuộc Thi', 'Sự kiện', 100, TO_DATE('2026-12-31', 'YYYY-MM-DD'), 0);
INSERT INTO VOUCHER (TenVoucher, LoaiVoucher, PhanTramGiam, NgayHetHan, GiaTriToiThieu) VALUES ('Giảm 8% PT Cá Nhân', 'Dịch vụ cao cấp', 8, TO_DATE('2026-10-15', 'YYYY-MM-DD'), 2000000);

COMMIT;

INSERT INTO HOIVIEN (HoTen, GioiTinh, NgaySinh, SDT, DiaChi, Email, TinhTrangSK, NgayDangKy, HangTV, TongChiTieu) VALUES ('Nguyễn Gia Tiến', 'Nam', TO_DATE('2004-05-12', 'YYYY-MM-DD'), '0988111222', 'Tòa BA4, KTX Khu B', 'tien.nguyen@student.uit.edu.vn', 'Hoàn toàn khỏe mạnh', TO_DATE('2026-01-05', 'YYYY-MM-DD'), 'Silver', 0);
INSERT INTO HOIVIEN (HoTen, GioiTinh, NgaySinh, SDT, DiaChi, Email, TinhTrangSK, NgayDangKy, HangTV, TongChiTieu) VALUES ('Trần Thành An', 'Nam', TO_DATE('2003-08-20', 'YYYY-MM-DD'), '0988222333', 'Tòa E1, KTX Khu B', 'an.tran@student.uit.edu.vn', 'Hay mỏi lưng do code nhiều', TO_DATE('2026-01-10', 'YYYY-MM-DD'), 'Silver', 0);
INSERT INTO HOIVIEN (HoTen, GioiTinh, NgaySinh, SDT, DiaChi, Email, TinhTrangSK, NgayDangKy, HangTV, TongChiTieu) VALUES ('Lê Phương Thảo', 'Nữ', TO_DATE('2005-11-03', 'YYYY-MM-DD'), '0988333444', 'Tòa D, KTX Khu B', 'thao.le@gmail.com', 'Cần giảm mỡ bụng', TO_DATE('2026-02-15', 'YYYY-MM-DD'), 'Silver', 0);
INSERT INTO HOIVIEN (HoTen, GioiTinh, NgaySinh, SDT, DiaChi, Email, TinhTrangSK, NgayDangKy, HangTV, TongChiTieu) VALUES ('Phạm Minh Châu', 'Nữ', TO_DATE('2004-02-14', 'YYYY-MM-DD'), '0988444555', 'Dĩ An, Bình Dương', 'chau.pham@gmail.com', 'Bình thường', TO_DATE('2026-02-20', 'YYYY-MM-DD'), 'Silver', 0);
INSERT INTO HOIVIEN (HoTen, GioiTinh, NgaySinh, SDT, DiaChi, Email, TinhTrangSK, NgayDangKy, HangTV, TongChiTieu) VALUES ('Vũ Hải Đăng', 'Nam', TO_DATE('2002-09-30', 'YYYY-MM-DD'), '0988555666', 'Tòa C, KTX Khu B', 'dang.vu@student.uit.edu.vn', 'Dây chằng yếu', TO_DATE('2026-03-01', 'YYYY-MM-DD'), 'Silver', 0);
INSERT INTO HOIVIEN (HoTen, GioiTinh, NgaySinh, SDT, DiaChi, Email, TinhTrangSK, NgayDangKy, HangTV, TongChiTieu) VALUES ('Đinh Hữu Lộc', 'Nam', TO_DATE('2003-12-12', 'YYYY-MM-DD'), '0988666777', 'Thủ Đức, TP.HCM', 'loc.dinh@gmail.com', 'Bình thường', TO_DATE('2026-03-05', 'YYYY-MM-DD'), 'Silver', 0);
INSERT INTO HOIVIEN (HoTen, GioiTinh, NgaySinh, SDT, DiaChi, Email, TinhTrangSK, NgayDangKy, HangTV, TongChiTieu) VALUES ('Ngô Lan Anh', 'Nữ', TO_DATE('2004-07-22', 'YYYY-MM-DD'), '0988777888', 'Tòa BA1, KTX Khu B', 'anh.ngo@gmail.com', 'Suy nhược cơ thể nhẹ', TO_DATE('2026-03-10', 'YYYY-MM-DD'), 'Silver', 0);
INSERT INTO HOIVIEN (HoTen, GioiTinh, NgaySinh, SDT, DiaChi, Email, TinhTrangSK, NgayDangKy, HangTV, TongChiTieu) VALUES ('Bùi Xuân Trường', 'Nam', TO_DATE('2001-01-01', 'YYYY-MM-DD'), '0988888999', 'Làng Đại Học, Dĩ An', 'truong.bui@gmail.com', 'Thể lực rất tốt', TO_DATE('2026-03-15', 'YYYY-MM-DD'), 'Silver', 0);
INSERT INTO HOIVIEN (HoTen, GioiTinh, NgaySinh, SDT, DiaChi, Email, TinhTrangSK, NgayDangKy, HangTV, TongChiTieu) VALUES ('Hà Bích Trâm', 'Nữ', TO_DATE('2005-04-18', 'YYYY-MM-DD'), '0988999000', 'Quận 9, TP.HCM', 'tram.ha@gmail.com', 'Bình thường', TO_DATE('2026-04-01', 'YYYY-MM-DD'), 'Silver', 0);
INSERT INTO HOIVIEN (HoTen, GioiTinh, NgaySinh, SDT, DiaChi, Email, TinhTrangSK, NgayDangKy, HangTV, TongChiTieu) VALUES ('Lý Tấn Tài', 'Nam', TO_DATE('2004-10-10', 'YYYY-MM-DD'), '0990111222', 'Tòa BA4, KTX Khu B', 'tai.ly@student.uit.edu.vn', 'Bình thường', TO_DATE('2026-04-05', 'YYYY-MM-DD'), 'Silver', 0);
INSERT INTO HOIVIEN (HoTen, GioiTinh, NgaySinh, SDT, DiaChi, Email, TinhTrangSK, NgayDangKy, HangTV, TongChiTieu) VALUES ('Trương Vĩnh Kỳ', 'Nam', TO_DATE('2003-03-25', 'YYYY-MM-DD'), '0990222333', 'Dĩ An, Bình Dương', 'ky.truong@gmail.com', 'Từng gãy tay', TO_DATE('2026-04-10', 'YYYY-MM-DD'), 'Silver', 0);
INSERT INTO HOIVIEN (HoTen, GioiTinh, NgaySinh, SDT, DiaChi, Email, TinhTrangSK, NgayDangKy, HangTV, TongChiTieu) VALUES ('Châu Diệu Linh', 'Nữ', TO_DATE('2005-08-08', 'YYYY-MM-DD'), '0990333444', 'Tòa E2, KTX Khu B', 'linh.chau@gmail.com', 'Bình thường', TO_DATE('2026-04-15', 'YYYY-MM-DD'), 'Silver', 0);
INSERT INTO HOIVIEN (HoTen, GioiTinh, NgaySinh, SDT, DiaChi, Email, TinhTrangSK, NgayDangKy, HangTV, TongChiTieu) VALUES ('Đoàn Nhật Hùng', 'Nam', TO_DATE('2002-11-20', 'YYYY-MM-DD'), '0990444555', 'Thủ Đức, TP.HCM', 'hung.doan@gmail.com', 'Cần tăng cơ', TO_DATE('2026-04-20', 'YYYY-MM-DD'), 'Silver', 0);
INSERT INTO HOIVIEN (HoTen, GioiTinh, NgaySinh, SDT, DiaChi, Email, TinhTrangSK, NgayDangKy, HangTV, TongChiTieu) VALUES ('Mai Thị Yến', 'Nữ', TO_DATE('2004-06-06', 'YYYY-MM-DD'), '0990555666', 'Tòa C, KTX Khu B', 'yen.mai@gmail.com', 'Bình thường', TO_DATE('2026-04-22', 'YYYY-MM-DD'), 'Silver', 0);
INSERT INTO HOIVIEN (HoTen, GioiTinh, NgaySinh, SDT, DiaChi, Email, TinhTrangSK, NgayDangKy, HangTV, TongChiTieu) VALUES ('Tạ Thanh Tùng', 'Nam', TO_DATE('2003-01-30', 'YYYY-MM-DD'), '0990666777', 'Khu A KTX ĐHQG', 'tung.ta@gmail.com', 'Bình thường', TO_DATE('2026-04-25', 'YYYY-MM-DD'), 'Silver', 0);

INSERT INTO HUANLUYENVIEN (MaNV_LienKet, KinhNghiem, ChuyenMon, BangCap, Rating) VALUES ('NV007', 9, 'Thể hình cơ bản', 'Chứng chỉ NASM', 4.8);
INSERT INTO HUANLUYENVIEN (MaNV_LienKet, KinhNghiem, ChuyenMon, BangCap, Rating) VALUES ('NV008', 2, 'Yoga và Pilates', 'Chứng chỉ Yoga Alliance', 4.9);
INSERT INTO HUANLUYENVIEN (MaNV_LienKet, KinhNghiem, ChuyenMon, BangCap, Rating) VALUES ('NV009', 7, 'Tăng cơ giảm mỡ', 'Chứng chỉ ISSA', 4.7);
INSERT INTO HUANLUYENVIEN (MaNV_LienKet, KinhNghiem, ChuyenMon, BangCap, Rating) VALUES ('NV014', 4, 'Phục hồi chấn thương', 'Chứng chỉ ACE', 4.5);
INSERT INTO HUANLUYENVIEN (MaNV_LienKet, KinhNghiem, ChuyenMon, BangCap, Rating) VALUES ('NV016', 3, 'Kickboxing', 'Chứng chỉ HLV Kickboxing', 4.6);

COMMIT;


--------------------------------------------------------
-- NẠP DỮ LIỆU BẢNG LỚP HỌC (Đã cấu trúc lại Ngày tập & Khung giờ)
--------------------------------------------------------
INSERT INTO LOPHOC (TenLop, MaPT, MoTa, SoLuongToiDa, NgayTap, KhungGio, LoaiLop) 
VALUES ('Yoga Thiền Buổi Sáng', 'PT002', 'Lớp Yoga thư giãn 6h sáng', 15, 'Thứ 2-4-6', '06:00 - 07:30', 'YOGA');

INSERT INTO LOPHOC (TenLop, MaPT, MoTa, SoLuongToiDa, NgayTap, KhungGio, LoaiLop) 
VALUES ('Cardio Đốt Mỡ Cực Đại', 'PT004', 'Lớp Cardio HIIT cường độ cao', 20, 'Thứ 3-5-7', '18:00 - 19:30', 'CARDIO');

INSERT INTO LOPHOC (TenLop, MaPT, MoTa, SoLuongToiDa, NgayTap, KhungGio, LoaiLop) 
VALUES ('Boxing Đối Kháng', 'PT005', 'Lớp võ tự vệ cơ bản', 12, 'Thứ 2-4-6', '19:00 - 20:30', 'BOXING');

INSERT INTO LOPHOC (TenLop, MaPT, MoTa, SoLuongToiDa, NgayTap, KhungGio, LoaiLop) 
VALUES ('Pilates Trị Liệu', 'PT002', 'Cải thiện cột sống và tư thế', 15, 'Thứ 3-5-7', '08:00 - 09:30', 'YOGA');

INSERT INTO LOPHOC (TenLop, MaPT, MoTa, SoLuongToiDa, NgayTap, KhungGio, LoaiLop) 
VALUES ('Cử Tạ Căn Bản', 'PT001', 'Hướng dẫn form chuẩn', 10, 'Thứ 7, Chủ Nhật', '09:00 - 11:00', 'GYM');

COMMIT;


INSERT INTO HOADON (MaHV, MaNV, NgayLap, TongTien, MaVoucher, PhuongThucTT, TrangThaiHD, MaGoi) VALUES ('HV001', 'NV002', TO_DATE('2026-01-10', 'YYYY-MM-DD'), 2500000, NULL, 'Momo', 'Đã thanh toán', 'GT003');
INSERT INTO HOADON (MaHV, MaNV, NgayLap, TongTien, MaVoucher, PhuongThucTT, TrangThaiHD, MaGoi) VALUES ('HV002', 'NV004', TO_DATE('2026-01-10', 'YYYY-MM-DD'), 4500000, NULL, 'Chuyển khoản', 'Đã thanh toán', 'GT004');
INSERT INTO HOADON (MaHV, MaNV, NgayLap, TongTien, MaVoucher, PhuongThucTT, TrangThaiHD, MaGoi) VALUES ('HV003', 'NV002', TO_DATE('2026-02-15', 'YYYY-MM-DD'), 600000, NULL, 'Tiền mặt', 'Đã thanh toán', 'GT009');
INSERT INTO HOADON (MaHV, MaNV, NgayLap, TongTien, MaVoucher, PhuongThucTT, TrangThaiHD, MaGoi) VALUES ('HV004', 'NV012', TO_DATE('2026-02-20', 'YYYY-MM-DD'), 1350000, NULL, 'Momo', 'Đã thanh toán', 'GT002');
INSERT INTO HOADON (MaHV, MaNV, NgayLap, TongTien, MaVoucher, PhuongThucTT, TrangThaiHD, MaGoi) VALUES ('HV005', 'NV004', TO_DATE('2026-03-01', 'YYYY-MM-DD'), 2200000, NULL, 'Chuyển khoản', 'Đã thanh toán', 'GT007');
INSERT INTO HOADON (MaHV, MaNV, NgayLap, TongTien, MaVoucher, PhuongThucTT, TrangThaiHD, MaGoi) VALUES ('HV006', 'NV002', TO_DATE('2026-03-05', 'YYYY-MM-DD'), 300000, NULL, 'Tiền mặt', 'Đã thanh toán', 'GT005');
INSERT INTO HOADON (MaHV, MaNV, NgayLap, TongTien, MaVoucher, PhuongThucTT, TrangThaiHD, MaGoi) VALUES ('HV007', 'NV012', TO_DATE('2026-03-10', 'YYYY-MM-DD'), 500000, NULL, 'Momo', 'Đã thanh toán', 'GT001');
INSERT INTO HOADON (MaHV, MaNV, NgayLap, TongTien, MaVoucher, PhuongThucTT, TrangThaiHD, MaGoi) VALUES ('HV008', 'NV004', TO_DATE('2026-03-15', 'YYYY-MM-DD'), 1500000, 'VC006', 'Chuyển khoản', 'Đã thanh toán', 'GT010');
INSERT INTO HOADON (MaHV, MaNV, NgayLap, TongTien, MaVoucher, PhuongThucTT, TrangThaiHD, MaGoi) VALUES ('HV009', 'NV002', TO_DATE('2026-04-01', 'YYYY-MM-DD'), 2500000, NULL, 'Momo', 'Đã thanh toán', 'GT003');
INSERT INTO HOADON (MaHV, MaNV, NgayLap, TongTien, MaVoucher, PhuongThucTT, TrangThaiHD, MaGoi) VALUES ('HV010', 'NV012', TO_DATE('2026-04-05', 'YYYY-MM-DD'), 1350000, NULL, 'Chuyển khoản', 'Đã thanh toán', 'GT002');
INSERT INTO HOADON (MaHV, MaNV, NgayLap, TongTien, MaVoucher, PhuongThucTT, TrangThaiHD, MaGoi) VALUES ('HV011', 'NV004', TO_DATE('2026-04-10', 'YYYY-MM-DD'), 4500000, 'VC007', 'Momo', 'Đã thanh toán', 'GT004');
INSERT INTO HOADON (MaHV, MaNV, NgayLap, TongTien, MaVoucher, PhuongThucTT, TrangThaiHD, MaGoi) VALUES ('HV012', 'NV002', TO_DATE('2026-04-15', 'YYYY-MM-DD'), 600000, NULL, 'Tiền mặt', 'Đã thanh toán', 'GT009');

COMMIT;

INSERT INTO DANGKY_GOITAP (MaHV, MaGoi, MaHD, NgayBatDau, NgayKetThuc, TrangThai) VALUES ('HV001', 'GT003', 'HD001', TO_DATE('2026-01-10', 'YYYY-MM-DD'), NULL, 'Đang hoạt động');
INSERT INTO DANGKY_GOITAP (MaHV, MaGoi, MaHD, NgayBatDau, NgayKetThuc, TrangThai) VALUES ('HV002', 'GT004', 'HD002', TO_DATE('2026-01-10', 'YYYY-MM-DD'), NULL, 'Đang hoạt động');
INSERT INTO DANGKY_GOITAP (MaHV, MaGoi, MaHD, NgayBatDau, NgayKetThuc, TrangThai) VALUES ('HV003', 'GT009', 'HD003', TO_DATE('2026-02-15', 'YYYY-MM-DD'), NULL, 'Hết hạn');
INSERT INTO DANGKY_GOITAP (MaHV, MaGoi, MaHD, NgayBatDau, NgayKetThuc, TrangThai) VALUES ('HV004', 'GT002', 'HD004', TO_DATE('2026-02-20', 'YYYY-MM-DD'), NULL, 'Đang hoạt động');
INSERT INTO DANGKY_GOITAP (MaHV, MaGoi, MaHD, NgayBatDau, NgayKetThuc, TrangThai) VALUES ('HV005', 'GT007', 'HD005', TO_DATE('2026-03-01', 'YYYY-MM-DD'), NULL, 'Đang hoạt động');
INSERT INTO DANGKY_GOITAP (MaHV, MaGoi, MaHD, NgayBatDau, NgayKetThuc, TrangThai) VALUES ('HV006', 'GT005', 'HD006', TO_DATE('2026-03-05', 'YYYY-MM-DD'), NULL, 'Hết hạn');
INSERT INTO DANGKY_GOITAP (MaHV, MaGoi, MaHD, NgayBatDau, NgayKetThuc, TrangThai) VALUES ('HV007', 'GT001', 'HD007', TO_DATE('2026-03-10', 'YYYY-MM-DD'), NULL, 'Hết hạn');
INSERT INTO DANGKY_GOITAP (MaHV, MaGoi, MaHD, NgayBatDau, NgayKetThuc, TrangThai) VALUES ('HV008', 'GT010', 'HD008', TO_DATE('2026-03-15', 'YYYY-MM-DD'), NULL, 'Đang hoạt động');
INSERT INTO DANGKY_GOITAP (MaHV, MaGoi, MaHD, NgayBatDau, NgayKetThuc, TrangThai) VALUES ('HV009', 'GT003', 'HD009', TO_DATE('2026-04-01', 'YYYY-MM-DD'), NULL, 'Đang hoạt động');
INSERT INTO DANGKY_GOITAP (MaHV, MaGoi, MaHD, NgayBatDau, NgayKetThuc, TrangThai) VALUES ('HV010', 'GT002', 'HD010', TO_DATE('2026-04-05', 'YYYY-MM-DD'), NULL, 'Đang hoạt động');
INSERT INTO DANGKY_GOITAP (MaHV, MaGoi, MaHD, NgayBatDau, NgayKetThuc, TrangThai) VALUES ('HV011', 'GT004', 'HD011', TO_DATE('2026-04-10', 'YYYY-MM-DD'), NULL, 'Đang hoạt động');
INSERT INTO DANGKY_GOITAP (MaHV, MaGoi, MaHD, NgayBatDau, NgayKetThuc, TrangThai) VALUES ('HV012', 'GT009', 'HD012', TO_DATE('2026-04-15', 'YYYY-MM-DD'), NULL, 'Đang hoạt động');

INSERT INTO DANGKY_LOPHOC (MaHV, MaLop, NgayDangKy) VALUES ('HV003', 'LH001', TO_DATE('2026-02-15', 'YYYY-MM-DD'));
INSERT INTO DANGKY_LOPHOC (MaHV, MaLop, NgayDangKy) VALUES ('HV004', 'LH002', TO_DATE('2026-02-21', 'YYYY-MM-DD'));
INSERT INTO DANGKY_LOPHOC (MaHV, MaLop, NgayDangKy) VALUES ('HV008', 'LH003', TO_DATE('2026-03-16', 'YYYY-MM-DD'));
INSERT INTO DANGKY_LOPHOC (MaHV, MaLop, NgayDangKy) VALUES ('HV009', 'LH001', TO_DATE('2026-04-02', 'YYYY-MM-DD'));
INSERT INTO DANGKY_LOPHOC (MaHV, MaLop, NgayDangKy) VALUES ('HV012', 'LH004', TO_DATE('2026-04-16', 'YYYY-MM-DD'));
INSERT INTO DANGKY_LOPHOC (MaHV, MaLop, NgayDangKy) VALUES ('HV001', 'LH005', TO_DATE('2026-01-12', 'YYYY-MM-DD'));

COMMIT;


INSERT INTO CHECKIN (MaHV, MaDK, ThoiGianVao, ThoiGianRa, GhiChu) VALUES ('HV001', 'DK001', TIMESTAMP '2026-04-20 17:00:00', TIMESTAMP '2026-04-20 18:30:00', 'Bình thường');
INSERT INTO CHECKIN (MaHV, MaDK, ThoiGianVao, ThoiGianRa, GhiChu) VALUES ('HV002', 'DK002', TIMESTAMP '2026-04-20 17:15:00', TIMESTAMP '2026-04-20 19:00:00', 'Bình thường');
INSERT INTO CHECKIN (MaHV, MaDK, ThoiGianVao, ThoiGianRa, GhiChu) VALUES ('HV004', 'DK004', TIMESTAMP '2026-04-21 06:00:00', TIMESTAMP '2026-04-21 07:15:00', 'Tập Cardio sáng');
INSERT INTO CHECKIN (MaHV, MaDK, ThoiGianVao, ThoiGianRa, GhiChu) VALUES ('HV008', 'DK008', TIMESTAMP '2026-04-21 18:00:00', TIMESTAMP '2026-04-21 19:45:00', 'Lớp Boxing');
INSERT INTO CHECKIN (MaHV, MaDK, ThoiGianVao, ThoiGianRa, GhiChu) VALUES ('HV001', 'DK001', TIMESTAMP '2026-04-22 17:10:00', TIMESTAMP '2026-04-22 18:40:00', 'Bình thường');

COMMIT;


INSERT INTO LICHTAP_PT (MaHV, MaPT, NgayTap, KhungGio, TrangThaiBuoiTap) VALUES ('HV001', 'PT001', TO_DATE('2026-05-05', 'YYYY-MM-DD'), '17:00-18:00', 'Đã xác nhận');
INSERT INTO LICHTAP_PT (MaHV, MaPT, NgayTap, KhungGio, TrangThaiBuoiTap) VALUES ('HV005', 'PT003', TO_DATE('2026-05-06', 'YYYY-MM-DD'), '18:00-19:00', 'Đã xác nhận');
INSERT INTO LICHTAP_PT (MaHV, MaPT, NgayTap, KhungGio, TrangThaiBuoiTap) VALUES ('HV011', 'PT004', TO_DATE('2026-05-07', 'YYYY-MM-DD'), '06:00-07:00', 'Chờ xác nhận');


INSERT INTO BAOLUU (MaDK, NgayBatDauNghi, NgayKetThucNghi, LyDo) VALUES ('DK001', TO_DATE('2026-05-15', 'YYYY-MM-DD'), TO_DATE('2026-05-25', 'YYYY-MM-DD'), 'Về quê có việc gia đình');
INSERT INTO BAOLUU (MaDK, NgayBatDauNghi, NgayKetThucNghi, LyDo) VALUES ('DK005', TO_DATE('2026-05-20', 'YYYY-MM-DD'), TO_DATE('2026-06-20', 'YYYY-MM-DD'), 'Đi thực tập quân sự');


INSERT INTO BAOTRI (MaTB, NgayBaoTri, NoiDung, ChiPhi) VALUES ('TB005', TO_DATE('2026-04-10', 'YYYY-MM-DD'), 'Thay dây cáp kéo tạ', 450000);
INSERT INTO BAOTRI (MaTB, NgayBaoTri, NoiDung, ChiPhi) VALUES ('TB010', TO_DATE('2026-04-15', 'YYYY-MM-DD'), 'Bọc lại da ghế', 200000);
INSERT INTO BAOTRI (MaTB, NgayBaoTri, NoiDung, ChiPhi) VALUES ('TB001', TO_DATE('2026-04-20', 'YYYY-MM-DD'), 'Bơm dầu mỡ, vệ sinh động cơ', 300000);


COMMIT;



INSERT INTO TAIKHOAN (TenDN, MatKhau, QuyenTruyCap, MaNV, MaPT, TrangThai) VALUES ('admin', '123456', 'Quản lý', 'NV001', NULL, 'Hoạt động');
INSERT INTO TAIKHOAN (TenDN, MatKhau, QuyenTruyCap, MaNV, MaPT, TrangThai) VALUES ('letan01', '123456', 'Lễ tân', 'NV002', NULL, 'Hoạt động');
INSERT INTO TAIKHOAN (TenDN, MatKhau, QuyenTruyCap, MaNV, MaPT, TrangThai) VALUES ('pt_truong', '123456', 'Huấn luyện viên', 'NV007', 'PT001', 'Hoạt động');
INSERT INTO TAIKHOAN (TenDN, MatKhau, QuyenTruyCap, MaNV, MaPT, TrangThai) VALUES ('pt_huong', '123456', 'Huấn luyện viên', 'NV008', 'PT002', 'Hoạt động');

COMMIT;

