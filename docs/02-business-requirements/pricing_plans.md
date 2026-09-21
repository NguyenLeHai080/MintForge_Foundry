# 💳 Đặc Tả Nghiệp Vụ: Bảng Giá & Gói Cước (Pricing Plans)

Tài liệu quy định chi tiết về cấu trúc gói cước, chính sách giá, quyền lợi người dùng và chính sách khuyến mãi trên nền tảng **MintForge Foundry**.

---

## 📦 1. Danh Mục Các Gói Cước (Subscription Tiers)

| Tiêu chí | Gói Khởi Động (Starter) | Gói Chuyên Nghiệp (Pro Creator) | Gói Doanh Nghiệp (Enterprise) |
| :--- | :--- | :--- | :--- |
| **Giá niêm yết (VNĐ)** | **199.000₫** / tháng | **499.000₫** / tháng | **1.990.000₫** / tháng (hoặc custom) |
| **Giá theo năm (-20%)** | 159.000₫ / tháng (1.908.000₫/năm) | 399.000₫ / tháng (4.788.000₫/năm) | 1.590.000₫ / tháng |
| **Hạn mức Credits** | **500 Credits** / tháng | **2.000 Credits** / tháng | **10.000 Credits** / tháng |
| **Tốc độ hàng đợi** | Tiêu chuẩn (Standard Queue) | Ưu tiên cao (Fast GPU Queue) | Kênh GPU chuyên dụng (Dedicated) |
| **Độ phân giải tối đa** | 1080p (Full HD) | 4K UHD | 8K Ultra-Res |
| **Số luồng gen đồng thời** | 1 ảnh / lần | 3 ảnh / lần | 10 ảnh / lần |
| **Tính năng cao cấp** | Prompt cơ bản | Inpainting, Face Restore, Upscaler 4x | Custom LoRA Fine-tune, API Key |

---

## ⚡ 2. Gói Nạp Lẻ Linh Hoạt (Pay-As-You-Go Credit Packs)

Dành cho người dùng không muốn đăng ký gói định kỳ hàng tháng, credits không hết hạn:
- **Pack Mini:** 99.000₫ ➔ 200 Credits
- **Pack Standard:** 249.000₫ ➔ 600 Credits (+10% Bonus)
- **Pack Mega:** 699.000₫ ➔ 2.000 Credits (+25% Bonus)

---

## 🎟️ 3. Chính Sách Mã Khuyến Mãi (Coupons & Discounts)

- **Cấu trúc mã giảm giá:**
  - `PERCENTAGE`: Giảm theo % (VD: `MINT20` giảm 20%, tối đa 200.000₫).
  - `FIXED_AMOUNT`: Giảm số tiền cố định (VD: `WELCOME50` giảm 50.000₫).
  - `BONUS_CREDITS`: Tặng thêm credits trực tiếp (VD: `CREATORPLUS` tặng 150 credits).
- **Ràng buộc:**
  - Giới hạn số lần dùng trên mỗi tài khoản (thường là 1 lần duy nhất).
  - Thời hạn áp dụng (Valid From - Valid To).
  - Điều kiện giá trị đơn hàng tối thiểu.
