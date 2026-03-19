import React from 'react';
import { Link } from 'react-router-dom';

export default function EnrollmentSuccess() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-32 text-center flex flex-col items-center gap-8">
      <div className="h-24 w-24 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
        <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-extrabold text-slate-900">Enrollment Successful!</h1>
        <p className="text-lg text-slate-600">Welcome to the course. You can now access all materials from your dashboard.</p>
      </div>
      <div className="flex gap-4">
        <Link to="/dashboard" className="rounded-xl bg-emerald-600 px-8 py-3 font-bold text-white hover:bg-emerald-700">Go to Dashboard</Link>
        <Link to="/courses" className="rounded-xl border border-black/10 px-8 py-3 font-bold text-slate-600 hover:bg-slate-50">Browse More</Link>
      </div>
    </div>
  );
}
