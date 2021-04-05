<template>
  <nav class="container flex items-center justify-between mx-auto nav">
    <img src="/images/logo.png">
    <div>
      <nuxt-link
        to="/how-it-works"
        class="px-10 py-2 mr-4 font-medium text-green-700"
      >
        How it works
      </nuxt-link>
      <nuxt-link
        to="/start"
        class="px-10 py-2 font-medium text-white bg-green-700 rounded"
      >
        Get Started
      </nuxt-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Nav'
}
</script>

<style scoped>
.nav {
  height: 70px;
}
</style>
