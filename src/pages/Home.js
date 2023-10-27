import React from 'react';
import { Link } from 'react-router-dom';
import ConventionsList from '../components/ConventionsList';
import Header from '../components/Header';

function Home() {


return (
<div className="page-container">
    <Header />
    <div className="page-content">
        <ConventionsList />
        <Link to="/add" className='paddingtop-32'>Add New Convention</Link>
    </div>
</div>
);
}

export default Home;