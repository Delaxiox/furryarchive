import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as artistsData from '../data/artists'; // Import the functions for artists

function EditArtistForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [artistName, setArtistName] = useState('');
  const [artistURL, setArtistURL] = useState('');
  const [category, setCategory] = useState('');
  const [artistDataAvailable, setArtistDataAvailable] = useState(false); // Add a state to track data availability

  useEffect(() => {
    if (id) {
      artistsData.getArtist(id).then((artist) => {
        if (artist) {
          setArtistName(artist.name || '');
          setArtistURL(artist.url || '');
          setCategory(artist.category || '');
          setArtistDataAvailable(true); // Set data availability to true
        } else {
          setArtistDataAvailable(false); // Set data availability to false
        }
      });
    }
  }, [id]);

  const handleSubmit = () => {
    if (id) {
      artistsData.updateArtist(id, {
        name: artistName,
        url: artistURL,
        category,
      }).then(() => {
        navigate('/');
      });
    }
  }

  const handleDelete = () => {
    if (id) {
      artistsData.deleteArtist(id).then(() => {
        navigate('/');
      });
    }
  }

  return (
    <div id="EditArtistForm">
      <h2>{id ? 'Edit Artist' : 'Add Artist'}</h2>
      {artistDataAvailable ? ( // Render the form only when data is available
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
      ) : (
        <p>Loading artist data...</p> // Display a loading message
      )}
      {id && (
        <button onClick={handleSubmit}>
          {id ? 'Update Artist' : 'Add Artist'}
        </button>
      )}
      {id && (
        <button onClick={handleDelete} className="delete-button">
          Delete Artist
        </button>
      )}
    </div>
  );
}

export default EditArtistForm;
