import React, { useState } from 'react';
import BaseModal from '../../../shared/components/Modal/BaseModal';
import { Input, Button } from '../../../shared/components/Form/FormControls';

export default function ProviderModal({ isOpen, onClose, onSubmit, initialData = null }) {
  const isEdit = !!initialData;
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    baseUrl: initialData?.baseUrl || 'https://',
    apiKey: initialData?.apiKey || '',
    defaultModel: initialData?.defaultModel || 'gpt-image-2',
    supportedModels: Array.isArray(initialData?.supportedModels) 
      ? initialData.supportedModels.join(', ')
      : initialData?.supportedModels || 'gpt-image-2',
    costPerImage: initialData?.costPerImage || 120,
    isPrimary: initialData?.isPrimary || false,
    isActive: initialData?.isActive !== undefined ? initialData.isActive : true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      costPerImage: Number(formData.costPerImage),
      supportedModels: formData.supportedModels.split(',').map(s => s.trim()).filter(Boolean)
    });
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Chỉnh Sửa Nhà Cung Cấp" : "Thêm Nhà Cung Cấp AI Mới"}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Tên Nhà Cung Cấp"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="VD: Nhà Cung cấp 02 (OpenAI Native)"
            required
          />
          <Input
            label="Mã Định Danh (Slug)"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="VD: nha_cung_cap_02"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Cổng Base URL"
            name="baseUrl"
            value={formData.baseUrl}
            onChange={handleChange}
            placeholder="https://api.1eeh.dev/v1"
            required
          />
          <Input
            label="API Key (Bearer Token)"
            name="apiKey"
            value={formData.apiKey}
            onChange={handleChange}
            placeholder="sk-50Z829..."
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Model Mặc Định"
            name="defaultModel"
            value={formData.defaultModel}
            onChange={handleChange}
            placeholder="gpt-image-2"
            required
          />
          <Input
            label="Giá Vốn / Ảnh Thành Công (VNĐ)"
            type="number"
            name="costPerImage"
            value={formData.costPerImage}
            onChange={handleChange}
            placeholder="120"
            required
          />
        </div>

        <Input
          label="Danh Sách Model Hỗ Trợ (phân cách bằng dấu phẩy)"
          name="supportedModels"
          value={formData.supportedModels}
          onChange={handleChange}
          placeholder="gpt-image-2, gpt-image-2.5-flare, nanobanana-2"
          required
        />

        <div className="flex items-center gap-6 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isPrimary"
              checked={formData.isPrimary}
              onChange={handleChange}
              className="rounded border-slate-700 bg-slate-950 text-orange-500 focus:ring-orange-500 w-4 h-4 cursor-pointer"
            />
            <span className="font-semibold text-slate-200">Đặt làm Cổng Chính (Primary Gateway)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
            />
            <span className="font-semibold text-slate-200">Kích hoạt kết nối (Online)</span>
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
          <Button type="button" variant="ghost" onClick={onClose}>
            Hủy Bỏ
          </Button>
          <Button type="submit" variant="primary" className="!bg-gradient-to-r !from-orange-500 !to-amber-500">
            {isEdit ? "Lưu Thay Đổi" : "Tạo Nhà Cung Cấp"}
          </Button>
        </div>
      </form>
    </BaseModal>
  );
}
