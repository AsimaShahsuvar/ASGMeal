<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="input-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Enter your username"
          required
        />
      </div>

      <div class="input-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Enter your password"
          required
        />
      </div>

      <button type="submit" class="login-button">Login</button>
    </form>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MealLogin",
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post(
          "http://fdm.asg.az:8080/meals/api/auth/login",
          {
            username: this.username,
            password: this.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            }
          }
        );

        const token = response.data.token;
        localStorage.setItem("token", token);
        
        this.$router.push({ name: "meal" }); // Redirect to the meal page
      } catch (error) {
        this.errorMessage = "Invalid username or password.";
      }
    }
  }
};
</script>


<style scoped>
.login-container {
  width: 500px;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

h2 {
  text-align: center;
  margin-bottom: 25px;
  color: #1f5ed7;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
}

.input-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus,
input[type="password"]:focus {
  border-color: #1f5ed7;
  outline: none;
}

.login-button {
  width: 100%;
  padding: 14px;
  background-color: #1f5ed7;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #154ebd;
}

.error-message {
  margin-top: 15px;
  color: red;
  text-align: center;
  font-weight: bold;
  font-family: 'Arial', sans-serif;
}
</style>
