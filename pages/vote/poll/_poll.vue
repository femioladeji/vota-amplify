<template>
  <div class="p-4 shadow-md">
    <div v-if="$fetchState.pending">
      <img class="mx-auto my-4 w-12 animate-logo" src="../../../static/images/logo_part.svg">
      <p class="text-center my-4">
        Please wait...
      </p>
    </div>
    <div v-else-if="!poll">
      <p class="text-center my-4">
        This poll does not exist
      </p>
    </div>
    <div v-else-if="!poll.questions.items">
      <p class="text-center my-4">
        You can't vote on this poll yet
      </p>
    </div>
    <div v-else>
      <div v-if="alreadyVoted">
        <div class="mt-12">
          <img class="mx-auto my-4 w-12" src="../../../static/images/logo_part.svg">
          <p class="text-center my-4">
            You have already voted
          </p>
          <div class="flex mb-4 justify-center">
            <router-link to="/" class="btn btn-green">
              Create your own poll
            </router-link>
          </div>
        </div>
      </div>
      <div v-else-if="canViewQuestions" class="mt-8">
        <p class="text-lg text-center">
          {{ poll.name }}
        </p>
        <p class="text-center text-gray-800">
          {{ poll.description }}
        </p>
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
      <div v-else-if="submitted">
        <p class="text-center my-4">
          Your choices have been successfully recorded
        </p>
        <div class="flex mb-4 justify-center">
          <router-link to="/" class="btn btn-green">
            Create your own poll
          </router-link>
        </div>
      </div>
      <div v-else-if="submitting">
        <img class="mx-auto my-4 w-12 animate-logo" src="../../../static/images/logo_part.svg">
        <p class="text-center my-4">
          Submitting...
        </p>
      </div>
      <div v-else-if="!voterEmail">
        <img class="mx-auto my-4 w-12" src="../../../static/images/logo_part.svg">
        <p class="text-center my-4">
          This poll is not made available to public. <br>If you've been invited, please enter your email address
        </p>
        <form class="flex justify-center items-center" @submit.prevent="checkEmail">
          <input
            v-model="email"
            required
            class="w-full md:w-1/3 p-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-gray-500"
            type="text"
            placeholder="Email address"
            name="voter-email"
          >
          <input type="submit" class="btn ml-2 btn-green" value="Go">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { API } from 'aws-amplify'
import { pollByLink } from '../../../src/graphql/custom-queries'
import { castPollVote } from '../../../src/graphql/mutations'
import { listInvitations } from '../../../src/graphql/queries'

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
      choice: [],
      submitting: false,
      submitted: false,
      voterEmail: null,
      email: ''
    }
  },
  computed: {
    isLastQuestion () {
      return this.questionIndex === this.poll.questions.items.length - 1
    },
    alreadyVoted () {
      const voted = document.cookie
      return voted.includes(this.poll.id)
    },
    canViewQuestions () {
      return !this.submitting && !this.submitted && (this.poll.isPublic || (!this.poll.isPublic && this.voterEmail))
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
    localStore () {
      const date = new Date()
      date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000))
      document.cookie = `${this.poll.id} = 1; expires=${date.toUTCString()}`
    },
    async submit () {
      this.submitting = true
      const choices = this.choice.map((eachOption, index) => ({
        option: eachOption,
        questionId: this.poll.questions.items[index].id
      }))
      const input = {
        pollId: this.poll.id,
        choices,
        confirmed: true
      }
      if (this.voterEmail) {
        input.email = this.voterEmail
      }
      try {
        await API.graphql({
          query: castPollVote,
          variables: { input },
          authMode: 'API_KEY'
        })
        this.submitted = true
        this.localStore()
      } catch (error) {
        this.$toast.error('An error occurred while submitting your poll')
      } finally {
        this.submitting = false
      }
    },
    async checkEmail () {
      try {
        const invitation = await API.graphql({
          query: listInvitations,
          variables: {
            filter: {
              email: { eq: this.email },
              pollId: { eq: this.poll.id }
            }
          },
          authMode: 'API_KEY'
        })
        if (invitation.data.listInvitations.items.length) {
          this.voterEmail = this.email
        } else {
          this.$toast.error('Looks like you\'ve not been invited to vote on this poll')
        }
      } catch (error) {
        this.$toast.error('An error occurred, please try again')
      }
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
.animate-logo {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  animation-name: pulse;
  animation-iteration-count: infinite;
}

@keyframes pulse {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
  50% {
    -webkit-transform: scale3d(1.2, 1.2, 1.2);
    transform: scale3d(1.2, 1.2, 1.2);
  }
  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
</style>
