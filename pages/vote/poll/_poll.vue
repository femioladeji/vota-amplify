<template>
  <div>
    Poll Vote
  </div>
</template>

<script>
import { API } from 'aws-amplify'
import { getPoll } from '../../../src/graphql/queries'

export default {
  name: 'Vote',
  layout: 'public',
  fetch () {
    console.log(this.$route.params)
    API.graphql({
      query: getPoll,
      variables: {
        link: this.$route.params.poll
      }
    })
  }
}
</script>
