import axios from 'axios'

export function getCountries(){
    return axios.get("https://amazon-api.sellead.com/country")
}

export function getCities(){
    return axios.get("https://amazon-api.sellead.com/city")
}
