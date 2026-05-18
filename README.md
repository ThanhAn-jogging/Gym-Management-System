HƯỚNG DẪN CÀI ĐẶT

PHẦN 0: LẤY MÃ NGUỒN VỀ MÁY CỤC BỘ (DOWNLOAD/CLONE)

Có thể lựa chọn 1 trong 2 cách sau để lấy mã nguồn dự án về máy:
Cách 1 (Nhanh nhất): Tại trang chủ Repository này, nhấn vào nút Code (màu xanh) -> Chọn Download ZIP. Sau khi tải về, thực hiện giải nén file để có thư mục dự án.
Cách 2 (Sử dụng Git):** Mở Terminal tại thư mục muốn lưu dự án trên máy và chạy câu lệnh:
git clone [https://github.com/ThanhAn-jogging/Gym-Management-System.git](https://github.com/ThanhAn-jogging/Gym-Management-System.git)


PHẦN 1: CHUẨN BỊ MÔI TRƯỜNG VÀ CÔNG CỤ (PREREQUISITES)

Để hệ thống vận hành mượt mà, máy trạm của người kiểm thử cần cài đặt sẵn các công cụ với phiên bản tiêu chuẩn sau đây:
1. Git (Quản lý mã nguồn)
•	Phiên bản khuyến nghị: Git v2.x trở lên.
•	Tải về: Git SCM Official
•	Kiểm tra sau cài đặt: Mở Terminal/Command Prompt gõ git --version.
2. Java Development Kit (JDK) - Cho tầng Backend
•	Phiên bản bắt buộc: Java JDK 17 (Phiên bản LTS tiêu chuẩn của Spring Boot 3).
•	Tải về: Oracle JDK 17 hoặc Eclipse Temurin JDK 17.
•	Kiểm tra sau cài đặt: Gõ lệnh java -version và javac -version để đảm bảo hệ thống đã nhận diện đúng JDK 17.
3. Node.js & NPM - Cho tầng Frontend
•	Phiên bản khuyến nghị: Node.js v18.x hoặc v20.x (Bản LTS).
•	Tải về: Node.js Official
•	Kiểm tra sau cài đặt: Gõ lệnh node -version và npm -version.
4. Hệ quản trị CSDL Oracle Database
•	Phiên bản khuyến nghị: Oracle Database 19c hoặc 21c (Bản free hoặc Express Edition - XE cho nhẹ máy).
•	Công cụ quản lý: Oracle SQL Developer hoặc DataGrip.


PHẦN 2: THIẾT LẬP VÀ CẤU HÌNH CƠ SỞ DỮ LIỆU ORACLE

Để tránh xung đột với các dữ liệu hệ thống khác, nên khởi tạo một User (Schema) hoàn toàn mới dưới Oracle để vận hành dự án.
Bước 2.1: Tạo User mới và cấp quyền truy cập
1.	Mở SQL Developer, kết nối vào hệ thống bằng tài khoản quyền cao nhất (sys as sysdba hoặc system).
2.	Mở một Tab SQL Worksheet mới và chạy đoạn lệnh sau để tạo User tên là C##GYM_MANAGEMENT với mật khẩu là 123456:

Bước 2.2: Nạp cấu trúc bảng và Dữ liệu mẫu
1.	Ngắt kết nối tài khoản SYS/SYSTEM.
2.	Tạo một kết nối mới (Connection) trong SQL Developer bằng thông tin User vừa tạo:
o	Username: C##GYM_MANAGEMENT
o	Password: 123456
3.	Khuyến khích tạo dữ liệu gốc theo hướng dẫn sau :
Tìm đến thư mục database/ trong đồ án, chạy lần lượt các file này trên Oracle :
Create_Table.sql -> Create_Sequence.sql -> Create_Trigger.sql -> Create_Procedure.sql -> Create_Function.sql -> Create_View.sql -> Insert_data.sql


PHỨN 3: CẤU HÌNH VÀ KHỞI CHẠY BACKEND (SPRING BOOT)

Bước 3.1: Kiểm tra và sửa cấu hình kết nối Database
Nếu cài đặt Oracle Database với cổng hoặc SID khác, có thể dễ dàng thay đổi thông tin kết nối bằng cách:
1.	Sử dụng VS Code hoặc IntelliJ IDEA mở thư mục backend.
2.	Tìm đến file cấu hình: backend/src/main/resources/application.properties.
3.	Chỉnh sửa các thông số tài khoản, mật khẩu hoặc cổng kết nối (nếu có thay đổi so với mặc định) tại đây:
hoặc có thể chỉnh sửa application.properties phù hợp với Oracle trên đang có trên máy 

Bước 3.2: Khởi chạy ứng dụng Backend
1.	Mở Terminal ngay tại thư mục backend/.
2.	Chạy lệnh đóng gói và tải thư viện thông qua Maven Wrapper (hệ thống sẽ tự tải các dependency về mà không cần cài đặt Maven thủ công):
o	Trên Windows:
.\mvnw clean install
o	Trên macOS / Linux:
chmod +x mvnw
./mvnw clean install
3.	Chạy câu lệnh sau để khởi động Server Backend:
o	Trên Windows: .\mvnw spring-boot:run
o	Trên macOS / Linux: ./mvnw spring-boot:run
4.	Dấu hiệu thành công: Terminal hiển thị dòng chữ Started GymManagementApplication in ... seconds và không văng bất kỳ dòng lỗi (Exception) nào.


PHẦN 4: CẤU HÌNH VÀ KHỞI CHẠY FRONTEND (REACTJS)

Ứng dụng Frontend được xây dựng dựa trên ReactJS, Vite và TailwindCSS đem lại trải nghiệm giao diện mượt mà và trực quan.
Bước 4.1: Cài đặt các thư viện phụ thuộc (Dependencies)
1.	Mở một cửa sổ Terminal mới và di chuyển vào thư mục frontend/:
cd frontend
2.	Thực hiện chạy lệnh sau để tải xuống toàn bộ các node_modules cần thiết (như Lucide-react, Recharts, Axios,...):
npm install
(Thời gian tải sẽ mất khoảng 1-2 phút tùy thuộc vào tốc độ mạng).
Bước 4.2: Khởi chạy giao diện người dùng
1.	Sau khi cài đặt thư viện thành công, gõ lệnh sau để khởi chạy máy chủ phát triển (Development Server) của Vite:
npm run dev
2.	Terminal sẽ hiển thị đường dẫn truy cập cục bộ, thông thường là: ➜ Local: http://localhost:5173/
3.	Nhấp giữ nút Ctrl và click vào liên kết đó (hoặc copy dán vào trình duyệt Chrome/Edge) để mở giao diện trang quản trị phòng Gym.
có thể đăng nhập bằng các tài khoản sau đây để vào giao diện chính của chương trình (khuyến khích dùng tài khoản admin để có đầy đủ chức năng)
Tên user	Password
admin	123
letan01	123456
pt_truong	123456
pt_huong	123456

