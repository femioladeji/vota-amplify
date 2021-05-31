<template>
  <div class="p-4">
    <h3 class="font-semibold text-md mb-1">
      Invite People
    </h3>
    <p class="text-gray-600 mb-4">
      You can invite people via email to respond to this poll (comma separated)
    </p>
    <vue-tags-input
      v-model="email"
      placeholder="Add emails"
      class="w-full mb-4 invitation-emails"
      :tags="allEmails"
      :validation="validateEmail"
      :add-on-key="[13, ',', ';']"
      @tags-changed="update"
    />
    <button type="submit" class="btn btn-xs btn-green" :disabled="sending" @click="sendInvitation">
      Send Invitation
    </button>

    <div class="my-2 max-h-10 overflow-y-auto">
      <div v-if="!existingInvitations">
        Loading...
      </div>
      <div v-else-if="existingInvitations.length">
        <h4 class="text-xl text-center">
          Already Invited
        </h4>
        <div
          v-for="(invitation, index) in existingInvitations"
          :key="index"
          class="py-2 border-b flex justify-between items-center"
        >
          <span>{{ invitation.email }}</span>
          <button @click="deleteInvitation(invitation.id, index)">
            <img src="../../static/images/icons/trash.svg" class="w-4 h-4">
          </button>
        </div>
      </div>
      <div v-else>
        No invitations yet
      </div>
    </div>
  </div>
</template>

<script>
import { API } from 'aws-amplify'
import { createInvitation, deleteInvitation } from '../../src/graphql/mutations'
import { listInvitations } from '../../src/graphql/queries'

export default {
  name: 'InvitationForm',
  fetch () {
    this.getInvitations()
  },
  data () {
    return {
      email: '',
      allEmails: [],
      sending: false,
      existingInvitations: null
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
    async getInvitations () {
      try {
        const { data } = await API.graphql({
          query: listInvitations,
          variables: {
            pollId: this.$route.params.id
          }
        })
        this.existingInvitations = data.listInvitations.items
      } catch (error) {
        console.log(error)
      }
    },
    update (option) {
      this.allEmails = option
    },
    async sendInvitation () {
      this.sending = true
      try {
        const sentEmails = this.allEmails.map(({ text }) => API.graphql({
          query: createInvitation,
          variables: {
            input: {
              pollId: this.$route.params.id,
              email: text
            }
          }
        }))
        await Promise.all(sentEmails)
        this.$toast.success(`${sentEmails.length} invitations successfully sent`)
        this.$emit('close')
      } catch (error) {
        return this.$toast.error('An error occurred while sending invitation')
      } finally {
        this.sending = false
      }
    },
    async deleteInvitation (id, index) {
      try {
        await API.graphql({
          query: deleteInvitation,
          variables: { input: { id } }
        })
        this.existingInvitations.splice(index, 1)
      } catch (error) {
        this.$toast.error('An error occurred while deleting the invitation')
      }
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
