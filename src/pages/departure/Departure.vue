<template>
    <div class="main-container">
      <!-- Filter Input -->
      <div class="filter-container">
        <div class="input-wrapper">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Enter flight name"
            class="filter-input"
          />
          <span class="input-icon">🔍</span>
        </div>
      </div>
  
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th rowspan="2">Flight Information</th>
              <th colspan="4">Cabin</th>
              <th rowspan="2">Special Service</th>
            </tr>
            <tr>
              <th>J</th>
              <th>C</th>
              <th>W</th>
              <th>Y</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="flight in filteredFlights"
              :key="flight.id"
              @click="openModal(flight)"
            >
              <td>
                {{ flight.flt }} ({{ flight.dep || "Unknown" }} to {{ flight.dest || "Unknown" }})
              </td>
              <td>{{ extractCabin(flight.cabin_vip) }}</td>
              <td>{{ extractCabin(flight.cabin_business) }}</td>
              <td>{{ extractCabin(flight.cabin_comfort) }}</td>
              <td>{{ extractCabin(flight.cabin_econom) }}</td>
              <td>{{ formatMealService(flight.meal_service) || "N/A" }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Modal component -->
      <div v-if="isModalVisible" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <h2>Passenger List for Flight ID: {{ selectedFlightId }}</h2>
          <table v-if="passengers.length">
            <thead>
              <tr>
                <th>№</th>
                <th>Service</th>
                <th>CL</th>
                <th>SSR</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(passenger, index) in passengers"
                :key="passenger.id"
                @click="showPassengerDetails(passenger)"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ passenger.meal_code || 'N/A' }}</td>
                <td>{{ passenger.meal_class || 'N/A' }}</td>
                <td>{{ passenger.ssr_code || 'N/A' }}</td>
                <td>{{ passenger.pax || 'N/A' }}</td>
              </tr>
            </tbody>
          </table>
          <p v-else>No passengers available for this flight.</p>
          <button @click="closeModal">Close</button>
        </div>
      </div>
  
      <!-- Passenger Detail Modal -->
      <div v-if="isPassengerModalVisible" class="modal-overlay" @click="closePassengerModal">
        <div class="modal-content" @click.stop>
          <h2>Passenger Details</h2>
          <p><strong>Name:</strong> {{ selectedPassenger.pax }}</p>
          <p><strong>Meal Code:</strong> {{ selectedPassenger.meal_code }}</p>
          <p><strong>Meal Class:</strong> {{ selectedPassenger.meal_class }}</p>
          <p><strong>SSR Code:</strong> {{ selectedPassenger.ssr_code }}</p>
          <button @click="closePassengerModal">Close</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import api from "@/services/api";
  
  export default {
    name: "Departure",
    data() {
      return {
        flights: [],
        searchQuery: "",
        isModalVisible: false,
        isPassengerModalVisible: false,
        selectedFlightId: null,
        passengers: [],
        selectedPassenger: {}, // To store the selected passenger details
      };
    },
    computed: {
      filteredFlights() {
        const query = this.searchQuery.toLowerCase();
        return this.flights.filter(flight =>
          flight.flt.toLowerCase().includes(query)
        );
      },
    },
    async mounted() {
      try {
        const authResponse = await axios.post(
          "http://fdm.asg.az:8080/meals/api/auth/login",
          {
            username: "murad123",
            password: "murad123",
          },
          {
            headers: {
              "Content-Type": "application/json",
            }
          }
        );
  
        const responseToken = authResponse.data.token;
        localStorage.setItem("token", responseToken);
  
        const headers = {
          Authorization: `Bearer ${responseToken}`,
        };
  
        const response = await axios.get(
          "http://fdm.asg.az:8080/meals/api/v1/flight/dep",
          { headers }
        );
  
        this.flights = response.data.data || [];
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    },
    methods: {
      extractCabin(cabinInfo) {
        return cabinInfo || "N/A";
      },
      formatMealService(mealService) {
        return mealService ? mealService.replace(/,/g, " ") : "N/A";
      },
      async openModal(flight) {
        this.selectedFlightId = flight.id;
        this.isModalVisible = true;
  
        try {
          const responseToken = localStorage.getItem("token");
          const headers = {
            Authorization: `Bearer ${responseToken}`,
          };
  
          const passengerResponse = await api.get(
            `/v1/passenger?flight_id=${flight.id}`,
            { headers }
          );
  
          this.passengers = passengerResponse.data.data || [];
        } catch (error) {
          console.error("Error fetching passenger data:", error);
          this.passengers = []; // Reset passengers on error
        }
      },
      closeModal() {
        this.isModalVisible = false;
        this.selectedFlightId = null;
        this.passengers = []; // Clear passengers on close
      },
      showPassengerDetails(passenger) {
        this.selectedPassenger = passenger;
        this.isPassengerModalVisible = true;
      },
      closePassengerModal() {
        this.isPassengerModalVisible = false;
        this.selectedPassenger = {};
      }
    },
  };
  </script>
  
  <style scoped>
  .main-container {
    padding: 20px;
    border-radius: 12px;
    background-color: #e9f1f7;
  }
  
  .filter-container {
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-start; /* Align to the left */
  }
  
  .input-wrapper {
    position: relative;
    display: inline-flex; /* Align input and icon horizontally */
    align-items: center;
    outline: none;
  }
  
  .filter-input {
    width: 200px; /* Adjust width for compact design */
    padding: 8px 30px 8px 12px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 14px;
    outline: none;
    transition: border-color 0.3s ease;
  }
  
  .filter-input:focus {
    border-color: #1F5ED7;
  }
  
  .input-icon {
    position: absolute;
    right: 10px;
    font-size: 16px;
    color: #aaa;
  }
  
  .table-container {
    overflow-x: auto;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    margin-top: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  thead {
    background: #1F5ED7;
    color: #fff;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: center;
    font-size: 15px;
    line-height: 1.6;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  th {
    font-weight: bold;
    text-transform: uppercase;
  }
  
  tbody tr:nth-child(even) {
    background-color: #f7f9fc;
  }
  tbody tr:nth-child(even):hover {
    background-color: #519ff3;
  }
  
  tr:hover {
    background-color: #519ff3;
    color: #fff;
    cursor: pointer;
    transform: scale(1.02);
  }
  
  td {
    font-size: 14px;
    line-height: 1.6;
  }
  
  /* Modal styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px); /* Add blur effect */
    z-index: 999; /* Ensure it's above other content */
  }
  
  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    max-width: 500px;
    width: 100%;
    max-height: 80vh; /* Limit the modal height */
    overflow-y: auto; /* Enable vertical scrolling */
    z-index: 1000; /* Ensure it's above the overlay */
  }
  
  .modal-content h2 {
    margin-top: 0;
  }
  
  .modal-content table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
  }
  
  .modal-content th,
  .modal-content td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  .modal-content th {
    background-color: #1F5ED7;
  }
  
  .modal-content button {
    margin-top: 20px;
    padding: 10px 20px;
    background: #1F5ED7;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .modal-content button:hover {
    background: #0056b3;
  }
  </style>
  
  