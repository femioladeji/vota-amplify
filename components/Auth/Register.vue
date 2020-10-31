<template>
  <div class="bg-white">
    <form v-if="isRegisterStep" @submit.prevent="signup">
      <div class="mb-6">
        <label for="email" class="text-sm">Email</label>
        <input
          id="email"
          v-model="email"
          required
          class="w-full p-2 mt-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-gray-500"
          type="text"
          name="email"
        >
      </div>
      <div class="mb-6">
        <label for="email" class="text-sm">Full name</label>
        <input
          id="fullname"
          v-model="fullname"
          required
          class="w-full p-2 mt-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-gray-500"
          type="text"
          name="fullname"
        >
      </div>
      <div class="mb-6">
        <label for="password" class="text-sm">Password</label>
        <input
          id="password"
          v-model="password"
          required
          class="w-full p-2 mt-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-gray-500"
          type="password"
          name="password"
        >
      </div>
      <p v-if="error" class="pb-6 text-sm text-center text-red-500">
        {{ error }}
      </p>
      <input
        type="submit"
        :disabled="processing"
        class="w-full py-4 mb-6 font-medium text-center text-white bg-green-700 rounded"
        :value="processing ? 'REGISTERING...' : 'REGISTER'"
      >
      <p class="text-center">
        Do you already have an account? <a class="text-blue-600 cursor-pointer" @click.prevent="$emit('flip')">Sign in</a>
      </p>
    </form>
    <form v-if="!isRegisterStep" @submit.prevent="confirm">
      <p class="mb-2 text-center text-md">
        Please confirm your email address
      </p>
      <div class="mb-6">
        <label for="email" class="text-sm">Email</label>
        <input
          id="email"
          v-model="email"
          required
          class="w-full p-2 mt-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-gray-500"
          type="text"
          readonly="readonly"
          name="email"
        >
      </div>
      <div class="mb-6">
        <label for="password" class="text-sm">Code</label>
        <input
          id="code"
          v-model="code"
          required
          class="w-full p-2 mt-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-gray-500"
          type="text"
          name="code"
        >
      </div>
      <p v-if="error" class="pb-6 text-sm text-center text-red-500">
        {{ error }}
      </p>
      <input
        type="submit"
        :disabled="processing"
        class="w-full py-4 mb-6 font-medium text-center text-white bg-green-700 rounded"
        :value="processing ? 'CONFIRMING...' : 'CONFIRM'"
      >
    </form>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'

const STEPS = {
  REGISTER: 'resgister',
  CONFIRM: 'confirm'
}

export default {
  name: 'Register',
  data () {
    return {
      error: '',
      email: '',
      password: '',
      fullname: '',
      code: '',
      step: STEPS.REGISTER,
      processing: false
    }
  },
  computed: {
    isRegisterStep () {
      return this.step === STEPS.REGISTER
    }
  },
  methods: {
    async signup () {
      this.error = null
      this.processing = true
      try {
        await Auth.signUp({
          username: this.email,
          password: this.password,
          attributes: {
            name: this.fullname
          }
        })
        this.step = STEPS.CONFIRM
      } catch (error) {
        this.error = error.message
      } finally {
        this.processing = false
      }
    },
    async confirm () {
      this.processing = true
      this.error = null
      try {
        await Auth.confirmSignUp(this.email, this.code)
        this.$nuxt.$router.push('/dashboard')
      } catch (error) {
        this.error = error.message
        this.processing = false
      }
    }
  }
}
</script>
