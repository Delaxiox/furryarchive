import { database } from './firebaseDatabase';
import { collection, getDocs, getDoc, doc, updateDoc, deleteDoc, addDoc, onSnapshot } from 'firebase/firestore';

const artistsRef = collection(database, 'artists');

export async function fetchArtists() {
  try {
    const snapshot = await getDocs(artistsRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.log('Error fetching artists:', error);
    return [];
  }
}

export function subscribeToArtists(callback) {
  return onSnapshot(artistsRef, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });
}

export async function addArtist(artistData) {
  try {
    await addDoc(artistsRef, artistData);
    console.log('Artist added successfully.');
  } catch (error) {
    console.error('Error adding artist: ', error);
  }
}

export async function updateArtist(artistId, updatedArtistData) {
  try {
    const artistRef = doc(artistsRef, artistId);
    await updateDoc(artistRef, updatedArtistData);
    console.log('Artist updated successfully.');
  } catch (error) {
    console.error('Error updating artist: ', error);
  }
}

export async function deleteArtist(artistId) {
  try {
    const artistRef = doc(artistsRef, artistId);
    await deleteDoc(artistRef);
    console.log('Artist deleted successfully.');
  } catch (error) {
    console.error('Error deleting artist: ', error);
  }
}

export const getArtist = async (id) => {
  const artistDoc = doc(artistsRef, id);
  try {
    const docSnapshot = await getDoc(artistDoc);
    if (docSnapshot.exists()) {
      return { id: docSnapshot.id, ...docSnapshot.data() };
    }
    return null; // Artist not found
  } catch (error) {
    console.error('Error fetching artist:', error);
    return null; // Error occurred
  };
};
