# 🏗️ Tổng Quan Kiến Trúc Hệ Thống MintForge Foundry

Hệ thống **MintForge Foundry** đóng vai trò là xương sống tài chính và phân phối tài nguyên (Billing & Credit Engine) cho toàn bộ nền tảng sáng tạo hình ảnh AI MintForge.

---

## 🧩 1. Sơ Đồ Kiến Trúc Tổng Thể

```
+-------------------------------------------------------------+
|                      Clients (Web / App)                    |
|             (React / Next.js / Vanilla HTML)                |
+------------------------------+------------------------------+
                               | HTTPS / WSS
                               v
+-------------------------------------------------------------+
|                      API Gateway / Reverse Proxy            |
|                      (Nginx / Cloudflare WAF)               |
+------------------------------+------------------------------+
                               |
            +------------------+------------------+
            |                                     |
            v                                     v
+------------------------+           +------------------------+
|  Billing & Foundry Svc |           |   AI Generation Gateway|
|  (Express / Fastify)   |           |   (FastAPI / Python)   |
+-----------+------------+           +-----------+------------+
            |                                     |
            | Quản lý giao dịch                   | Trừ / Kiểm tra
            | Nạp credits & Thuê bao              | Số dư credits
            |                                     |
            +------------------+------------------+
                               |
                               v
+-------------------------------------------------------------+
|                      Data & Message Layer                   |
|  - PostgreSQL: Lưu trữ User, Transaction, Ledger, Orders    |
|  - Redis: Caching số dư Credits, Lock phân tán, Rate Limit  |
|  - RabbitMQ / Kafka: Sự kiện Webhook nạp tiền, hoàn credit  |
+-------------------------------------------------------------+
```

---

## 🛠️ 2. Công Nghệ Sử Dụng (Tech Stack)

| Thành phần | Công nghệ đề xuất | Vai trò |
| :--- | :--- | :--- |
| **Frontend** | Vanilla JS / Next.js, CSS Tokens | Hiển thị bảng giá, thanh toán, ví tín dụng |
| **Backend Core** | Node.js (TypeScript) / Express | Xử lý nghiệp vụ gói cước, cổng thanh toán, webhook IPN |
| **Database** | PostgreSQL | Lưu trữ hóa đơn, lịch sử giao dịch (ACID compliant) |
| **Cache & Lock** | Redis | Kiểm tra số dư tức thời, Distributed Lock tránh trừ âm credit |
| **Message Queue**| RabbitMQ | Xử lý bất đồng bộ webhook thanh toán, gửi thông báo |
| **Payment SDK** | VietQR, MoMo, VNPay, Stripe | Cổng nạp tiền tự động đa phương thức |

---

## 🔄 3. Nguyên Tắc Thiết Kế Cốt Lõi
1. **Idempotency (Tính bất biến):** Mọi webhook từ cổng thanh toán và API trừ credit phải có `Idempotency-Key` để tránh ghi trùng giao dịch hoặc cộng trùng tiền.
2. **Double-Entry Bookkeeping (Sổ cái kế toán kép):** Mọi biến động credit (nạp tiền, hoàn tiền, tiêu hao khi gen ảnh) đều ghi lại cả 2 bút toán: Credit (+) và Debit (-).
3. **High Availability (Sẵn sàng cao):** Tách biệt dịch vụ tính phí (Billing) và dịch vụ sinh ảnh (AI Compute), đảm bảo khi server AI tải cao thì người dùng vẫn có thể nạp tiền bình thường.
