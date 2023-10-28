import React from 'react';
import { Link } from 'react-router-dom';
import NewArtistForm from '../components/NewArtistForm'; // Import the NewArtistForm component
import Header from '../components/Header';

function AddArtist() {
  return (
    <div className="page-container">
      <Header />
      <div className="page-content">
        <NewArtistForm /> {/* Use the NewArtistForm component for adding artists */}
        <Link to="/" className='paddingtop-32'>Back to List</Link> {/* Update the link to go back to the artists list */}
      </div>
    </div>
  );
}

export default AddArtist;
