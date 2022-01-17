<template>
  <div id="nav">
    <nav class="header__nav">
      <ul class="header__list">
        <li class="header__list__item">
          <router-link class="header__list__link" to="/">
            <h4 class="header__list__link">Home</h4>
          </router-link>
        </li>
        <li v-if="!is_login" class="header__list__item">
          <router-link class="header__list__link" to="/sign_up">
            <h4 class="header__list__link">sign up</h4>
          </router-link>
        </li>
        <li v-if="!is_login" class="header__list__item">
          <router-link class="header__list__link" to="/sign_in">
            <h4 class="header__list__link">sign in</h4>
          </router-link>
        </li>
        <li class="header__list__item">
          <a v-if="is_login" v-on:click="logout" class="header__list__link">
            <h4 class="header__list__link">logout</h4>
          </a>
        </li>
      </ul>
    </nav>
    <div v-if="is_login" class="profile">
      <router-link class="header__list__link" to="/account">
        <h4 class="header__list__link">{{ username }}</h4>
      </router-link>
    </div>
  </div>
  <router-view/>
</template>

<script>
import {ip} from "./main";

export default {
  name: 'App',
  data() {
    return {
      is_login: false,
      username: ''
    }
  },
  async mounted() {
    await this.getLogin()
    await this.check_access_token()
  },
  methods: {
    async check_access_token() {
      let access_token_expire = localStorage.getItem('access_token_expire') * 60
      let last_login_delta = Math.ceil((new Date().getTime() - new Date(localStorage.last_login).getTime()) / 1000)
      if (localStorage.last_login !== undefined && localStorage.last_login && (access_token_expire - last_login_delta) > -(access_token_expire / 4)) {
        setInterval(() => {
          if (localStorage.last_login !== undefined && localStorage.last_login) {
            if ((access_token_expire - last_login_delta) < access_token_expire / 4) {
              try {
                const data = {
                  refresh_token: localStorage.getItem('refresh_token')
                }
                fetch(`http://${ip}/auth/token_refresh/`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(data)
                }).then(token_response => {
                  return token_response.json();
                }).then(token_data => {
                      localStorage.setItem('access_token', token_data.access_token)
                      localStorage.setItem('refresh_token', token_data.refresh_token)
                      localStorage.setItem('access_token_expire', token_data.access_token_expire)
                      localStorage.setItem('last_login', new Date())
                    }
                )
              } catch (e) {
                alert(e);
              }
            }
          }
        }, localStorage.getItem('access_token_expire') * 60 * 1000 / 4)
      } else {
        this.is_login = false
      }
    },
    async getLogin() {
      if (localStorage.getItem('access_token')) {
        this.is_login = true
        this.username = localStorage.getItem('username')
      } else {
        this.is_login = false
      }
    },
    async logout() {
      localStorage.clear()
      this.is_login = false
      await this.$router.push('/sign_in')
    }
  }
}
</script>

<style>

input::placeholder {
  color: black;
  font-style: italic;
}

html {
  scroll-behavior: smooth;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}

body {
  min-height: 100vh;
  overflow-x: hidden;
  background-color: rgba(0, 0, 0, .7);
}

a {
  text-decoration: none;
  cursor: pointer;
}

.container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  text-align: center;
}

button {
  text-decoration: none;
  cursor: pointer;
  border: none;
  color: white;
  background-color: rgba(255, 20, 147, .7);
  padding: 15px;
  text-align: center;
  margin-left: 10px;
  font-size: 15px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding-top: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid;
  border-color: white;
  display: flex;
  flex-direction: row;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.header__nav {
  text-transform: uppercase;
  padding: 5px;
  width: 90%;
}

.header__list {
  list-style-type: none;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
}

.header__list__item {
  padding-left: 40px;
}

.header__list__link:hover {
  color: white;
  transition: 0.3s;
}

.header__list__link {
  color: black;
  text-transform: uppercase;
  font-size: 15px;
}
</style>
