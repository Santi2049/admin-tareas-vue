<script setup>
import { RouterLink } from "vue-router";
import {defineProps, computed, defineEmits}  from 'vue'

const props = defineProps({
  tarea: {
    type: Object
  }
})

defineEmits(['actualizar-estado', 'eliminar-tarea'])

const estadoCliente = computed(() => {
  return props.tarea.estado
})
</script>

<template>
  <tr>
    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
      <p class="font-medium text-gray-900">{{tarea.titulo}}</p>
      <p class="text-gray-500">{{tarea.materia}}</p>
    </td>
    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      <p class="text-gray-900 font-bold">{{tarea.fecha}}</p>
      <p class="text-gray-600">{{tarea.prioridad}}</p>
    </td>
    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      <p class="font-medium text-gray-900">{{tarea.specs}}</p>
    </td>
    <td class="whitespace-nowrap px-3 py-4 text-sm">
      <button
          class="inline-flex rounded-full px-2 text-xs font-semibold leading-5"
          :class="[estadoCliente ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800']"
          @click="$emit('actualizar-estado', {id: tarea.id, estado: tarea.estado})"
      >
        {{estadoCliente ? 'Completada' : 'Por Realizar'}}
      </button>
    </td>
    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
      <RouterLink
          :to="{name: 'editar-tarea',  params: {id: tarea.id}}"
          class="text-indigo-600 hover:text-indigo-900 mr-5"
      >Editar</RouterLink>
      <button
          class="text-red-600 hover:text-red-900"
          @click="$emit('eliminar-tarea', tarea.id)"
      >Eliminar</button>
    </td>
  </tr>
</template>