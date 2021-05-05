import React, {useState, useEffect} from 'react'
import {map, forEach, split} from "lodash"
import {Image, Table, Button, Grid} from "semantic-ui-react"
import useWindowSize from "../../hooks/useWindowSize"
import {breakpointUpLg, breakpointUpMd, breakpointUpSm} from "../../utils/breakpoint"
import useEquipo from "../../hooks/useEquipo"
import {getIdApi} from "../../api/apiHero"
import Link from "next/link"
import {Loader} from "semantic-ui-react"
import DetalleModal from "../../components/Modal/DetalleModal"
import ModalEquipo from "../Equipo/ModalEquipo"



export default function Equipo() {

    const {getHeroe} = useEquipo()
    const heroes = getHeroe()


    return !heroes ? <EmptyEquipo /> : <CompletoEquipo  heroes={heroes}/>
}


function EmptyEquipo() {

    function focusSearch() {
        document.getElementById("search-heroe").focus()
    }

    return (
        <div className="empty-equipo">
            <h2 onClick={() => focusSearch()}>Busca tus heroes favoritos y agregalos !!!</h2>
        </div>
    )
    
}

function CompletoEquipo({heroes}) {

    const [heroesData, setHeroesData] = useState(null)

    const [intelligence, setIntelligence] = useState(0)
    const [speed, setspeed] = useState(0)
    const [power, setpower] = useState(0)
    const [strength, setstrength] = useState(0)
    const [durability, setdurability] = useState(0)
    const [combat, setcombat] = useState(0)
    const [pesoProm, setPesoProm] = useState(0)
    const [altuProm, setAltuProm] = useState(0)


    const [reloadEquipo, setReloadEquipo] = useState(false)

    

    useEffect(() => {
      (async () => {
        const heroesTemp = []
        for await (const heroe of heroes) {
            const data = await getIdApi(heroe)
            heroesTemp.push(data)
        }
        setHeroesData(heroesTemp)
      })()
      setReloadEquipo(false)
     }, [reloadEquipo])


     useEffect(() => {
        let inte = 0
        let sp = 0
        let pow = 0
        let str = 0
        let dur = 0
        let comb = 0
        let peso = 0
        let altura = 0
       let  cont = 0
        forEach(heroesData,(data) => {
                cont += 1
                inte +=  parseInt(data.powerstats.intelligence)  
                sp +=  parseInt(data.powerstats.speed)  
                pow +=  parseInt(data.powerstats.power)  
                str +=  parseInt(data.powerstats.strength)  
                dur +=  parseInt(data.powerstats.durability)   
                comb +=  parseInt(data.powerstats.combat)   
                peso +=   parseInt(split((data.appearance.weight[1])," ",1)) 
                altura +=   parseInt(split((data.appearance.height[1])," ",1)) 
        })
        setIntelligence(inte)
        setspeed(sp)
        setpower(pow)
        setstrength(str)
        setdurability(dur)
        setcombat(comb)
        setPesoProm( (peso / cont).toFixed(2))
        setAltuProm( (altura / cont).toFixed(2))
       }, [reloadEquipo, heroesData])

     
    const {width} = useWindowSize();
    const getColumnsRender = () => {
        switch (true) {
            case width > breakpointUpLg:
                return 3;
            case width > breakpointUpMd:
                return 2;
            case width > breakpointUpSm:
                return 2;
            default:
                return 1;
        }
    }

 
    return (
                <div className="list-heroes">

                    <div className="title">
                        Resumen del Equipo
                    </div>
                    <div className="data">


                    { (width > breakpointUpMd) ? (
                
                        <Table celled structured>
                        <Table.Header>
                            <Table.Row>      
                                    <Table.HeaderCell>Inteligencia</Table.HeaderCell>
                                    <Table.HeaderCell>Velocidad</Table.HeaderCell>
                                    <Table.HeaderCell>Poder</Table.HeaderCell>
                                    <Table.HeaderCell>Fuerza</Table.HeaderCell>
                                    <Table.HeaderCell>Resistencia</Table.HeaderCell>
                                    <Table.HeaderCell>Combate</Table.HeaderCell>
                                    <Table.HeaderCell>Peso Promedio Kg</Table.HeaderCell>
                                    <Table.HeaderCell>Altura promedio cm</Table.HeaderCell>
                            </Table.Row>
                    </Table.Header>
                    <Table.Body>
                            <Table.Row className="list-heroes__poderes">
                            <Table.Cell>{intelligence}</Table.Cell>
                            <Table.Cell>{speed}</Table.Cell>
                            <Table.Cell>{power}</Table.Cell>
                            <Table.Cell>{strength}</Table.Cell>
                            <Table.Cell>{durability}</Table.Cell>
                            <Table.Cell>{combat}</Table.Cell>
                            <Table.Cell>{pesoProm}</Table.Cell>
                            <Table.Cell>{altuProm}</Table.Cell>  
                            </Table.Row>
                    </Table.Body>
                        </Table>
                    ) : (
                        <div className= "list-heroes__heroe__info">
                        <p>Inteligencia:&nbsp;{intelligence} Fuerza:&nbsp;{strength}</p>     
                       
                        <p>Velocidad:&nbsp;{speed} Resistencia:&nbsp;{durability}</p>
                                                   
                        <p>Poder:&nbsp;{power} Combate:&nbsp;{combat}</p>

                        <p>Peso/Kg:&nbsp;{pesoProm} Altura/cm:&nbsp;{altuProm}</p>
                   </div>
                    )}

                    </div>
                <Grid>
                    <Grid.Row columns={getColumnsRender()}>
              
                          {map(heroesData, (heroe) => (
                                <Heroe heroe={heroe}  setReloadEquipo={setReloadEquipo}/>
                                
                            ))}
                            
                    </Grid.Row>
                </Grid>
                
            </div>
            
    )
}


function Heroe({heroe, setReloadEquipo}) {
    const {removeHeroe} = useEquipo()

    const removeHeroeLocal = (heroe) => {
         removeHeroe(heroe)
         setReloadEquipo(true)
      
       }
       
       const [showModal, setshowModal] = useState(false)
       const [titleModal, settitleModal] = useState("Detalles")
       const onShowModal = () => setshowModal(true)
       const onCloseModal = () => setshowModal(false)



    return (
        <Grid.Column className="list-heroes__heroe">
        
                
               
           
                    <h2>{heroe.name}</h2>
           
                    <div className="list-heroes__heroe-poster" >

                    <DetalleModal show={showModal} setShow = {setshowModal} title={titleModal} size="small">

                    <ModalEquipo heroe={heroe} settitleModal={settitleModal} onCloseModal={onCloseModal} />
                    </DetalleModal>
                    
                            <Image src={heroe.image.url} alt={heroe.name} onClick={onShowModal}/>

                    </div>
                  
                    <div className= "list-heroes__heroe__info">

<p>Inteligencia:&nbsp;{heroe.powerstats.intelligence} Fuerza:&nbsp;{heroe.powerstats.strength}</p>     
                       
<p>Velocidad:&nbsp;{heroe.powerstats.speed} Resistencia:&nbsp;{heroe.powerstats.durability}</p>
                           
<p>Poder:&nbsp;{heroe.powerstats.power} Combate:&nbsp;{heroe.powerstats.combat}</p>
                           

                    </div>
                    <div  className="actions">
                         
                                 
                             <Button onClick={() => removeHeroeLocal(heroe.id)} className="submit">Eliminar</Button>
                    </div>
                    
                         
        </Grid.Column>
    )
}







