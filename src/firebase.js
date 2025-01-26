// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import formData from './DashboardLayout';
import setStudents from './DashboardLayout';
import setIsModalOpen from './DashboardLayout';


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  };

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

// Modify handleAddStudent to use Firestore
const handleAddStudent = async (e) => {
  e.preventDefault();
  
  try {
    // Add to Firestore
    const docRef = await addDoc(collection(firestore, 'students'), formData);
    
    // Update local state
    setStudents(prevStudents => [...prevStudents, { 
      id: docRef.id, 
      ...formData 
    }]);
    
    setIsModalOpen(false);
  } catch (error) {
    console.error("Error adding student: ", error);
  }
};
