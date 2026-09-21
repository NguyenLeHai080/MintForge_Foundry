# 🪙 Đặc Tả Nghiệp Vụ: Hệ Thống Quản Lý Tín Dụng (Credit Engine)

Credit là đơn vị tiền tệ ảo nội bộ của MintForge, được sử dụng để thanh toán cho chi phí tài nguyên tính toán GPU khi người dùng sinh ảnh bằng các mô hình AI.

---

## ⚖️ 1. Bảng Tiêu Thụ Credits Theo Mô Hình AI

| Tác vụ sinh ảnh | Mô hình sử dụng | Tiêu hao Credit | Ghi chú |
| :--- | :--- | :---: | :--- |
| **Ảnh cơ bản (512x512)** | Stable Diffusion v1.5 | **1 Credit** | Thời gian xử lý: ~2-3 giây |
| **Ảnh chất lượng cao (1024x1024)** | SDXL (Stable Diffusion XL) | **2 Credits** | Chi tiết sắc nét, prompt đa dạng |
| **Ảnh nghệ thuật siêu thực** | Midjourney v6 Mode | **5 Credits** | Đòi hỏi GPU V100/A100 |
| **Mô hình thế hệ mới** | FLUX.1 [dev] / [schnell] | **4 Credits** | Xử lý văn bản trong ảnh chuẩn xác |
| **Nâng cấp độ phân giải (Upscale 4x)** | RealESRGAN / Clarity AI | **1 Credit** | Nâng kích thước ảnh lên 4K |
| **Xóa vật thể / Thay thế (Inpainting)** | SD Inpainting | **2 Credits** | Chỉnh sửa từng vùng trên canvas |

---

## ⏳ 2. Vòng Đời & Chính Sách Tồn Trữ Credit

1. **Credit Thuê Bao (Subscription Credits):**
   - Được cấp vào đầu mỗi chu kỳ thanh toán.
   - **Chính sách Rollover (Chuyển tiếp):** Cho phép bảo lưu tối đa 50% số credit chưa dùng sang tháng kế tiếp nếu thuê bao tiếp tục gia hạn thành công. Nếu hủy gói, credit theo tháng sẽ hết hạn vào cuối chu kỳ.
2. **Credit Nạp Lẻ (Purchased Top-up Credits):**
   - Không có thời hạn hết hạn (Never Expire).
   - Được bảo lưu vĩnh viễn trên ví của tài khoản.
3. **Thứ tự ưu tiên trừ Credit:**
   - Hệ thống tự động trừ **Credit Thuê Bao** (có hạn sử dụng trước) ➔ Sau đó mới trừ đến **Credit Nạp Lẻ** (không thời hạn).

---

## 🛡️ 3. Cơ Chế Khóa (Hold) & Hoàn Trả (Refund) Credit

```
[Bắt đầu Gen Ảnh] ➔ [Lock/Deduct Credit tạm thời]
       |
       +---> [Gen Thành Công] ➔ [Ghi nhận Debit thành công]
       |
       +---> [Lỗi GPU / Timeout / Content Policy Block] ➔ [Auto Refund 100% Credit ngay lập tức]
```

- **Rollback tự động:** Nếu job sinh ảnh thất bại vì lỗi hệ thống (OOM, timeout GPU) hoặc bộ lọc kiểm duyệt an toàn hình ảnh (NSFW filter) từ chối trước khi xuất ảnh, hệ thống tự động hoàn lại số credit đã giữ trong vòng < 500ms.
