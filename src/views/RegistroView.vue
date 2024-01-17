<script setup>
import {FormKit} from '@formkit/vue'
import {useRouter} from 'vue-router'
import UserService from "@/services/UserService";
import RouterLink from '../components/UI/RouterLink.vue'
import HeadingComp from '../components/UI/HeadingComp.vue'
import {defineProps, onMounted, ref} from 'vue'


const usuarioMensaje = ref(null)
const router = useRouter()

let users = []
let usuarioExistente = 0


onMounted(()  => {
  UserService.consultarUsuarios()
      .then(({data}) => users = data)
      .catch(error => console.log('Hubo un error', error))
})

defineProps({
  titulo: {
    type: String
  }
})

const selectOptions = [
  {value: 'Masculino', label: 'Masculino'},
  {value: 'Femenino', label: 'Femenino'},
]

function validacionUsuario(data){
  for(let user of users){
    if(data.username === user.username){
      usuarioExistente++
    }
  }


}

const handleSubmit = (data) => {
  validacionUsuario(data)

  if(usuarioExistente > 0){
    usuarioExistente = 0

    usuarioMensaje.value = 'Usuario Ya Registrado'
    return usuarioMensaje
  } else {
    UserService.registroUsuario(data)
        .then(() => router.push({name: 'listado-tareas'}))
        .catch(error => console.log(error))

    usuarioMensaje.value = null
    return usuarioMensaje
  }

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
            submit-label="Envíar"
            :incomplete-message="'No se pudo enviar, revisa los mensajes'"
            @submit="handleSubmit"
        >
          <FormKit
              type="text"
              label="Nombre"
              name="nombre"
              placeholder="Tu Nombre"
              validation="required"
              :validation-messages="{ required: 'El Nombre es Obligatorio'}"
          />

          <FormKit
              type="text"
              label="Apellido"
              name="apellido"
              placeholder="Tu Apellido"
              validation="required"
              :validation-messages="{ required: 'El Apellido es Obligatorio'}"
          />

          <FormKit
              type="text"
              label="Username"
              name="username"
              placeholder="Tu Username"
              validation="required"
              :validation-messages="{ required: 'El Username es Obligatorio'}"
          />

          <FormKit
              type="select"
              label="Género"
              :options="selectOptions"
              name="genero"
              placeholder="Seleccionar"
              validation="required"
              :validation-messages="{ required: 'El Género es Obligatorio'}"
          />

          <FormKit
              type="password"
              label="Contraseña"
              name="password"
              placeholder="Contraseña"
              validation="required"
              :validation-messages="{ required: 'La Contraseña es Obligatoria'}"
          />
        </FormKit>

        <p class="text-center bg-red-700 px-2 rounded font-semibold uppercase" v-if="usuarioMensaje">{{ usuarioMensaje }}</p>
      </div>


    </div>
  </div>
</template>

<style>
.formkit-wrapper {
  max-width: 100%;
}
</style>