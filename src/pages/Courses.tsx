import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Search, Filter, BookOpen, Clock, User, Star, Loader2 } from 'lucide-react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { handleFirestoreError, OperationType } from '../utils/firestoreErrors';

interface Course {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  price: number;
  image: string;
  category: string;
  difficulty: string;
  rating: number;
  students: number;
}

const courses = [
  {
    id: '1',
    title: 'Advanced Mechanical Design',
    instructor: 'Dr. Sarah Johnson',
    duration: '12 Weeks',
    price: 199,
    image: 'https://picsum.photos/seed/design/800/600',
    category: 'Design',
    difficulty: 'Advanced',
    rating: 4.8,
    students: 1250,
  },
  {
    id: '2',
    title: 'Thermodynamics & Heat Transfer',
    instructor: 'Prof. Michael Chen',
    duration: '10 Weeks',
    price: 149,
    image: 'https://picsum.photos/seed/thermo/800/600',
    category: 'Thermal',
    difficulty: 'Intermediate',
    rating: 4.7,
    students: 850,
  },
  {
    id: '3',
    title: 'Robotics & Automation Systems',
    instructor: 'Eng. Alex Rivera',
    duration: '14 Weeks',
    price: 249,
    image: 'https://picsum.photos/seed/robot/800/600',
    category: 'Robotics',
    difficulty: 'Advanced',
    rating: 4.9,
    students: 2100,
  },
  {
    id: '4',
    title: 'Modern Manufacturing Systems',
    instructor: 'Dr. Emily White',
    duration: '8 Weeks',
    price: 129,
    image: 'https://picsum.photos/seed/factory/800/600',
    category: 'Manufacturing',
    difficulty: 'Beginner',
    rating: 4.6,
    students: 600,
  },
  {
    id: '5',
    title: 'Introduction to CAD/CAM',
    instructor: 'Eng. David Miller',
    duration: '6 Weeks',
    price: 99,
    image: 'https://picsum.photos/seed/cad/800/600',
    category: 'Design',
    difficulty: 'Beginner',
    rating: 4.5,
    students: 3200,
  },
  {
    id: '6',
    title: 'Fluid Mechanics Fundamentals',
    instructor: 'Dr. Robert Lee',
    duration: '10 Weeks',
    price: 159,
    image: 'https://picsum.photos/seed/fluid/800/600',
    category: 'Thermal',
    difficulty: 'Intermediate',
    rating: 4.7,
    students: 1100,
  },
];

export default function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'courses'));
        const snapshot = await getDocs(q);
        const coursesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Course[];
        setCourses(coursesData);
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, 'courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  const categories = ['All', 'Design', 'Thermal', 'Robotics', 'Manufacturing'];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Engineering Courses</h1>
          <p className="max-w-2xl text-lg text-slate-600">
            Master mechanical engineering with our structured, self-paced courses designed by industry experts and leading academics.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full rounded-xl border border-black/10 bg-white py-3 pl-10 pr-4 text-sm focus:border-emerald-600 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            <Filter className="h-5 w-5 text-slate-400" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="h-12 w-12 animate-spin text-emerald-600" />
            <p className="mt-4 text-slate-600">Loading courses...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <div key={course.id} className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all hover:shadow-md">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col gap-4 p-6">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">{course.category}</span>
                    <div className="flex items-center gap-1 text-sm font-medium text-slate-900">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {course.rating || 4.5}
                    </div>
                  </div>
                  <Link to={`/courses/${course.id}`}>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight hover:text-emerald-600 transition-colors">{course.title}</h3>
                  </Link>
                  <div className="flex flex-col gap-2 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>{course.difficulty}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-4">
                    <span className="text-2xl font-bold text-slate-900">${course.price}</span>
                    <button
                      onClick={() => navigate('/enrollment-success')}
                      className="rounded-lg bg-emerald-600 px-6 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredCourses.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="rounded-full bg-slate-100 p-6">
              <Search className="h-12 w-12 text-slate-400" />
            </div>
            <h3 className="mt-6 text-xl font-bold text-slate-900">No courses found</h3>
            <p className="mt-2 text-slate-600">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
}
