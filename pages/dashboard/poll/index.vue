<template>
  <div class="flex items-center justify-between px-8 py-4 border-b border-gray-300">
    <h3 class="text-lg text-gray-800 capitalize">
      All Polls
    </h3>
    <nuxt-link to="/dashboard/poll/create" class="btn btn-green">
      Create Poll
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'Poll',
  layout: 'dashboard'
}
</script>
