import React, { useEffect } from 'react';
import { useState } from 'react';
import './Button.css';
import './LoginForm.css';
import {useNavigate} from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import axios from 'axios';


const STYLES = [
  'btnn--primary',
  'btnn--outline'
]
const SIZES = [
  'btnn--medium',
  'btnn--large'
]
export const DodajVest = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  onAdd
}) => {
    const [forma, setForma] = useState(false);
    const [naslov,setNaslov]=useState("");
    const [kategorije,setKategorije]=useState([]);
    const [kategorija,setKategorija]=useState("");
    const [kratakTekst,setKratakTekst]=useState("");
    const [duziTekst,setDuziTekst]=useState("");
    //const [slika,setSlika]=useState("");
    const navigate=useNavigate();

  const toggleForma = () => {
    setForma(!forma);

    axios.get('https://localhost:7107/Kategorija/getKategorije')    
    .then(res=>{
      setKategorije(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
  };

  function veliko(string){
    return string.charAt(0).toUpperCase()+string.slice(1);
  }

  useEffect(()=> {
    axios.get('https://localhost:7107/Kategorija/getKategorije')    
    .then(res=>{
      setKategorije(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
  }, [])

  const dodajVest = () => {
    console.log(kategorija)
    
    naslov!=="" && kategorija!=="" && kategorija!=="nema" && kratakTekst!=="" && duziTekst!=="" ? (
      axios.post(`https://localhost:7107/Vest/CreateVest/${naslov}/${kratakTekst}/${duziTekst}/${kategorija}`)    //promeni fetch za ovo
      .then((response)=>{
        setForma(!forma);
        alert("Uspesno ste dodali vest!")
        navigate("/Pocetna")
        onAdd()
        
      })
      .catch(err=>{
        alert(err.response.data)
      })
      ) : alert("Niste popunili sva polja!")
  }

  if(forma) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  

  const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

  return(
      <>
    <button className={`btnn ${checkButtonStyle} ${checkButtonSize}`} onClick={toggleForma}
    type={type}>
      {children}
    </button>
     {forma && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="login_modal-content">
            
          <i className="fa-solid fa-x close-modal " onClick={toggleForma}></i>

          <br/>
          <div className='labDodajKategoriju'>Dodaj vest</div>

          <div className='dodaj_red'>
              <label className='login_labelaForma'>Kategorija vesti:</label>
              <select name='Kategorija' className='KategorijaSelect2' onChange={e => setKategorija(e.target.value)}>
                  <option value="nema" selected disabled hidden className='sivo'>Izaberite kategoriju</option>
                  {
                    kategorije.map((kat) => 
                    <option key={kat.id} value={kat.id}>{veliko(kat.naziv)}</option>)  
                  }
                </select> 
          </div>
          <div className='dodaj_red'>
            <label className='login_labelaForma'>Naslov:</label>
            <input className='login_inputTekst' type='text' placeholder='Unesite naslov' onChange={(e)=>setNaslov(e.target.value)}></input>
          </div>

          {/*<div className='dodaj_red'>
            <label className='login_labelaForma'>Url slike:</label>
            <input className='login_inputTekst' type='text' placeholder='Unesite url slike' onChange={(e)=>setSlika(e.target.value)}></input>
                </div>*/}

          <div className='dodaj_red'>
            <label className='login_labelaForma'>Kraci tekst:</label>
            <input className='login_inputTekst' type='text' placeholder='Unesite kraci tekst' onChange={(e)=>setKratakTekst(e.target.value)}></input>
          </div>

          <div className='dodaj_red'>
            <label className='login_labelaForma'>Tekst vesti:</label>
            <textarea className='textarea_vest' type='text' placeholder='Unesite tekst' onChange={(e)=>setDuziTekst(e.target.value)}></textarea>
          </div>



          <button className="btnRegistracija" onClick={dodajVest}>
            Dodaj
          </button>

          </div>
          </div>
      )}
      </>
  )

}