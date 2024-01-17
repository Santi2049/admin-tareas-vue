<script setup>
import TareaService from "@/services/TareaService";
import { onMounted, ref, defineProps, computed, watch } from 'vue'
import RouterLink from '../components/UI/RouterLink.vue'
import HeadingComp from '../components/UI/HeadingComp.vue'
import TareaComp from "@/components/TareaComp.vue";
import {useStore} from "vuex";

const store = useStore()

let aux = ''

const admin = 'e7c8'
const tareas = ref([])
const idUser = ref(store.state.idUser)
const isValid = ref(store.state.isAuthenticated)

watch(() => {
  idUser.value = store.state.idUser
  isValid.value = store.state.isAuthenticated
})

onMounted(()  => {
  TareaService.obtenerTareas()
      .then(({data}) => tareas.value = data)
      .catch(error => console.log('Hubo un error', error))

})

defineProps({
  titulo: {
    type: String
  }
})

const usuarioValido = computed(() => {
  return store.state.isAuthenticated
})

// Propiedad computada para filtrar tareas según el autor
const tareasFiltradas = computed(() => {
  if(idUser.value === admin){
    return tareas.value
  } else {
    console.log(idUser.value);
    aux = idUser.value
    console.log(aux);
    return tareas.value.filter(tarea => tarea.autor === aux);
  }
});

const actualizarEstado = ({id, estado}) => {
  TareaService.cambiarEstado(id, {estado: !estado})
      .then(() => {
        const i = tareas.value.findIndex(tarea => tarea.id === id)
        tareas.value[i].estado = !estado
      })
      .catch(error => console.log(error))
}

const eliminarTarea = id => {
  TareaService.eliminarTarea(id)
      .then(() => {
        tareas.value = tareas.value.filter(tarea => tarea.id !== id)
      })
      .catch(error => console.log(error))
}

</script>

<template>
  <div>
    <div v-if="usuarioValido" class="flex justify-end">
      <RouterLink to="agregar-tarea">
        Agregar Tarea
      </RouterLink>
    </div>
    <HeadingComp>{{ titulo }}</HeadingComp>

    <div v-if="usuarioValido" class="flow-root mx-auto  mt-10 p-5 bg-white shadow">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
            <tr>
              <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Tarea</th>
              <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Fecha de Entrega</th>
              <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Detalle de la Tarea</th>
              <th scope="col" class="p-2 text-center text-sm font-extrabold text-gray-600">Estado</th>
              <th scope="col" class="p-2 text-center text-sm font-extrabold text-gray-600">Acciones</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <TareaComp
                  v-for="tarea in tareasFiltradas"
                  :key="tarea.id"
                  :tarea="tarea"
                  @actualizar-estado="actualizarEstado"
                  @eliminar-tarea="eliminarTarea"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <p v-else class="text-center mt-10">Inicie sesión para ver las tareas</p>
  </div>
</template>