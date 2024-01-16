import { createRouter, createWebHistory } from "vue-router";
import Inicio from '../views/TareasView.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'listado-tareas',
            component: Inicio,
            props: { titulo: 'Listado de Tareas' }
        },
        {
            path: '/agregar-tarea',
            name: 'agregar-tarea',
            component: () => import('../views/NuevaTareaView.vue'),
            props: { titulo: 'Agregar Tarea' }
        },
        {
            path: '/editar-tarea/:id',
            name: 'editar-tarea',
            component: () => import('../views/EditarTareaView.vue'),
            props: { titulo: 'Editar Tarea' }
        },
        {
            path: '/iniciar-sesion',
            name: 'iniciar-sesion',
            component: () => import('../views/LoginView.vue'),
            props: { titulo: 'Iniciar Sesión' }
        },
        {
            path: '/registrate',
            name: 'registrate',
            component: () => import('../views/RegistroView.vue'),
            props: { titulo: 'Registrate' }
        }
    ]
})

export default router