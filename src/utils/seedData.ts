import { collection, addDoc, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../firebase';

const courses = [
  {
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
    title: 'Modern Manufacturing Systems',
    instructor: 'Dr. Emily White',
    duration: '8 Weeks',
    price: 129,
    image: 'https://picsum.photos/seed/factory/800/600',
    category: 'Manufacturing',
    difficulty: 'Beginner',
    rating: 4.6,
    students: 600,
  }
];

const workshops = [
  {
    title: 'Digital Twin Implementation',
    date: '2024-05-15',
    instructor: 'Dr. Sarah Johnson',
    description: 'Learn how to implement digital twins in industrial manufacturing processes.',
    image: 'https://picsum.photos/seed/twin/800/600'
  },
  {
    title: 'Sustainable Energy Systems',
    date: '2024-06-20',
    instructor: 'Prof. Michael Chen',
    description: 'Exploring the future of renewable energy and thermodynamic efficiency.',
    image: 'https://picsum.photos/seed/energy/800/600'
  }
];

export async function seedDatabase() {
  try {
    // Check if already seeded
    const coursesQuery = query(collection(db, 'courses'), limit(1));
    const coursesSnapshot = await getDocs(coursesQuery);
    
    if (coursesSnapshot.empty) {
      console.log('Seeding database...');
      
      for (const course of courses) {
        await addDoc(collection(db, 'courses'), course);
      }
      
      for (const workshop of workshops) {
        await addDoc(collection(db, 'workshops'), workshop);
      }
      
      console.log('Database seeded successfully!');
    } else {
      console.log('Database already contains data, skipping seed.');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}
