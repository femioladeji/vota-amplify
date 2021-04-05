<template>
  <div>
    <div
      class="flex items-center justify-between px-8 py-4 border-b border-gray-300"
    >
      <h3 class="text-lg text-gray-800 capitalize">
        Poll Result
      </h3>
      <div>
        <router-link :to="`../${$route.params.id}`" class="inline-block btn btn-green">
          Back
        </router-link>
      </div>
    </div>
    <div class="px-8 py-4">
      <div v-if="pollResult">
        <div v-for="question in pollResult" :key="question.id" class="mb-16 flex items-center">
          <div class="w-1/3">
            {{ question.question }}
          </div>
          <ResultChart :result="question.voteCount" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API } from 'aws-amplify'
import { listPollVotes, getPoll } from '../../../../src/graphql/queries'
import ResultChart from '../../../../components/Poll/ResultChart'

export default {
  name: 'PollResult',
  layout: 'dashboard',
  components: {
    ResultChart
  },
  fetch () {
    this.getResults()
  },
  data () {
    return {
      pollResult: null
    }
  },
  methods: {
    groupQuestions (pollVotes, poll) {
      const { items: questions } = poll.questions
      const groupedResult = {}
      questions.forEach((eachQuestion) => {
        const voteCount = {}
        eachQuestion.options.forEach((option) => {
          voteCount[option] = 0
        })
        groupedResult[eachQuestion.id] = {
          ...eachQuestion,
          voteCount
        }
      })
      pollVotes.forEach((eachUserVotes) => {
        eachUserVotes.choices.forEach((eachQuestion) => {
          groupedResult[eachQuestion.questionId].voteCount[eachQuestion.option] += 1
        })
      })
      this.pollResult = groupedResult
    },
    async getResults () {
      const votesPromise = API.graphql({
        query: listPollVotes,
        variables: {
          pollId: this.$route.params.id
        }
      })
      const pollPromise = API.graphql({
        query: getPoll,
        variables: {
          id: this.$route.params.id
        }
      })
      const results = await Promise.all([votesPromise, pollPromise])
      this.groupQuestions(results[0].data.listPollVotes.items, results[1].data.getPoll)
    }
  }
}
</script>
