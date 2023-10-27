import {database} from './firebaseDatabase'
import { collection, getDocs, getDoc, doc, updateDoc, deleteDoc, addDoc, onSnapshot } from 'firebase/firestore';

const conventionsRef = collection(database, 'conventions');

export async function fetchConventions() {
    try {
      const snapshot = await getDocs(conventionsRef);
      return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (error) {
      console.log('Error fetching conventions:', error);
      return [];
    }
  }
  
  export function subscribeToConventions(callback) {
    return onSnapshot(conventionsRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      callback(data);
    });
  }
  
  export async function addConvention(conventionName) {
    try {
      await addDoc(conventionsRef, { name: conventionName });
      console.log('Convention added successfully.');
    } catch (error) {
      console.error('Error adding convention: ', error);
    }
  }
  
  export async function updateConvention(conventionId, updatedConventionData) {
    try {
      const conventionRef = doc(conventionsRef, conventionId);
      await updateDoc(conventionRef, updatedConventionData);
      console.log('Convention updated successfully.');
    } catch (error) {
      console.error('Error updating convention: ', error);
    }
  }
  
  export async function deleteConvention(conventionId) {
    try {
      const conventionRef = doc(conventionsRef, conventionId);
      await deleteDoc(conventionRef);
      console.log('Convention deleted successfully.');
    } catch (error) {
      console.error('Error deleting convention: ', error);
    }
  }

  export const getConvention = async (id) => {
    const conventionDoc = doc(conventionsRef, id);
    try {
      const docSnapshot = await getDoc(conventionDoc);
      if (docSnapshot.exists()) {
        return { id: docSnapshot.id, ...docSnapshot.data() };
      }
      return null; // Convention not found
    } catch (error) {
      console.error('Error fetching convention:', error);
      return null; // Error occurred
    }
  };