import React from 'react';
import { Linkedin, Twitter, Github } from 'lucide-react';

const teamMembers = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Founder & CEO",
    bio: "Passionate about bridging the gap between engineering theory and industrial practice.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&auto=format&fit=crop",
    social: { linkedin: "#", twitter: "#", github: "#" }
  },
  {
    name: "James Wilson",
    role: "Head of Engineering",
    bio: "Specialist in structural mechanics and advanced materials with 15 years experience.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=400&auto=format&fit=crop",
    social: { linkedin: "#", twitter: "#", github: "#" }
  },
  {
    name: "Elena Rodriguez",
    role: "Lead Technology Consultant",
    bio: "Expert in sustainable technology and innovative industrial cooling systems.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&auto=format&fit=crop",
    social: { linkedin: "#", twitter: "#", github: "#" }
  },
  {
    name: "David Chen",
    role: "Director of Innovation",
    bio: "Leading our research in robotics and automated manufacturing systems.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop",
    social: { linkedin: "#", twitter: "#", github: "#" }
  },
  {
    name: "Aisha Khan",
    role: "Education Director",
    bio: "Curating our professional courses and ensuring pedagogical excellence.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&h=400&auto=format&fit=crop",
    social: { linkedin: "#", twitter: "#", github: "#" }
  },
  {
    name: "Michael Brown",
    role: "Community Relations",
    bio: "Connecting our global community with the latest industry jobs and opportunities.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=400&auto=format&fit=crop",
    social: { linkedin: "#", twitter: "#", github: "#" }
  }
];

export default function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 flex flex-col gap-24">
      {/* Header Section */}
      <div className="flex flex-col gap-6 text-center lg:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">About OMETS</h1>
        <p className="text-xl text-slate-600 leading-relaxed max-w-4xl">
          Online Mechanical Engineering and Technology Services (OMETS) is a comprehensive digital platform designed to transform how engineering knowledge, professional consultation, and collaboration are delivered globally.
        </p>
      </div>
      
      {/* Vision & Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="flex flex-col gap-6 p-8 lg:p-10 rounded-[2.5rem] bg-slate-50 border border-black/5 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
          <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
             <span className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white text-sm">V</span>
             Our Vision
          </h3>
          <p className="text-slate-600 leading-relaxed lg:text-lg">
            To build a global digital engineering ecosystem that empowers engineers and technology innovators to collaborate, learn, and develop solutions for real-world industrial and technological challenges.
          </p>
        </div>
        <div className="flex flex-col gap-6 p-8 lg:p-10 rounded-[2.5rem] bg-emerald-50 border border-emerald-100 hover:shadow-xl hover:shadow-emerald-200/50 transition-all duration-300">
          <h3 className="text-2xl font-bold text-emerald-900 flex items-center gap-3">
             <span className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white text-sm">M</span>
             Our Mission
          </h3>
          <ul className="flex flex-col gap-4 text-emerald-800 lg:text-lg">
            {[
              "Provide accessible online engineering education and mentorship.",
              "Connect engineers globally for collaboration and innovation.",
              "Improve practical mechanical engineering skills through digital tools.",
              "Support engineering research and development.",
              "Promote ethical and responsible engineering practices."
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-emerald-500 font-bold shrink-0">✓</span> 
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Team Section */}
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4 text-center lg:text-left">
          <h2 className="text-3xl font-bold text-slate-900">Meet Our Team</h2>
          <p className="text-slate-600 max-w-2xl">
            The dedicated professionals driving innovation and excellence in mechanical engineering services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div 
              key={member.name} 
              className="group flex flex-col items-center text-center lg:items-start lg:text-left p-6 rounded-[2rem] bg-white border border-black/5 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-300"
            >
              <div className="relative w-48 h-48 mb-6 lg:w-40 lg:h-40">
                <div className="absolute inset-0 rounded-2xl bg-emerald-100 rotate-3 group-hover:rotate-6 transition-transform"></div>
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="relative inset-0 w-full h-full object-cover rounded-2xl shadow-lg"
                />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h4>
              <p className="text-sm font-semibold text-emerald-600 mb-4">{member.role}</p>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                {member.bio}
              </p>
              <div className="flex gap-4 mt-auto">
                <a href={member.social.linkedin} className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href={member.social.twitter} className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href={member.social.github} className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ethics Section */}
      <div className="flex flex-col gap-8 p-10 lg:p-14 rounded-[3rem] bg-slate-900 text-slate-100">
        <div className="flex flex-col gap-4">
          <h3 className="text-3xl font-bold">Ethical Engineering Framework</h3>
          <div className="h-1.5 w-24 bg-emerald-500 rounded-full"></div>
        </div>
        <p className="text-lg text-slate-300 leading-relaxed max-w-4xl">
          OMETS follows principles of integrity, transparency, fairness, professionalism, and socially responsible engineering practices inspired by strong ethical values. We believe that technology should always serve the betterment of humanity and the environment.
        </p>
      </div>
    </div>
  );
}
