import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, MessageSquare, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { handleFirestoreError, OperationType } from '../utils/firestoreErrors';

const experts = [
  { id: '1', name: 'Dr. Sarah Johnson', role: 'Mechanical Design Expert', rating: 4.9, image: 'https://picsum.photos/seed/sarah/200/200' },
  { id: '2', name: 'Prof. Michael Chen', role: 'Thermodynamics Specialist', rating: 4.8, image: 'https://picsum.photos/seed/michael/200/200' },
  { id: '3', name: 'Eng. Alex Rivera', role: 'Robotics & Automation Lead', rating: 4.9, image: 'https://picsum.photos/seed/alex/200/200' },
  { id: '4', name: 'Dr. Emily White', role: 'Manufacturing Systems Consultant', rating: 4.7, image: 'https://picsum.photos/seed/emily/200/200' },
];

const categories = [
  'Mechanical Design',
  'Thermodynamics & Heat Transfer',
  'Robotics & Automation',
  'Manufacturing Systems',
  'Fluid Mechanics',
  'Material Science',
  'Engineering R&D',
];

export default function Consultation() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '',
    expertId: '',
    date: '',
    time: '',
    problem: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'consultations'), {
        ...formData,
        userId: user.uid,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setStep(4);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'consultations');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-8 px-4 py-32 text-center">
        <div className="rounded-full bg-emerald-50 p-8 text-emerald-600">
          <User className="h-16 w-16" />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Book a Consultation</h1>
          <p className="max-w-md text-lg text-slate-600">
            Please sign in to your OMETS account to book a session with our global engineering experts.
          </p>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="rounded-xl bg-emerald-600 px-8 py-4 text-lg font-semibold text-white hover:bg-emerald-700 transition-all"
        >
          Sign In to Book
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-4 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Expert Consultation</h1>
          <p className="text-lg text-slate-600">Get personalized technical guidance from industry leaders.</p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-between px-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full font-bold transition-colors ${
                  step >= i ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'
                }`}
              >
                {i}
              </div>
              <span className={`text-xs font-medium ${step >= i ? 'text-emerald-600' : 'text-slate-400'}`}>
                {i === 1 ? 'Category' : i === 2 ? 'Expert' : 'Details'}
              </span>
            </div>
          ))}
        </div>

        {/* Form Steps */}
        <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
          {step === 1 && (
            <div className="flex flex-col gap-8">
              <h2 className="text-2xl font-bold text-slate-900">Select Engineering Category</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setFormData({ ...formData, category: cat });
                      handleNext();
                    }}
                    className={`flex items-center justify-between rounded-xl border-2 p-6 text-left transition-all ${
                      formData.category === cat ? 'border-emerald-600 bg-emerald-50' : 'border-black/5 hover:border-emerald-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="font-bold text-slate-900">{cat}</span>
                    {formData.category === cat && <CheckCircle2 className="h-6 w-6 text-emerald-600" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-8">
              <h2 className="text-2xl font-bold text-slate-900">Choose an Expert</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {experts.map((expert) => (
                  <button
                    key={expert.id}
                    onClick={() => {
                      setFormData({ ...formData, expertId: expert.id });
                      handleNext();
                    }}
                    className={`flex flex-col gap-4 rounded-xl border-2 p-6 text-left transition-all ${
                      formData.expertId === expert.id ? 'border-emerald-600 bg-emerald-50' : 'border-black/5 hover:border-emerald-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <img src={expert.image} alt={expert.name} className="h-16 w-16 rounded-full" referrerPolicy="no-referrer" />
                      <div>
                        <h3 className="font-bold text-slate-900">{expert.name}</h3>
                        <p className="text-sm text-slate-500">{expert.role}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <button onClick={handleBack} className="text-sm font-medium text-slate-500 hover:text-emerald-600">
                Back to categories
              </button>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <h2 className="text-2xl font-bold text-slate-900">Booking Details</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">Select Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full rounded-xl border border-black/10 bg-white py-3 pl-10 pr-4 text-sm focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">Select Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <select
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full rounded-xl border border-black/10 bg-white py-3 pl-10 pr-4 text-sm focus:border-emerald-600 focus:outline-none"
                    >
                      <option value="">Choose time slot</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">Describe your problem</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-4 h-5 w-5 text-slate-400" />
                  <textarea
                    required
                    rows={4}
                    value={formData.problem}
                    onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                    placeholder="Briefly describe the technical challenge you're facing..."
                    className="w-full rounded-xl border border-black/10 bg-white py-3 pl-10 pr-4 text-sm focus:border-emerald-600 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button type="button" onClick={handleBack} className="text-sm font-medium text-slate-500 hover:text-emerald-600">
                  Back to expert selection
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-emerald-600 px-8 py-3 font-bold text-white hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    'Book Consultation'
                  )}
                </button>
              </div>
            </form>
          )}

          {step === 4 && (
            <div className="flex flex-col items-center gap-6 py-12 text-center">
              <div className="rounded-full bg-emerald-100 p-6 text-emerald-600">
                <CheckCircle2 className="h-16 w-16" />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold text-slate-900">Booking Confirmed!</h2>
                <p className="text-lg text-slate-600">
                  Your consultation request has been sent. You will receive a confirmation email shortly.
                </p>
              </div>
              <div className="mt-4 rounded-2xl bg-slate-50 p-6 text-left w-full max-w-md border border-black/5">
                <h3 className="font-bold text-slate-900 mb-4">Summary</h3>
                <div className="flex flex-col gap-2 text-sm text-slate-600">
                  <p><span className="font-semibold text-slate-900">Category:</span> {formData.category}</p>
                  <p><span className="font-semibold text-slate-900">Expert:</span> {experts.find(e => e.id === formData.expertId)?.name}</p>
                  <p><span className="font-semibold text-slate-900">Date:</span> {formData.date}</p>
                  <p><span className="font-semibold text-slate-900">Time:</span> {formData.time}</p>
                </div>
              </div>
              <button
                onClick={() => setStep(1)}
                className="mt-6 rounded-xl bg-slate-900 px-8 py-3 font-bold text-white hover:bg-slate-800 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="flex items-start gap-4 rounded-2xl bg-amber-50 p-6 border border-amber-100">
          <AlertCircle className="h-6 w-6 text-amber-600 shrink-0" />
          <div className="flex flex-col gap-1">
            <h4 className="font-bold text-amber-900">Important Note</h4>
            <p className="text-sm text-amber-800">
              Consultation sessions are 45 minutes long. Please ensure you have a stable internet connection and any relevant technical documentation ready before the session starts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
