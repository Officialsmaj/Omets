import React, { useState } from 'react';
import { Search, User, BookOpen, CreditCard, LifeBuoy, MessageCircle, ChevronDown, ChevronRight, Mail, ExternalLink } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const categories = [
  { id: 'account', name: 'Account & Profile', icon: User, description: 'Manage your profile, password, and settings.' },
  { id: 'courses', name: 'Courses & Learning', icon: BookOpen, description: 'Access materials, tracking, and certification.' },
  { id: 'billing', name: 'Billing & Payments', icon: CreditCard, description: 'Transactions, refunds, and subscriptions.' },
  { id: 'tech', name: 'Technical Support', icon: LifeBuoy, description: 'Software, platform access, and bug reports.' },
  { id: 'community', name: 'Community Hub', icon: MessageCircle, description: 'Forums, networking, and collaboration.' },
];

const faqs = [
  {
    question: "How do I reset my password?",
    answer: "You can reset your password by clicking 'Forgot Password' on the login page. We will send a secure link to your registered email address to create a new one."
  },
  {
    question: "How can I enroll in a professional course?",
    answer: "Browse our 'Courses' page, select the course you're interested in, and click 'Enroll Now'. You'll be guided through the payment and onboarding process immediately."
  },
  {
    question: "Are OMETS certifications industry-recognized?",
    answer: "Yes, our certifications are designed in collaboration with leading mechanical engineering experts and are recognized by various industrial bodies globally."
  },
  {
    question: "How do I schedule a professional consultation?",
    answer: "Navigate to the 'Consultation' page, choose your engineering discipline, and select an available time slot with one of our certified experts."
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept all major credit cards, PayPal, and bank transfers for corporate enrollments. All transactions are secured with 256-bit encryption."
  }
];

export default function HelpCenter() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      {/* Search Hero */}
      <section className="bg-white border-b border-black/5 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">How can we help you?</h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl">
            Search our knowledge base or browse categories below to find the answers you need.
          </p>
          <div className="relative w-full max-w-2xl group">
            <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
            <input
              type="text"
              placeholder="Search help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 rounded-2xl border border-black/10 bg-white pl-12 pr-4 text-lg focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition-all shadow-sm"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col gap-24">
        {/* Categories Grid */}
        <section className="flex flex-col gap-10">
          <div className="flex items-center justify-between">
             <h2 className="text-2xl font-bold text-slate-900 underline decoration-emerald-500 decoration-4 underline-offset-8">Browse by Category</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className="group flex flex-col items-start p-8 rounded-3xl bg-white border border-black/5 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 transition-all text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                  <cat.icon className="h-6 w-6 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">{cat.name}</h3>
                <p className="text-slate-500 group-hover:text-slate-600 transition-colors">
                  {cat.description}
                </p>
                <span className="mt-6 flex items-center gap-2 text-sm font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                  Explore Topics <ChevronRight className="h-4 w-4" />
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm">Common Questions</span>
            <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-600 max-w-md">
              Quick answers to the most common questions our community asks. Can't find what you're looking for?
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
               <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
                  <Mail className="h-5 w-5" /> Contact Support
               </button>
               <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-black/10 text-slate-700 font-bold hover:bg-slate-50 transition-all">
                  Visit Community <ExternalLink className="h-5 w-5" />
               </button>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={cn(
                  "rounded-2xl border transition-all duration-300",
                  activeFaq === index 
                    ? "bg-white border-emerald-200 shadow-xl shadow-emerald-900/5 ring-1 ring-emerald-100" 
                    : "bg-white border-black/5 hover:border-black/10 hover:bg-white/80"
                )}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-lg font-bold text-slate-900 pr-8">{faq.question}</span>
                  <ChevronDown className={cn(
                    "h-6 w-6 text-slate-400 transition-transform duration-300 shrink-0",
                    activeFaq === index && "rotate-180 text-emerald-600"
                  )} />
                </button>
                <div className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  activeFaq === index ? "max-h-48 opacity-100 mb-6" : "max-h-0 opacity-0"
                )}>
                  <div className="px-6 pb-2 text-slate-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Secondary Support Banner */}
        <section className="p-10 lg:p-14 rounded-[3rem] bg-emerald-600 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
           <div className="relative flex flex-col gap-4 text-center md:text-left max-w-xl">
              <h3 className="text-3xl font-bold">Still Need Help?</h3>
              <p className="text-emerald-50 text-lg">
                Our team of engineering experts is available 24/7 to assist you with technical challenges or account issues.
              </p>
           </div>
           <button className="relative px-8 py-4 bg-white text-emerald-600 font-extrabold rounded-2xl hover:bg-emerald-50 transition-all shadow-xl shadow-black/10 whitespace-nowrap">
              Submit a Ticket
           </button>
        </section>
      </div>
    </div>
  );
}
