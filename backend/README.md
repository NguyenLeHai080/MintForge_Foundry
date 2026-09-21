# 🐍 MintForge Foundry - Backend Service

Hệ sinh thái Backend quản lý bảng giá, thanh toán và phân bổ tín dụng AI cho MintForge, xây dựng theo kiến trúc **Modular Clean Architecture** trên nền tảng **FastAPI (Python)**.

---

## 📂 Cấu Trúc Thư Mục Modular

```text
backend/
├── app/
│   ├── core/                  # Hạ tầng lõi
│   │   ├── config.py          # Environment settings & CORS
│   │   ├── security.py        # Mã hóa mật khẩu bcrypt, JWT encode/decode
│   │   ├── permissions.py     # Phân quyền RBAC (ADMIN / USER)
│   │   └── exceptions.py      # Hệ thống bắt lỗi tập trung (AppException)
│   ├── db/                    # Cơ sở dữ liệu
│   │   └── session.py         # SQLAlchemy Async Session & Declarative Base
│   ├── shared/                # Thành phần dùng chung
│   │   └── responses.py       # Cấu trúc API Response chuẩn {success, message, data, error}
│   ├── modules/               # CÁC MODULE NGHIỆP VỤ ĐỘC LẬP
│   │   ├── auth/              # Router, Schemas, Models, Service xác thực & phân quyền
│   │   ├── billing/           # Bảng giá, Gói cước, Checkout đơn hàng
│   │   ├── credits/           # Quản lý số dư, giữ credit, hoàn credit
│   │   └── admin/             # Quản trị viên quản lý danh mục và người dùng
│   └── main.py                # Điểm khởi chạy FastAPI, đăng ký middleware & routers
├── requirements.txt
└── README.md
```

---

## 🚀 Hướng Dẫn Chạy Cục Bộ

### 1. Cài đặt thư viện
```bash
pip install -r requirements.txt
```

### 2. Khởi chạy Uvicorn Server
```bash
uvicorn app.main:app --reload --port 8000
```

- **API Documentation (Swagger UI):** `http://localhost:8000/docs`
- **ReDoc:** `http://localhost:8000/redoc`
