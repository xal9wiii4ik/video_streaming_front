<template>
  <div class="container">
    <div class="nav_bar">
      <a class="nav_bar__link">
        <h4 class="nav_bar__link__text">My Videos</h4>
      </a>
      <a class="nav_bar__link" @click="this.getAccount()">
        <h4 class="nav_bar__link__text">My Account</h4>
      </a>
    </div>
    <div class="my_account" v-if="is_vue_my_account">
      <div class="my_account__data">
        <div class="my_account__data__items">
          <div class="my_account__data__item">
            <h1 class="my_account__data__item__title">username</h1>
            <h3 class="my_account__data__item__description" v-if="!is_update_data">{{ this.username }}</h3>
            <input class="my_account_data__item__input" v-model="username" type="text" placeholder="username"
                   id="username" v-if="is_update_data">
          </div>
          <div class="my_account__data__item">
            <h1 class="my_account__data__item__title">email</h1>
            <h3 class="my_account__data__item__description" v-if="!is_update_data">{{ this.email }}</h3>
            <input class="my_account_data__item__input" v-model="email" type="email" placeholder="email" id="email"
                   v-if="is_update_data">
          </div>
          <div class="my_account__data__item">
            <h1 class="my_account__data__item__title">first_name</h1>
            <h3 class="my_account__data__item__description" v-if="!is_update_data">{{ this.first_name }}</h3>
            <input class="my_account_data__item__input" v-model="first_name" type="text" placeholder="first_name"
                   id="first_name" v-if="is_update_data">
          </div>
          <div class="my_account__data__item">
            <h1 class="my_account__data__item__title">last_name</h1>
            <h3 class="my_account__data__item__description" v-if="!is_update_data">{{ this.last_name }}</h3>
            <input class="my_account_data__item__input" v-model="last_name" type="text" placeholder="last_name"
                   id="last_name" v-if="is_update_data">
          </div>
          <div class="my_account__data__item">
            <h1 class="my_account__data__item__title">password</h1>
            <h3 class="my_account__data__item__description" v-if="!is_update_data">{{ this.password }}</h3>
            <input class="my_account_data__item__input" v-model="password" type="password" placeholder="password"
                   id="password" v-if="is_update_data">
          </div>
        </div>
      </div>
      <a class="my_account__update" v-if="!is_update_data" @click="is_update_data=!is_update_data">update account</a>
      <a class="my_account__update" v-if="is_update_data" @click="update_account()">confirm update</a>
    </div>
  </div>
</template>

<script>
import {ip} from '../main'

export default {
  name: "account",
  data() {
    return {
      username: '',
      password: '*****************',
      email: '',
      first_name: '',
      last_name: '',
      is_vue_my_account: false,
      is_update_data: false
    }
  },
  methods: {
    async update_account() {
      const user_pk = localStorage.getItem('user_pk')
      const access_token = localStorage.getItem('access_token')

      const data = {
        username: this.username,
        email: this.email,
        first_name: this.first_name,
        last_name: this.last_name,
        password: this.password,
      }

      const response = await fetch(`http://${ip}/api/account/${user_pk}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Token ${access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const response_data = await response.json()
      console.log(this.username)
      if (response.status === 200) {
        this.username = response_data.username
        this.email = response_data.email
        this.first_name = response_data.first_name
        this.last_name = response_data.last_name
        this.is_update_data = false
      }
    },
    async getAccount() {
      this.is_vue_my_account = true
      try {
        const user_pk = localStorage.getItem('user_pk')
        const access_token = localStorage.getItem('access_token')

        this.username = localStorage.getItem('username')

        const response = await fetch(`http://${ip}/api/account/${user_pk}/`, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${access_token}`
          }
        })
        const data = await response.json()
        if (response.status === 200) {
          this.username = data.username
          this.email = data.email
          this.first_name = data.first_name
          this.last_name = data.last_name
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
  width: 70%;
}

.nav_bar {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 20px;
  padding-bottom: 20px;
}

.nav_bar__link {
  padding-top: 20px;
}

.nav_bar__link__text:hover {
  color: white;
  text-decoration: none;
  font-size: 20px;
  text-transform: uppercase;
  font-family: sans-serif;
  padding: 9px 22px;
  transition: 0.3s;
}

.nav_bar__link__text {
  font-size: 20px;
  color: black;
}

.my_account {
  display: flex;
  flex-direction: column;
}

.my_account__data {
  padding-top: 30px;
  display: flex;
  justify-content: center;
  text-align: center;
}

.my_account__data__items {
  width: 60%;
}

.my_account__data__item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 5px;
  border-bottom: 0.1px solid;
  border-color: white;
}

.my_account__data__item__title {
  color: black;
}

.my_account__data__item__description {
  padding-top: 8px;
  color: black;
}

.my_account_data__item__input {
  background-color: rgba(0, 0, 0, .2);
  border: none;
  right: 0;
  border-radius: 20px;
  padding-left: 15px;
  color: white;
}

.my_account__update {
  margin: 25px 0;
  font-size: 30px;
  color: black;
}

.my_account__update:hover {
  text-transform: uppercase;
  font-family: sans-serif;
  padding: 9px 22px;
  transition: 0.3s;
  color: white;
}
</style>