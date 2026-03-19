import React from 'react';

export default function Services() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 flex flex-col gap-8">
      <h1 className="text-4xl font-extrabold text-slate-900">Core Services</h1>
      <p className="text-lg text-slate-600 max-w-3xl">
        OMETS introduces an integrated digital ecosystem where users can access engineering consultation, participate in workshops, learn through structured tutorials, and collaborate through a global engineering community platform.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: 'Virtual Engineering Consultation', desc: 'Real-time engineering consultation with global experts for technical guidance.' },
          { title: 'Digital Engineering Workshops', desc: 'Interactive video workshops and webinars led by industry leaders.' },
          { title: 'Structured Engineering Courses', desc: 'Recorded training modules and tutorials for mastering mechanical engineering.' },
          { title: 'Engineering Knowledge Base', desc: 'Technical documentation, engineering guides, and research papers.' },
          { title: 'Community Collaboration Platform', desc: 'Engineering discussion forums and global collaboration tools.' }
        ].map((service, i) => (
          <div key={i} className="p-8 rounded-2xl bg-white border border-black/5 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
            <p className="mt-4 text-slate-600 leading-relaxed">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
