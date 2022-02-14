<template>
  <form class="upload_video_form" @submit.prevent="uploadVideo">
    <input type="file" id="input" @change="uploadVideo1" ref="video">
    <div class="video__data__item">
      <h1 class="video__data__item__title">title</h1>
      <input class="video__data__item__input" v-model="title" type="text" placeholder="title"
             id="title">
    </div>
    <div class="video__data__item">
      <h1 class="video__data__item__title">description</h1>
      <input class="video__data__item__input" v-model="description" type="text" placeholder="description"
             id="description">
    </div>
    <div class="input__item">
      <button class="input__item__button">upload video</button>
    </div>
  </form>
</template>

<script>
import {ip} from '../main'

const access_token = localStorage.getItem('access_token')
const user_pk = localStorage.getItem('user_pk')

export default {
  name: "upload_video",
  data() {
    return {
      title: '',
      description: '',
      video: null
    }
  },
  methods: {
    async uploadVideo1() {
      this.videos = this.$refs.video.files[0]
    },
    async uploadVideo() {
      let formData = new FormData();
      formData.append('file', this.videos);
      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('bucket_path', '/');

      const response = await fetch(`http://${ip}/api/video/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${access_token}`,
        },
        body: formData
      })
      await this.$router.push('/')
    }
  },
  async submitUploadVideoHandler() {

  },
}
</script>

<style scoped>
.upload_video_form {
  margin: 20px auto;
  width: 50%;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  background-color: rgba(0, 0, 0, .1);
}

.video__data__item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 5px;
  border-bottom: 0.1px solid;
  border-color: white;
}

.video__data__item__title {
  color: black;
}

.video__data__item__description {
  padding-top: 8px;
  color: black;
}

.video__data__item__input {
  background-color: rgba(0, 0, 0, .2);
  border: none;
  right: 0;
  border-radius: 20px;
  padding-left: 15px;
  color: white;
}
</style>