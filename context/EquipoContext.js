import {createContext} from "react"

const EquipoContext = createContext({
    equipo: 0,
    addHeroe: () => null,
    getHeroe: () => null,
    removeHeroe: () => null,
    removeEquipo: () => null,
})

export default EquipoContext