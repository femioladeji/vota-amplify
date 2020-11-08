<template>
  <form @submit.prevent="submitForm">
    <div class="flex justify-between px-8 py-4">
      <div class="w-2/5">
        <div class="flex items-center mt-4">
          <label for="name" class="w-1/5 text-sm">Name</label>
          <input
            id="name"
            v-model="name"
            required
            class="input-field"
            type="text"
            name="name"
          >
        </div>
        <div class="flex items-center mt-4">
          <label for="description" class="w-1/5 text-sm">Description</label>
          <textarea
            id="description"
            v-model="description"
            required
            class="input-field description-field"
            type="text"
            name="description"
          />
        </div>
        <div class="flex items-center mt-4">
          <label for="publish" class="w-1/5 text-sm">Live Now?</label>
          <toggle-button v-model="publishStatus" />
        </div>
        <div v-if="!publishStatus" class="flex items-center mt-4">
          <label for="startDate" class="w-1/5 text-sm">Start</label>
          <div class="flex justify-between w-full">
            <input
              id="startDate"
              v-model="startDate"
              required
              class="w-2/5 mr-4 input-field"
              type="date"
              name="startDate"
            >
            <input
              id="startTime"
              v-model="startTime"
              required
              class="w-2/5 input-field"
              type="time"
              format="hh:mm"
              name="startTime"
            >
          </div>
        </div>
        <div v-if="!publishStatus" class="flex items-center my-4">
          <label for="endDate" class="w-1/5 text-sm">End</label>
          <div class="flex justify-between w-full">
            <input
              id="startDate"
              v-model="endDate"
              required
              class="w-2/5 mr-4 input-field"
              type="date"
              name="startDate"
            >
            <input
              id="startTime"
              v-model="endTime"
              required
              class="w-2/5 input-field"
              type="time"
              format="hh:mm"
              name="startTime"
            >
          </div>
        </div>
      </div>
      <div class="w-2/5">
        <div class="flex items-center mt-4">
          <label for="publish" class="w-2/5 text-sm">Make Public?</label>
          <toggle-button v-model="isPublic" />
        </div>
        <div class="flex items-center mt-4">
          <label for="publish" class="w-2/5 text-sm">Make Anonymous?</label>
          <toggle-button v-model="isAnonymous" />
        </div>
        <p v-if="error" class="mt-4 text-sm text-red-500">
          {{ error }}
        </p>
      </div>
    </div>
    <div class="w-full px-8 py-4 bg-gray-200">
      <div class="flex items-center">
        <input type="submit" :value="caption" class="btn btn-green">
        <input
          type="button"
          value="Cancel"
          class="ml-4 text-green-700 border border-green-700 btn"
          @click="$emit('cancel')"
        >
      </div>
    </div>
  </form>
</template>

<script>
import { format } from 'date-fns'

export default {
  name: 'PollForm',
  props: {
    poll: {
      type: Object,
      default: () => ({})
    },
    actionError: {
      type: String,
      default: ''
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const {
      name,
      description,
      startDate,
      endDate,
      publishStatus,
      isPublic,
      isAnonymous
    } = this.poll
    return {
      name,
      description,
      startDate: format(new Date(startDate), 'yyyy-MM-dd'),
      startTime: format(new Date(startDate), 'HH:mm'),
      endDate: format(new Date(endDate), 'yyyy-MM-dd'),
      endTime: format(new Date(endDate), 'HH:mm'),
      isPublic,
      publishStatus,
      isAnonymous,
      error: this.actionError
    }
  },
  computed: {
    caption () {
      return this.edit ? 'Save Poll' : 'Create Poll'
    }
  },
  methods: {
    submitForm () {
      const {
        name,
        description,
        startDate,
        startTime,
        endDate,
        endTime,
        isPublic,
        publishStatus,
        isAnonymous
      } = this
      const startDateTime = new Date(startDate)
      startDateTime.setHours(startTime.split(':')[0], startTime.split(':')[1])
      const endDateTime = new Date(endDate)
      endDateTime.setHours(endTime.split(':')[0], endTime.split(':')[1])
      this.$emit('submit', {
        name,
        description,
        startDate: publishStatus ? null : startDateTime,
        endDate: publishStatus ? null : endDateTime,
        isPublic,
        publishStatus,
        isAnonymous
      })
    }
  }
}
</script>
