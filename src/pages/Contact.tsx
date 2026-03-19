import React from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 flex flex-col gap-12">
      <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900">Get in Touch</h1>
        <p className="text-lg text-slate-600">
          Have questions about our services, tokenomics, or collaboration opportunities? Our team is here to help.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <form className="flex flex-col gap-4 p-8 rounded-3xl bg-white border border-black/5 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none" />
            <input type="text" placeholder="Last Name" className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none" />
          </div>
          <input type="email" placeholder="Email Address" className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none" />
          <select className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none">
            <option>General Inquiry</option>
            <option>Technical Support</option>
            <option>Partnership Opportunities</option>
            <option>Tokenomics & OMT</option>
          </select>
          <textarea placeholder="Your Message" rows={5} className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none" />
          <button className="rounded-xl bg-emerald-600 py-4 font-bold text-white hover:bg-emerald-700 transition-colors">Send Message</button>
        </form>
        <div className="flex flex-col gap-8">
          <div className="p-8 rounded-3xl bg-slate-50 border border-black/5">
            <h3 className="font-bold text-slate-900 text-xl mb-4">Global Support</h3>
            <div className="flex flex-col gap-4 text-slate-600">
              <p className="flex items-center gap-3">
                <span className="font-semibold">Email:</span> support@omets.com
              </p>
              <p className="flex items-center gap-3">
                <span className="font-semibold">Collaboration:</span> innovate@omets.com
              </p>
            </div>
          </div>
          <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-100">
            <h3 className="font-bold text-emerald-900 text-xl mb-4">Community Hub</h3>
            <p className="text-emerald-800 leading-relaxed">
              Join our global engineering community to get real-time support and collaborate with peers worldwide.
            </p>
            <Link to="/community" className="mt-4 inline-block font-bold text-emerald-600 hover:text-emerald-700">Go to Forum →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
