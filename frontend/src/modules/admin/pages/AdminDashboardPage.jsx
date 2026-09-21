import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiPlus, FiTrash2, FiEdit2, FiCheckCircle, FiDollarSign, FiUsers, FiLayers } from 'react-icons/fi';
import DataTable from '../../../shared/components/Table/DataTable';
import { Button, Badge } from '../../../shared/components/Form/FormControls';
import PlanModal from '../components/PlanModal';
import { useAdminStore } from '../store/adminStore';

export default function AdminDashboardPage() {
  const { t } = useTranslation();
  const { plans, addPlan, updatePlan, deletePlan, deleteBatchPlans } = useAdminStore();
  
  const [selectedIds, setSelectedIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  const handleOpenCreate = () => {
    setEditingPlan(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (plan) => {
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  const handleSavePlan = (planData) => {
    if (editingPlan) {
      updatePlan(editingPlan.id, planData);
    } else {
      addPlan(planData);
    }
  };

  const handleBatchDelete = () => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa ${selectedIds.length} gói cước đã chọn?`)) {
      deleteBatchPlans(selectedIds);
      setSelectedIds([]);
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'Tên Gói Cước',
      sortable: true,
      render: (val, row) => (
        <div>
          <div className="font-bold text-white">{val}</div>
          <div className="text-[11px] text-slate-500 uppercase">{row.category}</div>
        </div>
      )
    },
    {
      key: 'price',
      label: 'Giá Niêm Yết',
      sortable: true,
      render: (val) => (
        <span className="font-semibold text-emerald-400">
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val)}
        </span>
      )
    },
    {
      key: 'credits',
      label: 'Hạn Mức Credits',
      sortable: true,
      render: (val) => (
        <span className="inline-flex items-center gap-1 font-bold text-indigo-400">
          ⚡ {val.toLocaleString()}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Trạng Thái',
      sortable: true,
      render: (val) => (
        <Badge variant={val === 'ACTIVE' ? 'success' : 'danger'}>
          {val}
        </Badge>
      )
    },
    {
      key: 'actions',
      label: 'Thao Tác',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenEdit(row)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-400 hover:text-indigo-300 transition-colors"
            title="Chỉnh sửa"
          >
            <FiEdit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              if (window.confirm(`Xóa gói cước "${row.name}"?`)) {
                deletePlan(row.id);
              }
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-colors"
            title="Xóa"
          >
            <FiTrash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span className="p-2 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 text-white shadow-lg shadow-indigo-500/30">
              <FiLayers className="w-6 h-6" />
            </span>
            {t('admin.admin_title')}
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Quản trị bảng giá, cấu hình credit quota và điều phối thanh toán hệ sinh thái.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {selectedIds.length > 0 && (
            <Button variant="danger" size="sm" onClick={handleBatchDelete}>
              <FiTrash2 className="w-4 h-4" />
              <span>Xóa ({selectedIds.length})</span>
            </Button>
          )}
          <Button variant="primary" onClick={handleOpenCreate}>
            <FiPlus className="w-4 h-4" />
            <span>Thêm Gói Cước Mới</span>
          </Button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
            <FiLayers className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Tổng Gói Cước Đang Mở</div>
            <div className="text-2xl font-bold text-white">{plans.length} Gói</div>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <FiDollarSign className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Doanh Thu Tháng Này</div>
            <div className="text-2xl font-bold text-emerald-400">128.450.000₫</div>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center">
            <FiUsers className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Người Dùng Hoạt Động</div>
            <div className="text-2xl font-bold text-pink-400">1,482 Creators</div>
          </div>
        </div>
      </div>

      {/* Reusable DataTable */}
      <DataTable
        columns={columns}
        data={plans}
        selectable={true}
        onSelectionChange={setSelectedIds}
        searchPlaceholder="Tìm theo tên gói, giá hoặc trạng thái..."
      />

      {/* Modal Create / Edit */}
      {isModalOpen && (
        <PlanModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSavePlan}
          initialData={editingPlan}
        />
      )}
    </div>
  );
}
