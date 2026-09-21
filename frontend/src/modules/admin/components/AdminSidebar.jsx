import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  FiGrid, FiSliders, FiActivity, FiUsers, FiKey, FiBookOpen, 
  FiShield, FiDollarSign, FiDownload, FiCreditCard, FiServer, 
  FiSettings, FiPackage, FiZap, FiArrowUpRight 
} from 'react-icons/fi';

export default function AdminSidebar() {
  const { t } = useTranslation();
  const location = useLocation();
  const { lang } = useParams();
  const currentLang = lang || 'vn';

  const menuSections = [
    {
      title: t('admin.menu_overview'),
      items: [
        { label: t('admin.menu_overview_system'), path: "/admin/overview", icon: FiGrid }
      ]
    },
    {
      title: t('admin.menu_ai_generator'),
      items: [
        { label: t('admin.menu_studio'), path: "/admin/studio", icon: FiSliders },
        { label: t('admin.menu_jobs'), path: "/admin/jobs", icon: FiActivity }
      ]
    },
    {
      title: t('admin.menu_accounts'),
      items: [
        { label: t('admin.menu_users'), path: "/admin/accounts", icon: FiUsers },
        { label: t('admin.menu_api_keys'), path: "/admin/api-keys", icon: FiKey },
        { 
          label: t('admin.menu_docs'), 
          path: "/admin/docs", 
          icon: FiBookOpen,
          badge: "v1.0",
          badgeColor: "bg-amber-500/20 text-amber-400 border border-amber-500/30"
        },
        { label: t('admin.menu_permissions'), path: "/admin/permissions", icon: FiShield }
      ]
    },
    {
      title: t('admin.menu_billing'),
      items: [
        { label: t('admin.menu_wallets'), path: "/admin/wallets", icon: FiDollarSign },
        { label: t('admin.menu_sepay'), path: "/admin/sepay-transactions", icon: FiDownload },
        { label: t('admin.menu_bank_qr'), path: "/admin/bank-qr", icon: FiCreditCard }
      ]
    },
    {
      title: t('admin.menu_service_config'),
      items: [
        { 
          label: t('admin.menu_plans'), 
          path: "/admin/plans", 
          icon: FiPackage,
          badge: t('admin.badge_in_dev'),
          badgeColor: "bg-slate-800 text-slate-400"
        },
        { 
          label: t('admin.menu_providers'), 
          path: "/admin/providers", 
          icon: FiServer,
          badge: "Active",
          badgeColor: "bg-orange-500/20 text-orange-400 border border-orange-500/30"
        }
      ]
    },
    {
      title: t('admin.menu_system'),
      items: [
        { label: t('admin.menu_settings'), path: "/admin/settings", icon: FiSettings },
        { label: t('admin.menu_logs'), path: "/admin/logs", icon: FiActivity }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-[#0a0d17] border-r border-slate-800/80 flex flex-col justify-between shrink-0 h-screen sticky top-0">
      {/* Brand & Menu */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Logo Branding */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <Link to={`/${currentLang}`} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white font-black text-base shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              M
            </div>
            <div>
              <div className="font-extrabold text-sm text-white tracking-wide flex items-center gap-1.5">
                <span>MintForge</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-orange-500/10 text-orange-400 border border-orange-500/30 uppercase">
                  Engine
                </span>
              </div>
              <div className="text-[10px] text-slate-500 font-medium">Foundry Hub Core</div>
            </div>
          </Link>
        </div>

        {/* Navigation Sections */}
        <div className="p-3 space-y-6">
          {menuSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              <div className="text-[10px] font-extrabold tracking-wider text-slate-500 px-3 py-1 uppercase">
                {section.title}
              </div>
              <ul className="space-y-0.5">
                {section.items.map((item, iIdx) => {
                  const Icon = item.icon;
                  // Handle dynamic language prefixing
                  const fullItemPath = `/${currentLang}${item.path}`;
                  const isActive = location.pathname === fullItemPath || location.pathname === item.path;

                  return (
                    <li key={iIdx}>
                      <Link
                        to={fullItemPath}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                          isActive
                            ? 'bg-gradient-to-r from-orange-500/15 to-transparent text-orange-400 border-l-2 border-orange-500 shadow-sm'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-orange-400' : 'text-slate-500'}`} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${item.badgeColor}`}>
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
            <span>{t('admin.sidebar_upgrade_title')}</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight mb-2.5">
            {t('admin.sidebar_upgrade_desc')}
          </p>
          <button className="w-full py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 font-semibold text-[11px] transition-colors flex items-center justify-center gap-1">
            <span>{t('admin.sidebar_upgrade_btn')}</span>
            <FiArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </aside>
  );
}
