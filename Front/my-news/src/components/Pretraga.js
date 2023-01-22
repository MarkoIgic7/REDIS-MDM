import React, {Component, useEffect} from 'react';
import './Navbar.css';
import './Pretraga.css';
import {Link, Navigate} from 'react-router-dom';
import { useState } from "react";
import { useNavigate,useLocation } from 'react-router-dom';

function Pretraga({propkategorije}) {

  function veliko(string){
    return string.charAt(0).toUpperCase()+string.slice(1);
  }

  return (
        <div className='Pretraga'>
           <div className='deo-pretrage'>
                <div className='text'>Tip usluge </div>
                <select name='tipUsluge' className='element' onChange={e => {}}>
                  <option value="nema" selected disabled hidden className='sivo'>Izaberite kategoriju</option>
                  <option value='0'></option>
                  {
                    propkategorije.map((kat) => 
                    <option key={kat.id} value={kat.id}>{veliko(kat.naziv)}</option>)   //da li sme kat.id za value????
                  }
                </select> 
            </div>
        </div>
  )
}

export default Pretraga