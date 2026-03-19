import React from 'react';

export default function Pricing() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 flex flex-col gap-8">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900">Flexible Access Plans</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Choose the best plan for your engineering journey. We support traditional payments and OMETS Token (OMT) for ecosystem transactions.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="p-8 rounded-3xl border border-black/5 bg-white flex flex-col gap-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">Basic</h3>
          <p className="text-4xl font-extrabold text-slate-900">$0<span className="text-lg font-normal text-slate-500">/mo</span></p>
          <ul className="flex flex-col gap-3 text-sm text-slate-600">
            <li>✓ Community Forum Access</li>
            <li>✓ Public Knowledge Base</li>
            <li>✓ Basic Engineering Guides</li>
            <li>✗ Expert Consultation</li>
          </ul>
          <button className="rounded-xl bg-slate-900 py-3 font-bold text-white hover:bg-slate-800 transition-colors">Get Started</button>
        </div>
        <div className="p-8 rounded-3xl border-2 border-emerald-600 bg-white flex flex-col gap-6 relative shadow-md">
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase">Most Popular</span>
          <h3 className="text-xl font-bold text-slate-900">Professional</h3>
          <p className="text-4xl font-extrabold text-slate-900">$49<span className="text-lg font-normal text-slate-500">/mo</span></p>
          <p className="text-xs text-emerald-600 font-bold">Or pay with OMT Token</p>
          <ul className="flex flex-col gap-3 text-sm text-slate-600">
            <li>✓ Everything in Basic</li>
            <li>✓ All Structured Courses</li>
            <li>✓ 1 Expert Consultation/mo</li>
            <li>✓ Recorded Workshops</li>
          </ul>
          <button className="rounded-xl bg-emerald-600 py-3 font-bold text-white hover:bg-emerald-700 transition-colors">Subscribe Now</button>
        </div>
        <div className="p-8 rounded-3xl border border-black/5 bg-white flex flex-col gap-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">Enterprise</h3>
          <p className="text-4xl font-extrabold text-slate-900">Custom</p>
          <ul className="flex flex-col gap-3 text-sm text-slate-600">
            <li>✓ Everything in Professional</li>
            <li>✓ Unlimited Consultations</li>
            <li>✓ Custom Training Modules</li>
            <li>✓ Dedicated Support</li>
          </ul>
          <button className="rounded-xl bg-slate-900 py-3 font-bold text-white hover:bg-slate-800 transition-colors">Contact Sales</button>
        </div>
      </div>
    </div>
  );
}
