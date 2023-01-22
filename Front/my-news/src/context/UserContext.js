import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import {Link, Navigate} from 'react-router-dom';
import axios from 'axios';
import { HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr';

export const userContext = createContext({
  //email:"",
  uloga:"",
 // jePosetilac: true,
 // logIn: () => {},
  //logOut: () => {},
  connection: null
  
});

export function UserContextProvider({ children }) {

  const [email, setEmail] = useState("");
  const [uloga,setUloga]=useState("");
  const [jePosetilac,setJePosetilac]=useState(true);
  const[loading, setLoading]=useState(true);

  const [ connection, setConnection ] = useState(null);
  
    useEffect(()=>{
      if(connection && localStorage.getItem("user"))
            {
              connection.start().then(p=>
                {
                  fja();
                  
                });
              
            }    
    },[connection])

  function fja(){
    if(connection && localStorage.getItem("user"))
    {
      var user=localStorage.getItem("user");
      //connection.on("SendMessageToAll",()=> {console.log("Ne znam ni ja")})
      //ovde vracam sve kategorije korinsika koji je ulogovan i radim JoinGroup za te kategorije
      axios.get(`https://localhost:7107/Kategorija/vratiSveKategorijeNaKojeJeKorisnikPretplacen/${user}`).then(res=>
      {
        res.data.map(kat=>
          {
            
            connection.invoke('JoinGroup',kat.toString());
            console.log("Kategorijeeee")
            
          });
      })

    }
  }


  useEffect(()=> {
      if(localStorage.getItem("user"))
      {
        if(localStorage.getItem("user")=="admin@gmail.com")
        { 
          setEmail("admin@gmail.com");
          setUloga("Admin");
          setJePosetilac(false);

        }
        else{
          setEmail(localStorage.getItem("user"));
          setUloga("Korisnik");
          setJePosetilac(false);

        }
      }
  

  },[])

    function logIn(email, uloga) {
        setEmail(email);
        setUloga(uloga);
        setJePosetilac(false);
        const newConnection = new HubConnectionBuilder()
              .withUrl('https://localhost:7107/hubs/notif'/*, //port bi trebalo da je ovaj
              {
                withCredentials : false,
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets
              }*/)  
              .withAutomaticReconnect()
              .build();

              setConnection(newConnection);
              console.log(connection+" iz UserContexta")
              console.log(newConnection);
              
    }

  function logOut() {
    setEmail("");
    setUloga("");
    setJePosetilac(true);
    window.localStorage.removeItem("user");
    return <Navigate to="/" replace />;
  }

  return (
    <userContext.Provider value={{ email, uloga, jePosetilac, logIn, logOut,loading, connection }}>   
      {children}
    </userContext.Provider>
  );
}

export function useUserContext() {
  const { email, uloga, jePosetilac, logIn, logOut, connection} = useContext(userContext);

  return useContext(userContext);
}