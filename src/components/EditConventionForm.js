import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as conventionsData from '../data/conventions';

function EditConventionForm() {
const { id } = useParams();
const navigate = useNavigate();

const [conventionName, setConventionName] = useState('');

useEffect(() => {
  if (id) {
    conventionsData.getConvention(id).then((convention) => {
      if (convention) {
        setConventionName(convention.name);
      }
    });
  }
}, [id]);

const handleSubmit = () => {
  if (id) {
    conventionsData.updateConvention(id, { name: conventionName }).then(() => {
      navigate('/');
    });
  }
}

const handleDelete = () => {
  if (id) {
    conventionsData.deleteConvention(id).then(() => {
      navigate('/');
    });
  }
}

return (
  <div id="EditConventionForm">
    <h2>{id && 'Edit Convention'}</h2>
    <form>
      <label>Convention Name:</label>
      <input
        type="text"
        value={conventionName}
        onChange={(e) => setConventionName(e.target.value)}
      />
    </form>
    <button onClick={handleSubmit}>
      {id && 'Update Convention'}
    </button>
    {id && (
      <button onClick={handleDelete} className="delete-button">
        Delete Convention
      </button>
    )}
  </div>
);
}

export default EditConventionForm;