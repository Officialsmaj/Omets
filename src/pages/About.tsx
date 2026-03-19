import React from 'react';

export default function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-extrabold text-slate-900">About OMETS</h1>
        <p className="text-xl text-slate-600 leading-relaxed max-w-4xl">
          Online Mechanical Engineering and Technology Services (OMETS) is a comprehensive digital platform designed to transform how engineering knowledge, professional consultation, and collaboration are delivered globally.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col gap-6 p-8 rounded-3xl bg-slate-50 border border-black/5">
          <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
          <p className="text-slate-600 leading-relaxed">
            To build a global digital engineering ecosystem that empowers engineers and technology innovators to collaborate, learn, and develop solutions for real-world industrial and technological challenges.
          </p>
        </div>
        <div className="flex flex-col gap-6 p-8 rounded-3xl bg-emerald-50 border border-emerald-100">
          <h3 className="text-2xl font-bold text-emerald-900">Our Mission</h3>
          <ul className="flex flex-col gap-3 text-emerald-800">
            <li className="flex gap-2"><span>•</span> Provide accessible online engineering education and mentorship.</li>
            <li className="flex gap-2"><span>•</span> Connect engineers globally for collaboration and innovation.</li>
            <li className="flex gap-2"><span>•</span> Improve practical mechanical engineering skills through digital tools.</li>
            <li className="flex gap-2"><span>•</span> Support engineering research and technological development.</li>
            <li className="flex gap-2"><span>•</span> Promote ethical and responsible engineering practices.</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <h3 className="text-2xl font-bold text-slate-900">Ethical Engineering Framework</h3>
        <p className="text-slate-600 leading-relaxed max-w-4xl">
          OMETS follows principles of integrity, transparency, fairness, professionalism, and socially responsible engineering practices inspired by strong ethical values.
        </p>
      </div>
    </div>
  );
}
