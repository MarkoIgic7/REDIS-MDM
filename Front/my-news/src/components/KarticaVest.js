import React, {Component, useEffect} from 'react';
import './Navbar.css';
import './KarticaVest.css';
import {Link, Navigate} from 'react-router-dom';
import { useState } from "react";
import { useNavigate,useLocation } from 'react-router-dom';

function KarticaVest({propvest, onDelete}) {

  function formatDate(value) {
    let date = new Date(value);
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: '2-digit' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    const hour = date.toLocaleString('default', { hour: '2-digit' });
    const minute = date.toLocaleString('default', { minute: '2-digit' });
    return day + '-' + month + '-' + year + ' ' + hour + ':' + minute;
  }
    
 const navigate = useNavigate();
 const goTo = () => {
     navigate(`/${propvest.id}`);
}

function brisanjeVesti(idVesti){
  onDelete(idVesti)
  }
  
  return (
        <div className='KarticaVest'>
          <div className="VremeiDatum"> {formatDate(propvest.datum)}</div>
          {
            localStorage.getItem("user")=="admin@gmail.com" ?
            (
              <div className='obrisiVestAdmin'><button className='obrisiVestAdminDugme' onClick={()=>{brisanjeVesti(propvest.id)}}>Obrisi vest</button></div>
            ) : (<></>)
          }
          
          <div className="NaslovVest">{propvest.naslov}</div>
          <div className="TekstVest">{propvest.kratakTekst}</div>
          <div className="dugmeStrelica" onClick={goTo}>Detaljnije</div>
        </div>
  )
}

export default KarticaVest