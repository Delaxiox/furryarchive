import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as conventionsData from '../data/conventions';

function ConventionsList() {
  const [conventions, setConventions] = useState([]);

  useEffect(() => {
    // Fetch conventions when the component mounts
    conventionsData.fetchConventions().then((data) => {
      // Sort the conventions by name in alphabetical order
      const sortedConventions = data.slice().sort((a, b) => a.name.localeCompare(b.name));
      setConventions(sortedConventions);
    });

    // Subscribe to real-time updates from Firestore
    const unsubscribe = conventionsData.subscribeToConventions((data) => {
      // Sort the conventions by name in alphabetical order
      const sortedConventions = data.slice().sort((a, b) => a.name.localeCompare(b.name));
      setConventions(sortedConventions);
    });

    // Cleanup the Firestore listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div id="ConventionsList">
      <h2>Current Conventions:</h2>
      <ul>
        {conventions.map((convention) => (
          <li key={convention.id}>
            <div>
              <Link to={`/edit/${convention.id}`}>{convention.name}</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConventionsList;
