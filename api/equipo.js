import { EQUIPO} from '../utils/constants';
import {toast} from "react-toastify"
import {size, includes, remove} from "lodash"



export function getHeroesEquipo() {

    const equipo = localStorage.getItem(EQUIPO)

    if(!equipo) {
        return null
    } else {
        const heroes = equipo.split(",")
        return heroes
    }

}


export function addHeroeEquipo(heroe) {
    const equipo = getHeroesEquipo()

    if(!equipo) {
        localStorage.setItem(EQUIPO, heroe)
        toast.success("Heroe añadido al equipo")
    } else { 
         if(size(equipo) <= 5) {
            const productFound = includes(equipo, heroe)
            if(productFound) {
                toast.warning("Este Heroe ya fue añadido al equipo")
            } else {
                equipo.push(heroe)
                localStorage.setItem(EQUIPO, equipo)
                toast.success("Heroe añadido al equipo")
            }
         } else {
            toast.warning("No puede tener mas de 6 heroes")
         }
       
    }
}

export function removeHeroeEquipo(heroe) {
    const equipo = getHeroesEquipo()

   remove(equipo, (item) => {
       return item === heroe
   })

   if(size(equipo) > 0) {
       localStorage.setItem(EQUIPO, equipo)
   } else {
       localStorage.removeItem(EQUIPO)
   }
}

export function countEquipo() {
    const equipo = getHeroesEquipo()

    if(!equipo) {
        return 0
    } else {
        return size(equipo)
    }

}

