import {useState, useEffect} from 'react'
import {size} from "lodash"
import BasicLayout from "../layouts/BasicLayout"
import BasicModal from "../components/Modal/BasicModal"
import LoginForm from '../components/Auth/LoginForm/LoginForm'
import useAuth from "../hooks/useAuth"
import Equipo from "../components/Equipo"



export default function Home() {

  const {auth, logout} = useAuth();

  const [showModal, setshowModal] = useState(true)
  const [titleModal, settitleModal] = useState("Inicia sesión")
  const onShowModal = () => setshowModal(true)
  const onCloseModal = () => setshowModal(false)

 
  return ( 
    
         <BasicLayout  className="home">

              {!auth ? (
                       <BasicModal show={showModal} setShow={setshowModal} title={titleModal} size="small" > 
                       <LoginForm settitleModal={settitleModal} onCloseModal={onCloseModal} />
                     </BasicModal>
              )  :
               (    <div className="conte">
                
                                  <Equipo />                  
                     </div> 
               )}

         
            
         </BasicLayout>

  )
}

