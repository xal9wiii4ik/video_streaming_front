<template>
  <div class="video__item">
    <router-link class="header__list__link" :to="`/video-detail/${this.video.id}`">
      <video controls="controls" v-if="is_valid_video" class="video__item__video">
        <source
            :src="`${video.bucket_path}`"
            type="video/mp4"
            @error="imageLoadError()"
        >
      </video>
      <div class="video__item__info">
        <h4 class="video__item__info__item__title">{{ video.title }}</h4>
        <h4 class="video__item__info__item__date">Upload date: {{ this.videoPrescription }}</h4>
      </div>
    </router-link>
  </div>
</template>

<script>
import {ip} from "../main";

export default {
  name: "video-item",
  data() {
    return {
      is_valid_video: true,
      videoPrescription: 'today'
    }
  },
  props: {
    video: {
      type: Object,
      required: true,
      default: () => {
      },
    }
  },
  async mounted() {
    await this.getVideoPrescription()
  },
  methods: {
    async imageLoadError() {
      this.is_valid_video = false
    },
    async getVideoPrescription() {
      if (this.video.upload_date) {
        const currentDate = new Date()
        const time = new Date(this.video.upload_date)

        var days = Math.ceil(Math.abs(time.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
        var year = Math.floor(days / 365);
        var months = Math.floor((days - (year * 365)) / 30);

        if (year > 0) {
          this.videoPrescription = `${year} years ago`
          return ''
        }
        if (months > 0) {
          this.videoPrescription = `${months} months ago`
          return ''
        }
        if (days > 1) {
          this.videoPrescription = `${days} days ago`
          return ''
        }
      }
    }
  }
}
</script>

<style scoped>
.video__item {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30%;
  text-align: left;
}

.video__item__info {
  padding-top: 10px;
}

.video__item__info__item__title {
  color: white;
  overflow-x: hidden;
  font-size: 20px;
}

.video__item__info__item__date {
  font-size: 13px;
  color: gray;
  padding-top: 5px;
}
</style>