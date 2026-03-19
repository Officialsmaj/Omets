import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { handleFirestoreError, OperationType } from '../utils/firestoreErrors';
import { Loader2, Clock, BookOpen, Star, User, CheckCircle2 } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  price: number;
  image: string;
  category: string;
  difficulty: string;
  description: string;
  rating?: number;
}

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'courses', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCourse({ id: docSnap.id, ...docSnap.data() } as Course);
        } else {
          navigate('/courses');
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, `courses/${id}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <Loader2 className="h-12 w-12 animate-spin text-emerald-600" />
        <p className="mt-4 text-slate-600">Loading course details...</p>
      </div>
    );
  }

  if (!course) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col gap-8">
          <div className="aspect-video rounded-3xl bg-slate-100 overflow-hidden shadow-lg">
            <img src={course.image} alt={course.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-slate-900">What you'll learn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'Master core engineering principles',
                'Practical hands-on projects',
                'Industry-standard tools and software',
                'Advanced problem-solving techniques',
                'Direct mentorship from experts',
                'Professional certification upon completion'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-slate-600">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 font-bold uppercase tracking-wider text-xs bg-emerald-50 px-2 py-1 rounded">{course.category}</span>
              <div className="flex items-center gap-1 text-sm font-medium text-slate-900">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {course.rating || 4.8}
              </div>
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">{course.title}</h1>
            <p className="text-lg text-slate-600 leading-relaxed">{course.description}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-black/5">
              <div className="flex items-center gap-2 text-slate-500 mb-1">
                <Clock className="h-4 w-4" />
                <span className="text-xs font-bold uppercase">Duration</span>
              </div>
              <p className="font-bold text-slate-900">{course.duration}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-black/5">
              <div className="flex items-center gap-2 text-slate-500 mb-1">
                <BookOpen className="h-4 w-4" />
                <span className="text-xs font-bold uppercase">Level</span>
              </div>
              <p className="font-bold text-slate-900">{course.difficulty}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-black/5">
              <div className="flex items-center gap-2 text-slate-500 mb-1">
                <User className="h-4 w-4" />
                <span className="text-xs font-bold uppercase">Instructor</span>
              </div>
              <p className="font-bold text-slate-900">{course.instructor}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-8 rounded-3xl bg-slate-900 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-400 uppercase tracking-widest">Course Price</span>
              <span className="text-3xl font-extrabold">${course.price}</span>
            </div>
            <Link 
              to="/enrollment-success" 
              className="w-full rounded-xl bg-emerald-600 py-4 text-center font-bold text-white hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
            >
              Enroll Now
            </Link>
            <p className="text-center text-xs text-slate-400">30-Day Money-Back Guarantee • Lifetime Access</p>
          </div>
        </div>
      </div>
    </div>
  );
}
