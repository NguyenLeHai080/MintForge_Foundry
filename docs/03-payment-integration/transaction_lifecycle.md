# 📊 Đặc Tả Nghiệp Vụ: Vòng Đời Giao Dịch & Đối Soát (Transaction Lifecycle)

Mọi biến động nạp tiền và mua gói đều phải trải qua máy trạng thái (State Machine) nghiêm ngặt nhằm bảo đảm tính toàn vẹn dữ liệu tài chính.

---

## 🔄 1. Biểu Đồ Máy Trạng Thái Đơn Hàng (Order State Machine)

```
       +--------------+
       |   PENDING    | <--- Khởi tạo đơn hàng (User bắt đầu checkout)
       +-------+------+
               |
      +--------+--------+
      |                 |
      v                 v
+-----------+     +------------+
|  EXPIRED  |     | PROCESSING | <--- Nhận webhook từ cổng thanh toán
+-----------+     +-----+------+
                        |
               +--------+--------+
               |                 |
               v                 v
         +-----------+     +-----------+
         |  FAILED   |     | COMPLETED | <--- Đã cộng credit & gửi email
         +-----------+     +-----+-----+
                                 |
                                 v
                           +-----------+
                           | REFUNDED  | <--- Hoàn tiền theo yêu cầu
                           +-----------+
```

---

## 🔒 2. Nguyên Tắc Xử Lý Webhook Bất Biến (Idempotency)

Các cổng thanh toán có cơ chế retry webhook nhiều lần khi chưa nhận được phản hồi HTTP 200. Để tránh rủi ro cộng x2, x3 số credit:
1. **Kiểm tra trạng thái đơn:**
   - Nếu đơn hàng đã ở trạng thái `COMPLETED`, backend ghi nhận log và phản hồi ngay `HTTP 200 OK`, tuyệt đối không thực hiện lại thao tác cộng credits.
2. **Distributed Locking bằng Redis:**
   - Khi nhận webhook, backend lock key `lock:order:<order_id>` với TTL = 10s.
   - Bất kỳ request webhook trùng lặp nào đến trong cùng thời điểm sẽ phải chờ hoặc bị bỏ qua.

---

## ⚖️ 3. Nghiệp Vụ Đối Soát Tự Động (Daily Reconciliation)

- **Thời gian chạy:** 01:00 AM hàng ngày (Cron Job).
- **Quy trình:**
  1. Tải báo cáo giao dịch chi tiết từ cổng thanh toán (Stripe / SePAY / VNPay).
  2. So sánh danh sách `transaction_id`, số tiền thực nhận so với bảng ghi nhận đơn hàng thành công trong PostgreSQL.
  3. Nếu phát hiện sai lệch (VD: Tiền đã vào tài khoản ngân hàng nhưng webhook bị rớt không cộng credit cho khách):
     - Tự động tạo Ticket cảnh báo mức cao trên Slack/Telegram nội bộ.
     - Tự động chạy cơ chế auto-compensate (cộng bù credit cho khách hàng).
