import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddConvention from './pages/AddConvention';
import EditConvention from './pages/EditConvention';
import AddArtist from './pages/AddArtist';
import EditArtist from './pages/EditArtist';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/conventions/add" element={<AddConvention/>} />
          <Route path="/conventions/edit/:id" element={<EditConvention/>} />
          <Route path="/artists/add" element={<AddArtist/>} />
          <Route path="/artists/edit/:id" element={<EditArtist/>} />
      </Routes>
    </Router>
  );
}

export default App;
