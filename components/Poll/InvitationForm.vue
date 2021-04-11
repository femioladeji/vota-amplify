<template>
  <div class="p-4">
    <h3 class="font-semibold text-md mb-1">
      Invite People
    </h3>
    <p class="text-gray-600 mb-4">
      You can invite people via email to respond to this poll
    </p>
    <vue-tags-input
      v-model="email"
      placeholder="Add emails"
      class="w-full mb-4 invitation-emails"
      :tags="allEmails"
      :validation="validateEmail"
      @tags-changed="update"
    />
    <button type="submit" class="btn btn-xs btn-green">
      Send Invitation
    </button>
  </div>
</template>

<script>
// import { createInvitation } from '../../src/graphql/mutations'

export default {
  name: 'InvitationForm',
  data () {
    return {
      email: '',
      allEmails: []
    }
  },
  computed: {
    validateEmail () {
      return [{
        classes: 'valid',
        rule ({ text }) {
          if (text) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return !re.test(text.toLowerCase())
          }
        },
        disableAdd: true
      }]
    }
  },
  methods: {
    update (option) {
      console.log(option)
    }
  }
}
</script>

<style lang="css" scoped>
.vue-tags-input {
  max-width: 100% !important;
}
.invitation-emails .ti-input {
  @apply text-sm w-full border border-gray-400 rounded p-2;
}
</style>
