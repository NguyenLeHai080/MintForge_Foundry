# 💳 Đặc Tả Tích Hợp: Cổng Thanh Toán Đa Phương Thức

Hệ thống **MintForge Foundry** hỗ trợ tích hợp cả phương thức thanh toán chuyển khoản ngân hàng QR nội địa Việt Nam và thanh toán thẻ quốc tế.

---

## 🏦 1. Danh Sách Các Cổng Hỗ Trợ

| Cổng thanh toán | Thị trường | Phương thức hỗ trợ | Độ trễ kích hoạt |
| :--- | :--- | :--- | :---: |
| **VietQR (SePAY / Casso)** | Việt Nam | Quét mã QR chuyển khoản mọi ngân hàng | 1 - 3 giây |
| **Ví MoMo** | Việt Nam | QR App MoMo, Thẻ ATM nội địa Napas | Tức thời |
| **VNPay** | Việt Nam | QR ngân hàng, VNPAY-QR, Thẻ Visa/Master nội địa | Tức thời |
| **Stripe** | Toàn cầu | Thẻ Credit/Debit Quốc tế (Visa, Mastercard, AMEX), Apple Pay, Google Pay | Tức thời |

---

## 📲 2. Luồng Tích Hợp Chuyển Khoản Tự Động VietQR (SePAY)

```
[User bấm Nạp Gói]
       |
       v
[Backend tạo Order ID: MF_ORD_100234]
       |
       v
[Hiển thị Popup QR Code chứa cú pháp: "MF100234" + Số tiền chính xác]
       |
       v  (User dùng App Ngân Hàng quét và chuyển khoản)
[Ngân hàng biến động số dư] ➔ [Webhook gửi tới SePAY]
       |
       v  (SePAY gọi Webhook về MintForge Backend)
[POST /api/v1/billing/webhook/sepay]
       |
       v  (Xác thực chữ ký API Secret & Khớp nội dung "MF100234")
[Cộng Credits vào tài khoản User ngay lập tức]
       |
       v
[Frontend nhận tín hiệu qua WebSocket/Polling và hiển thị thành công]
```

---

## 🌐 3. Luồng Tích Hợp Stripe Checkout (Quốc Tế)

- Sử dụng **Stripe Checkout Session** hoặc **Stripe Payment Elements** để không lưu trữ thông tin thẻ trực tiếp trên máy chủ MintForge (Đạt chuẩn PCI-DSS SAQ A).
- Lắng nghe Webhook Event:
  - `checkout.session.completed`: Khởi tạo gói cước và cấp credit.
  - `invoice.paid`: Gia hạn định kỳ thành công.
  - `invoice.payment_failed`: Kích hoạt quy trình Dunning xử lý nợ.
