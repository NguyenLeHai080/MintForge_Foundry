import React, { useState, useMemo } from 'react';
import { FiSearch, FiChevronDown, FiChevronUp, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

/**
 * Reusable DataTable Component
 * @param {Array} columns - [{ key, label, render, sortable }]
 * @param {Array} data - Array of records
 * @param {Boolean} selectable - Cho phép chọn checkbox từng dòng và chọn tất cả
 * @param {Function} onSelectionChange - Callback khi danh sách ID được chọn thay đổi
 * @param {Array} actions - Các nút tác vụ header hoặc row actions
 * @param {String} searchPlaceholder - Placeholder thanh tìm kiếm
 */
export default function DataTable({
  columns = [],
  data = [],
  selectable = true,
  onSelectionChange,
  searchPlaceholder = "Tìm kiếm dữ liệu...",
  actions,
  pageSize = 5
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);

  // Xử lý Search
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    return data.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  // Xử lý Sort
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];
      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Xử lý Phân trang
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  // Handle Select All
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = paginatedData.map(item => item.id);
      setSelectedIds(allIds);
      if (onSelectionChange) onSelectionChange(allIds);
    } else {
      setSelectedIds([]);
      if (onSelectionChange) onSelectionChange([]);
    }
  };

  // Handle Select Row
  const handleSelectRow = (id) => {
    const updated = selectedIds.includes(id)
      ? selectedIds.filter(item => item !== id)
      : [...selectedIds, id];
    setSelectedIds(updated);
    if (onSelectionChange) onSelectionChange(updated);
  };

  // Handle Sort
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <div className="w-full glass-panel rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl">
      {/* Table Toolbar */}
      <div className="p-4 bg-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800">
        <div className="relative w-full sm:w-72">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={searchPlaceholder}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {selectedIds.length > 0 && (
            <span className="text-xs bg-indigo-500/20 text-indigo-300 px-3 py-1.5 rounded-lg border border-indigo-500/30">
              Đã chọn {selectedIds.length} mục
            </span>
          )}
          {actions}
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950/90 text-xs uppercase font-semibold text-slate-400 tracking-wider border-b border-slate-800">
            <tr>
              {selectable && (
                <th className="p-4 w-12 text-center">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={paginatedData.length > 0 && paginatedData.every(item => selectedIds.includes(item.id))}
                    className="rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`p-4 ${col.sortable ? 'cursor-pointer hover:text-indigo-400 select-none' : ''}`}
                >
                  <div className="flex items-center gap-1.5">
                    {col.label}
                    {col.sortable && sortConfig.key === col.key && (
                      sortConfig.direction === 'asc' ? <FiChevronUp className="w-3.5 h-3.5 text-indigo-400" /> : <FiChevronDown className="w-3.5 h-3.5 text-indigo-400" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, idx) => {
                const isSelected = selectedIds.includes(row.id);
                return (
                  <tr
                    key={row.id || idx}
                    className={`transition-colors hover:bg-indigo-950/20 ${isSelected ? 'bg-indigo-950/30' : ''}`}
                  >
                    {selectable && (
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectRow(row.id)}
                          className="rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td key={col.key} className="p-4">
                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="p-8 text-center text-slate-500">
                  Không tìm thấy bản ghi nào phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div>
          Hiển thị <strong>{paginatedData.length}</strong> / <strong>{sortedData.length}</strong> kết quả
        </div>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <FiChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-3 py-1 font-semibold text-slate-200">
            Trang {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <FiChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
