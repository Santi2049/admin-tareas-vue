<script setup>
import { FormKit } from '@formkit/vue'
import { useRouter, useRoute } from 'vue-router'
import TareaService from "@/services/TareaService";
// import TareaServiceUser from "@/services/TareaServiceUser";
import RouterLink from '../components/UI/RouterLink.vue'
import HeadingComp from '../components/UI/HeadingComp.vue'
import { defineProps, onMounted, reactive, ref, watch} from 'vue'
import { useStore } from "vuex";

const router = useRouter()
const route = useRoute()
const store = useStore()

const idUser = ref(store.state.idUser)

watch(()=> {
  idUser.value = store.state.idUser
})

const { id } = route.params

const formData = reactive({})

onMounted(() => {
  TareaService.obtenerTarea(id)
      .then(({data}) => {
        Object.assign(formData, data)
      })
})

defineProps({
  titulo: {
    type: String
  }
})

const selectOptions = [
  {value: 'Prioritaria', label: 'Prioritaria'},
  {value: ' No Prioritaria', label: 'No Prioritaria'},
]

const handleSubmit = (data) => {
  TareaService.actualizarTarea(id, data)
      .then(() => router.push({name: 'listado-tareas'}))
      .catch(error => console.log(error))
}

</script>

<template>
  <div>
    <div class="flex justify-end">
      <RouterLink to="listado-tareas">
        Volver
      </RouterLink>
    </div>

    <HeadingComp>{{ titulo }}</HeadingComp>

    <div class="mx-auto mt-10 bg-white shadow">
      <div class="mx-auto md:w-2/3 py-20 px-6">
        <FormKit
            type="form"
            submit-label="Guardar Cambios"
            incomplete-message="No se pudo enviar, revisa los mensajes"
            @submit="handleSubmit"
            :value="formData"
        >
          <FormKit
              type="text"
              label="Título"
              name="titulo"
              placeholder="Título de Tarea"
              validation="required"
              :validation-messages="{ required: 'El título de la tarea es Obligatorio'}"
              v-model="formData.titulo"
          />

          <FormKit
              type="text"
              label="Materia"
              name="materia"
              placeholder="Nombre de a Materia"
              validation="required"
              :validation-messages="{ required: 'El título de la Materia es Obligatorio'}"
              v-model="formData.materia"
          />

          <FormKit
              type="select"
              label="Prioridad"
              :options="selectOptions"
              name="prioridad"
              placeholder="Nivel de Prioridad"
              validation="required"
              :validation-messages="{ required: 'El Nivel de Prioridad es Obligatorio'}"
              v-model="formData.prioridad"
          />

          <FormKit
              type="date"
              label="Fecha de entrega"
              name="fecha"
              validation="date_after:2024-01-12"
              :validation-messages="{ date_after: 'La fecha no puede ser anterior a la actual'}"
              v-model="formData.fecha"
          />

          <FormKit
              type="textarea"
              label="Especificaciones"
              name="specs"
              placeholder="Especificaciones de la Tarea"
              validation="required"
              :validation-messages="{ required: 'Las especificaciones de la tarea son Obligatorias'}"
              v-model="formData.specs"
          />
        </FormKit>
      </div>
    </div>
  </div>
</template>

<style>
.formkit-wrapper {
  max-width: 100%;
}
</style>