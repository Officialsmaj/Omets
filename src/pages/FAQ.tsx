import React from 'react';

export default function FAQ() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {[
          { q: "What is OMETS?", a: "OMETS (Online Mechanical Engineering and Technology Services) is a comprehensive digital platform designed to transform how engineering knowledge, professional consultation, and collaboration are delivered globally." },
          { q: "Who are the target users?", a: "Our platform serves engineering students, early-career engineers, professional engineers, technicians, researchers, and technology enthusiasts." },
          { q: "What core services do you offer?", a: "We provide virtual engineering consultation, digital workshops, structured engineering courses, a knowledge base, and a community collaboration platform." },
          { q: "What is the OMETS Token (OMT)?", a: "OMT is a digital utility token for ecosystem transactions, including payments for courses, consultation services, contributor rewards, and decentralized certification." },
        ].map((item, i) => (
          <div key={i} className="p-6 rounded-xl bg-slate-50 border border-black/5">
            <h3 className="text-lg font-bold text-slate-900 mb-2">{item.q}</h3>
            <p className="text-slate-600 leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
