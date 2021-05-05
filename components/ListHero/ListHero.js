import React from 'react'
import {map} from "lodash"
import Link from "next/link"
import {Image, Button, Grid} from "semantic-ui-react"
import useWindowSize from "../../hooks/useWindowSize"
import {breakpointUpLg, breakpointUpMd, breakpointUpSm} from "../../utils/breakpoint"
import useEquipo from "../../hooks/useEquipo"




export default function ListHero({heroes}) {

    const {width} = useWindowSize();
 

    const getColumnsRender = () => {
        switch (true) {
            case width > breakpointUpLg:
                return 4;
            case width > breakpointUpMd:
                return 3;
            case width > breakpointUpSm:
                return 2;
            default:
                return 2;
        }
    }




    return (
        <div className="list-heroes">

        <Grid>
            <Grid.Row columns={getColumnsRender()}>
        
                     {map(heroes.results, (heroe) => (
                         <Heroe heroe={heroe}/>
                         
                    ))}
                    
            </Grid.Row>
        </Grid>
          
    </div>
)
    
}

function Heroe({heroe}) {

  const {addHeroe} = useEquipo()

    return (
        <Grid.Column className="list-heroes__heroe">
                        
           
                    <h2>{heroe.name}</h2>
           
                    <div className="list-heroes__heroe-poster" >
                                 <Image className="imagen" src={heroe.image.url} alt={heroe.name} />
                                <div  className="actions">
                                       <Button className="submit" onClick={() => addHeroe(heroe.id)} >Agregar al equipo</Button>
                            </div>
                    </div>
                  
        </Grid.Column>
    )
}

 

