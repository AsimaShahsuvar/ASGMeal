<template>
  <nav
    :class="['navbar', 'navbar-expand-custom', 'navbar-mainbg']"
    aria-hidden="true"
  >
    <button
      class="navbar-toggler"
      type="button"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fa fa-bars text-white"></i>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <div
          class="hori-selector"
          style="top: 0px; left: 15px; height: 60px; width: 89px"
        >
          <div class="left"></div>
          <div class="right"></div>
        </div>
        

        <li class="nav-item">
          <a class="nav-link" href="/meal"
            ><i class="fa fa-plane" aria-hidden="true"></i>Meal</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/table"
            ><i class="fa fa-plane" aria-hidden="true"></i>Supervisor</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/departure"
            ><i class="fa fa-plane" aria-hidden="true"></i>Departure</a
          >
        </li>
      </ul>

      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" href="google.com" @click.prevent="logout"
            >LogOut</a
          >
        </li>
      </ul>
    </div>
  </nav>

  <!-- Rest of your component template -->
  <div class="main-container">
    <!-- Table content here -->
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";

const route = useRoute();
const router = useRouter();
const store = useStore();
const navbarVisible = ref(false);
const logout = () => {
  router.push("/mealLogin"); // Redirect to login page after logout
  localStorage.clear();
  
};

onMounted(() => {
  if (!localStorage.getItem("token")) {
    router.push("/mealLogin");
  } else {

  }
});

// Check localStorage and set navbar visibility on component mount
// onMounted(() => {
//   const token = localStorage.getItem("token");
//   navbarVisible.value = token; // Set navbar visibility based on token presence

//   if (!token) {
//     router.push("/mealLogin");
//   }
//   else{
//     navbarVisible.value='false'
//   }
// });

let activeIndex = ref("");

onMounted(async () => {
  if (!localStorage.getItem("token")) {
    router.push("/mealLogin");
  } else {
  }

  activeIndex.value = route.name;

  let Script = document.createElement("script");
  Script.setAttribute("src", "/assets/js/menu.js");
  document.head.appendChild(Script);
});

const routeName = computed(() => {
  const routes = {
    "/users": "Клиенты",
    "/internal-users": "Модераторы",
  };
  return routes[route.path];
});

const getNameFirstLetter = () => {
  return store.getters["auth/GET_USER_NAME_FIRST_LETTER"];
};

const showUserPanel = () => {
  store.commit("theme/CHANGE_USER_PANEL");
};
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

/* Navbar Styling */
.navbar-logo {
  padding: 10px; /* Reduced padding */
  color: #fff;
  font-size: 20px; /* Smaller font size */
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px; /* Reduced letter-spacing */
}

.navbar-mainbg {
  background: linear-gradient(
    90deg,
    #002f5d 0%,
    #004b8d 100%
  ); /* Enhanced gradient */
  padding: 10px 20px; /* Reduced padding for a more compact look */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* Adjusted shadow */
}

#navbarSupportedContent {
  overflow: hidden !important;
  position: relative;
  width: 100%;
}

#navbarSupportedContent ul {
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#navbarSupportedContent ul li {
  list-style-type: none;
  margin-right: 15px; /* Reduced margin between items */
  position: relative;
}

#navbarSupportedContent ul li:last-child {
  margin-right: 0;
}

#navbarSupportedContent ul li a {
  color: #e0e0e0;
  text-decoration: none;
  font-size: 14px; /* Smaller font size */
  display: flex;
  align-items: center;
  padding: 10px 15px; /* Reduced padding */
  transition: all 0.3s ease;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

#navbarSupportedContent ul li a:hover {
  background-color: #004b8d;
  color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* Enhanced Active Navbar Item */
#navbarSupportedContent > ul > li.active > a {
  color: #fff;
  background-color: #003a70; /* Dark background for active item */
  border-bottom: 3px solid #ffab00; /* Bright underline */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.hori-selector {
  display: inline-block;
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  transition-duration: 0.3s;
  background-color: rgba(255, 255, 255, 0.2);
  margin-top: 5px;
  z-index: -1;
}

.hori-selector .right,
.hori-selector .left {
  position: absolute;
  width: 20px; /* Smaller width */
  height: 20px; /* Smaller height */
  bottom: 10px;
}

.hori-selector .right {
  right: -20px;
}

.hori-selector .left {
  left: -20px;
}

.hori-selector .right:before,
.hori-selector .left:before {
  content: "";
  position: absolute;
  width: 40px; /* Smaller diameter */
  height: 40px; /* Smaller diameter */
  border-radius: 50%;
  background-color: #003a70;
}

.hori-selector .right:before {
  bottom: 0;
  right: -20px;
}

.hori-selector .left:before {
  bottom: 0;
  left: -20px;
}

@media (min-width: 992px) {
  .navbar-expand-custom {
    flex-flow: row nowrap;
    justify-content: flex-start;
  }

  .navbar-expand-custom .navbar-nav {
    flex-direction: row;
  }

  .navbar-expand-custom .navbar-toggler {
    display: none;
  }

  .navbar-expand-custom .navbar-collapse {
    display: flex !important;
    justify-content: space-between;
  }
}

@media (max-width: 991px) {
  #navbarSupportedContent ul li a {
    padding: 10px 20px; /* Reduced padding for mobile view */
  }

  .hori-selector {
    margin-top: 0;
    margin-left: 10px;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
  }

  .hori-selector .left,
  .hori-selector .right {
    right: 10px;
  }

  .hori-selector .left {
    top: -20px;
    left: auto;
  }

  .hori-selector .right {
    bottom: -20px;
  }

  .hori-selector .left:before {
    left: -20px;
    top: -20px;
  }

  .hori-selector .right:before {
    bottom: -20px;
    left: -20px;
  }
}

.navbar {
  margin-bottom: 15px;
  border-bottom: 0px solid;
}
</style>
