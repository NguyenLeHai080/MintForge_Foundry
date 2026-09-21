import React, { useState } from 'react';
import BaseModal from '../../../shared/components/Modal/BaseModal';
import { Input, Select, Button } from '../../../shared/components/Form/FormControls';

export default function PlanModal({ isOpen, onClose, onSubmit, initialData = null }) {
  const isEdit = !!initialData;
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    price: initialData?.price || '',
    credits: initialData?.credits || '',
    category: initialData?.category || 'MONTHLY',
    status: initialData?.status || 'ACTIVE'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: Number(formData.price),
      credits: Number(formData.credits)
    });
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Chỉnh Sửa Gói Cước" : "Tạo Gói Cước Mới"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Tên Gói Cước"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="VD: Pro Creator AI Tier"
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Giá (VNĐ)"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="499000"
            required
          />
          <Input
            label="Hạn Mức Credits"
            type="number"
            name="credits"
            value={formData.credits}
            onChange={handleChange}
            placeholder="2000"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Loại Gói"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={[
              { value: 'MONTHLY', label: 'Thuê Bao Tháng' },
              { value: 'YEARLY', label: 'Thuê Bao Năm' },
              { value: 'TOPUP', label: 'Nạp Lẻ (Pack)' }
            ]}
          />
          <Select
            label="Trạng Thái"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={[
              { value: 'ACTIVE', label: 'Hoạt Động (Active)' },
              { value: 'INACTIVE', label: 'Tạm Dừng (Inactive)' }
            ]}
          />
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
          <Button type="button" variant="ghost" onClick={onClose}>
            Hủy Bỏ
          </Button>
          <Button type="submit" variant="primary">
            {isEdit ? "Cập Nhật" : "Tạo Mới"}
          </Button>
        </div>
      </form>
    </BaseModal>
  );
}
