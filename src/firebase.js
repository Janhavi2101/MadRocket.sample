// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import formData from './DashboardLayout';
import setStudents from './DashboardLayout';
import setIsModalOpen from './DashboardLayout';


const firebaseConfig = {
    apiKey: "AIzaSyDXzMynr6kw9Km61wgnAiUIlmBvmDFmjiI",
    authDomain: "madrix-19d11.firebaseapp.com",
    projectId: "madrix-19d11",
    storageBucket: "madrix-19d11.firebasestorage.app",
    messagingSenderId: "333035896959",
    appId: "1:333035896959:web:23384817cb7d1f713bbf4a",
    measurementId: "G-SZHZ1NQWDL"
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