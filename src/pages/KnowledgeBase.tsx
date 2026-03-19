import React from 'react';

export default function KnowledgeBase() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 flex flex-col gap-8">
      <h1 className="text-4xl font-extrabold text-slate-900">Engineering Knowledge Base</h1>
      <p className="text-lg text-slate-600 max-w-3xl">
        Access technical documentation, engineering guides, and research papers to support your engineering journey.
      </p>
      <div className="relative max-w-md">
        <input type="text" placeholder="Search documentation..." className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          'Technical Documentation',
          'Engineering Guides',
          'Research Papers',
          'Recorded Tutorials',
          'Training Modules',
          'Case Studies'
        ].map((item, i) => (
          <div key={i} className="p-6 rounded-xl border border-black/5 bg-white hover:border-emerald-600 transition-all cursor-pointer group">
            <h4 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{item}</h4>
            <p className="mt-2 text-sm text-slate-500">PDF • Technical Resource</p>
          </div>
        ))}
      </div>
    </div>
  );
}
