import React, {Component, useEffect} from 'react';
import ReactDOM from "react-dom";
import {Link, Navigate, useParams} from 'react-router-dom';
import { useState } from "react";
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import './KarticaVest.css';
import './Vest.css';
import KarticaKomentar from './KarticaKomentar.js';
import { useUserContext } from '../context/UserContext';
import { HubConnectionBuilder } from '@microsoft/signalr';

function Vest() {
    
  let {id} = useParams();
  const [vest,setVest]=useState([]);
  const[komentari,setKomentari]=useState([])
  const[komentar,setKomentar]=useState("")
  const {email, uloga}=useUserContext();
  const {connection}=useUserContext();
  const kom=[{id:"komentar:6152437158", username:"neko1", tekst: "Super vest"},
  {id:"komentar:61521117158", username:"neko2", tekst: "Dosadna vest"},
  {id:"komentar:6152437158", username:"neko3", tekst: "Glupostttttttttttttttt"},
  {id:"komentar:61524345658", username:"neko4", tekst: "Bla bla blalanlajlwlqw"}]

  const dodajKomentar=()=>{

    if(localStorage.getItem("user"))
    {
      var user=localStorage.getItem("user")
      axios.post(`https://localhost:7107/Komentar/AddComment/${id}/${komentar}/${user}`)
      .then(res=>{
        alert("Dodat komentar!");
        setKomentari([...komentari,res.data])
      })
      .catch(err=>{
        console.log(err)
      })
    }
    else{
      alert("Niste ulogovani!");
    }

  }

  const addToGroup =(idKategorije)=>{
    if(connection)
    {
          console.log("Marko");
          connection.invoke('JoinGroup',idKategorije.toString());
          console.log("Uso u addToGroup!");
       
    }
    
  }

  const pretplatiSe=()=>{

    var user=localStorage.getItem("user")
    axios.get(`https://localhost:7107/PubSub/Subcribe/${vest.kategorijaId}/${user}`)
    .then(res=>{
      alert("Uspesno ste se pretplatili na kategoriju " + vest.kategorija);
      console.log(vest.kategorijaId)
      addToGroup(vest.kategorijaId)  
    })
    .catch(err=>{
      console.log(err)
    })

  }


  function formatDate(value) {
    let date = new Date(value);
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: '2-digit' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    const hour = date.toLocaleString('default', { hour: '2-digit' });
    const minute = date.toLocaleString('default', { minute: '2-digit' });
    return day + '-' + month + '-' + year + ' ' + hour + ':' + minute;
  }

  useEffect(()=> {

    axios.put(`https://localhost:7107/Vest/UpdateScore/${id}`)
    .then(res=>{
    })
    .catch(err=>{
      console.log(err)
    })
  }, [])


  useEffect(()=> {
    console.log(id)

    const ucitaj=async()=>{
        try{
      const res= await axios.get(`https://localhost:7107/Vest/VestSaKomentarima/${id}`);
      const data = await res.data;
        setVest(data);
        
      }
    catch (error) {
      console.log("error", error);
    }
  }
  
  ucitaj();

  }, [])


  useEffect(()=> { 
    const ucitaj1=async()=>{
      try{
      const result= await axios.get(`https://localhost:7107/Vest/SviKomentariVesti/${vest.id}`);  
      const data1 = await result.data;
      setKomentari(data1);
      console.log(vest)
      console.log(komentari)
    }
    catch(error){
    }
  }
    ucitaj1();
    },[vest])

 
  return (
    <>
    <div className='VestStrana'>
        <div className='NasloviTekst'>
          <div className="VremeiDatum"> {formatDate(vest.datum)}</div>
          <div className="VestNaslov">{vest.naslov}</div>
          <div className="VestTekst">{vest.duziTekst}</div>
        </div>
        <div className='SlikaiKomentari'>
         {/*<img className='slikaVest' src={vest.slika} alt="new"/> */}
         <div className='Komentari'>
          <div className='NaslovKomentari'>Komentari</div>
          <ul>
            {
                komentari.map((el) => 
                <div className='KomentarDiv'>
                    <KarticaKomentar key={el.id} propkomentar={el}></KarticaKomentar>
                </div>
    
                )
            }
        </ul>
        <div className="Forma">
        <textarea className="inputKomentar" type="text" placeholder='Unesite tekst'  onChange={(e)=>setKomentar(e.target.value)}></textarea>
        <div className="dugmeDodajKom"><button className='DugmeDodajK' onClick={dodajKomentar}>Dodaj komentar</button></div>
        </div>
           
         </div>
        </div>
        {uloga=="Korisnik"? (
           <button className='dugmePretplata'  onClick={pretplatiSe}>Pretplati se na kategoriju {vest.kategorija}</button>
        ) : (<></>)}
        </div>
    </>
      
  )
}

export default Vest