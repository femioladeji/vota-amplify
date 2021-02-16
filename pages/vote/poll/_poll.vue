<template>
  <div class="p-4 shadow-md">
    <div v-if="$fetchState.pending">
      Loading
    </div>
    <div v-else-if="!poll || !poll.questions.items">
      This poll does not exist
    </div>
    <div v-else>
      <p class="text-lg text-center">
        {{ poll.name }}
      </p>
      <p class="text-center text-gray-800">
        {{ poll.description }}
      </p>
      <div>
        <p>{{ poll.questions.items }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { API } from 'aws-amplify'
import { pollByLink } from '../../../src/graphql/queries'

export default {
  name: 'Vote',
  layout: 'public',
  async fetch () {
    const poll = await API.graphql({
      query: pollByLink,
      variables: {
        link: this.$route.params.poll
      },
      authMode: 'API_KEY'
    })
    this.poll = poll.data.pollByLink.items[0]
  },
  data () {
    return {
      poll: null,
      questionIndex: 0
    }
  }
}
</script>
