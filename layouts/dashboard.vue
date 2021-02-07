<template>
  <div>
    <auth-nav />
    <div class="w-full main">
      <sidebar />
      <div class="px-8 py-4 bg-gray-200 content">
        <!-- <h3 class="py-3 text-lg text-gray-800 capitalize">
          {{ name }}
        </h3> -->
        <div class="my-4 bg-white shadow">
          <nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import AuthNav from '@/components/Nav/AuthNav'

export default {
  name: 'Dashboard',
  components: {
    AuthNav,
    Sidebar
  },
  middleware: 'authenticated',
  fetch () {
    const path = this.$route.name.split('-')
    this.name = path[1]
  },
  data () {
    return {
      name: ''
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler (route) {
        const path = route.name.split('-')
        this.name = path[1]
      }
    }
  }
}
</script>

<style scoped>
.main {
  padding-left: 230px;
}
.content {
  height: calc(100vh - 60px);
  overflow-y: auto;
}
</style>
