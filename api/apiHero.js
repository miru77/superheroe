import {BASE_PATHAPI} from "../utils/constants"
import {authFetch} from "../utils/fetch"


export async function getIdApi(idUser, logout) {

    try {
        const url = `${BASE_PATHAPI}/${idUser}`
        const result = authFetch(url, null, logout)
        return result ? result : null
        
    } catch (error) {
        console.log(error)
        return null
    }
    
}

export async function SearchApi(name, logout) {

    try {
        const url = `${BASE_PATHAPI}/search/${name}`
        const result = authFetch(url, null, logout)
        return result ? result : null
        
    } catch (error) {
        console.log(error)
        return null
    }
    
}