<template>
  <form @submit.prevent="login">
    <div class="mb-6">
      <label for="login-email" class="text-sm">Email</label>
      <input
        id="login-email"
        v-model="email"
        required
        class="w-full p-2 mt-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-gray-500"
        type="email"
        name="email"
      >
    </div>
    <div class="mb-6">
      <label for="login-password" class="text-sm">Password</label>
      <input
        id="login-password"
        v-model="password"
        required
        class="w-full p-2 mt-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-gray-500"
        type="password"
        name="password"
      >
    </div>
    <p v-if="error" class="pb-2 text-sm text-center text-red-500">
      {{ error }}
    </p>
    <input
      type="submit"
      class="w-full py-4 mb-6 font-medium text-center text-white bg-green-700 rounded"
      :value="processing ? 'Signing In...' : 'Sign In'"
    >
    <p>Are you a new user? <a class="text-blue-600 cursor-pointer" @click.prevent="$emit('flip')">Register</a></p>
  </form>
</template>

<script>
import { Auth } from 'aws-amplify'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      processing: false,
      error: ''
    }
  },
  methods: {
    async login () {
      this.error = ''
      this.processing = true
      try {
        await Auth.signIn(this.email, this.password)
        this.$nuxt.$router.push('/dashboard')
      } catch (error) {
        this.error = error.message
      } finally {
        this.processing = false
      }
    }
  }
}
</script>
