import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Youtube, Twitter, Facebook, Instagram, Mail, Phone, MapPin, CheckCircle2, Loader2 } from 'lucide-react';

import logo from '../assets/logo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus('success');
    setEmail('');

    // Reset success message after 5 seconds
    setTimeout(() => setStatus('idle'), 5000);
  };

  const footerLinks = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', path: '/' },
        { name: 'Courses', path: '/courses' },
        { name: 'Consultation', path: '/consultation' },
        { name: 'Workshops', path: '/workshops' },
        { name: 'Community', path: '/community' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', path: '/help' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'FAQ', path: '/faq' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Linkedin, path: 'https://linkedin.com' },
    { icon: Youtube, path: 'https://youtube.com' },
    { icon: Twitter, path: 'https://twitter.com' },
    { icon: Facebook, path: 'https://facebook.com' },
    { icon: Instagram, path: 'https://instagram.com' },
  ];

  return (
    <footer className="border-t border-black/5 bg-slate-50 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="OMETS Logo" className="h-32 w-auto" />
            </Link>
            <p className="text-sm text-slate-600 leading-relaxed">
              Online Mechanical Engineering and Technology Services. Empowering engineers worldwide with knowledge, collaboration, and expert consultation.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-emerald-600 transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 & 3: Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-slate-600 hover:text-emerald-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 4: Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3 text-sm text-slate-600">
                <Mail className="h-5 w-5 text-emerald-600 shrink-0" />
                <span>support@omets.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-600">
                <Phone className="h-5 w-5 text-emerald-600 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-600">
                <MapPin className="h-5 w-5 text-emerald-600 shrink-0" />
                <span>123 Engineering Way, Tech City, TC 98765</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 border-t border-black/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md">
            <h3 className="text-lg font-semibold text-slate-900">Subscribe to our newsletter</h3>
            <p className="text-sm text-slate-600">Get the latest engineering news, course updates, and workshop announcements.</p>
          </div>
          <div className="w-full max-w-md">
            {status === 'success' ? (
              <div className="flex items-center gap-3 rounded-lg bg-emerald-50 p-4 text-emerald-700 border border-emerald-100">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm font-medium">Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex w-full gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-black/10 bg-white px-4 py-2 text-sm focus:border-emerald-600 focus:outline-none"
                  required
                  disabled={status === 'loading'}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
                >
                  {status === 'loading' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-black/5 pt-8 text-xs text-slate-400">
          <p>&copy; {currentYear} OMETS. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-slate-600">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-600">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
