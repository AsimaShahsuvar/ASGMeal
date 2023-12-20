<template>
  <nav class="navbar navbar-expand-custom navbar-mainbg" aria-hidden="true">
    <a class="navbar-brand navbar-logo" href="#">planing.asg.az</a>
    <button class="navbar-toggler" type="button" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
      <i class="fa fa-bars text-white"></i>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <div class="hori-selector" style="top: 0px; left: 15px; height: 60px; width: 89px;">
          <div class="left"></div>
          <div class="right"></div>
        </div>

        <li class="nav-item">
          <a class="nav-link" href="/checkin"><i class="fa fa-car" aria-hidden="true"></i>Checkin</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/realflight"><i class="fa fa-home" aria-hidden="true"></i>Ramp</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="/dispatcher"><i class="fa fa-plane" aria-hidden="true"></i>Dispatcher</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/supervisor"><i class="fa fa-plane" aria-hidden="true"></i>Supervisor</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="/cleaning"><i class="fa fa-plane" aria-hidden="true"></i>Cleaning</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/pushback"><i class="fa fa-plane" aria-hidden="true"></i>PushBack</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/addsupervisor"><i class="fa fa-plane" aria-hidden="true"></i>Add Supervisor to
            Flight</a>
        </li>

      </ul>
    </div>
  </nav>
</template>
<script setup>
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {computed, onMounted, ref} from 'vue'

const route = useRoute()
const router = useRouter()
const store = useStore()

const logout = () => {
  store.dispatch('auth/LOGOUT')
}

let activeIndex = ref('')

onMounted(async () => {
  await router.isReady()
  activeIndex.value = route.name

  let Script = document.createElement("script");
  Script.setAttribute("src", "/assets/js/menu.js");
  document.head.appendChild(Script);
})

const routeName = computed(() => {
  const routes = {
    '/users': 'Клиенты',
    '/internal-users': 'Модераторы',
  }
  return routes[route.path]
})

const getNameFirstLetter = () => {
  return store.getters['auth/GET_USER_NAME_FIRST_LETTER']
}

const showUserPanel = () => {
  store.commit('theme/CHANGE_USER_PANEL')
}

</script>
<style>

@import url("https://fonts.googleapis.com/css?family=Roboto");

body {
  font-family: "Roboto", sans-serif;
}

* {
  margin: 0;
  padding: 0;
}

i {
  margin-right: 10px;
}

/*----------bootstrap-navbar-css------------*/
.navbar-logo {
  padding: 15px;
  color: #fff;
}

.navbar-mainbg {
  background-color: #003a70;
  padding: 0px;
}

#navbarSupportedContent {
  overflow: hidden !important;
  position: relative;
}

#navbarSupportedContent ul {
  padding: 0px;
  margin: 0px;
}

#navbarSupportedContent ul li a i {
  margin-right: 10px;
}

#navbarSupportedContent li {
  list-style-type: none;
  float: left;
}

#navbarSupportedContent ul li a {
  color: white;
  text-decoration: none;
  font-size: 15px;
  display: block;
  padding: 20px 20px;
  transition-duration: 0.6s;
  transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  position: relative;
}

#navbarSupportedContent > ul > li.active > a {
  color: #5161ce;
  background-color: transparent;
  transition: all 0.7s;
}

#navbarSupportedContent a:not(:only-child):after {
  content: "\f105";
  position: absolute;
  right: 20px;
  top: 10px;
  font-size: 14px;
  font-family: "Font Awesome 5 Free";
  display: inline-block;
  padding-right: 3px;
  vertical-align: middle;
  font-weight: 900;
  transition: 0.5s;
}

#navbarSupportedContent .active > a:not(:only-child):after {
  transform: rotate(90deg);
}

.hori-selector {
  display: inline-block;
  position: absolute;
  height: 100%;
  top: 0px;
  left: 0px;
  transition-duration: 0.6s;
  transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  background-color: #fff;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  margin-top: 10px;
}

.hori-selector .right,
.hori-selector .left {
  position: absolute;
  width: 25px;
  height: 25px;
  background-color: #fff;
  bottom: 10px;
}

.hori-selector .right {
  right: -25px;
}

.hori-selector .left {
  left: -25px;
}

.hori-selector .right:before,
.hori-selector .left:before {
  content: "";
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #003a70;
}

.hori-selector .right:before {
  bottom: 0;
  right: -25px;
}

.hori-selector .left:before {
  bottom: 0;
  left: -25px;
}

@media (min-width: 992px) {
  .navbar-expand-custom {
    -ms-flex-flow: row nowrap;
    flex-flow: row nowrap;
    -ms-flex-pack: start;
    justify-content: flex-start;
  }

  .navbar-expand-custom .navbar-nav {
    -ms-flex-direction: row;
    flex-direction: row;
  }

  .navbar-expand-custom .navbar-toggler {
    display: none;
  }

  .navbar-expand-custom .navbar-collapse {
    display: -ms-flexbox !important;
    display: flex !important;
    -ms-flex-preferred-size: auto;
    flex-basis: auto;
  }
}

@media (max-width: 991px) {
  #navbarSupportedContent ul li a {
    padding: 12px 30px;
  }

  .hori-selector {
    margin-top: 0px;
    margin-left: 10px;
    border-radius: 0;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
  }

  .hori-selector .left,
  .hori-selector .right {
    right: 10px;
  }

  .hori-selector .left {
    top: -25px;
    left: auto;
  }

  .hori-selector .right {
    bottom: -25px;
  }

  .hori-selector .left:before {
    left: -25px;
    top: -25px;
  }

  .hori-selector .right:before {
    bottom: -25px;
    left: -25px;
  }
}

.navbar {
  border-radius: 0px !important;
  margin-bottom: 15px;
  border-bottom: 0px solid;
}


</style>
