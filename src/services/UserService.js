import apiUser from "@/lib/usersAxios";

export default {
    registroUsuario(data){
        return apiUser.post('/usuarios', data)
    },
    consultarUsuarios(){
        return apiUser.get('/usuarios')
    }
}