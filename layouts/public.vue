<template>
  <div class="mx-auto">
    <Nav />
    <div class="container mx-auto my-4 bg-white">
      <nuxt />
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav/Nav'

export default {
  name: 'Public',
  components: {
    Nav
  }
}
</script>
