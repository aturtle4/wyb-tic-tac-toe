import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Setting from './Components/Settings/Setting';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Landing />} />
        <Route path="/settings" element={<Setting />} />
      </Routes>
    </Router>
  );
}

export default App;