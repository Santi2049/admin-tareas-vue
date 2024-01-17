import api from "../lib/axios";

export default {
    obtenerTareas(){
        return api.get('/tareas')
    },
    agregarTarea(data){
        return api.post('/tareas/', data)
    },
    obtenerTarea(id){
        return api.get('/tareas/' + id)
    },
    actualizarTarea(id, data){
        return api.patch('/tareas/' + id, data)
    },
    cambiarEstado(id, data){
        return api.patch('/tareas/' + id, data)
    },
    eliminarTarea(id){
        return api.delete('/tareas/' + id)
    }

}