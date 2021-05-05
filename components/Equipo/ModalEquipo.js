import React from 'react'
import {Grid, Image} from "semantic-ui-react"


export default function ModalEquipo({heroe, settitleModal}) {


    settitleModal(heroe.name)
    return (
        <div className="heroe">
                    <Grid className="header-heroe">
        <Grid.Column mobile={16} tablet={6} computer={5}>
            <Image src={heroe.image.url} alt={heroe.name}  fluid/>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={10} computer={11}>
            <Info  heroe={heroe}/>
        </Grid.Column>
    </Grid>
        </div>
    )
}

function Info({heroe}) {

  


    return (
        <>
        <div className="header-game__title">
               Alias: &nbsp;{heroe.biography.aliases[0]}
               
        </div>
        <div className="header-game__delivery">

            <p>Peso: {heroe.appearance.weight[1]}&nbsp; &nbsp;
            Altura: {heroe.appearance.height[1]} &nbsp;&nbsp; 
            Color de Ojos: {heroe.appearance.['eye-color']} &nbsp;&nbsp;
            Cabello: {heroe.appearance.['hair-color']} </p>
        </div>
     

        <div className="header-game__buy">
            <div className="header-game__buy-price">
                <p>Lugar de Trabajo: </p>
                <div className="header-game__buy-price-actions">
                   <p> {heroe.work.base}</p>
               
            </div> 
            </div> 
         
        </div>      
        
    </>
    )
    
}
