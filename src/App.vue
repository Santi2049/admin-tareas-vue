<script setup>
  import { RouterView } from 'vue-router'
  import {useRouter} from "vue-router";
  import RouterLink from "@/components/UI/RouterLink.vue";
  import { useStore } from 'vuex';
  import {ref, watch} from "vue";

  const store = useStore()
  const router = useRouter()
  const isValid = ref(store.state.isAuthenticated)

  watch(() => {
    isValid.value = store.state.isAuthenticated
  })




  const logout = () => {
    store.state.isAuthenticated = false
    router.push({name: 'listado-tareas'})
  }

</script>

<template>
  <header class="bg-slate-800">
    <div class="mx-auto max-w-6xl py-10 flex items-center justify-between">
      <h1 class="text-4xl font-extrabold text-white">Administrador de Tareas</h1>

      <div v-if="isValid">
        <p class="text-white mr-2 text-center font-medium">
          Bienvenido
        </p>

        <button class="bg-red-700 font-extrabold rounded p-1.5 hover:bg-red-400" @click="logout">Cerrar Sesión</button>
      </div>

      <div v-if="!isValid">
        <RouterLink to="iniciar-sesion" class="text-white mr-2">
          Iniciar Sesión
        </RouterLink>

        <RouterLink to="registrate" class="text-white ml-auto">
          Regístrate
        </RouterLink>
      </div>
    </div>
  </header>

  <main class="max-w-6xl mx-auto mt-10">
    <RouterView />
  </main>
</template>



