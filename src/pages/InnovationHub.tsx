import React from 'react';

export default function InnovationHub() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 flex flex-col gap-8">
      <h1 className="text-4xl font-extrabold text-slate-900">Engineering Innovation Hub</h1>
      <p className="text-lg text-slate-600 max-w-4xl leading-relaxed">
        OMETS aims to evolve into a global digital innovation hub where engineers collaborate on research, share technical discoveries, and develop engineering solutions for industrial and technological challenges.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="p-8 rounded-3xl bg-slate-900 text-white">
          <h3 className="text-2xl font-bold mb-4">Collaborative Research</h3>
          <p className="text-slate-400">Join global teams working on cutting-edge mechanical engineering research and development.</p>
        </div>
        <div className="p-8 rounded-3xl bg-emerald-600 text-white">
          <h3 className="text-2xl font-bold mb-4">Technical Discoveries</h3>
          <p className="text-emerald-100">Share your findings and learn from the breakthroughs of peers in the global engineering community.</p>
        </div>
      </div>
    </div>
  );
}
