import i18n from '../../../shared/i18n';

/**
 * Default credit plans and features configuration
 */

export const getLandingPlans = () => [
  {
    id: "plan_starter",
    name: i18n.t('landing.plan_starter_name'),
    price: "199.000₫",
    period: i18n.t('landing.plan_starter_period'),
    credits: i18n.t('landing.plan_starter_credits'),
    popular: false,
    features: [
      i18n.t('landing.plan_starter_f1'),
      i18n.t('landing.plan_starter_f2'),
      i18n.t('landing.plan_starter_f3'),
      i18n.t('landing.plan_starter_f4')
    ]
  },
  {
    id: "plan_pro",
    name: i18n.t('landing.plan_pro_name'),
    price: "499.000₫",
    period: i18n.t('landing.plan_pro_period'),
    credits: i18n.t('landing.plan_pro_credits'),
    popular: true,
    features: [
      i18n.t('landing.plan_pro_f1'),
      i18n.t('landing.plan_pro_f2'),
      i18n.t('landing.plan_pro_f3'),
      i18n.t('landing.plan_pro_f4'),
      i18n.t('landing.plan_pro_f5')
    ]
  },
  {
    id: "plan_enterprise",
    name: i18n.t('landing.plan_enterprise_name'),
    price: "1.990.000₫",
    period: i18n.t('landing.plan_enterprise_period'),
    credits: i18n.t('landing.plan_enterprise_credits'),
    popular: false,
    features: [
      i18n.t('landing.plan_enterprise_f1'),
      i18n.t('landing.plan_enterprise_f2'),
      i18n.t('landing.plan_enterprise_f3'),
      i18n.t('landing.plan_enterprise_f4'),
      i18n.t('landing.plan_enterprise_f5')
    ]
  }
];

export const DEFAULT_PLANS = getLandingPlans();
