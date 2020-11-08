<template>
  <div class="fixed left-0 z-10 w-1/5 h-screen py-4 text-gray-400 sidebar">
    <div class="pt-4">
      <nuxt-link
        class="block py-2 pl-4 border-b border-gray-700"
        to="/dashboard"
      >
        Home
      </nuxt-link>
      <nuxt-link
        class="block py-2 pl-4 border-b border-gray-700"
        to="/dashboard/poll"
      >
        Polls
      </nuxt-link>
      <nuxt-link
        class="block py-4 pl-4 border-b border-gray-700"
        to="/dashboard/elections"
      >
        Elections
      </nuxt-link>
      <nuxt-link
        class="block py-4 pl-4 border-b border-gray-700"
        to="/dashboard/settings"
      >
        Settings
      </nuxt-link>
      <nuxt-link
        class="block py-4 pl-4 border-b border-gray-700"
        to="/dashboard/settings"
      >
        Settings
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style scoped>
.sidebar {
  max-width: 230px;
  background: #2c2e3e;
}
</style>
