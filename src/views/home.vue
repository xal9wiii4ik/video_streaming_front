<template>
  <div class="videos">
    <video-item
        v-for="video in videos"
        v-bind:key="video.id"
        v-bind:video="video">
    </video-item>
  </div>
</template>

<script>
import {ip} from '../main'
import videoItem from '@/components/video-item'

const access_token = localStorage.getItem('access_token')
const user_pk = localStorage.getItem('user_pk')

export default {
  name: "home",
  data() {
    return {
      videos: [],
    }
  },
  async mounted() {
    await this.getVideos()
  },
  components: {'video-item': videoItem},
  methods: {
    async getVideos() {
      const response = await fetch(`http://${ip}/api/video/`, {
        method: 'GET',
      })

      if (response.status === 200) {
        this.videos = await response.json()
      }
    },
  }
}
</script>

<style scoped>
.videos {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>