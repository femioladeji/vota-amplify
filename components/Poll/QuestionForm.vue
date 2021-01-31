<template>
  <form @submit.prevent="save">
    <div v-if="showQuestionForm" class="w-full mt-4 -ml-2 md:w-1/3">
      <input
        id="question"
        v-model="question"
        placeholder="Question"
        required
        class="w-2/5 mb-4 input-field"
        type="text"
        name="question"
      >
      <vue-tags-input
        v-model="tagOption"
        placeholder="Add options"
        :tags="options"
        class="w-full mb-4"
        @tags-changed="update"
      />
    </div>
    <div class="mt-4">
      <button
        v-if="!showQuestionForm"
        type="button"
        class="btn btn-green btn-xs"
        @click="showQuestionForm = true"
      >
        {{ buttonCaption }}
      </button>
      <div v-if="showQuestionForm">
        <button
          type="submit"
          class="mr-3 btn btn-xs btn-green"
        >
          Save
        </button>
        <button
          type="button"
          class="btn btn-white btn-xs"
          @click="cancel"
        >
          Cancel
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'QuestionForm',
  props: {
    questionsLength: {
      type: Number,
      default: 0
    },
    questionEdit: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  data () {
    return {
      showQuestionForm: false,
      question: this.initialQuestion,
      description: this.initialDescription,
      tagOption: '',
      options: this.initialOptions
    }
  },
  computed: {
    buttonCaption () {
      if (!this.questionsLength) {
        return 'Add first question'
      }
      return 'Add question'
    },
    initialQuestion () {
      if (this.questionEdit) {
        return this.questionEdit.question
      }
      return ''
    },
    initialDescription () {
      if (this.questionEdit) {
        return this.questionEdit.description
      }
      return ''
    },
    initialOptions () {
      if (this.questionEdit) {
        return this.questionEdit.options.map(option => ({ text: option }))
      }
      return []
    }
  },
  watch: {
    questionEdit: {
      immediate: true,
      handler (newValue) {
        this.question = this.initialQuestion
        this.description = this.initialDescription
        this.options = this.initialOptions
        if (newValue) {
          this.showQuestionForm = true
          return
        }
        this.showQuestionForm = false
      }
    }
  },
  methods: {
    resetFields () {
      this.question = ''
      this.description = ''
      this.options = []
    },
    save () {
      if (!this.question) {
        return this.$toast.error('You must enter a question')
      }
      if (this.options.length < 2) {
        return this.$toast.error('You must have at least two options')
      }
      this.showQuestionForm = false
      this.$emit(
        'save',
        {
          question: this.question,
          options: this.options.map(e => e.text)
        },
        !!this.questionEdit
      )
      this.resetFields()
    },
    update (options) {
      this.options = options
    },
    cancel () {
      this.resetFields()
      this.showQuestionForm = false
    }
  }
}
</script>

<style lang="css">
.vue-tags-input {
  max-width: 100% !important;
}
.vue-tags-input .ti-input {
  @apply text-sm ml-2 w-full border border-gray-400 rounded p-2;
}
</style>
