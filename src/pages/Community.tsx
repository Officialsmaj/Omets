import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, ThumbsUp, MessageCircle, User, Search, PlusCircle, Filter, Send } from 'lucide-react';
import { collection, onSnapshot, query, orderBy, addDoc, serverTimestamp, updateDoc, doc, increment } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { handleFirestoreError, OperationType } from '../utils/firestoreErrors';

interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  createdAt: any;
  likes: number;
  commentsCount: number;
  category: string;
}

const initialPosts = [
  {
    id: '1',
    title: 'Challenges in Designing High-Speed Robotics',
    content: 'I am currently working on a high-speed pick-and-place robot and facing issues with vibration at high accelerations. Any tips on damping techniques or structural optimization?',
    authorName: 'David Miller',
    authorRole: 'Robotics Engineer',
    createdAt: '2 hours ago',
    likes: 24,
    commentsCount: 12,
    category: 'Robotics',
  },
  {
    id: '2',
    title: 'Best Practices for CFD Simulation in HVAC Systems',
    content: 'What are the most reliable turbulence models for indoor airflow simulation? I have been using k-epsilon but results seem inconsistent in large open spaces.',
    authorName: 'Sarah Johnson',
    authorRole: 'Thermal Engineer',
    createdAt: '5 hours ago',
    likes: 18,
    commentsCount: 8,
    category: 'Thermal',
  },
  {
    id: '3',
    title: 'Material Selection for Aerospace Components',
    content: 'Looking for advice on lightweight composite materials that can withstand high thermal cycling for a small satellite project. Any recommendations beyond standard carbon fiber?',
    authorName: 'Alex Rivera',
    authorRole: 'Aerospace Consultant',
    createdAt: '1 day ago',
    likes: 42,
    commentsCount: 25,
    category: 'Materials',
  },
];

const categories = ['All', 'Robotics', 'Thermal', 'Materials', 'Design', 'Manufacturing', 'Research'];

export default function Community() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'Design' });

  useEffect(() => {
    const q = query(collection(db, 'forumPosts'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Post[];
      setPosts(postsData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'forumPosts');
    });

    return () => unsubscribe();
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await addDoc(collection(db, 'forumPosts'), {
        ...newPost,
        authorId: user.uid,
        authorName: user.displayName || 'Anonymous',
        authorRole: user.role || 'User',
        createdAt: serverTimestamp(),
        likes: 0,
        commentsCount: 0,
      });
      setShowNewPost(false);
      setNewPost({ title: '', content: '', category: 'Design' });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'forumPosts');
    }
  };

  const handleLike = async (postId: string) => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await updateDoc(doc(db, 'forumPosts', postId), {
        likes: increment(1)
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `forumPosts/${postId}`);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
        {/* Left Sidebar: Categories */}
        <div className="hidden lg:flex lg:flex-col lg:gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Categories</h3>
            <nav className="flex flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center justify-between rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === cat ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </div>
          <div className="rounded-2xl bg-emerald-50 p-6 border border-emerald-100">
            <h4 className="font-bold text-emerald-900">Community Guidelines</h4>
            <p className="mt-2 text-xs text-emerald-800 leading-relaxed">
              Be respectful, share knowledge, and help others grow. Avoid spam and maintain professional conduct.
            </p>
          </div>
        </div>

        {/* Main Content: Feed */}
        <div className="lg:col-span-3 flex flex-col gap-8">
          {/* Header & Actions */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Community Forum</h1>
              <p className="text-lg text-slate-600">Collaborate, discuss, and solve engineering challenges together.</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button
                onClick={() => setShowNewPost(!showNewPost)}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white hover:bg-emerald-700 transition-colors"
              >
                <PlusCircle className="h-5 w-5" /> {showNewPost ? 'Cancel' : 'Start Discussion'}
              </button>
            </div>
          </div>

          {/* New Post Form */}
          {showNewPost && (
            <form onSubmit={handleCreatePost} className="flex flex-col gap-4 rounded-2xl border-2 border-emerald-100 bg-emerald-50/30 p-6 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Discussion Title"
                  required
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none md:col-span-2"
                />
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none"
                >
                  {categories.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <textarea
                placeholder="What's on your mind? Describe the challenge or topic..."
                required
                rows={4}
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-3 font-bold text-white hover:bg-emerald-700 transition-colors"
                >
                  <Send className="h-4 w-4" /> Post Discussion
                </button>
              </div>
            </form>
          )}

          {/* Search & Mobile Filters */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:hidden">
              <Filter className="h-5 w-5 text-slate-400" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === cat ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Posts Feed */}
          <div className="flex flex-col gap-6">
            {filteredPosts.map((post) => (
              <div key={post.id} className="group flex flex-col gap-6 rounded-2xl border border-black/5 bg-white p-8 shadow-sm transition-all hover:shadow-md">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{post.authorName}</h4>
                        <p className="text-xs text-slate-500">{post.authorRole} • {post.createdAt}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 uppercase tracking-wider">{post.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{post.title}</h3>
                  <p className="text-slate-600 leading-relaxed line-clamp-3">{post.content}</p>
                </div>
                  <div className="flex items-center gap-6 border-t border-black/5 pt-6">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors"
                  >
                    <ThumbsUp className="h-5 w-5" /> {post.likes} Likes
                  </button>
                  <button className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors">
                    <MessageCircle className="h-5 w-5" /> {post.commentsCount} Comments
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="rounded-full bg-slate-100 p-6">
                <MessageSquare className="h-12 w-12 text-slate-400" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-900">No discussions found</h3>
              <p className="mt-2 text-slate-600">Be the first to start a discussion in this category!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
