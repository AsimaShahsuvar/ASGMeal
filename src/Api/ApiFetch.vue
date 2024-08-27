<template>
    <div>
      <h1>API Fetch Example</h1>
      <div v-if="data">
        <pre>{{ data }}</pre>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "ApiFetch",
    data() {
      return {
        data: null, // To store the fetched data
      };
    },
    async mounted() {
      const token =
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtdXJhZDEyMyIsImV4cCI6MTczOTI1MjQ4MCwiaWF0IjoxNzIzNzAwNDgwfQ.h_2SSp6zGy6mPgr745BcXcimMATKQSw9OnOiGDzo2Ca-6aXoorT3DTTdhw_Ao1p8Uc3wB1RNK3gHQshK_nbwTg";
      try {
        const response = await axios.get(
          "http://fdm.asg.az:8080/meals/api/auth/login",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.data = response.data; // Assign the fetched data to the data property
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  };
  </script>
  
  <style scoped>
  /* Add any necessary styles here */
  </style>
  