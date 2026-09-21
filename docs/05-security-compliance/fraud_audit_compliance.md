# 🛡️ An Toàn Thông Tin: Phòng Chống Gian Lận & Kiểm Toán (Fraud & Compliance)

Đặc tả các quy định bảo mật, kiểm soát rủi ro tài chính và tuân thủ các chuẩn an ninh trong hệ thống nạp tiền của **MintForge Foundry**.

---

## 🚫 1. Cơ Chế Phòng Chống Gian Lận (Fraud Prevention)

1. **Chống Fake Webhook / Giả mạo giao dịch:**
   - Mọi webhook nạp tiền bắt buộc phải xác thực bằng **HMAC-SHA256 Signature** với bí mật chia sẻ (Webhook Signing Secret).
   - Kiểm tra IP Whitelist: Chỉ tiếp nhận webhook xuất phát từ dải IP chính thức của đối tác (Stripe, Casso/SePAY).
2. **Chống Spam Nạp Thử (Brute-force / Card Testing):**
   - Áp dụng Rate Limiting qua Redis: Tối đa 5 lượt khởi tạo đơn hàng thanh toán / phút / IP.
   - Tự động tạm khóa chức năng nạp tiền 15 phút nếu nhập sai mã OTP/CVV quá 3 lần liên tiếp.
3. **Phát hiện gian lận nạp lậu (Chargeback Abuse):**
   - Nếu phát hiện tranh chấp (Dispute) hoặc Chargeback từ ngân hàng phát hành thẻ:
     - Tự động đóng băng số credits còn lại trên tài khoản.
     - Đưa thông tin thẻ và User ID vào blacklist rủi ro cao.

---

## 📋 2. Sổ Cái Kiểm Toán Tài Chính (Immutable Financial Audit Trail)

Mọi thay đổi liên quan đến tiền tệ và credits đều phải được ghi lại vào bảng `financial_ledger` với các nguyên tắc:
- **Append-Only:** Bảng dữ liệu chỉ cho phép `INSERT`, tuyệt đối cấm lệnh `UPDATE` hoặc `DELETE`.
- **Trường dữ liệu bắt buộc:**
  - `id`: UUID định danh duy nhất.
  - `user_id`: Định danh người dùng.
  - `action`: `TOPUP`, `SUBSCRIPTION_FEE`, `AI_USAGE_DEBIT`, `SYSTEM_REFUND`.
  - `amount_credits`: Số credit biến động (+ / -).
  - `balance_before` và `balance_after`: Số dư trước và sau biến động.
  - `reference_id`: Mã giao dịch cổng thanh toán hoặc Task ID sinh ảnh.
  - `ip_address` & `user_agent`: Dấu vết thiết bị thực hiện.
  - `created_at`: Dấu thời gian chuẩn UTC.

---

## 🔐 3. Tuân Thủ Tiêu Chuẩn PCI-DSS
- Hệ thống MintForge Foundry **không bao giờ lưu trữ** số thẻ tín dụng (PAN), ngày hết hạn hay mã bảo mật CVV/CVC trên cơ sở dữ liệu nội bộ.
- Toàn bộ dữ liệu thẻ thanh toán quốc tế được tokenized và lưu trữ an toàn trực tiếp trên hạ tầng đạt chứng nhận PCI-DSS Level 1 của đối tác Stripe.
