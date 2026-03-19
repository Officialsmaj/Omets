import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8 prose prose-slate">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Privacy Policy</h1>
      <p className="text-slate-600 leading-relaxed mb-4">Last updated: March 17, 2026</p>
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>
        <p className="text-slate-600">We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or book a consultation.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">2. How We Use Your Information</h2>
        <p className="text-slate-600">We use the information we collect to provide, maintain, and improve our services, and to communicate with you.</p>
      </section>
    </div>
  );
}
