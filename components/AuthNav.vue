<template>
  <nav class="flex items-center justify-between w-full mx-auto shadow nav">
    <img src="/images/logo.png" alt="Vota" title="Vota" class="ml-8">
    <button class="px-10 py-2 mr-4 font-medium text-green-700" @click="logout">
      Logout
    </button>
  </nav>
</template>

<script>
import { Auth } from 'aws-amplify'

export default {
  name: 'NewNav',
  methods: {
    async logout () {
      try {
        await Auth.signOut()
        this.$nuxt.$router.push('/start')
      } catch (err) {
        alert('An error occurred while logging you out')
      }
    }
  }
}
</script>

<style scoped>
.nav {
  height: 60px;
}
</style>
