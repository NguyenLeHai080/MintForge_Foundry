import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiCheck, FiZap, FiArrowRight, FiShield, FiCpu, FiClock } from 'react-icons/fi';
import BaseModal from '../../../shared/components/Modal/BaseModal';
import { Button } from '../../../shared/components/Form/FormControls';

export default function LandingPage() {
  const { t } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const plans = [
    {
      id: "plan_starter",
      name: t('landing.plan_starter_name'),
      price: "199.000₫",
      period: t('landing.plan_starter_period'),
      credits: t('landing.plan_starter_credits'),
      popular: false,
      features: [
        t('landing.plan_starter_f1'),
        t('landing.plan_starter_f2'),
        t('landing.plan_starter_f3'),
        t('landing.plan_starter_f4')
      ]
    },
    {
      id: "plan_pro",
      name: t('landing.plan_pro_name'),
      price: "499.000₫",
      period: t('landing.plan_pro_period'),
      credits: t('landing.plan_pro_credits'),
      popular: true,
      features: [
        t('landing.plan_pro_f1'),
        t('landing.plan_pro_f2'),
        t('landing.plan_pro_f3'),
        t('landing.plan_pro_f4'),
        t('landing.plan_pro_f5')
      ]
    },
    {
      id: "plan_enterprise",
      name: t('landing.plan_enterprise_name'),
      price: "1.990.000₫",
      period: t('landing.plan_enterprise_period'),
      credits: t('landing.plan_enterprise_credits'),
      popular: false,
      features: [
        t('landing.plan_enterprise_f1'),
        t('landing.plan_enterprise_f2'),
        t('landing.plan_enterprise_f3'),
        t('landing.plan_enterprise_f4'),
        t('landing.plan_enterprise_f5')
      ]
    }
  ];

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
      setSelectedPlan(null);
    }, 2000);
  };

  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 text-center py-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold mb-6 tracking-wide">
          <FiZap className="w-3.5 h-3.5" />
          {t('landing.hero_badge')}
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          {t('landing.hero_title')}
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          {t('landing.hero_desc')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#pricing"
            className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 hover:opacity-95 transition-all flex items-center gap-2"
          >
            <span>{t('landing.btn_explore')}</span>
            <FiArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
            <FiCpu className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-100 mb-2">{t('landing.feature_gpu_title')}</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            {t('landing.feature_gpu_desc')}
          </p>
        </div>
        <div className="glass-panel p-6 rounded-2xl border border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-4">
            <FiShield className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-100 mb-2">{t('landing.feature_payment_title')}</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            {t('landing.feature_payment_desc')}
          </p>
        </div>
        <div className="glass-panel p-6 rounded-2xl border border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
            <FiClock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-100 mb-2">{t('landing.feature_refund_title')}</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            {t('landing.feature_refund_desc')}
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-extrabold text-white mb-3">
            {t('landing.pricing_title')}
          </h2>
          <p className="text-slate-400 text-sm">
            {t('landing.pricing_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative glass-panel rounded-3xl p-8 flex flex-col justify-between transition-all hover:-translate-y-1.5 ${
                plan.popular
                  ? 'border-indigo-500/80 shadow-2xl shadow-indigo-500/20'
                  : 'border-slate-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-lg">
                  {t('landing.popular')}
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 my-4">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-xs text-slate-400">{plan.period}</span>
                </div>
                <div className="inline-block px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 text-xs font-bold border border-indigo-500/20 mb-6">
                  ⚡ {plan.credits}
                </div>

                <ul className="space-y-3 mb-8 text-sm text-slate-300">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <FiCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant={plan.popular ? 'primary' : 'secondary'}
                onClick={() => setSelectedPlan(plan)}
                className="w-full"
              >
                {t('landing.btn_choose_plan')}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white mb-3">
            {t('landing.faq_title')}
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-orange-500 to-pink-500 mx-auto rounded-full" />
        </div>

        <div className="space-y-4">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-orange-400">⚡</span>
              {t('landing.faq_q1')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pl-6">
              {t('landing.faq_a1')}
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-pink-400">⚡</span>
              {t('landing.faq_q2')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pl-6">
              {t('landing.faq_a2')}
            </p>
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      <BaseModal
        isOpen={!!selectedPlan}
        onClose={() => setSelectedPlan(null)}
        title={`${t('landing.modal_checkout_title')}: ${selectedPlan?.name}`}
      >
        {checkoutSuccess ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiCheck className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-white mb-1">{t('landing.modal_checkout_success')}</h4>
            <p className="text-xs text-slate-400">
              {t('landing.modal_checkout_success_desc')} ({selectedPlan?.credits})
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-sm">
              <span className="text-slate-400">{t('landing.modal_payment_amount')}</span>
              <span className="text-lg font-bold text-white">{selectedPlan?.price}</span>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-sm">
              <span className="text-slate-400">{t('landing.modal_credits_received')}</span>
              <span className="font-bold text-indigo-400">{selectedPlan?.credits}</span>
            </div>
            <div className="text-xs text-slate-500 text-center">
              {t('landing.modal_checkout_note')}
            </div>
            <Button variant="primary" onClick={handleCheckout} className="w-full">
              {t('landing.btn_checkout_now')} ({selectedPlan?.price})
            </Button>
          </div>
        )}
      </BaseModal>
    </div>
  );
}
