<script setup>
import {FormKit} from '@formkit/vue'
import {useRouter} from 'vue-router'
import UserService from "@/services/UserService";
import RouterLink from '../components/UI/RouterLink.vue'
import HeadingComp from '../components/UI/HeadingComp.vue'
import {defineProps, onMounted, ref, watch} from 'vue'
import { useStore } from 'vuex';

const store = useStore();
const isValid = ref(store.state.isAuthenticated)
const idUser = ref(store.state.idUser)



watch(() => {
  isValid.value = store.state.isAuthenticated
  idUser.value = store.state.idUser
})


let validacion = false
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

function validacionUsuario(data){
  for(let user of users){
    if(data.username === user.username){
      usuarioExistente++
      if(data.password === user.password){
        store.state.idUser = user.id
        validacion = true
        store.state.isAuthenticated = true
      } else{
        usuarioMensaje.value = 'La Contraseña es Incorrecta'

      }
    }
  }

  if(usuarioExistente === 0) {
    usuarioMensaje.value = 'Usuario No Encontrado'
    return usuarioMensaje
  }

  return usuarioMensaje
}

const handleSubmit = (data) => {
  validacionUsuario(data)
  if(validacion){
    console.log(store.state.isAuthenticated);


    router.push({name: 'listado-tareas'})
  } else {
    validacionUsuario(data)
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
      <div class="mx-auto md:w-1/3 py-20 px-6">
        <FormKit
            type="form"
            submit-label="Iniciar"
            incomplete-message="No se pudo enviar, revisa los mensajes"
            @submit="handleSubmit"
        >
          <FormKit
              type="text"
              label="Username"
              name="username"
              placeholder="Tu Usernanme"
              validation="required"
              :validation-messages="{ required: 'El Username es Obligatorio'}"
          />

          <FormKit
              type="password"
              label="Contraseña"
              name="password"
              placeholder="Tu Contraseña"
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