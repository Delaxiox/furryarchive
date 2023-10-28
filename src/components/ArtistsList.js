import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as artistsData from '../data/artists'; // Import functions for artists

function ArtistsList() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    // Fetch artists when the component mounts
    artistsData.fetchArtists().then((data) => {
      // Sort the artists by name in alphabetical order
      const sortedArtists = data.slice().sort((a, b) => a.name.localeCompare(b.name));
      setArtists(sortedArtists);
    });

    // Subscribe to real-time updates from Firestore for artists
    const unsubscribe = artistsData.subscribeToArtists((data) => {
      // Sort the artists by name in alphabetical order
      const sortedArtists = data.slice().sort((a, b) => a.name.localeCompare(b.name));
      setArtists(sortedArtists);
    });

    // Cleanup the Firestore listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div id="ArtistsList">
      <h2>Current Artists:</h2>
      <ul>
        {artists.map((artist) => (
            <Link to={`artists/edit/${artist.id}`}>
          <li key={artist.id}>
            <div>
              <h3>
                {artist.name}
              </h3>
              <p>Artist URL: {artist.url}</p>
              <p>Category: {artist.category}</p>
            </div>
          </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default ArtistsList;
