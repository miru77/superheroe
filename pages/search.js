import React, {useState, useEffect} from 'react'
import {Loader} from "semantic-ui-react"
import BasicLayout from "../layouts/BasicLayout"
import {useRouter} from "next/router"
import {SearchApi} from "../api/apiHero"
import { size } from 'lodash'
import ListHero from "../components/ListHero"
import useAuth from "../hooks/useAuth"
import {getToken} from '../api/token';


//import Seo from "../components/Seo"

export default function search() {

    const token = getToken()
    const [heroes, Setheroes] = useState(null)
    const {query} = useRouter()
    const {logout} = useAuth();
    const router = useRouter()

    
    useEffect(() => {

        if(!token) {
            //usuario no logeado
            logout()
            router.push("/")
        } else
        document.getElementById("search-heroe").focus()
      }, [])

      useEffect(() => {
        (async () => {
            if(size(query.query) > 0) {
                const response = await SearchApi(query.query, logout)
                console.log(response)
                if(size(response) > 0) {
                    Setheroes(response)
                } else {
                    Setheroes([])
                }
              
            } else {
                Setheroes([])
            }
        })()
      }, [query])

    return (
        <BasicLayout className="search">
           {!heroes && <Loader active>Buscando heroes ...</Loader>}
           {heroes && size(heroes) === 0 && (
                  <div><h3>No se ha encontrado ningun heroe...</h3></div>
              )}
              {size(heroes) > 0 && <ListHero heroes={heroes} />}
        </BasicLayout>
    )
}
