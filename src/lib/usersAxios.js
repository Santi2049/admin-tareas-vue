import axios from "axios";

const apiUser = axios.create({
    baseURL: 'http://localhost:4002'
})

export default apiUser

