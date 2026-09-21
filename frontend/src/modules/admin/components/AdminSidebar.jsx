import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { 
  FiGrid, FiSliders, FiActivity, FiUsers, FiKey, FiBookOpen, 
  FiShield, FiDollarSign, FiDownload, FiCreditCard, FiServer, 
  FiSettings, FiPackage, FiZap, FiArrowUpRight 
} from 'react-icons/fi';

export default function AdminSidebar() {
  const location = useLocation();
  const { lang } = useParams();
  const currentLang = lang || 'vi';

  const menuSections = [
    {
      title: "TỔNG QUAN",
      items: [
        { label: "Tổng quan hệ thống", path: "/admin/overview", icon: FiGrid }
      ]
    },
    {
      title: "CỔNG AI GENERATOR (GPT Image 2.5)",
      items: [
        { label: "Studio Tạo ảnh AI", path: "/admin/studio", icon: FiSliders },
        { label: "Quản lý Jobs & Nhật ký", path: "/admin/jobs", icon: FiActivity }
      ]
    },
    {
      title: "TÀI KHOẢN & TRUY CẬP",
      items: [
        { label: "Tài khoản", path: "/admin/accounts", icon: FiUsers },
        { label: "API Keys Cổng khách", path: "/admin/api-keys", icon: FiKey },
        { 
          label: "Tài liệu API (Docs)", 
          path: "/admin/docs", 
          icon: FiBookOpen,
          badge: "v1.0",
          badgeColor: "bg-amber-500/20 text-amber-400 border border-amber-500/30"
        },
        { label: "Phân quyền", path: "/admin/permissions", icon: FiShield }
      ]
    },
    {
      title: "CREDIT & THANH TOÁN",
      items: [
        { label: "Ví & Dòng tiền", path: "/admin/wallets", icon: FiDollarSign },
        { label: "Giao dịch nạp SePay", path: "/admin/sepay-transactions", icon: FiDownload },
        { label: "Ngân hàng & QR", path: "/admin/bank-qr", icon: FiCreditCard }
      ]
    },
    {
      title: "CẤU HÌNH DỊCH VỤ",
      items: [
        { 
          label: "Cấu hình gói", 
          path: "/admin/plans", 
          icon: FiPackage,
          badge: "Đang phát triển",
          badgeColor: "bg-slate-800 text-slate-400"
        },
        { 
          label: "Bảng giá model", 
          path: "/admin/model-pricing", 
          icon: FiDollarSign,
          badge: "Đang phát triển",
          badgeColor: "bg-slate-800 text-slate-400"
        },
        { 
          label: "Quản lý NCC", 
          path: "/admin/providers", 
          icon: FiServer,
          badge: "Active",
          badgeColor: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
          isActive: true
        },
        { 
          label: "Cài đặt còn...", 
          path: "/admin/settings", 
          icon: FiSettings,
          badge: "Đang phát triển",
          badgeColor: "bg-slate-800 text-slate-400"
        }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-[#0a0e1a] border-r border-slate-800/80 flex flex-col justify-between shrink-0 select-none min-h-screen text-slate-400 text-xs">
      <div>
        {/* Workspace Title */}
        <div className="p-4 border-b border-slate-800/60 flex items-center justify-between">
          <div className="text-[11px] font-bold text-slate-500 tracking-wider uppercase">
            Không Gian Làm Việc
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="py-2 overflow-y-auto max-h-[calc(100vh-210px)] space-y-4 px-2">
          {menuSections.map((sec, idx) => (
            <div key={idx}>
              <div className="px-3 py-1.5 text-[10px] font-bold text-slate-500 tracking-wider uppercase">
                {sec.title}
              </div>
              <ul className="space-y-0.5 mt-0.5">
                {sec.items.map((item, itemIdx) => {
                  const targetPath = `/${currentLang}${item.path}`;
                  const isCurrent = item.isActive || location.pathname === targetPath;
                  const Icon = item.icon;
                  return (
                    <li key={itemIdx}>
                      <Link
                        to={targetPath}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
                          isCurrent
                            ? 'bg-gradient-to-r from-orange-500/15 to-transparent text-white font-semibold border-l-4 border-orange-500 shadow-sm'
                            : 'hover:bg-slate-800/50 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <Icon className={`w-4 h-4 shrink-0 ${isCurrent ? 'text-orange-400' : 'text-slate-500'}`} />
                          <span className="truncate">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${item.badgeColor}`}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Enterprise Upgrade Card */}
      <div className="p-3 border-t border-slate-800/80">
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-orange-400 font-bold text-xs mb-1">
            <FiZap className="w-3.5 h-3.5" />
            <span>Nâng cấp doanh nghiệp</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight mb-2.5">
            Mở khóa báo cáo nâng cao và tự động hóa.
          </p>
          <button className="w-full py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 font-semibold text-[11px] transition-colors flex items-center justify-center gap-1">
            <span>Tìm hiểu thêm</span>
            <FiArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </aside>
  );
}
