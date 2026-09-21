import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BaseModal from '../../../shared/components/Modal/BaseModal';
import { Input, Select, Button } from '../../../shared/components/Form/FormControls';

export default function PlanModal({ isOpen, onClose, onSubmit, initialData = null }) {
  const { t } = useTranslation();
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
      title={isEdit ? t('admin.plans_modal_edit') : t('admin.plans_modal_create')}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label={t('admin.plans_form_name')}
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={t('admin.plans_form_name_placeholder')}
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label={t('admin.plans_form_price')}
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder={t('admin.plans_form_price_placeholder')}
            required
          />
          <Input
            label={t('admin.plans_form_credits')}
            type="number"
            name="credits"
            value={formData.credits}
            onChange={handleChange}
            placeholder={t('admin.plans_form_credits_placeholder')}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select
            label={t('admin.plans_form_category')}
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={[
              { value: 'MONTHLY', label: t('admin.plans_cat_monthly') },
              { value: 'YEARLY', label: t('admin.plans_cat_yearly') },
              { value: 'TOPUP', label: t('admin.plans_cat_topup') }
            ]}
          />
          <Select
            label={t('admin.plans_form_status')}
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={[
              { value: 'ACTIVE', label: t('admin.plans_status_active') },
              { value: 'INACTIVE', label: t('admin.plans_status_inactive') }
            ]}
          />
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
          <Button type="button" variant="ghost" onClick={onClose}>
            {t('admin.plans_btn_cancel')}
          </Button>
          <Button type="submit" variant="primary">
            {isEdit ? t('admin.plans_btn_update') : t('admin.plans_btn_save_create')}
          </Button>
        </div>
      </form>
    </BaseModal>
  );
}
