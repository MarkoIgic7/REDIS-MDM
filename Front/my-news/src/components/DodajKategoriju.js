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
export const DodajKategoriju = ({    //MOZDA I OBRISI KATEGORIJU?
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  onAdd
}) => {
    const [forma, setForma] = useState(false);
    const [naziv,setNaziv]=useState("");
    const [idBrisanje,setIdBrisanje]=useState("");
    const [kategorije,setKategorije]=useState([])
    const navigate=useNavigate();

  const toggleForma = () => {
    setForma(!forma);
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

  const dodajKategoriju = () => {
    naziv!=="" ? (
      axios.post(`https://localhost:7107/Kategorija/SetKategorija/${naziv}`)  
      .then((response)=>{
        setForma(!forma);
        alert("Uspesno ste dodali kategoriju!")
        navigate('/Pocetna' );
        onAdd()
      })
      .catch(err=>{
        alert(err.response.data)
      })
      ) : alert("Niste dodali naziv!")
  }

  const obrisiKategoriju = () => {
    /*console.log(email)
    console.log(password)
    email!=="" && password!=="" ? (
      axios.get(`https://localhost:7107/Korisnik/Login/${email}/${password}`)    //promeni fetch za ovo
      .then((response)=>{
        localStorage.setItem("user",response.data.mail);  //proveri ovo
        logIn(email, response.data.uloga);       //proveri i ovo
        setForma(!forma);
        navigate('/Pocetna' );
      })
      .catch(err=>{
        alert(err.response.data)
      })
      ) : alert("Niste popunili sva polja!")*/
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
            <div className='labDodajKategoriju'>Dodaj kategoriju</div>
            <div className='dodaj_red'>
              <label className='login_labelaForma'>Naziv:</label>
              <input className='login_inputTekst' type='text' placeholder='Unesite naziv kategorije' onChange={(e)=>setNaziv(e.target.value)}></input>
            </div>

            <button className="btnRegistracija" onClick={dodajKategoriju}>
              Dodaj
            </button>

            <br/>
            {/* <br/>
            <div className='labDodajKategoriju'>Obrisi kategoriju</div>
            <div className='dodaj_red'>
              <label className='login_labelaForma'>Kategorija za brisanje:</label>
              <select name='Kategorija' className='KategorijaSelect1' onChange={e => setIdBrisanje(e.target.value)}>
                  <option value="nema" selected disabled hidden className='sivo'>Izaberite kategoriju</option>
                  <option value="nema"></option>
                  {
                    kategorije.map((kat) => 
                    <option key={kat.id} value={kat.id}>{veliko(kat.naziv)}</option>)   //da li sme kat.id za value????
                  }
                </select> 
            </div>
            <button className="btnRegistracija" onClick={obrisiKategoriju}>
              Obrisi
            </button> */}

          </div>
        </div>
      )}
      </>
  )

}