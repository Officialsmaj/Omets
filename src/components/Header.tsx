import React, { useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { Menu, X, Search, Bell, User, LogIn, LogOut, ChevronDown, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import logo from '../assets/logo.png';

export default function Header() {
  const { user, signInWithGoogle, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Courses', path: '/courses' },
    { name: 'Workshops', path: '/workshops' },
    { name: 'Consultation', path: '/consultation' },
    { name: 'Knowledge Base', path: '/knowledge-base' },
    { name: 'Community', path: '/community' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="OMETS Logo" className="h-14 w-auto" />
        </Link>

        {/* Center: Desktop Menu */}
        <nav className="hidden lg:flex lg:gap-x-6">
          {navLinks.slice(0, 8).map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium transition-colors hover:text-emerald-600",
                  isActive ? "text-emerald-600" : "text-slate-600"
                )
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="relative group">
             <button className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-emerald-600">
                More <ChevronDown className="h-4 w-4" />
             </button>
             <div className="absolute left-0 top-full hidden w-48 rounded-xl border border-black/5 bg-white p-2 shadow-lg group-hover:block">
                {navLinks.slice(8).map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      cn(
                        "block rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-50 hover:text-emerald-600",
                        isActive ? "bg-slate-50 text-emerald-600" : "text-slate-600"
                      )
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
             </div>
          </div>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <div className="relative flex items-center">
            {isSearchOpen && (
              <form
                onSubmit={handleSearch}
                className="absolute right-full mr-2 hidden sm:block"
              >
                <input
                  autoFocus
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 rounded-lg border border-black/10 bg-white px-3 py-1.5 text-sm focus:border-emerald-600 focus:outline-none lg:w-64"
                />
              </form>
            )}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={cn(
                "rounded-full p-2 text-slate-600 hover:bg-slate-100 transition-colors",
                isSearchOpen && "bg-slate-100 text-emerald-600"
              )}
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
          
          <button className="rounded-full p-2 text-slate-600 hover:bg-slate-100">
            <Bell className="h-5 w-5" />
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 rounded-full border border-black/5 bg-slate-50 pl-1 pr-3 py-1 hover:bg-slate-100 transition-all"
              >
                <div className="h-8 w-8 overflow-hidden rounded-full bg-slate-200">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'User'} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <User className="h-full w-full p-2 text-slate-400" />
                  )}
                </div>
                <span className="hidden text-sm font-bold text-slate-700 sm:block">
                  {user.displayName?.split(' ')[0] || 'User'}
                </span>
                <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", isProfileOpen && "rotate-180")} />
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-black/5 bg-white p-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-2 border-b border-black/5 mb-2">
                    <p className="text-sm font-bold text-slate-900 truncate">{user.displayName || 'User'}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                  </div>
                  <Link 
                    to="/dashboard" 
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-colors"
                  >
                    <User className="h-4 w-4" /> Dashboard
                  </Link>
                  <Link 
                    to="/courses" 
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-colors"
                  >
                    <BookOpen className="h-4 w-4" /> My Courses
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsProfileOpen(false);
                      navigate('/');
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors mt-2 pt-2 border-t border-black/5"
                  >
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                to="/login"
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <LogIn className="h-4 w-4" /> Login
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-all shadow-sm"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-black/5 bg-white lg:hidden">
          <div className="p-4 border-b border-black/5">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-black/10 bg-slate-50 py-2 pl-10 pr-4 text-sm focus:border-emerald-600 focus:outline-none"
              />
            </form>
          </div>
          <nav className="flex flex-col gap-2 p-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "rounded-lg px-3 py-2 text-base font-medium transition-colors hover:bg-slate-50 hover:text-emerald-600",
                    isActive ? "bg-emerald-50 text-emerald-600" : "text-slate-600"
                  )
                }
              >
                {link.name}
              </NavLink>
            ))}
            {!user && (
              <div className="mt-4 flex flex-col gap-2 border-t border-black/5 pt-4">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-lg border border-black/5 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  <LogIn className="h-4 w-4" /> Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
