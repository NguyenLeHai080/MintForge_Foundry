# 🔌 Đặc Tả Kỹ Thuật: Billing & Subscription API

Tài liệu chi tiết về các endpoints RESTful API phục vụ luồng mua gói cước, nạp credits và xử lý Webhooks.

---

## 📌 Base URL
- Development: `https://dev-api.mintforge.io/api/v1`
- Staging: `https://staging-api.mintforge.io/api/v1`
- Production: `https://api.mintforge.io/api/v1`

---

## 1. Lấy Danh Sách Bảng Giá & Gói Cước
- **Endpoint:** `GET /billing/plans`
- **Quyền hạn:** Public
- **Response mẫu (200 OK):**
```json
{
  "status": "success",
  "data": [
    {
      "id": "plan_starter",
      "name": "Khởi Động (Starter)",
      "price_vnd": 199000,
      "credits_granted": 500,
      "billing_interval": "month",
      "features": ["150 ảnh HD", "Tốc độ tiêu chuẩn"]
    },
    {
      "id": "plan_pro",
      "name": "Chuyên Nghiệp (Pro Creator)",
      "price_vnd": 499000,
      "credits_granted": 2000,
      "billing_interval": "month",
      "features": ["Ảnh 4K HDR", "Hàng đợi GPU ưu tiên"]
    }
  ]
}
```

---

## 2. Khởi Tạo Giao Dịch Thanh Toán (Checkout)
- **Endpoint:** `POST /billing/checkout`
- **Quyền hạn:** Bearer Token (Authenticated User)
- **Request Body:**
```json
{
  "plan_id": "plan_pro",
  "payment_method": "vietqr",
  "coupon_code": "MINT20"
}
```
- **Response mẫu (201 Created):**
```json
{
  "status": "success",
  "data": {
    "order_id": "MF_ORD_20260921_8821",
    "amount_vnd": 399200,
    "qr_url": "https://qr.sepay.vn/img?acc=123456&bank=MBBank&amount=399200&des=MF8821",
    "transfer_code": "MF8821",
    "expires_at": "2026-09-21T03:55:00Z"
  }
}
```

---

## 3. Webhook Tiếp Nhận Kết Quả Thanh Toán
- **Endpoint:** `POST /billing/webhook/sepay`
- **Headers:** `X-Webhook-Signature: <hmac_sha256_hash>`
- **Request Body (Từ cổng thanh toán gửi sang):**
```json
{
  "id": 998822,
  "gateway": "MBBank",
  "transactionDate": "2026-09-21 10:30:15",
  "accountNumber": "123456789",
  "amount": 399200,
  "content": "MF8821 chuyen tien",
  "referenceCode": "FT2626488219"
}
```
- **Response phản hồi:** `HTTP 200 OK` (hoàn tất cộng credit và ghi sổ ledger).
