import React from 'react';
import './Pocetna.css';
import { Navigate, useNavigate } from 'react-router-dom';
import './KarticaVest.css';
import './Pretraga.css';
import KarticaVest from './KarticaVest.js';
import Pretraga from './Pretraga.js';
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import './Pretraga.css';
import { useUserContext } from '../context/UserContext';
import { DodajKategoriju } from './DodajKategoriju';
import { DodajVest } from './DodajVest';
import { HubConnectionBuilder } from '@microsoft/signalr';

function Pocetna() {

  const[vesti,setVesti]=useState([])
  const[kategorije,setKategorije]=useState([])
  const[pretplate,setPretplate]=useState([]) 
  const[procitano,setProcitano]=useState(true)  
  const[kategorija,setKategorija]=useState("nema")
  const[otvoreno,setOtvoreno]=useState(false)
  const {logOut,uloga}=useUserContext();

  const {connection} = useUserContext();
  const latestChat = useRef(null);

  latestChat.current = pretplate;
  
  /*if (connection!=null) {
    connection.on("SendMessageToAll", (id,naslov,kratakTekst,duziTekst,slika,datum,kategorijaId) => {   //promeni prop
      const prop=
      {
        id,
        naslov,
        kratakTekst,
        duziTekst,
        slika,
        datum,
        kategorijaId   
      };
     
     //setProcitano(false);

      const updatedChat = [...latestChat.current];
      updatedChat.unshift(prop);
      setPretplate(updatedChat);

      // if(otvoreno)
      // {
        
      //     var user=localStorage.getItem("user")
      //     axios.put(`https://localhost:7107/Korisnik/ChangeStatus/${user}`)
      //     .then(res=>{
      //       console.log("1")   
      //       setProcitano(true)
      //     })
      //     .catch(err=>{
      //       console.log(err)
      //     })
      //     setVesti(updatedChat)
    

      // }
      // else{
       if(!otvoreno)
       {
        console.log("yyyyyyy")
        setProcitano(false)
        console.log(procitano);
       }
      
        //setOtvoreno(false)
        // var user=localStorage.getItem("user")
        // axios.put(`https://localhost:7107/Korisnik/GetStatusKorisnika/${user}`)
        // .then(res=>{
        //   setProcitano(false)
        //   console.log(procitano)
        // })
        // .catch(err=>{
        //   console.log(err)
        // })

   // }

     // if(otvoreno) -> setstatus da je procitano + setVesti(pretplate), else -> da se doda funkcija get status (ocekuje se false jer se na backu valjda uvek postavlja status na false kad se doda neka vest u kategoriju odnosno kad se uradi publish? i da se postavi const procitano na tu vrednost())
      // do sad smo taj get status imali kroz getSubscriptions ali sad nema potrebe ovde za tim jer setPretplate vec imamo, i isto mislim da u useEffectu nema potrebe za getSubscriptions, vec je dovoljan getStatus a getSubscriptions ide klikom na dugme za Pretplate
      
    })
    
 
}*/

useEffect(()=> {

  if (connection!=null) {
    connection.on("SendMessageToAll", (id,naslov,kratakTekst,duziTekst,slika,datum,kategorijaId) => {   //promeni prop
      const prop=
      {
        id,
        naslov,
        kratakTekst,
        duziTekst,
        slika,
        datum,
        kategorijaId   
      };
     
     //setProcitano(false);

      const updatedChat = [...latestChat.current];
      updatedChat.unshift(prop);
      setPretplate(updatedChat);

      // if(otvoreno)
      // {
        
      //     var user=localStorage.getItem("user")
      //     axios.put(`https://localhost:7107/Korisnik/ChangeStatus/${user}`)
      //     .then(res=>{
      //       console.log("1")   
      //       setProcitano(true)
      //     })
      //     .catch(err=>{
      //       console.log(err)
      //     })
      //     setVesti(updatedChat)
    

      // }
      // else{
       if(!otvoreno)
       {
        console.log("yyyyyyy")
        setProcitano(false)
        console.log(procitano);
       }  //ostavi samo do ovde
       else{
             var user=localStorage.getItem("user")
          axios.put(`https://localhost:7107/Korisnik/ChangeStatus/${user}`)
          .then(res=>{
            console.log("1")   
            setProcitano(true)
          })
          .catch(err=>{
            console.log(err)
          })
          setVesti(updatedChat)
       }
      
        //setOtvoreno(false)
        // var user=localStorage.getItem("user")
        // axios.put(`https://localhost:7107/Korisnik/GetStatusKorisnika/${user}`)
        // .then(res=>{
        //   setProcitano(false)
        //   console.log(procitano)
        // })
        // .catch(err=>{
        //   console.log(err)
        // })

   // }

     // if(otvoreno) -> setstatus da je procitano + setVesti(pretplate), else -> da se doda funkcija get status (ocekuje se false jer se na backu valjda uvek postavlja status na false kad se doda neka vest u kategoriju odnosno kad se uradi publish? i da se postavi const procitano na tu vrednost())
      // do sad smo taj get status imali kroz getSubscriptions ali sad nema potrebe ovde za tim jer setPretplate vec imamo, i isto mislim da u useEffectu nema potrebe za getSubscriptions, vec je dovoljan getStatus a getSubscriptions ide klikom na dugme za Pretplate
      
    })
    
 
}


  
  
}, [connection])



  const navigate = useNavigate();
  
  useEffect(()=> {

    axios.get('https://localhost:7107/Vest/getSveVesti')
    .then(res=>{
      setVesti(res.data)
    })
    .catch(err=>{
      console.log(err)
    })


    axios.get('https://localhost:7107/Kategorija/getKategorije')    
    .then(res=>{
      setKategorije(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
    
  }, [])



  useEffect(()=> {

    if(uloga=="Korisnik")    
    { 
      var user=localStorage.getItem("user")
      axios.get(`https://localhost:7107/PubSub/GetSubscriptions/${user}`)    
    .then(res=>{
      setPretplate(res.data.vesti)  //proveri
     // setVesti(res.data.vesti)
      console.log("uloga use effect")
      setProcitano(res.data.status)
    })
    .catch(err=>{
      console.log(err)
    })}

    
  }, [uloga])

  function veliko(string){
    return string.charAt(0).toUpperCase()+string.slice(1);
  }

  function pretrazi()
  {
    console.log(kategorija)
    if(kategorija!="nema")
    {
      console.log("IMA")
      axios.get(`https://localhost:7107/Vest/getSveVestiOdredjeneKategorije/${kategorija}`)
      .then(res=>{
        setVesti(res.data)
        console.log(vesti)
      })
      .catch(err=>{
        console.log(err)
      })
    }
    else{
      console.log("NEMA")
      axios.get('https://localhost:7107/Vest/getSveVesti')
      .then(res=>{
        setVesti(res.data)
        console.log(vesti);
      })
      .catch(err=>{
        console.log(err)
      })

    }

    setOtvoreno(false)
    console.log("Status otvoreno:" + otvoreno)

  }

  function pretraziPopularne()
  {
    console.log(kategorija)
      axios.get("https://localhost:7107/Vest/GetPopularneVesti")
      .then(res=>{
        setVesti(res.data)
        console.log(vesti)
      })
      .catch(err=>{
        console.log(err)
      })

    setOtvoreno(false)
    console.log("Status otvoreno:" + otvoreno)


  }
  //U USEEFFECT TREBA FETCH ZA GETSUBSCRIPTIONS I TU POSTAVLJAM I STATUS INICIJALNO NA TRUE ILI FALSE ZAVISNO STA VRATI
  const setStatus=()=>  //FJA KOJA POSTAVLJA STATUS PROCITANO NA TRUE
  {
      var user=localStorage.getItem("user")
      axios.put(`https://localhost:7107/Korisnik/ChangeStatus/${user}`)
      .then(res=>{
        setProcitano(true)
        setOtvoreno(true)
      })
      .catch(err=>{
        console.log(err)
      })


      var user=localStorage.getItem("user")
      axios.get(`https://localhost:7107/PubSub/GetSubscriptions/${user}`)    
    .then(res=>{
      setPretplate(res.data.vesti)  
      setVesti(res.data.vesti)
      //setProcitano(res.data.status)
    })
    .catch(err=>{
      console.log(err)
    })
    console.log("Uso u funkciju gde se otvoreno postavlja na true!!!!!!!!!!!!!!!!!")
    

  }

  const brisanjeVesti=async(idVest)=>{
    console.log(idVest);
    axios.delete(`https://localhost:7107/Vest/DeleteVest/${idVest}`)   
        .then((res) => {
            setVesti(vesti.filter((vest)=>vest.id!==idVest));
            alert("Uspesno ste obrisali vest");
        })
        .catch(err =>{
          if(err.response.status==401 || err.response.status==403)
          {   
              logOut();          
          }
        }) 
  }

  const dodajVest=async()=>{
    axios.get('https://localhost:7107/Vest/getSveVesti')
    .then(res=>{
      setVesti(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const dodajKategoriju=async()=>{
    axios.get('https://localhost:7107/Kategorija/getKategorije')    
    .then(res=>{
      setKategorije(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  return (
    <div className='Pocetna'>
       {
            uloga=="Admin" ?
            (
              <div className='AdminOpcije'>
                <DodajKategoriju onAdd={dodajKategoriju}>Dodaj kategoriju</DodajKategoriju>
                <DodajVest onAdd={dodajVest}>Dodaj vest</DodajVest>
              </div>
            ): (<></>)
          }
        <div className='PretragaDiv'>
          <>
          <div className='Pretraga'>
           <div className='deo-pretrage'>
                <div className='text'>Kategorija: </div>
                <select name='Kategorija' className='KategorijaSelect' onChange={e => setKategorija(e.target.value)}>
                  <option value="nema" selected disabled hidden className='sivo'>Izaberite kategoriju</option>
                  <option value="nema">Sve</option>
                  {
                    kategorije.map((kat) => 
                    <option key={kat.id} value={kat.id}>{veliko(kat.naziv)}</option>)   //da li sme kat.id za value????
                  }
                </select> 
                <button className="dugmePretrazi" onClick={()=>{pretrazi()}}>Pretrazi</button>
                <button className="dugmeNaj" onClick={()=>{pretrazi()}}>Najnovije</button>
                <button className="dugmeNaj" onClick={()=>{pretraziPopularne()}}>Najpopularnije</button>
                {uloga=="Korisnik" ? (
                  <button className="dugmeNaj" onClick={setStatus}>Pretplate
                  {
                      !procitano &&
                      <div className="icon-button__badge">!</div>
                  }</button>
                ): (<></>)}
            </div>
        </div>
          </>
        </div>
        <ul>
            {
                vesti.map((el) => 
                <div className='VestDiv'>
                    <KarticaVest key={el.naslov} propvest={el}  onDelete={brisanjeVesti}></KarticaVest>
                </div>
    
                )
            }
        </ul>
      
    </div>
  );
}

export default Pocetna;