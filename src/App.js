import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddConvention from './pages/AddConvention';
import EditConvention from './pages/EditConvention';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/add" element={<AddConvention/>} />
          <Route path="/edit/:id" element={<EditConvention/>} />
      </Routes>
    </Router>
  );
}

export default App;
