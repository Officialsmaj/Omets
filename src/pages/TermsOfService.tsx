import React from 'react';

export default function TermsOfService() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8 prose prose-slate">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Terms of Service</h1>
      <p className="text-slate-600 leading-relaxed mb-4">Last updated: March 17, 2026</p>
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
        <p className="text-slate-600">By accessing or using OMETS, you agree to be bound by these Terms of Service.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Use of Services</h2>
        <p className="text-slate-600">You may use our services only as permitted by law and these terms.</p>
      </section>
    </div>
  );
}
