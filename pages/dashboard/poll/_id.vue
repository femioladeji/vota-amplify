<template>
  <div>
    <div
      class="flex items-center justify-between px-8 py-4 border-b border-gray-300"
    >
      <h3 class="text-lg text-gray-800 capitalize">
        View Poll
      </h3>
      <div>
        <button
          v-if="poll && poll.id && !showForm"
          class="btn btn-green"
          @click="showForm = true"
        >
          Edit Poll
        </button>
        <button
          v-if="poll && poll.id && !showForm"
          class="btn btn-green"
          @click="showInviteForm"
        >
          Invite People
        </button>
      </div>
    </div>
    <div>
      <!-- <Loader v-if="$fetchState.pending" /> -->
      <!-- <div v-else-if="$fetchState.error" class="px-8 py-4">
        {{ $fetchState.error.message }}
      </div> -->
      <div>
        <!-- <Invitation v-if="poll" :poll-id="poll.id" /> -->
        <!-- <poll-form
          v-if="showForm"
          :poll="poll"
          :edit="true"
          @cancel="showForm = false"
          @submit="editPoll"
        /> -->
        <div v-if="!showForm && poll" class="px-8 py-4">
          <div class="leading-loose">
            <div class="flex text-sm">
              <p class="w-1/4 mr-2 font-bold">
                Name:
              </p>
              {{ poll.name }}
            </div>
            <div class="flex text-sm">
              <p class="w-1/4 mr-2 font-bold">
                Description:
              </p>
              {{ poll.description }}
            </div>
            <div v-if="poll.publishStatus" class="flex text-sm">
              <p class="w-1/4 mr-2 font-bold">
                Is Poll live?
              </p>
              Yes
            </div>
            <div v-if="!poll.publishStatus" class="flex text-sm">
              <p class="w-1/4 mr-2 font-bold">
                From:
              </p>
              {{ poll.startDate }}
            </div>
            <div v-if="!poll.publishStatus" class="flex text-sm">
              <p class="w-1/4 mr-2 font-bold">
                To:
              </p>
              {{ poll.endDate }}
            </div>
            <div class="flex text-sm">
              <p class="w-1/4 mr-2 font-bold">
                Is Poll Public:
              </p>
              {{ poll.isPublic }}
            </div>
            <div class="flex text-sm">
              <p class="w-1/4 mr-2 font-bold">
                Is Anonymous:
              </p>
              {{ poll.isAnonymous }}
            </div>
            <div class="flex text-sm">
              <p class="w-1/4 mr-2 font-bold">
                Link:
              </p>
              {{ poll.link }}
            </div>
          </div>
          <!-- <p v-if="poll.questions.length" class="mt-4 text-lg">
            Questions
          </p>
          <table v-if="poll.questions.length" class="w-full mt-4 table-auto">
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
              <tr v-for="(question, key) in poll.questions" :key="key">
                <td class="px-4 py-2 border">
                  {{ question.question }}
                </td>
                <td class="px-4 py-2 border">
                  <ul class="ml-4 list-disc">
                    <li
                      v-for="(option, index) in question.options"
                      :key="index"
                    >
                      {{ option.name }}
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
          </table> -->
          <!-- <question-form
            :questions-length="poll.questions.length"
            :question-edit="questionEdit"
            @save="save"
          /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API } from 'aws-amplify'
import { getPoll } from '../../../src/graphql/queries'
// import PollForm from '../../../components/Poll/Form'
export default {
  name: 'PollDashboard',
  layout: 'dashboard',
  validate ({ params }) {
    return params.id.length >= 4
  },
  components: {
    // Loader,
    // PollForm
    // Invitation,
    // QuestionForm
  },
  async fetch () {
    const poll = await API.graphql({
      query: getPoll,
      variables: {
        id: this.$route.params.id
      }
    })
    this.poll = poll.data.getPoll
  },
  data () {
    return {
      showForm: false,
      poll: null,
      questionEdit: null
    }
  },
  methods: {
    save ({ question, description, options }, isEdit) {
      if (!question) {
        return
      }
      if (options.length < 2) {
        return
      }
      if (isEdit) {
        return this.editQuestion(
          question,
          description,
          options,
          this.questionEdit.id,
          this.questionEdit.index
        )
      }
      this.addQuestion(question, description, options)
    },

    async addQuestion (question, description, options) {

    },

    async editQuestion (question, description, options, questionId, index) {
    },

    async deleteQuestion (questionId, index) {
    },

    async editPoll (poll) {
    },

    initEditQuestion (index) {
    },

    showInviteForm () {
    }
  }
}
</script>

<style scoped>
.label {
  width: 100px;
}
</style>
