<template>
  <div>
    <h3
      class="px-8 py-4 text-lg text-gray-800 capitalize border-b border-gray-300"
    >
      Create poll
    </h3>
    <poll-form :poll="poll" :action-error="error" @submit="createPoll" />
  </div>
</template>

<script>
import PollForm from '../../../components/Poll/Form'

export default {
  name: 'CreatePoll',
  layout: 'dashboard',
  components: {
    PollForm
  },
  data () {
    return {
      error: ''
    }
  },
  computed: {
    poll () {
      return {
        name: '',
        description: '',
        startDate: new Date(),
        endDate: new Date(),
        publishStatus: false,
        isPublic: false,
        isAnonymous: false
      }
    }
  },
  methods: {
    createPoll () {
      console.log('create')
    }
  }
}
</script>

<style scoped>
.description-field {
  height: 80px;
}
</style>
