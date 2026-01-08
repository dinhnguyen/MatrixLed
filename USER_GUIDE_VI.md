# Hướng Dẫn Sử Dụng - Matrix Led

**Matrix Led** là công cụ đo lường màn hình và kiểm tra bố cục mạnh mẽ. Tài liệu này hướng dẫn chi tiết các tính năng và cách sử dụng hiệu quả.

## 🚀 Bắt đầu

1.  **Khởi chạy**: Mở ứng dụng.
2.  **Bắt đầu**: Nhấn nút **"Gét Gô"** trên màn hình chào mừng.
3.  **Toàn màn hình**: Ứng dụng sẽ tự động vào chế độ toàn màn hình để đảm bảo đo lường chính xác nhất. Bạn có thể thoát bất cứ lúc nào bằng phím `Esc`.

## 🛠 Tính năng chi tiết

### 1. Thước kẻ (Rulers)
- Thước kẻ hiển thị ở cả 4 cạnh màn hình (Trên, Trái, Phải, Dưới).
- Các dấu mốc mỗi 100px giúp bạn đo khoảng cách chính xác.
- Các vị trí đánh dấu tùy chỉnh được làm nổi bật với nhãn trên thước kẻ.

### 2. Đường gióng (Guidelines)
- **Bật/Tắt**: Nhấn biểu tượng **Guidelines** trên thanh công cụ hoặc phím `G`.
- **Giao điểm**: Nơi các đường dọc và ngang cắt nhau, tọa độ `(x, y)` chính xác sẽ được hiển thị.
- **Cấu hình**: Bạn có thể thêm các tọa độ X và Y cụ thể trong bảng Cài đặt.

### 3. Hình dạng tùy chỉnh (Shapes)
Tạo các hình chữ nhật để kiểm tra kích thước và khoảng cách phần tử.
- **Thêm**: Mở Cài đặt (`S`) > Tab **Shapes** > Điền form > Nhấn **Add New Shape**.
- **Chỉnh sửa**: Bạn có thể thay đổi bất kỳ hình dạng nào:
    - **Tên/Nhãn**: Để dễ nhận biết.
    - **Màu sắc**: Chọn màu để nổi bật trên nền của bạn.
    - **Kích thước**: Vị trí X, Y và Chiều rộng (W), Chiều cao (H) tính bằng pixel.
- **Hiển thị**: Mỗi hình dạng hiển thị tọa độ vị trí và kích thước trên màn hình.
- **Xóa**: Xóa các hình dạng không cần thiết bằng nút Delete.

### 4. Lớp phủ nền (Overlay)
Phủ một ảnh thiết kế (mockup) lên để so sánh từng pixel với kết quả thực tế.
- **Tải lên**: Cài đặt (`S`) > Tab **Overlay** > Chọn file ảnh (PNG, JPG, v.v.).
- **Kéo thả**: Click và kéo ảnh overlay để đặt nó ở bất kỳ đâu trên màn hình.
- **Điều khiển**:
    - **Độ mờ (Opacity)**: Điều chỉnh độ trong suốt để thấy cả overlay và nội dung bên dưới.
    - **Tỷ lệ (Scale)**: Thay đổi kích thước ảnh nếu độ phân giải không khớp 1:1 với viewport.
    - **Khóa (Lock)**: Bật để ngăn di chuyển ảnh khi đang đo.
    - **Reset Position**: Đưa overlay về tọa độ `(0,0)`.
    - **Clear Image**: Xóa hoàn toàn overlay.

### 5. Quản lý Cấu hình (Presets)
Lưu lại các thiết lập không gian làm việc cho các dự án khác nhau.
- **10 Slot Preset**: Ứng dụng cung cấp 10 slot để lưu các cấu hình khác nhau.
- **Lưu**: Nhấn **Save** vào bất kỳ slot nào để lưu thiết lập hiện tại (markers, shapes, guidelines).
- **Tải**: Nhấn **Load** để khôi phục cấu hình đã lưu.
- **Đổi tên**: Chỉnh sửa tên preset trực tiếp trong ô nhập liệu.
- **Xóa**: Xóa các preset không cần để giải phóng slot.
- **Nhập/Xuất**:
    - **Export**: Xuất từng preset dưới dạng file JSON để chia sẻ.
    - **Import**: Nhập file preset vào bất kỳ slot nào.
    - **All Presets**: Sao lưu hoặc khôi phục toàn bộ bộ sưu tập preset.

## ⌨️ Phím tắt

| Phím | Hành động |
| :--- | :--- |
| `G` | Bật/tắt Đường gióng |
| `S` | Mở bảng Cài đặt |
| `Esc` | Thoát Toàn màn hình / Đóng bất kỳ cửa sổ nào (Cài đặt hoặc Hướng dẫn) |

## ❓ Câu hỏi thường gặp

**H: Tại sao ứng dụng lại vào chế độ toàn màn hình?**
Đ: Các thanh công cụ và UI của trình duyệt có thể làm sai lệch phép đo. Chế độ toàn màn hình đảm bảo `window.innerHeight` và `window.innerWidth` phản ánh đúng diện tích màn hình thực tế để đo pixel-perfect.

**H: Dữ liệu của tôi được lưu ở đâu?**
Đ: Tất cả dữ liệu (presets, settings) được lưu trong `localStorage` của trình duyệt. Xóa dữ liệu duyệt web sẽ làm mất các preset trừ khi bạn đã xuất (export) chúng ra file trước đó.

**H: Tôi có thể dùng công cụ này mà không cần toàn màn hình không?**
Đ: Có, bạn có thể thoát toàn màn hình bất cứ lúc nào bằng phím `Esc`. Công cụ vẫn hoạt động, nhưng phép đo sẽ bao gồm cả các phần tử UI của trình duyệt.

**H: Làm thế nào để chia sẻ cấu hình của tôi với người khác?**
Đ: Sử dụng tính năng Export trong tab Presets để lưu cấu hình thành file JSON. Người khác có thể import file này để sử dụng cấu hình giống bạn.

**H: Tôi có thể kéo ảnh overlay không?**
Đ: Có! Đơn giản chỉ cần click và kéo ảnh overlay để di chuyển nó. Sử dụng checkbox Lock để tránh di chuyển nhầm khi đang đo.
