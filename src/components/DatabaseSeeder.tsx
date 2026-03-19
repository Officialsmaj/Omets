import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { seedDatabase } from '../utils/seedData';

export function DatabaseSeeder() {
  const { user } = useAuth();

  useEffect(() => {
    if (user && (user.role === 'admin' || user.email === 'officialsmaj@gmail.com')) {
      seedDatabase();
    }
  }, [user]);

  return null;
}
