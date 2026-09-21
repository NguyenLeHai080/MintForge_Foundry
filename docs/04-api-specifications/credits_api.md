# 🔌 Đặc Tả Kỹ Thuật: Credits Consumption API

Tài liệu đặc tả các giao diện API nội bộ phục vụ việc truy vấn số dư, trừ credits và hoàn trả credits khi người dùng thực hiện tạo ảnh AI.

---

## 1. Truy Vấn Số Dư Credits (Check Balance)
- **Endpoint:** `GET /credits/balance`
- **Quyền hạn:** User Token
- **Response mẫu (200 OK):**
```json
{
  "status": "success",
  "data": {
    "total_credits": 2450,
    "subscription_credits": 1850,
    "subscription_expires_at": "2026-10-21T00:00:00Z",
    "topup_credits": 600,
    "current_tier": "pro_creator"
  }
}
```

---

## 2. Giữ / Khóa Credit Cho Tác Vụ Sinh Ảnh (Reserve / Deduct)
- **Endpoint:** `POST /credits/reserve`
- **Quyền hạn:** Service-to-Service Secret (Gọi từ AI Engine Gateway)
- **Request Body:**
```json
{
  "user_id": "usr_998124",
  "task_id": "task_gen_44921",
  "model": "flux_dev",
  "credits_required": 4,
  "idempotency_key": "idemp_task_gen_44921"
}
```
- **Response mẫu (200 OK):**
```json
{
  "status": "success",
  "message": "Credits reserved successfully",
  "data": {
    "transaction_ref": "tx_res_881923",
    "remaining_balance": 2446
  }
}
```

---

## 3. Hoàn Trả Credit Khi Lỗi Sinh Ảnh (Refund / Rollback)
- **Endpoint:** `POST /credits/refund`
- **Quyền hạn:** Service-to-Service Secret
- **Request Body:**
```json
{
  "user_id": "usr_998124",
  "task_id": "task_gen_44921",
  "reason": "GPU_CUDA_OUT_OF_MEMORY",
  "credits_to_refund": 4
}
```
- **Response mẫu (200 OK):**
```json
{
  "status": "success",
  "message": "Credits refunded successfully",
  "data": {
    "refund_tx_id": "tx_ref_992144",
    "updated_balance": 2450
  }
}
```
