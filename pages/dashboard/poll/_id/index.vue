<template>
  <div>
    <div
      class="flex items-center justify-between px-8 py-4 border-b border-gray-300"
    >
      <h3 class="text-lg text-gray-800 capitalize">
        View Poll
      </h3>
      <div>
        <router-link
          v-if="canAct"
          :to="`${poll.id}/result`"
          class="inline-block btn btn-green"
        >
          View Result
        </router-link>
        <button
          v-if="canAct"
          class="btn btn-green"
          @click="showForm = true"
        >
          Edit Poll
        </button>
        <button
          v-if="canAct"
          class="btn btn-green"
          @click="showInviteForm"
        >
          Invite People
        </button>
        <button
          v-if="canAct"
          class="btn btn-danger"
          @click="removePoll"
        >
          Delete Poll
        </button>
      </div>
    </div>
    <div>
      <!-- <Loader v-if="$fetchState.pending" /> -->
      <!-- <div v-else-if="$fetchState.error" class="px-8 py-4">
        {{ $fetchState.error.message }}
      </div> -->
      <div>
        <poll-form
          v-if="showForm"
          :poll="poll"
          :edit="true"
          @cancel="showForm = false"
          @submit="editPoll"
        />
        <div v-else-if="!showForm && poll" class="px-8 py-4">
          <div class="leading-loose">
            <div class="flex text-sm">
              <p class="w-1/5 mr-2 font-bold">
                Name:
              </p>
              {{ poll.name }}
            </div>
            <div class="flex text-sm">
              <p class="w-1/5 mr-2 font-bold">
                Description:
              </p>
              {{ poll.description }}
            </div>
            <div v-if="poll.publishStatus" class="flex text-sm">
              <p class="w-1/5 mr-2 font-bold">
                Is Poll live?
              </p>
              Yes
            </div>
            <div v-if="!poll.publishStatus" class="flex text-sm">
              <p class="w-1/5 mr-2 font-bold">
                From:
              </p>
              {{ poll.startDate }}
            </div>
            <div v-if="!poll.publishStatus" class="flex text-sm">
              <p class="w-1/5 mr-2 font-bold">
                To:
              </p>
              {{ poll.endDate }}
            </div>
            <div class="flex text-sm">
              <p class="w-1/5 mr-2 font-bold">
                Is Poll Public:
              </p>
              {{ poll.isPublic }}
            </div>
            <div class="flex text-sm">
              <p class="w-1/5 mr-2 font-bold">
                Is Anonymous:
              </p>
              {{ poll.isAnonymous }}
            </div>
            <div class="flex text-sm">
              <p class="w-1/5 mr-2 font-bold">
                Poll Link:
              </p>
              {{ getLink(poll.link) }}
            </div>
          </div>
          <p v-if="poll.questions.items.length" class="mt-4 text-lg">
            Questions
          </p>
          <table v-if="poll.questions.items.length" class="w-full mt-4 table-auto">
            <thead>
              <tr>
                <th class="px-4 py-2">
                  Question
                </th>
                <th class="px-4 py-2">
                  Options
                </th>
                <th class="px-4 py-2">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(question, key) in poll.questions.items" :key="key">
                <td class="px-4 py-2 border">
                  {{ question.question }}
                </td>
                <td class="px-4 py-2 border">
                  <ul class="ml-4 list-disc">
                    <li
                      v-for="(option, index) in question.options"
                      :key="index"
                    >
                      {{ option }}
                    </li>
                  </ul>
                </td>
                <td class="w-32 px-4 py-2 border">
                  <img
                    src="/images/icons/edit.svg"
                    class="float-left w-4 mr-4"
                    @click="initEditQuestion(key)"
                  >
                  <img
                    src="/images/icons/trash.svg"
                    class="float-left w-4 mr-4"
                    @click="deleteQuestion(question.id, key)"
                  >
                </td>
              </tr>
            </tbody>
          </table>
          <question-form
            :questions-length="poll.questions && poll.questions.items.length"
            :question-edit="questionEdit"
            @save="save"
          />
        </div>
        <div v-else-if="showResult">
          View result
        </div>
      </div>
    </div>
    <modal name="invitation-form" height="auto" :min-height="400">
      <invitation-form @close="closeInvitation" />
    </modal>
  </div>
</template>

<script>
import { API } from 'aws-amplify'
import { getPoll } from '../../../../src/graphql/queries'
import {
  updatePoll,
  deletePoll,
  createPollQuestion,
  updatePollQuestion,
  deletePollQuestion
} from '../../../../src/graphql/mutations'
import PollForm from '../../../../components/Poll/Form'
import QuestionForm from '../../../../components/Poll/QuestionForm'
import InvitationForm from '../../../../components/Poll/InvitationForm'

export default {
  name: 'PollDashboard',
  layout: 'dashboard',
  validate ({ params }) {
    return params.id.length >= 4
  },
  components: {
    // Loader,
    PollForm,
    InvitationForm,
    QuestionForm
  },
  fetch () {
    this.getPollDetails()
  },
  data () {
    return {
      showForm: false,
      poll: null,
      questionEdit: null,
      showResult: true
    }
  },
  computed: {
    canAct () {
      return this.poll && this.poll.id && !this.showForm
    }
  },
  methods: {
    async getPollDetails () {
      const poll = await API.graphql({
        query: getPoll,
        variables: {
          id: this.$route.params.id
        }
      })
      this.poll = poll.data.getPoll
    },
    save ({ question, options }, isEdit) {
      if (isEdit) {
        return this.editQuestion(
          question,
          options,
          this.questionEdit.id,
          this.questionEdit.index
        )
      }
      this.addQuestion(question, options)
    },

    async addQuestion (question, options) {
      const { data } = await API.graphql({
        query: createPollQuestion,
        variables: {
          input: {
            pollId: this.$route.params.id,
            question,
            options
          }
        }
      })
      const { questions } = this.poll
      questions.items.push(data.createPollQuestion)
      this.$set(this.poll, 'questions', questions)
    },

    async editQuestion (question, options, questionId, index) {
      await API.graphql({
        query: updatePollQuestion,
        variables: {
          input: {
            id: questionId,
            pollId: this.$route.params.id,
            question,
            options
          }
        }
      })
      this.questionEdit = null
      const { questions } = this.poll
      questions.items[index] = { ...questions.items[index], question, options }
      this.$set(this.poll, 'questions', questions)
    },

    async deleteQuestion (questionId, index) {
      await API.graphql({
        query: deletePollQuestion,
        variables: {
          input: {
            id: questionId
          }
        }
      })
      const { questions } = this.poll
      questions.items.splice(index, 1)
      this.$set(this.poll, 'questions', questions)
    },

    async editPoll (poll) {
      const editedPoll = { ...poll, id: this.$route.params.id }
      try {
        await API.graphql({
          query: updatePoll,
          variables: {
            input: editedPoll
          }
        })
        this.poll = { ...this.poll, ...editedPoll }
        this.showForm = false
      } catch (error) {
        this.$toast.error('An error occurred while editing the poll')
      }
    },

    async removePoll () {
      try {
        await API.graphql({
          query: deletePoll,
          variables: {
            input: {
              id: this.poll.id
            }
          }
        })
        this.$nuxt.$router.push('/dashboard/poll')
      } catch (error) {
        this.$toast.error('An error occurred while deleting the poll')
      }
    },

    initEditQuestion (index) {
      this.questionEdit = { ...this.poll.questions.items[index], index }
      const content = document.querySelector('.content')
      content.scrollTop = content.scrollHeight
    },

    showInviteForm () {
      this.$modal.show('invitation-form')
    },

    closeInvitation () {
      this.$modal.hide('invitation-form')
    },

    getLink (link) {
      return `https://${window.location.host}/vote/poll/${link}`
    }
  }
}
</script>

<style scoped>
.label {
  width: 100px;
}
</style>
