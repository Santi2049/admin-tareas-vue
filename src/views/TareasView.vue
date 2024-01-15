<script setup>
import RouterLink from '../components/UI/RouterLink.vue'
//import HeadingComp from '../components/UI/HeadingComp.vue'
import { defineProps } from 'vue'

defineProps({
  titulo: {
    type: String
  }
})
</script>



<template>
    <div>
        <div class="flex justify-end">
        <RouterLink to="agregar-tarea">
            Agregar Tarea
        </RouterLink>
        </div>

        <div class="flow-root mx-auto  mt-10 p-5 bg-white shadow">
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

    <p  class="text-center mt-10">Inicie sesión para ver las tareas</p>
    </div>
</template>





