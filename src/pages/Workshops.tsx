import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Loader2 } from 'lucide-react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { handleFirestoreError, OperationType } from '../utils/firestoreErrors';

interface Workshop {
  id: string;
  title: string;
  date: string;
  instructor: string;
  description: string;
  image: string;
  time?: string;
}

export default function Workshops() {
  const navigate = useNavigate();
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const q = query(collection(db, 'workshops'), orderBy('date', 'asc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Workshop[];
        setWorkshops(data);
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, 'workshops');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 flex flex-col gap-8">
      <h1 className="text-4xl font-extrabold text-slate-900">Digital Workshops</h1>
      <p className="text-lg text-slate-600">Join our hands-on digital workshops led by industry experts.</p>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 className="h-12 w-12 animate-spin text-emerald-600" />
          <p className="mt-4 text-slate-600">Loading workshops...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {workshops.map(workshop => (
            <div key={workshop.id} className="flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
              <div className="aspect-video bg-slate-100 overflow-hidden">
                <img src={workshop.image} alt={workshop.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="p-8 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900">{workshop.title}</h3>
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-1 rounded">Upcoming</span>
                </div>
                <p className="text-slate-600">{workshop.description}</p>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {workshop.date}</span>
                  {workshop.time && <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {workshop.time}</span>}
                </div>
                <button
                  onClick={() => navigate('/enrollment-success')}
                  className="rounded-lg bg-emerald-600 px-6 py-2 text-sm font-bold text-white hover:bg-emerald-700 transition-colors"
                >
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
