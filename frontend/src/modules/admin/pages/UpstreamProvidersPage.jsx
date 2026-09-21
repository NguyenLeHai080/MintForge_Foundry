import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FiServer, FiRefreshCw, FiPlus, FiZap, FiCopy, FiEye, 
  FiEyeOff, FiCheck, FiLayers, FiShield, FiTrendingUp, 
  FiDollarSign, FiSearch, FiGrid, FiList, FiEdit2, FiTrash2,
  FiStar, FiPower
} from 'react-icons/fi';
import { useProvidersStore } from '../store/providersStore';
import ProviderModal from '../components/ProviderModal';

export default function UpstreamProvidersPage() {
  const { t } = useTranslation();
  const { 
    providers, 
    failoverConfig, 
    setPrimary, 
    toggleActive, 
    updatePing, 
    pingAll,
    addProvider, 
    updateProvider, 
    deleteProvider,
    updateFailoverConfig 
  } = useProvidersStore();

  const [filterTab, setFilterTab] = useState('ALL'); // 'ALL' or 'ACTIVE'
  const [searchTerm, setSearchTerm] = useState('');
  const [revealedKeys, setRevealedKeys] = useState({});
  const [copiedId, setCopiedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProvider, setEditingProvider] = useState(null);
  const [pingingId, setPingingId] = useState(null);

  // Primary Provider
  const primaryProvider = useMemo(() => {
    return providers.find(p => p.isPrimary) || providers[0];
  }, [providers]);

  // Filtered providers
  const filteredProviders = useMemo(() => {
    return providers.filter(p => {
      const matchTab = filterTab === 'ALL' || (filterTab === 'ACTIVE' && p.isActive);
      const matchSearch = !searchTerm.trim() || 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.baseUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.defaultModel.toLowerCase().includes(searchTerm.toLowerCase());
      return matchTab && matchSearch;
    });
  }, [providers, filterTab, searchTerm]);

  // Handle Copy to clipboard
  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  // Toggle API Key reveal
  const toggleRevealKey = (id) => {
    setRevealedKeys(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Handle single ping
  const handlePing = (id) => {
    setPingingId(id);
    setTimeout(() => {
      const newLatency = Math.floor(Math.random() * 200) + 120;
      updatePing(id, newLatency);
      setPingingId(null);
    }, 600);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {t('admin.providers_title')}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30 text-[10px] font-bold">
              {t('admin.badge_service_config')}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/30 text-[10px] font-bold">
              {t('admin.badge_super_admin')}
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-3xl">
            {t('admin.providers_subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button 
            onClick={() => pingAll()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition-colors shadow-sm"
          >
            <FiRefreshCw className="w-3.5 h-3.5 text-slate-400" />
            <span>{t('admin.btn_refresh')}</span>
          </button>

          <button 
            onClick={() => {
              setEditingProvider(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs shadow-lg shadow-orange-500/25 transition-all"
          >
            <FiPlus className="w-4 h-4" />
            <span>{t('admin.btn_add_provider')}</span>
          </button>
        </div>
      </div>

      {/* 2. Active Primary Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-[#14121d] border border-orange-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 shrink-0">
            <FiServer className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">
                {t('admin.active_banner_title')}: {primaryProvider?.name}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                {t('admin.active_banner_status')}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {t('admin.active_banner_desc')}
            </p>
          </div>
        </div>

        <button 
          onClick={() => pingAll()}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-xs font-semibold border border-slate-700/80 shrink-0 transition-colors"
        >
          <FiZap className="w-3.5 h-3.5 text-amber-400" />
          <span>{t('admin.btn_ping_all')}</span>
        </button>
      </div>

      {/* 3. Four KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: CỔNG NCC CHÍNH */}
        <div className="p-4 rounded-2xl bg-[#0c101d] border-l-4 border-l-orange-500 border border-slate-800/80 shadow-md flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{t('admin.metric_primary')}</div>
            <div className="text-base font-extrabold text-white mt-1">{primaryProvider?.name}</div>
            <div className="text-[11px] text-orange-400/90 font-medium mt-0.5">
              model: <span className="font-mono">{primaryProvider?.defaultModel}</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center">
            <FiServer className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2: ĐỘ TRỄ PHẢN HỒI */}
        <div className="p-4 rounded-2xl bg-[#0c101d] border-l-4 border-l-emerald-500 border border-slate-800/80 shadow-md flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{t('admin.metric_latency')}</div>
            <div className="text-base font-extrabold text-emerald-400 mt-1">
              {primaryProvider?.latencyMs?.toLocaleString()} ms
            </div>
            <div className="text-[11px] text-emerald-400/90 font-medium mt-0.5 flex items-center gap-1">
              <span>✓</span>
              <span>{t('admin.metric_latency_sub')}</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <FiTrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3: GIÁ VỐN / ẢNH */}
        <div className="p-4 rounded-2xl bg-[#0c101d] border-l-4 border-l-amber-500 border border-slate-800/80 shadow-md flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{t('admin.metric_cost')}</div>
            <div className="text-base font-extrabold text-white mt-1">
              {primaryProvider?.costPerImage} đ
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">
              {t('admin.metric_cost_sub')}
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <FiDollarSign className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4: HẠ TẦNG CỔNG KẾT NỐI */}
        <div className="p-4 rounded-2xl bg-[#0c101d] border-l-4 border-l-purple-500 border border-slate-800/80 shadow-md flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{t('admin.metric_infrastructure')}</div>
            <div className="text-base font-extrabold text-purple-400 mt-1">
              {providers.filter(p => p.isActive).length} {t('admin.unit_ready_providers')}
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">
              {providers.reduce((acc, p) => acc + (p.supportedModels?.length || 1), 0)} {t('admin.metric_infrastructure_sub')}
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <FiLayers className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 4. Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('admin.search_placeholder')}
            className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500/60 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <button
              onClick={() => setFilterTab('ALL')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                filterTab === 'ALL'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t('admin.tab_all')} ({providers.length})
            </button>
            <button
              onClick={() => setFilterTab('ACTIVE')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                filterTab === 'ACTIVE'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t('admin.tab_active')} ({providers.filter(p => p.isActive).length})
            </button>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs">
            <button className="p-1.5 rounded-lg bg-slate-800 text-white">
              <FiList className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 rounded-lg hover:text-white">
              <FiGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. Providers Table */}
      <div className="w-full bg-[#0c101d] rounded-2xl border border-slate-800/80 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/90 text-[10px] uppercase font-bold text-slate-500 tracking-wider border-b border-slate-800/80">
              <tr>
                <th className="py-3.5 px-4">{t('admin.col_provider')}</th>
                <th className="py-3.5 px-4">{t('admin.col_url')}</th>
                <th className="py-3.5 px-4">{t('admin.col_apikey')}</th>
                <th className="py-3.5 px-4">{t('admin.col_models')}</th>
                <th className="py-3.5 px-4 text-center">{t('admin.col_cost')}</th>
                <th className="py-3.5 px-4 text-center">{t('admin.col_ping')}</th>
                <th className="py-3.5 px-4 text-center">{t('admin.col_status')}</th>
                <th className="py-3.5 px-4 text-right">{t('admin.col_actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredProviders.map((provider) => {
                const isKeyRevealed = revealedKeys[provider.id];
                const maskedKey = provider.apiKey.length > 8 
                  ? `${provider.apiKey.slice(0, 6)}...${provider.apiKey.slice(-4)}`
                  : '••••••••';

                return (
                  <tr 
                    key={provider.id} 
                    className="hover:bg-slate-900/40 transition-colors"
                  >
                    {/* Cột 1: Tên & Primary Badge */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          provider.isPrimary 
                            ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40' 
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          <FiServer className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 font-bold text-slate-100">
                            <span>{provider.name}</span>
                            {provider.isPrimary && (
                              <span className="px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 text-[9px] font-bold border border-orange-500/30">
                                Primary
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            ({provider.slug})
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Cột 2: Base URL */}
                    <td className="py-4 px-4 font-mono text-[11px] text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate max-w-[160px]">{provider.baseUrl}</span>
                        <button
                          onClick={() => handleCopy(provider.baseUrl, `url_${provider.id}`)}
                          className="text-slate-500 hover:text-slate-200 transition-colors p-1"
                          title={t('admin.action_copy_url')}
                        >
                          {copiedId === `url_${provider.id}` ? (
                            <FiCheck className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <FiCopy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Cột 3: API Key */}
                    <td className="py-4 px-4 font-mono text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-400">
                          {isKeyRevealed ? provider.apiKey : maskedKey}
                        </span>
                        <button
                          onClick={() => toggleRevealKey(provider.id)}
                          className="text-slate-500 hover:text-slate-300 p-1"
                          title={isKeyRevealed ? t('admin.action_hide_key') : t('admin.action_view_key')}
                        >
                          {isKeyRevealed ? <FiEyeOff className="w-3 h-3" /> : <FiEye className="w-3 h-3" />}
                        </button>
                        <button
                          onClick={() => handleCopy(provider.apiKey, `key_${provider.id}`)}
                          className="text-slate-500 hover:text-slate-300 p-1"
                          title={t('admin.action_copy_key')}
                        >
                          {copiedId === `key_${provider.id}` ? (
                            <FiCheck className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <FiCopy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Cột 4: Model Mặc Định & Hỗ Trợ */}
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap items-center gap-1.5 max-w-[280px]">
                        {provider.supportedModels?.map((model, mIdx) => (
                          <span
                            key={mIdx}
                            className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-medium ${
                              model === provider.defaultModel
                                ? 'bg-orange-500/10 text-orange-300 border border-orange-500/30'
                                : 'bg-slate-800/80 text-slate-300 border border-slate-700/60'
                            }`}
                          >
                            {model}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Cột 5: Giá vốn / ảnh */}
                    <td className="py-4 px-4 text-center font-semibold text-slate-200">
                      {provider.costPerImage} đ
                    </td>

                    {/* Cột 6: Độ trễ PING */}
                    <td className="py-4 px-4 text-center">
                      <div className="inline-flex items-center gap-1.5">
                        <span className={`font-mono font-semibold ${
                          provider.latencyMs > 50000 
                            ? 'text-orange-400' 
                            : provider.latencyMs > 0 
                            ? 'text-emerald-400' 
                            : 'text-slate-500'
                        }`}>
                          ⚡ {provider.latencyMs > 0 ? `${provider.latencyMs} ms` : 'N/A'}
                        </span>
                        <button
                          disabled={pingingId === provider.id}
                          onClick={() => handlePing(provider.id)}
                          className={`text-slate-500 hover:text-indigo-400 p-1 rounded hover:bg-slate-800 transition-colors ${
                            pingingId === provider.id ? 'animate-spin text-orange-400' : ''
                          }`}
                          title={t('admin.action_ping')}
                        >
                          <FiRefreshCw className="w-3 h-3" />
                        </button>
                      </div>
                    </td>

                    {/* Cột 7: Trạng thái */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => toggleActive(provider.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                          provider.isActive
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                        }`}
                        title={t('admin.form_activate')}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${provider.isActive ? 'bg-emerald-400' : 'bg-slate-500'}`}></span>
                        <span>{provider.isActive ? t('admin.status_online') : t('admin.status_offline')}</span>
                      </button>
                    </td>

                    {/* Cột 8: Thao tác */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {!provider.isPrimary && (
                          <button
                            onClick={() => setPrimary(provider.id)}
                            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-orange-500/15 hover:border-orange-500/30 text-slate-400 hover:text-orange-400 transition-colors"
                            title={t('admin.action_set_primary')}
                          >
                            <FiStar className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setEditingProvider(provider);
                            setIsModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                          title={t('admin.action_edit')}
                        >
                          <FiEdit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`${t('admin.confirm_delete_provider')} "${provider.name}"?`)) {
                              deleteProvider(provider.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-rose-500/15 hover:border-rose-500/30 text-slate-400 hover:text-rose-400 transition-colors"
                          title={t('admin.action_delete')}
                        >
                          <FiTrash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="p-3.5 bg-slate-950/80 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <div>
            {t('admin.pagination_showing')} <strong>1 - {filteredProviders.length}</strong> {t('admin.pagination_of')} <strong>{providers.length}</strong> {t('admin.pagination_records')}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span>{t('admin.pagination_rows_per_page')}</span>
              <select className="bg-slate-900 border border-slate-800 rounded px-2 py-0.5 text-slate-200">
                <option>10{t('admin.pagination_per_page')}</option>
                <option>20{t('admin.pagination_per_page')}</option>
              </select>
            </div>
            <div className="flex items-center gap-1">
              <button className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40">
                &lt;
              </button>
              <button className="px-2.5 py-0.5 rounded bg-orange-500 text-white font-bold">
                1
              </button>
              <button className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40">
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Failover Engine Card */}
      <div className="p-5 rounded-2xl bg-[#0c101d] border border-slate-800/80 shadow-2xl space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <FiShield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                {t('admin.failover_title')}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {t('admin.failover_desc')}
              </p>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
            {t('admin.failover_active_badge')}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Col 1 */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-slate-200 mb-1">{t('admin.failover_auto_switch')}</div>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                {t('admin.failover_auto_switch_desc')}
              </p>
            </div>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-200">
              <input
                type="checkbox"
                checked={failoverConfig.isEnabled}
                onChange={(e) => updateFailoverConfig({ isEnabled: e.target.checked })}
                className="rounded border-slate-700 bg-slate-950 text-orange-500 focus:ring-orange-500 w-4 h-4 cursor-pointer"
              />
              <span>{t('admin.failover_auto_switch')}</span>
            </label>
          </div>

          {/* Col 2 */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-slate-200 mb-1">{t('admin.failover_timeout_limit')}</div>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                {t('admin.failover_timeout_desc')}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={failoverConfig.timeoutSeconds}
                onChange={(e) => updateFailoverConfig({ timeoutSeconds: Number(e.target.value) })}
                className="w-20 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white text-center font-bold focus:outline-none focus:border-orange-500"
              />
              <span className="text-xs text-slate-400 font-medium">{t('admin.unit_seconds')}</span>
            </div>
          </div>

          {/* Col 3: Cam policy */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 via-slate-900/90 to-slate-900 border border-amber-500/30 text-xs text-slate-300 flex flex-col justify-between">
            <div className="font-bold text-amber-400 mb-1.5 flex items-center gap-1.5">
              <span>🛡️</span>
              <span>{t('admin.policy_title')}</span>
            </div>
            <ul className="space-y-1 text-[11px] text-slate-300 leading-tight">
              <li>• {t('admin.policy_item1')}</li>
              <li>• {t('admin.policy_item2')}</li>
              <li>• {t('admin.policy_item3')}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal Thêm / Sửa Nhà Cung Cấp */}
      {isModalOpen && (
        <ProviderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={(data) => {
            if (editingProvider) {
              updateProvider(editingProvider.id, data);
            } else {
              addProvider(data);
            }
          }}
          initialData={editingProvider}
        />
      )}
    </div>
  );
}
