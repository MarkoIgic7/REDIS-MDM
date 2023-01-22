import React, {Component, useEffect} from 'react';
import './Navbar.css';
import {Link, Navigate} from 'react-router-dom';
import { useState } from "react";
import { useNavigate,useLocation } from 'react-router-dom';
import { Login } from './Login';
import { Register } from './Register';
import { useUserContext } from '../context/UserContext';
import { DodajKategoriju } from './DodajKategoriju';
import { DodajVest } from './DodajVest';
import { FaBell} from "react-icons/fa";

function Navbar() {

    const navigate = useNavigate();
    const {logOut}=useUserContext();
    const [state, setState] = useState({clicked:false});
    const {uloga,jePosetilac,loading}=useUserContext();
    const {email}=useUserContext();
    const location=useLocation();

  return (
    <nav className='NavbarStyle'>
          
            <div className='Naslov'>My News</div>
            <label className="labelaUsername1" onClick={() => {navigate("/Pocetna");}}>Pocetna</label>
            { !jePosetilac ? (  
                <>
                <label className="labelaUsername">{email}</label>
                <button className="odjaviSe" onClick={() => {
                    logOut();
                    //window.localStorage.removeItem("jwToken");
                    navigate("/Pocetna");
                    window.location.reload(false);
                    
                  }}
                >
                  Odjavi se
                </button>
                </>
              ) : (
                <div className='dugmiciPrijava'>
                  <Login>Prijava</Login>
                  <Register>Registracija</Register>
                </div>
              )}
        </nav>
  )
}

export default Navbar