<template>
  <div class="p-8">
    Dashboard
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'

export default {
  name: 'Login',
  layout: 'dashboard',
  async mounted () {
    const user = await Auth.currentAuthenticatedUser()
    console.log(user)
  }
}
</script>
