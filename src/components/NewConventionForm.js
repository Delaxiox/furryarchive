import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import * as conventionsData from '../data/conventions'; // Import the functions from the new module

function NewConventionForm() {
const navigate = useNavigate();

const [conventionName, setConventionName] = useState('');

const handleSubmit = () => {
  if (conventionName) {
      conventionsData.addConvention(conventionName).then(() => {
        setConventionName(''); // Clear the input field
        navigate('/');
      });
  }
  }

return (
  <div id="NewConventionForm">
    <h2>Submit A New Convention</h2>
    <form>
      <label>Convention Name:</label>
      <input
        type="text"
        value={conventionName}
        onChange={(e) => setConventionName(e.target.value)}
      />
    </form>
    <button onClick={handleSubmit}>Submit Convention</button>
  </div>
);
}

export default NewConventionForm;