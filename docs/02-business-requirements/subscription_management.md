# 🔄 Đặc Tả Nghiệp Vụ: Quản Lý Thuê Bao (Subscription Management)

Tài liệu hướng dẫn quy trình tự động gia hạn, nâng cấp, hạ cấp gói cước và xử lý các kịch bản ngoại lệ khi thu phí thuê bao.

---

## 📅 1. Chu Kỳ Thanh Toán & Tự Động Gia Hạn (Recurring Billing)

1. **Chu kỳ tính phí:**
   - **Hàng tháng (Monthly):** Tính phí vào đúng ngày đăng ký ban đầu của tháng tiếp theo (Billing Anchor Date).
   - **Hàng năm (Yearly):** Tính phí một lần cho 12 tháng với mức chiết khấu 20%.
2. **Kịch bản gia hạn tự động:**
   - Trước 3 ngày: Gửi email nhắc nhở gia hạn tự động kèm biên lai dự kiến.
   - Đến ngày thu phí: Gọi API tokenized recurring qua cổng thanh toán đã liên kết (Stripe / Thẻ quốc tế).
   - Nếu thành công: Cấp mới hạn mức credits của gói và gửi biên lai điện tử.

---

## ⬆️ 2. Quy Trình Nâng Cấp & Hạ Cấp Gói (Upgrade & Downgrade)

### Nâng cấp gói cước (Upgrade - VD: Starter ➔ Pro)
- **Hiệu lực ngay lập tức:** Người dùng được kích hoạt các tính năng của gói Pro ngay khi hoàn tất thanh toán.
- **Tính phí theo tỷ lệ (Prorated Billing):**
  - Số tiền phải trả thêm = (Giá gói mới - Giá gói cũ) × (Số ngày còn lại trong chu kỳ / Tổng số ngày trong chu kỳ).
  - Bù chênh lệch credits ngay tại thời điểm thanh toán.

### Hạ cấp gói cước (Downgrade - VD: Pro ➔ Starter)
- **Hiệu lực cuối chu kỳ:** Người dùng vẫn giữ nguyên quyền lợi của gói Pro cho đến khi hết chu kỳ đã thanh toán.
- Từ chu kỳ tiếp theo: Hệ thống mới chuyển sang gói Starter và thu mức phí tương ứng của gói mới.

---

## ⚠️ 3. Chính Sách Xử Lý Thu Phí Thất Bại (Dunning Process)

Khi thẻ tín dụng bị từ chối (hết hạn, thiếu số dư, khóa thẻ):
1. **Ngày 0:** Giao dịch lỗi ➔ Gửi email thông báo thanh toán không thành công, tạm thời duy trì quyền truy cập trong 24h grace period.
2. **Ngày 2:** Thử thu phí lại lần 1 (Retry attempt 1) ➔ Nếu lỗi, gửi cảnh báo.
3. **Ngày 5:** Thử thu phí lại lần 2 ➔ Khóa quyền ưu tiên hàng đợi GPU.
4. **Ngày 7:** Thử thu phí lần cuối ➔ Nếu vẫn thất bại, chuyển trạng thái thuê bao sang `CANCELED` / `SUSPENDED` và hạ cấp tài khoản về gói Free.
