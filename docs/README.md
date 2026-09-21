# 📚 Trung Tâm Tài Liệu Nghiệp Vụ - MintForge Foundry

Chào mừng bạn đến với kho tài liệu nghiệp vụ và đặc tả kỹ thuật của hệ thống **MintForge Foundry** - Nền tảng quản lý bảng giá, nạp tín dụng (credits) và gói cước dành cho hệ sinh thái tạo ảnh AI MintForge.

---

## 🗺️ Mục Lục Tra Cứu Theo Phân Hệ Nghiệp Vụ

### 1. 🏗️ [01-architecture/](./01-architecture/) - Kiến Trúc Hệ Thống & Quy Trình Phát Triển
- [overview.md](./01-architecture/overview.md): Tổng quan kiến trúc hệ thống, Tech Stack (Frontend, Backend, Database, Message Queue, AI Gateway).
- [gitflow_workflow.md](./01-architecture/gitflow_workflow.md): Quy chuẩn phân tầng nhánh Gitflow (`prod`, `staging`, `dev`), Branch Protection và xử lý Hotfix.

### 2. 💳 [02-business-requirements/](./02-business-requirements/) - Đặc Tả Nghiệp Vụ Cốt Lõi (BRD / SRS)
- [pricing_plans.md](./02-business-requirements/pricing_plans.md): Đặc tả bảng giá, chi tiết gói Starter, Pro Creator, Enterprise, coupon giảm giá và gói nạp lẻ.
- [credit_system.md](./02-business-requirements/credit_system.md): Bảng quy đổi credit theo mô hình AI (Midjourney, SDXL, FLUX), hạn dùng và chính sách rollover.
- [subscription_management.md](./02-business-requirements/subscription_management.md): Quản lý thuê bao định kỳ, nâng/hạ cấp gói (Prorated Billing), xử lý nợ (Dunning).

### 3. 🏦 [03-payment-integration/](./03-payment-integration/) - Tích Hợp Cổng Thanh Toán
- [payment_gateways.md](./03-payment-integration/payment_gateways.md): Tích hợp cổng chuyển khoản tự động VietQR (SePAY), MoMo, VNPay và thẻ quốc tế Stripe.
- [transaction_lifecycle.md](./03-payment-integration/transaction_lifecycle.md): Vòng đời giao dịch (State Machine), xử lý Webhook bất biến (Idempotent) và đối soát tự động hàng ngày.

### 4. 🔌 [04-api-specifications/](./04-api-specifications/) - Đặc Tả Kỹ Thuật API
- [billing_api.md](./04-api-specifications/billing_api.md): REST API cho bảng giá, tạo phiên thanh toán (Checkout) và Webhooks nạp tiền.
- [credits_api.md](./04-api-specifications/credits_api.md): API nội bộ kiểm tra số dư, giữ credit và hoàn trả credit khi sinh ảnh thất bại.

### 5. 🛡️ [05-security-compliance/](./05-security-compliance/) - Bảo Mật & Kiểm Toán Tài Chính
- [fraud_audit_compliance.md](./05-security-compliance/fraud_audit_compliance.md): Phòng chống gian lận thẻ, giả mạo Webhook, chuẩn PCI-DSS và sổ cái kiểm toán (Audit Trail).

---

## 💡 Hướng Dẫn Đóng Góp (Contributing)
Mọi thay đổi hoặc bổ sung vào thư mục tài liệu này đều phải tuân thủ nghiêm ngặt quy trình **Gitflow**:
1. Tách nhánh từ `dev`: `feat/<tên-tính-năng>`.
2. Tạo Pull Request vào `dev` và chờ review.
3. Đồng bộ lên `staging` và `prod` qua Pull Request sau khi nghiệm thu.
