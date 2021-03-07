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
import { API } from 'aws-amplify'
import PollForm from '../../../components/Poll/Form'
import { createPoll } from '../../../src/graphql/mutations'

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
    slugify (title, separator = '-') {
      return title
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036F]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, '')
        .replace(/\s+/g, separator)
    },
    async createPoll (pollInput) {
      const input = { ...pollInput, link: this.slugify(pollInput.link) }
      try {
        const { data } = await API.graphql({
          query: createPoll,
          variables: { input }
        })
        this.$toast.success('Poll was created')
        this.$nuxt.$router.push(`/dashboard/poll/${data.createPoll.id}`)
      } catch (e) {
        this.$toast.error('An error occurred while creating the poll')
      }
    }
  }
}
</script>

<style scoped>
.description-field {
  height: 80px;
}
</style>
