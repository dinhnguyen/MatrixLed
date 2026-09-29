# Matrix Led - Công cụ Đo lường Màn hình

*Read this in [English](README.md)*

**Đo lường Màn hình Nâng cao & Kiểm tra Bố cục**

Matrix Led là một công cụ chính xác, chạy trên trình duyệt, được thiết kế cho các lập trình viên và nhà thiết kế để đo kích thước màn hình, kiểm tra bố cục và căn chỉnh chuẩn pixel bằng cách sử dụng thước kẻ, đường gióng và các hình dạng tùy chỉnh.

Live Demo: [http://matrix-led.surge.sh](http://matrix-led.surge.sh)

## Tính năng

### 📏 Đo lường Chính xác
- **Thước kẻ**: Thước kẻ chuẩn pixel trên cả 4 cạnh (trên, trái, phải, dưới) với dấu mốc mỗi 100px.
- **Kích thước thời gian thực**: Hiển thị chiều rộng và chiều cao khung nhìn hiện tại.
- **Chế độ toàn màn hình**: Phóng to công cụ để đo chính xác mà không bị giao diện trình duyệt cản trở.

### 📐 Kiểm tra Bố cục
- **Đường gióng (Guidelines)**: Bật/tắt đường gióng chữ thập (dọc & ngang) để kiểm tra căn chỉnh.
- **Tọa độ giao điểm**: Tự động hiển thị tọa độ (x, y) nơi các đường gióng giao nhau.
- **Điểm đánh dấu tùy chỉnh (Markers)**: Xác định các điểm X và Y cụ thể để làm nổi bật trên thước kẻ và đường gióng.

### 🎨 Công cụ Sáng tạo
- **Hình dạng tùy chỉnh**: Vẽ và định vị các hình chữ nhật với màu sắc, kích thước và vị trí có thể định cấu hình.
- **Lớp phủ nền (Overlay)**: Tải lên hình ảnh tham khảo (mockup thiết kế) để phủ lên màn hình, điều chỉnh độ mờ, tỷ lệ và vị trí để so sánh pixel-perfect.

### 💾 Quy trình làm việc & Quản lý
- **Cấu hình sẵn (Presets)**: Lưu tối đa 10 cấu hình (điểm đánh dấu, hình dạng, đường gióng) dưới dạng các preset có tên.
- **Nhập/Xuất**: Chia sẻ cấu hình qua tệp JSON - xuất từng preset riêng lẻ hoặc tất cả cùng lúc.

## Sử dụng

📘 **[Hướng Dẫn Sử Dụng Chi Tiết](USER_GUIDE_VI.md)**

### Phím tắt
| Phím | Hành động |
| :--- | :--- |
| `G` | Bật/tắt Đường gióng |
| `S` | Mở Bảng Cài đặt |
| `Esc` | Thoát Toàn màn hình / Đóng các cửa sổ |

### Bắt đầu
1. Mở [Live Demo](http://matrix-led.surge.sh) hoặc chạy cục bộ.
2. Nhấn **"Gét Gô"** để vào chế độ đo lường (khuyến nghị dùng toàn màn hình).
3. Sử dụng bảng **Cài đặt (S)** để:
   - Thêm điểm đánh dấu đường gióng tùy chỉnh (tọa độ X/Y cụ thể).
   - Tạo các hình dạng tùy chỉnh để đo các khu vực cụ thể.
   - Tải lên ảnh lớp phủ để so sánh với mockup thiết kế.
   - Lưu/tải các preset cho các dự án khác nhau.

## Cài đặt / Chạy cục bộ
Đây là một ứng dụng web tĩnh (HTML/CSS/JS). Không cần bước build hay dependencies.

1. Clone hoặc download repository này
2. Mở `index.html` trong trình duyệt của bạn.

   *Tùy chọn: Để có trải nghiệm tốt nhất (tránh lỗi CORS với hình ảnh cục bộ), hãy chạy với một máy chủ cục bộ:*
   ```bash
   npx serve .
   # hoặc
   python -m http.server 8000
   ```

## Triển khai (Deployment)

### Tự động Deploy lên Cloudflare Pages
Project này được cấu hình để tự động deploy lên Cloudflare Pages mỗi khi push code lên nhánh `main`.

📖 **[Hướng Dẫn Triển Khai Chi Tiết](DEPLOYMENT.md)** - Hướng dẫn từng bước cho:
- Tích hợp Cloudflare Pages + GitHub (khuyến nghị)
- Thiết lập GitHub Actions với API tokens
- Cấu hình custom domain
- Xử lý sự cố

**Bắt đầu nhanh:**
1. Kết nối GitHub repo với Cloudflare Pages
2. Đặt production branch là `main`
3. Để trống build settings
4. Xong! Auto-deployment đã được kích hoạt.

## Công nghệ
- HTML5
- CSS3 (Variables, Flexbox, Grid)
- Vanilla JavaScript (ES6+)
- **Không phụ thuộc framework bên ngoài**

## Giấy phép
MIT
