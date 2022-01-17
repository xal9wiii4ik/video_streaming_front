<template>
  <div class="container">
    <form class="sign_up_form" @submit.prevent="submitSignUpHandler">
      <div>
        <h3 class="sign_up__title">sign up</h3>
      </div>
      <div class="shadow-message-wrapper">
        <div class="shadow-message">
          <h2><span class="shadow-message-text"></span></h2>
        </div>
      </div>
      <div class="input__items">
        <div class="input__item">
          <h3 class="input__item__text">username</h3>
          <input v-model="username" type="text" class="input__item__input" placeholder="username" id="username"
                 required="true">
        </div>
        <div class="input__item">
          <h3 class="input__item__text">email</h3>
          <input v-model="email" type="text" class="input__item__input" placeholder="email" required="true">
        </div>
        <div class="input__item">
          <h3 class="input__item__text">password</h3>
          <input v-model="password" type="password" class="input__item__input" placeholder="password" id="password"
                 required="true">
        </div>
        <div class="input__item">
          <h3 class="input__item__text">repeat password</h3>
          <input v-model="repeat_password" type="password" class="input__item__input" placeholder="repeat_password"
                 required="true">
        </div>
        <div class="input__item">
          <h3 class="input__item__text">first name</h3>
          <input v-model="first_name" type="text" class="input__item__input" placeholder="first_name">
        </div>
        <div class="input__item">
          <h3 class="input__item__text">last name</h3>
          <input v-model="last_name" type="text" class="input__item__input" placeholder="last_name">
        </div>
        <div class="input__item">
          <button class="input__item__button">sign up</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {ip} from '../main'

export default {
  name: "sign_up",
  data() {
    return {
      username: '',
      password: '',
      email: '',
      repeat_password: '',
      first_name: '',
      last_name: ''
    }
  },
  methods: {
    async submitSignUpHandler() {
      try {
        const data = {
          username: this.username,
          password: this.password,
          repeat_password: this.repeat_password,
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email
        }
        const response = await fetch(`http://${ip}/auth/register/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        const response_data = await response.json()
        if (response.status === 200) {
          const token_response = await fetch(`http://${ip}/auth/token/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          const token_data = await token_response.json()
          if (token_response.status === 200) {
            localStorage.setItem('access_token', token_data.access_token)
            localStorage.setItem('refresh_token', token_data.refresh_token)
            localStorage.setItem('username', data.username)
            localStorage.setItem('user_pk', response_data.id)
            await this.$router.push('/')
            location.reload()
          }
        } else {
          const messageBox = document.querySelector(".shadow-message-wrapper");
          const messageText = document.querySelector(".shadow-message-text");
          messageBox.classList.add("show");
          messageBox.classList.remove("hide");
          messageText.innerHTML = response_data.ValidationError;
        }
      } catch (e) {
        alert(e);
      }
    },
  },
}
</script>
<style scoped>
.shadow-message-wrapper {
  display: none;
}

.shadow-message {
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding-left: 15px;
}

.shadow-message-text {
  font-size: 16px;
  color: white;
}

.sign_up_form {
  margin: 20px auto;
  width: 50%;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  background-color: rgba(0, 0, 0, .1);
}

.sign_up__title {
  padding-top: 10px;
  color: #000;
  text-transform: uppercase;
  font-size: 25px;
}

.input__items {
  display: flex;
  flex-direction: column;
  padding: 15px;
}

.input__item {
  padding-top: 10px;
  padding-bottom: 10px;
}

.input__item__text {
  color: black;
  font-size: 15px;
  text-transform: uppercase;
  text-align: left;
  padding-bottom: 10px;
}

.input__item__input {
  outline: none;
  width: 100%;
  border-radius: 100px;
  border-color: transparent;
  font-size: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  background-color: rgba(180, 180, 180, .5);
  color: white;
  text-decoration: none;
}

.input__item__button {
  width: 70%;
  color: white;
  border-radius: 100px;
  background-color: rgba(255, 20, 147, .7);
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
  font-size: 20px;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.input__item__txt {
  font-size: 20px;
  color: rgb(180, 180, 180);
}

.hide {
  display: none;
}

.show {
  display: block;
}

</style>
