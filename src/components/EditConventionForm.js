import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as conventionsData from '../data/conventions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function EditConventionForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [conventionName, setConventionName] = useState('');
  const [conventionURL, setConventionURL] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedState, setSelectedState] = useState('');
  const [conventionDataAvailable, setConventionDataAvailable] = useState(false); // Add a state to track data availability

  useEffect(() => {
    if (id) {
      conventionsData.getConvention(id).then((convention) => {
        if (convention) {
          setConventionName(convention.name || '');
          setConventionURL(convention.url || '');
          setStartDate(convention.startDate?.toDate() || null);
          setEndDate(convention.endDate?.toDate() || null);
          setSelectedState(convention.state || '');
          setConventionDataAvailable(true);
        } else {
          setConventionDataAvailable(false);
        }
      });
    }
  }, [id]);

  const handleSubmit = () => {
    if (id && conventionDataAvailable) {
      conventionsData.updateConvention(id, {
        name: conventionName,
        url: conventionURL,
        startDate: startDate,
        endDate: endDate,
        state: selectedState,
      }).then(() => {
        navigate('/');
      });
    }
  }

  const handleDelete = () => {
    if (id && conventionDataAvailable) {
      conventionsData.deleteConvention(id).then(() => {
        navigate('/');
      });
    }
  }

  const handleStartDateChange = (date) => {
    setStartDate(date);
  }

  const handleEndDateChange = (date) => {
    setEndDate(date);
  }

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  }

  return (
    <div id="EditConventionForm">
      <h2>{id ? 'Edit Convention' : 'Add Convention'}</h2>
      {conventionDataAvailable ? ( // Render the form only when data is available
        <form>
          <label>Convention Name:</label>
          <input
            type="text"
            value={conventionName}
            onChange={(e) => setConventionName(e.target.value)}
          />
          <label>Convention URL:</label>
          <input
            type="url"
            value={conventionURL}
            onChange={(e) => setConventionURL(e.target.value)}
          />
          <label>Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
          />
          <label>End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
          />
          <label>State:</label>
          <select
            value={selectedState}
            onChange={handleStateChange}
          >
            <option value="">Select a state</option>
            <option value="Alabama">Alabama</option>
          <option value="Alaska">Alaska</option>
          <option value="Arizona">Arizona</option>
          <option value="Arkansas">Arkansas</option>
          <option value="California">California</option>
          <option value="Colorado">Colorado</option>
          <option value="Connecticut">Connecticut</option>
          <option value="Delaware">Delaware</option>
          <option value="Florida">Florida</option>
          <option value="Georgia">Georgia</option>
          <option value="Hawaii">Hawaii</option>
          <option value="Idaho">Idaho</option>
          <option value="Illinois">Illinois</option>
          <option value="Indiana">Indiana</option>
          <option value="Iowa">Iowa</option>
          <option value="Kansas">Kansas</option>
          <option value="Kentucky">Kentucky</option>
          <option value="Louisiana">Louisiana</option>
          <option value="Maine">Maine</option>
          <option value="Maryland">Maryland</option>
          <option value="Massachusetts">Massachusetts</option>
          <option value="Michigan">Michigan</option>
          <option value="Minnesota">Minnesota</option>
          <option value="Mississippi">Mississippi</option>
          <option value="Missouri">Missouri</option>
          <option value="Montana">Montana</option>
          <option value="Nebraska">Nebraska</option>
          <option value="Nevada">Nevada</option>
          <option value="New Hampshire">New Hampshire</option>
          <option value="New Jersey">New Jersey</option>
          <option value="New Mexico">New Mexico</option>
          <option value="New York">New York</option>
          <option value="North Carolina">North Carolina</option>
          <option value="North Dakota">North Dakota</option>
          <option value="Ohio">Ohio</option>
          <option value="Oklahoma">Oklahoma</option>
          <option value="Oregon">Oregon</option>
          <option value="Pennsylvania">Pennsylvania</option>
          <option value="Rhode Island">Rhode Island</option>
          <option value="South Carolina">South Carolina</option>
          <option value="South Dakota">South Dakota</option>
          <option value="Tennessee">Tennessee</option>
          <option value="Texas">Texas</option>
          <option value="Utah">Utah</option>
          <option value="Vermont">Vermont</option>
          <option value="Virginia">Virginia</option>
          <option value="Washington">Washington</option>
          <option value="West Virginia">West Virginia</option>
          <option value="Wisconsin">Wisconsin</option>
          <option value="Wyoming">Wyoming</option>
          </select>
        </form>
      ) : (
        <p>Loading convention data...</p> // Display a loading message
      )}
      {id && (
        <button onClick={handleSubmit}>
          {id ? 'Update Convention' : 'Add Convention'}
        </button>
      )}
      {id && (
        <button onClick={handleDelete} className="delete-button">
          Delete Convention
        </button>
      )}
    </div>
  );
}

export default EditConventionForm;