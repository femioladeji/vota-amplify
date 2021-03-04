<template>
  <div class="p-4 shadow-md">
    <div v-if="$fetchState.pending">
      Loading
    </div>
    <div v-else-if="!poll">
      This poll does not exist
    </div>
    <div v-else-if="!poll.questions.items">
      You can't vote on this poll yet
    </div>
    <div v-else>
      <p class="text-lg text-center">
        {{ poll.name }}
      </p>
      <p class="text-center text-gray-800">
        {{ poll.description }}
      </p>
      <div class="mt-8">
        <transition name="fade">
          <div>
            <p>{{ questionIndex + 1 }} of {{ poll.questions.items.length }}</p>
            <p class="text-lg text-center mb-8">
              {{ poll.questions.items[questionIndex].question }}
            </p>
            <div class="flex flex-wrap justify-around">
              <label
                v-for="(option, index) in poll.questions.items[questionIndex].options"
                :key="index"
                class="w-2/5 radio-button cursor-pointer"
              >
                <input v-model="choice[questionIndex]" type="radio" class="absolute h-0 w-0 opacity-0 cursor-pointer" :value="option">
                <div class="p-8 border my-4">{{ option }}</div>
              </label>
            </div>
          </div>
        </transition>
        <div class="flex justify-end">
          <button v-if="questionIndex !== 0" type="button" class="btn btn-white mr-8" :disabled="!choice[questionIndex]" @click="previous()">
            Previous
          </button>
          <button v-if="!isLastQuestion" type="button" class="btn btn-white" :disabled="!choice[questionIndex]" @click="next()">
            Next
          </button>
          <button v-if="isLastQuestion" type="button" class="btn btn-white" :disabled="!choice[questionIndex]" @click="submit()">
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API } from 'aws-amplify'
import { pollByLink } from '../../../src/graphql/custom-queries'

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
      questionIndex: 0,
      choice: []
    }
  },
  computed: {
    isLastQuestion () {
      return this.questionIndex === this.poll.questions.items.length - 1
    }
  },
  methods: {
    next () {
      if (this.choice[this.questionIndex]) {
        this.questionIndex++
      }
    },
    previous () {
      if (this.choice[this.questionIndex]) {
        this.questionIndex--
      }
    },
    submit () {

    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
