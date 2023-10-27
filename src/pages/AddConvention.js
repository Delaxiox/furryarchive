import React from 'react';
import { Link } from 'react-router-dom';
import NewConventionForm from '../components/NewConventionForm';
import Header from '../components/Header';

function AddConvention() {


return (
<div className="page-container">
    <Header />
    <div className="page-content">
        <NewConventionForm />
        <Link to="/" className='paddingtop-32'>Back to List</Link>
    </div>
</div>
);
}

export default AddConvention;