import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as artistsData from '../data/artists'; // Import the functions for artists

function NewArtistForm() {
  const navigate = useNavigate();

  const [artistName, setArtistName] = useState('');
  const [artistURL, setArtistURL] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = () => {
    if (artistName && isURLValid(artistURL) && category) {
      artistsData.addArtist({ name: artistName, url: artistURL, category }).then(() => {
        setArtistName(''); // Clear the input fields
        setArtistURL('');
        setCategory('');
        navigate('/'); // Navigate to the artists list page
      });
    }
  }

  const isURLValid = (url) => {
    // Use your URL validation logic here
    // Example using a simple regex pattern:
    const urlPattern = /^https?:\/\/\S+/;
    return urlPattern.test(url);
  };

  return (
    <div id="NewArtistForm">
      <h2>Submit A New Artist</h2>
      <form>
        <label>Artist Name:</label>
        <input
          type="text"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
        />
        <label>Artist URL:</label>
        <input
          type="text"
          value={artistURL}
          onChange={(e) => setArtistURL(e.target.value)}
        />
        <label>Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          <option value="Digital Artist">Digital Artist</option>
          <option value="Fursuit Maker">Fursuit Maker</option>
          <option value="Hand-made Goods">Hand-made Goods</option>
          <option value="Traditional Artist">Traditional Artist</option>
          <option value="Hybrid Artist">Hybrid Artist</option>
          <option value="Other">Other</option>
        </select>
      </form>
      <button onClick={handleSubmit}>Submit Artist</button>
    </div>
  );
}

export default NewArtistForm;
