import React from 'react';

export default function HelpCenter() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Help Center</h1>
      <div className="grid gap-8">
        <section className="p-8 rounded-2xl bg-slate-50 border border-black/5">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Getting Started</h2>
          <p className="text-slate-600">Learn how to set up your OMETS account and start your first course.</p>
        </section>
        <section className="p-8 rounded-2xl bg-slate-50 border border-black/5">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Course Management</h2>
          <p className="text-slate-600">Manage your enrollments, track progress, and access course materials.</p>
        </section>
        <section className="p-8 rounded-2xl bg-slate-50 border border-black/5">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Billing & Payments</h2>
          <p className="text-slate-600">Information about subscriptions, refunds, and payment methods.</p>
        </section>
      </div>
    </div>
  );
}
