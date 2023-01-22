import React, {Component, useEffect} from 'react';
import './KarticaKomentar.css';
import {Link, Navigate} from 'react-router-dom';
import { useState } from "react";
import { useNavigate,useLocation } from 'react-router-dom';

function KarticaKomentar({propkomentar}) {
  
  return (
        <div className='KartKomentar'>
          <div className="UsernameKomentar">{propkomentar.korisnikId}</div>
          <div className="TekstKomentar">{propkomentar.tekst}</div>
          {/*<div className="Like"><i className="fa fa-thumbs-up" aria-hidden="true"></i></div>*/}
        </div>
  )
}

export default KarticaKomentar