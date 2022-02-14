<template>
  <div class="container" v-if="isGotData">
    <div class="my_video__data__items" v-if="is_update_data">
      <div class="my_video__data__item">
        <h1 class="my_video__data__item__title">title</h1>
        <input class="my_video__data__item__input" v-model="title" type="text" placeholder="video_title"
               id="video_title" v-if="is_update_data">
      </div>
      <div class="my_video__data__item">
        <h1 class="my_video__data__item__title">description</h1>
        <input class="my_video__data__item__input" v-model="description" type="text" placeholder="video_description"
               id="video_description"
               v-if="is_update_data">
      </div>
    </div>
    <div class="update_video_data" v-if="isOwner">
      <a class="my_video__update" v-if="!is_update_data" @click="is_update_data=!is_update_data">update video
        data</a>
      <a class="my_video__update" v-if="is_update_data" @click="updateVideoData()">confirm update</a>
    </div>
    <div class="video__item" v-if="!is_update_data">
      <video controls="controls" v-if="is_valid_video" class="video__item__video">
        <source
            :src="`${this.bucket_path}`"
            type="video/mp4"
            @error="imageLoadError()"
        >
      </video>
      <div class="video__item__info">
        <h3 class="video__item__title">{{ this.title }}</h3>
        <h4 class="video__item__upload_date">upload date: {{ this.uploadDate }}</h4>

        <div class="video__item__detail">
          <h4 class="video__item__detail__owner_username">{{ this.video_owner_username }}</h4>
          <h4 class="video__item__description_not_full" v-if="!isFullDescription">{{ this.description }}</h4>
          <h4 class="video__item__description_full" v-if="isFullDescription">{{ this.description }}</h4>
        </div>
        <a class="video__item__description_details" v-if="!isFullDescription"
           @click="isFullDescription=!isFullDescription">More details</a>
        <a class="video__item__description_details" v-if="isFullDescription"
           @click="isFullDescription=!isFullDescription">Close details</a>
      </div>
    </div>
  </div>
</template>

<script>
import {ip} from "../main";

const access_token = localStorage.getItem('access_token')
const username = localStorage.getItem('username')

export default {
  name: "video-detail",
  data() {
    return {
      id: this.$route.params.id,
      isFullDescription: false,
      isGotData: false,
      is_valid_video: true,
      bucket_path: '',
      title: '',
      description: '',
      uploadDate: '',
      video_owner_username: '',
      isOwner: false,
      is_update_data: false
    }
  },
  async mounted() {
    await this.getVideo()
  },
  methods: {
    async imageLoadError() {
      this.is_valid_video = false
    },
    async updateVideoData() {
      this.is_update_data = false
      const data = {
        title: this.title,
        description: this.description
      }

      const response = await fetch(`http://${ip}/api/video/${this.id}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Token ${access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const response_data = await response.json()
      if (response.status === 200) {
        this.title = response_data.title
        this.description = response_data.description
      }
    },
    async getVideo() {
      try {
        let headers = {}
        if (access_token === ''){
          headers = {}
        }else {
          headers = {
            'Authorization': `Token ${access_token}`
          }
        }

        const response = await fetch(`http://${ip}/api/video/${this.id}/`, {
          method: 'GET',
          headers: headers
        })
        const responseData = await response.json()
        console.log(responseData)
        if (response.status === 200) {
          this.isGotData = true
          this.bucket_path = responseData.bucket_path
          this.description = responseData.description
          this.title = responseData.title
          this.video_owner_username = responseData.username

          if (this.video_owner_username === username) {
            this.isOwner = true
          }

          if (responseData.upload_date) {
            this.uploadDate = new Date(responseData.upload_date)

            var options = {year: 'numeric', month: 'long', day: 'numeric'}

            this.uploadDate = this.uploadDate.toLocaleDateString('de-DE', options)
          } else {
            this.uploadDate = 'today'
          }
        }
      } catch (e) {
        alert(e);
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.update_video_data {
  padding-top: 20px;
}

.my_video__data__items {
  padding-top: 20%;
  width: 60%;
}

.my_video__data__item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 5px;
  border-bottom: 0.1px solid;
  border-color: white;
}

.my_video__data__item__title {
  color: black;
}

.my_video__data__item__input {
  background-color: rgba(0, 0, 0, .2);
  border: none;
  right: 0;
  border-radius: 20px;
  padding-left: 15px;
  color: white;
}

.video__item {
  padding-top: 30px;
  width: 60%;
}

.video__item__video {
  width: 100%;
  height: 60%;
}

.video__item__info {
  text-align: left;
}

.video__item__title {
  padding-top: 15px;
  color: white;
  font-size: 25px;
  word-break: break-all;
}

.video__item__upload_date {
  color: gray;
  padding-top: 10px;
  padding-bottom: 10px;
}

.video__item__detail__owner_username {
  color: white;
  font-size: 20px;
}

.video__item__description_not_full {
  color: white;
  font-size: 20px;
  overflow: hidden;
  height: 1.2em;
  line-height: 1.2em;
}

.video__item__description_full {
  color: white;
  font-size: 20px;
  word-break: break-all;
}

.video__item__description_details {
  padding-top: 10px;
  color: gray;
}

.my_video__update {
  margin: 25px 0;
  font-size: 30px;
  color: black;
}

.my_video__update:hover {
  text-transform: uppercase;
  font-family: sans-serif;
  padding: 9px 22px;
  transition: 0.3s;
  color: white;
}
</style>