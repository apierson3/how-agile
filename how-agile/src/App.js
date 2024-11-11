import React, { useState } from "react";
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import './App.css';
import Assessments from './Assessments.js';
import Davenport from './Davenport.js';
import CX from './CX.js';


 
function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") === "true");

  return (
    <Router>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth}/>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth}/>}/>
        <Route path="*" element={<Home isAuth={isAuth} />} /> {/* Catch-all route */}
        <Route path="/assessments" element={<Assessments isAuth={isAuth} />} />
        <Route path="/davenport" element={<Davenport isAuth={isAuth} />} />
        <Route path="/cx" element={<CX isAuth={isAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
