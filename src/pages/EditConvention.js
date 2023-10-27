import React from 'react';
import { Link } from 'react-router-dom';
import EditConventionForm from '../components/EditConventionForm';
import Header from '../components/Header';

function AddConvention() {


return (
<div className="page-container">
    <Header />
    <div className="page-content">
        <EditConventionForm />
        <Link to="/" className='paddingtop-32'>Back to List</Link>
    </div>
</div>
);
}

export default AddConvention;