<template>
  <div class="w-full start-background">
    <div class="container flex items-center justify-between mx-auto">
      <div class="intro-text">
        <p class="text-4xl">
          Lorem ipsum dolor sit amet
        </p>
        <p class="mt-4 leading-7 text-green-700">
          Tortor cursus egestas eu sit malesuada. Quis sed tortor non bibendum.
          Ullamcorper varius felis nisi augue. Amet vulputate congue etiam dis
          lacinia dignissim nunc convallis id. Auctor augue mauris at enim,
          proin. Platea montes, sapien nunc sed
        </p>
      </div>
      <div class="w-2/5 p-8 flip-card">
        <div class="transform flip-inner" :class="{flipped: isFlipped}">
          <login class="absolute w-full h-full p-8 bg-white front" @flip="flip" />
          <register class="absolute w-full h-full p-8 bg-white back" @flip="flip" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'
import Register from '@/components/Auth/Register'
import Login from '@/components/Auth/Login'

export default {
  name: 'Start',
  components: {
    Register,
    Login
  },
  async middleware ({ redirect }) {
    if (process.client) {
      try {
        await Auth.currentAuthenticatedUser()
        redirect('/dashboard')
      } catch (error) {
        this.$toast.error('An error occurred')
      }
    }
  },
  data () {
    return {
      isFlipped: false
    }
  },
  methods: {
    flip () {
      this.isFlipped = !this.isFlipped
    }
  }
}
</script>

<style scoped>
.container {
  min-height: calc(100vh - 60px);
}
.start-background {
  background-image: url('/images/background.png');
  background-size: cover;
  min-height: calc(100vh - 60px);
}
.intro-text {
  max-width: 413px;
}
.flip-card {
  background-color: transparent;
  height: 530px;
  perspective: 1000px;
}
.flip-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}
.front, .back {
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}
.back {
  transform: rotateY(180deg);
}
.flipped {
  transform: rotateY(180deg);
}
</style>
