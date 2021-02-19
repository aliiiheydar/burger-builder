import axios from "axios"

const instance = axios.create({
    baseURL: "https://heydar-burger-builder-backend.herokuapp.com/"
})

export default instance
