/**
 * Default credit plans and features configuration
 */

export const DEFAULT_PLANS = [
  {
    id: "plan_starter",
    name: "Khởi Động (Starter)",
    price: "199.000₫",
    period: "/ tháng",
    credits: "500 Credits",
    popular: false,
    features: [
      "150 ảnh tiêu chuẩn Full HD",
      "Mô hình SDXL & Stable Diffusion 1.5",
      "Tốc độ hàng đợi tiêu chuẩn",
      "Quyền truy cập thư viện Prompt cộng đồng"
    ]
  },
  {
    id: "plan_pro",
    name: "Chuyên Nghiệp (Pro Creator)",
    price: "499.000₫",
    period: "/ tháng",
    credits: "2.000 Credits",
    popular: true,
    features: [
      "Mở khóa Midjourney v6 & FLUX.1 Dev",
      "Ảnh độ phân giải 4K Ultra-Res",
      "Ưu tiên hàng đợi GPU tốc độ cao",
      "Công cụ Inpainting & Upscaler 4x",
      "Hỗ trợ kỹ thuật ưu tiên 24/7"
    ]
  },
  {
    id: "plan_enterprise",
    name: "Doanh Nghiệp (Enterprise)",
    price: "1.990.000₫",
    period: "/ tháng",
    credits: "10.000 Credits",
    popular: false,
    features: [
      "Không giới hạn số lượt gen ảnh",
      "Kênh GPU dedicated riêng biệt",
      "Tích hợp API Key cho website/app",
      "Hỗ trợ huấn luyện Custom LoRA model",
      "Hợp đồng & Xuất hóa đơn VAT đầy đủ"
    ]
  }
];
