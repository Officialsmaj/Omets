import React from 'react';

export default function Blog() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 flex flex-col gap-8">
      <h1 className="text-4xl font-extrabold text-slate-900">Engineering Insights</h1>
      <p className="text-lg text-slate-600">Stay updated with the latest trends, research, and technical breakthroughs in mechanical engineering.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: 'The Future of Robotics in Manufacturing', desc: 'Exploring how AI-driven robotics are transforming assembly lines and industrial automation.' },
          { title: 'Sustainable Energy Systems: A Mechanical Perspective', desc: 'Analyzing the role of mechanical engineers in developing efficient renewable energy solutions.' },
          { title: 'Advanced Materials in Aerospace Engineering', desc: 'A deep dive into the next generation of composites and alloys for space exploration.' }
        ].map((post, i) => (
          <div key={i} className="flex flex-col gap-4 group cursor-pointer">
            <div className="aspect-video bg-slate-100 rounded-2xl overflow-hidden">
              <img src={`https://picsum.photos/seed/blog${i}/800/600`} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{post.title}</h3>
            <p className="text-slate-600 line-clamp-2">{post.desc}</p>
            <button className="text-emerald-600 font-bold text-sm w-fit">Read More →</button>
          </div>
        ))}
      </div>
    </div>
  );
}
