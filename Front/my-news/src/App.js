import './App.css';
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Pocetna from './components/Pocetna';
import Navbar from './components/Navbar';
import Vest from './components/Vest';


function App() {

  return (
    <Router>
    <div className="App">
     <Navbar/>
     <Routes>
       <Route exact path='/Pocetna' element={ <Pocetna />}></Route>
       <Route path="/" element={<Navigate replace to="/Pocetna" />}></Route> 
       <Route exact path='/:id' element={<Vest />} />  
     </Routes>
    </div>
    </Router>

  );
}

export default App;
