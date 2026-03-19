import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { doc, getDocFromServer } from 'firebase/firestore';
import { db } from './firebase';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary';
import { seedDatabase } from './utils/seedData';
import './index.css';

// Test connection to Firestore as per critical directive
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Successfully connected to Firestore');
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration. The client is offline.');
    }
  }
}

testConnection();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
