import React, { useState, useEffect } from 'react';
import { conventionsRef } from './firebase';
import { getDocs, doc, updateDoc, deleteDoc, addDoc, onSnapshot } from 'firebase/firestore';

function App() {
  const [conventionName, setConventionName] = useState('');
  const [conventions, setConventions] = useState([]);
  const [editConvention, setEditConvention] = useState(null);
  const [editedConventionName, setEditedConventionName] = useState('');

  useEffect(() => {
    // Function to fetch and set conventions from Firestore
    const fetchConventions = async () => {
      try {
        const snapshot = await getDocs(conventionsRef);
        const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setConventions(data);
      } catch (error) {
        console.log('Error fetching conventions:', error);
      }
    };

    // Fetch conventions when the component mounts
    fetchConventions();

    // Subscribe to real-time updates from Firestore
    const unsubscribe = onSnapshot(conventionsRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setConventions(data);
    });

    // Cleanup the Firestore listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleEdit = (convention) => {
    setEditConvention(convention);
    setEditedConventionName(convention.name);
  };

  const handleDelete = (convention) => {
    const conventionId = convention.id;
    const conventionRef = doc(conventionsRef, conventionId);

    deleteDoc(conventionRef)
      .then(() => {
        console.log('Convention deleted successfully.');
        setEditConvention(null); // Clear edit mode
      })
      .catch((error) => {
        console.error('Error deleting convention: ', error);
      });
  };

  const handleUpdate = () => {
    if (editConvention) {
      const conventionId = editConvention.id;
      const conventionRef = doc(conventionsRef, conventionId);
      const updatedConventionData = { name: editedConventionName };

      updateDoc(conventionRef, updatedConventionData)
        .then(() => {
          console.log('Convention updated successfully.');
          setEditConvention(null); // Clear edit mode
        })
        .catch((error) => {
          console.error('Error updating convention: ', error);
        });
    }
  };

  const handleSubmit = () => {
    if (conventionName) {
      addDoc(conventionsRef, { name: conventionName })
        .then(() => {
          console.log('Convention added successfully.');
          setConventionName(''); // Clear the input field
        })
        .catch((error) => {
          console.error('Error adding convention: ', error);
        });
    }
  };

  const handleCancelEdit = () => {
    // Clear the editedConventionName to revert any changes
    setEditedConventionName('');
    // Clear the editConvention to exit the edit mode
    setEditConvention(null);
  };

  return (
    <div className="App">
      <h1>Submit a Convention</h1>
      <div>
        <label>Convention Name:</label>
        <input
          type="text"
          value={conventionName}
          onChange={(e) => setConventionName(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>Submit Convention</button>

      <h2>Convention Names:</h2>
      <ul>
        {conventions.map((convention) => (
          <li key={convention.id}>
            {editConvention === convention ? (
              <div>
                <input
                  type="text"
                  value={editedConventionName}
                  onChange={(e) => setEditedConventionName(e.target.value)}
                />
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                {convention.name}
                <button onClick={() => handleEdit(convention)}>Edit</button>
                <button onClick={() => handleDelete(convention)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
