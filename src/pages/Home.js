import React from 'react';
import { Link } from 'react-router-dom';
import ConventionsList from '../components/ConventionsList';
import ArtistsList from '../components/ArtistsList';
import Header from '../components/Header';

function Home() {


return (
<div className="page-container">
    <Header />
    <div className="page-content">
        <ConventionsList />
        <Link to="/conventions/add" className='paddingtop-32'>Add New Convention</Link>
        <br/><br/>
        <ArtistsList />
        <Link to="/artists/add" className='paddingtop-32'>Add New Artist</Link>
    </div>
</div>
);
}

export default Home;