<template>
  <div>
    <div class="flex items-center justify-between px-8 py-4 border-b border-gray-300">
      <h3 class="text-lg text-gray-800 capitalize">
        All Polls
      </h3>
      <nuxt-link to="/dashboard/poll/create" class="btn btn-green">
        Create Poll
      </nuxt-link>
    </div>
    <div class="px-8 py-4">
      <table class="w-full p-4 table-auto">
        <thead>
          <tr>
            <th class="px-4 py-2">
              Name
            </th>
            <th class="px-4 py-2">
              Description
            </th>
            <th class="px-4 py-2">
              Active Status
            </th>
            <th class="px-4 py-2">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="poll in polls" :key="poll.id">
            <td class="px-4 py-2 border">
              {{ poll.name }}
            </td>
            <td class="px-4 py-2 border">
              {{ poll.description }}
            </td>
            <td class="px-4 py-2 border">
              {{ poll.publishStatus ? 'ON' : 'OFF' }}
            </td>
            <td class="px-4 py-2 border">
              <nuxt-link
                class="text-blue-600"
                :to="`/dashboard/poll/${poll.id}`"
              >
                View
              </nuxt-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { API } from 'aws-amplify'
import { listPolls } from '../../../src/graphql/queries'

export default {
  name: 'Poll',
  layout: 'dashboard',
  async fetch () {
    const polls = await API.graphql({
      query: listPolls
    })
    this.polls = polls.data.listPolls.items
  },
  data () {
    return {
      polls: []
    }
  }
}
</script>
