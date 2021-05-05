import { useMemo, useState, useEffect } from "react";
import {ToastContainer, toast} from "react-toastify";
import AuthContext from "../context/AuthContext";
import EquipoContext from "../context/EquipoContext";
import {getHeroesEquipo, addHeroeEquipo, removeHeroeEquipo, countEquipo} from "../api/equipo"
import {useRouter} from "next/router"
import "../scss/global.scss";
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from "jwt-decode"
import {setToken, getToken, removeToken} from "../api/token"

 
export default function MyApp({ Component, pageProps }) {

  const [totalEquipo, setTotalEquipo] = useState(0)
  const [auth, setAuth] = useState(undefined)
  const [reloadUser, setReloadUser] = useState(false)
  const [reloadEquipo, setReloadEquipo] = useState(false)



  const router = useRouter()

  useEffect(() => {
      const token = getToken()
      if(token) {
        setAuth({
          token,
          idUser: jwtDecode(token).email
        })
       } else {
         setAuth(null)
       }
       setReloadUser(false)
      }, [reloadUser])

    useEffect(() => {
      setTotalEquipo(countEquipo())
      setReloadEquipo(false)
    }, [reloadEquipo, auth])
 

  const login = (token) => {
    setToken(token)
   setAuth({
      token,
     idUser: jwtDecode(token).email
    })
  }

  const logout = () => {
    if(auth) {
      removeToken()
      setAuth(null)
      router.push("/")
    }
  }

 
   const authData = useMemo(
     () => ({
        auth,
        login,
        logout,
        setReloadUser,
     }),
      [auth]
     )

const addEquipo = (heroe) => {
  addHeroeEquipo(heroe)
  setReloadEquipo(true)
}

const removeEquipo = (heroe) => {
  removeHeroeEquipo(heroe)
  setReloadEquipo(true)
}

     const equipoData = useMemo(
      ()=> ({
            equipo: totalEquipo,
            addHeroe: (heroe) => addEquipo(heroe),
            getHeroe: getHeroesEquipo,
            removeHeroe: (heroe)=> removeEquipo(heroe),
            removeEquipo: () => null,
    }), [totalEquipo])

     if (auth === undefined) return null
  return ( 
      <AuthContext.Provider value={authData}>
        <EquipoContext.Provider value={equipoData}>
        <Component {...pageProps} />
          <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover         
          />
        </EquipoContext.Provider>
     
    </AuthContext.Provider>
      )
}


