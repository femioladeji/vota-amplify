<template>
  <form v-if="!isResetPassword" @submit.prevent="submit">
    <div class="mb-6">
      <label for="login-email" class="text-sm">
        {{ isForgotPassword ? "Please enter the verified email you used to open an account" : "Email" }}
      </label>
      <input
        id="login-email"
        v-model="email"
        required
        class="w-full p-2 mt-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-gray-500"
        type="email"
        name="email"
      >
    </div>
    <div v-if="!isForgotPassword" class="mb-6">
      <label for="login-password" class="flex justify-between text-sm">
        <span>Password</span>
        <span class="text-blue-600 cursor-pointer" @click="switchToForgetPassword">Forgot password</span>
      </label>
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
      :value="buttonCaption"
    >
    <p>Are you a new user? <a class="text-blue-600 cursor-pointer" @click.prevent="$emit('flip')">Register</a></p>
  </form>
  <form v-else @submit.prevent="changePassword">
    <div class="mb-6">
      <h3>Please check your email for the reset instructions</h3>
      <label for="reset-code" class="text-sm">Verification Code</label>
      <input
        id="reset-code"
        v-model="resetCode"
        required
        class="w-full p-2 mt-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-gray-500"
        type="text"
        name="reset-code"
      >
    </div>
    <div class="mb-6">
      <label for="reset-password" class="flex justify-between text-sm">
        <span>New Password</span>
      </label>
      <input
        id="reset-password"
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
      :value="buttonCaption"
    >
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
      error: '',
      isForgotPassword: false,
      isResetPassword: false,
      resetCode: ''
    }
  },
  computed: {
    buttonCaption () {
      if (this.isForgotPassword) {
        return this.processing ? 'Resetting' : 'Reset Password'
      }
      return this.processing ? 'Signing In...' : 'Sign In'
    }
  },
  methods: {
    submit () {
      if (this.isForgotPassword) {
        return this.resetPassword()
      }
      return this.login()
    },
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
    },
    async resetPassword () {
      this.error = ''
      this.processing = true
      try {
        await Auth.forgotPassword(this.email)
        this.isResetPassword = true
      } catch (error) {
        this.error = error.message
      } finally {
        this.processing = false
      }
    },
    async changePassword () {
      this.error = ''
      this.processing = true
      try {
        await Auth.forgotPasswordSubmit(this.email, this.resetCode, this.password)
        this.login()
      } catch (error) {
        this.error = error.message
      } finally {
        this.processing = false
      }
    },
    switchToForgetPassword () {
      this.error = ''
      this.isForgotPassword = true
    }
  }
}
</script>
