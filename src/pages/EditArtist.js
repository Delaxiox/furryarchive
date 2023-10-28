import React from 'react';
import { Link } from 'react-router-dom';
import EditArtistForm from '../components/EditArtistForm'; // Import the EditArtistForm component
import Header from '../components/Header';

function EditArtistPage() {
  return (
    <div className="page-container">
      <Header />
      <div className="page-content">
        <EditArtistForm /> {/* Use the EditArtistForm component for editing and deleting artists */}
        <Link to="/" className='paddingtop-32'>Back to List</Link> {/* Update the link to go back to the artists list */}
      </div>
    </div>
  );
}

export default EditArtistPage;
