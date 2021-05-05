import React, { useState, useEffect } from 'react'
import BasicLayout from "../layouts/BasicLayout"
import {getToken} from '../api/token';
import {useRouter} from "next/router"
import {split} from "lodash"
import {getIdApi} from "../api/apiHero"
import {Grid, Image} from "semantic-ui-react"




export default function heroe() {

  
    const token = getToken()
    
    const {query} = useRouter()

      const idHeroe=  split(query.heroe,"-",1)

      const id = idHeroe[0]
     
     const [heroe, setHeroe] = useState(null)

    useEffect(() => {
        if(!token) {
            //usuario no logeado 
            router.push("/")
        }
      }, [])

      useEffect(() => {
        (async () => {  
              const data = await getIdApi(id)
              setHeroe(data)
              console.log(data)
        })()
       }, [query])
       console.log(heroe)
     
       if (!heroe) return null

    return (
        <BasicLayout className="heroe">
                    <Grid className="header-heroe">
        <Grid.Column mobile={16} tablet={6} computer={5}>
            <Image src={heroe.image.url} alt={heroe.name}  fluid/>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={10} computer={11}>
       <p>Info</p>
        </Grid.Column>
    </Grid>
        </BasicLayout>
    )
}

