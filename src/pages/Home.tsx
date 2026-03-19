import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Video, Lightbulb, MessageSquare, CheckCircle2, Star } from 'lucide-react';
import { motion } from 'motion/react';

const services = [
  {
    icon: Video,
    title: 'Virtual Engineering Consultation',
    description: 'Real-time engineering consultation with global experts for technical guidance.',
    link: '/consultation',
  },
  {
    icon: BookOpen,
    title: 'Digital Engineering Workshops',
    description: 'Interactive video workshops and webinars led by industry leaders.',
    link: '/workshops',
  },
  {
    icon: Lightbulb,
    title: 'Structured Engineering Courses',
    description: 'Recorded training modules and tutorials for mastering mechanical engineering.',
    link: '/courses',
  },
  {
    icon: MessageSquare,
    title: 'Engineering Knowledge Base',
    description: 'Technical documentation, engineering guides, and research papers.',
    link: '/knowledge-base',
  },
  {
    icon: Users,
    title: 'Community Collaboration Platform',
    description: 'Engineering discussion forums and global collaboration tools.',
    link: '/community',
  },
];

const featuredCourses = [
  {
    id: '1',
    title: 'Advanced Mechanical Design',
    instructor: 'Dr. Sarah Johnson',
    duration: '12 Weeks',
    image: 'https://picsum.photos/seed/design/800/600',
    category: 'Design',
  },
  {
    id: '2',
    title: 'Thermodynamics & Heat Transfer',
    instructor: 'Prof. Michael Chen',
    duration: '10 Weeks',
    image: 'https://picsum.photos/seed/thermo/800/600',
    category: 'Thermal',
  },
  {
    id: '3',
    title: 'Robotics & Automation Systems',
    instructor: 'Eng. Alex Rivera',
    duration: '14 Weeks',
    image: 'https://picsum.photos/seed/robot/800/600',
    category: 'Robotics',
  },
  {
    id: '4',
    title: 'Modern Manufacturing Systems',
    instructor: 'Dr. Emily White',
    duration: '8 Weeks',
    image: 'https://picsum.photos/seed/factory/800/600',
    category: 'Manufacturing',
  },
];

const steps = [
  { icon: UserPlus, title: 'Create an account', desc: 'Join our global network of engineers and students.' },
  { icon: Search, title: 'Choose courses or services', desc: 'Find the perfect learning path or expert advice.' },
  { icon: GraduationCap, title: 'Learn from experts', desc: 'Gain practical knowledge from industry professionals.' },
  { icon: Globe, title: 'Collaborate globally', desc: 'Work on projects with engineers from around the world.' },
];

import { UserPlus, Search, GraduationCap, Globe } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 pt-24 pb-32 text-white">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://picsum.photos/seed/engineering/1920/1080?blur=4"
            alt="Engineering Background"
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-8"
            >
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
                Building a Global <span className="text-emerald-400">Digital Engineering</span> Ecosystem
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed">
                Empowering engineers and technology innovators to collaborate, learn, and develop solutions for real-world industrial and technological challenges.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/courses"
                  className="rounded-xl bg-emerald-600 px-8 py-4 text-lg font-semibold text-white hover:bg-emerald-700 transition-all hover:scale-105"
                >
                  Start Learning
                </Link>
                <Link
                  to="/consultation"
                  className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-md hover:bg-white/20 transition-all"
                >
                  Book Consultation
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative hidden lg:block"
            >
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <img
                  src="https://picsum.photos/seed/tech/800/600"
                  alt="Engineering Illustration"
                  className="rounded-2xl shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Executive Summary</h2>
          <p className="max-w-4xl text-lg text-slate-600 leading-relaxed">
            OMETS (Online Mechanical Engineering and Technology Services) is a comprehensive digital platform designed to transform how engineering knowledge, professional consultation, and collaboration are delivered globally. The platform integrates virtual consultation, digital workshops, structured tutorials, and a centralized engineering knowledge base to support students, engineers, and innovators worldwide.
          </p>
          <Link to="/about" className="flex items-center gap-2 font-semibold text-emerald-600 hover:text-emerald-700">
            Learn More About Our Vision <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Core Services */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Our Core Services</h2>
            <p className="mt-4 text-lg text-slate-600">Comprehensive solutions for every stage of your engineering journey.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {services.map((service, index) => (
              <Link
                key={index}
                to={service.link}
                className="group flex flex-col gap-4 rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{service.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">How It Works</h2>
          <p className="mt-4 text-lg text-slate-600">Your path to engineering excellence in four simple steps.</p>
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center gap-4">
              {index < steps.length - 1 && (
                <div className="absolute top-12 left-1/2 hidden w-full border-t-2 border-dashed border-slate-200 lg:block" />
              )}
              <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-white border-4 border-emerald-50 text-emerald-600 shadow-sm">
                <step.icon className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
              <p className="text-sm text-slate-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tokenomics Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-24 bg-slate-900 rounded-[3rem] overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-600/10 blur-[120px] rounded-full" />
          <div className="relative z-10 px-8 md:px-16 flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 flex flex-col gap-8">
              <div className="flex flex-col gap-4 text-left">
                <span className="text-emerald-400 font-bold uppercase tracking-widest text-sm">OMETS Ecosystem</span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                  The OMETS Token (OMT)
                </h2>
                <p className="text-xl text-slate-400 leading-relaxed">
                  OMT is the native utility token of the OMETS ecosystem, designed to facilitate seamless transactions, reward contributors, and power decentralized engineering certification.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: 'Ecosystem Payments', desc: 'Pay for courses, workshops, and expert consultations.' },
                  { title: 'Contributor Rewards', desc: 'Earn OMT by sharing knowledge and research.' },
                  { title: 'Decentralized Certification', desc: 'Verify your skills through blockchain-backed credentials.' },
                  { title: 'Governance', desc: 'Participate in the future direction of the OMETS platform.' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <h4 className="text-emerald-400 font-bold">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 bg-emerald-600 rounded-full animate-pulse opacity-20 blur-2xl" />
                <div className="relative w-full h-full rounded-full border-4 border-emerald-500/30 flex items-center justify-center bg-slate-800 shadow-2xl">
                  <span className="text-6xl font-black text-emerald-500">OMT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h2 className="text-3xl font-bold sm:text-4xl">Featured Courses</h2>
              <p className="mt-2 text-slate-400">Learn the most in-demand engineering skills from industry experts.</p>
            </div>
            <Link to="/courses" className="rounded-lg bg-white/10 px-6 py-3 font-semibold hover:bg-white/20 transition-colors">
              View All Courses
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {featuredCourses.map((course) => (
              <div key={course.id} className="group flex flex-col overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-all hover:border-emerald-400/50">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col gap-4 p-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">{course.category}</span>
                  <h3 className="text-lg font-bold leading-tight">{course.title}</h3>
                  <div className="flex flex-col gap-1 text-sm text-slate-400">
                    <p>Instructor: {course.instructor}</p>
                    <p>Duration: {course.duration}</p>
                  </div>
                  <Link
                    to={`/courses/${course.id}`}
                    className="mt-4 rounded-lg bg-emerald-600 py-2 text-center text-sm font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">What Our Community Says</h2>
          <p className="mt-4 text-lg text-slate-600">Trusted by thousands of engineers and students worldwide.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-6 rounded-2xl bg-slate-50 p-8">
              <div className="flex gap-1 text-yellow-400">
                {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="text-slate-600 italic">
                "OMETS has completely transformed how I approach complex engineering problems. The consultation sessions are invaluable, and the community support is unmatched."
              </p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-slate-200" />
                <div>
                  <h4 className="font-bold text-slate-900">John Doe</h4>
                  <p className="text-xs text-slate-500">Mechanical Engineer, TechCorp</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="border-y border-black/5 bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-slate-400">Our Partners & Institutions</p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-50 grayscale">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 w-32 rounded bg-slate-300" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
