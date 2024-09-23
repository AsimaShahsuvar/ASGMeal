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
              {{ flight.flt }} ({{ flight.dep || "Unknown" }} to
              {{ flight.dest || "Unknown" }})
            </td>
            <td>{{ extractCabin(flight.cabin_vip) }}</td>
            <td>{{ extractCabin(flight.cabin_business) }}</td>
            <td>{{ extractCabin(flight.cabin_comfort) }}</td>
            <td>{{ extractCabin(flight.cabin_econom) }}</td>
            <!-- Show icons next to meal names in Special Service column -->
            <td>
              <span
                v-for="meal in formatMealService(flight.meal_service).split(
                  ','
                )"
                :key="meal"
              >
                {{ meal }}
              </span>
            </td>
            <!-- <td>{{ formatMealService(flight.meal_service) }}</td> -->

            <!-- <td>
              {{ formatMealService(" AVML,CHML,HNML,KSML,VJML,VLML,SFML,RVML") }}
            </td> -->
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
              <td>{{ passenger.meal_code || "N/A" }}</td>
              <td>{{ passenger.meal_class || "N/A" }}</td>
              <td>{{ passenger.ssr_code || "N/A" }}</td>
              <td>{{ passenger.pax || "N/A" }}</td>
            </tr>
          </tbody>
        </table>
        <p v-else>No passengers available for this flight.</p>
        <button @click="closeModal">Close</button>
      </div>
    </div>

    <!-- Passenger Detail Modal -->
    <div
      v-if="isPassengerModalVisible"
      class="modal-overlay"
      @click="closePassengerModal"
    >
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
      // isPassengerModalVisible: false,
      selectedFlightId: null,
      passengers: [],
      selectedPassenger: {}, // To store the selected passenger details
    };
  },
  computed: {
    filteredFlights() {
      const query = this.searchQuery.toLowerCase();
      return this.flights.filter((flight) =>
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
          },
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

    getMealIcon(mealCode) {
      const mealIcons = {
        AVML: "🥗", // Asian Vegetarian Meal
        CHML: "🍗", // Child Meal
        HNML: "🍖", // Hindu Meal
        KSML: "🥓", // Kosher Meal
        VJML: "🥬", // Vegetarian Jain Meal
        VLML: "🌱", // Vegetarian Lacto-Ovo Meal
        SFML: "🐟", // Seafood Meal
        RVML: "🍠", // Raw Vegetarian Meal
        // Add more mappings as needed
      };

      return mealIcons[mealCode] || ""; // Default icon if not found
    },

    formatMealService(mealService) {
      if (!mealService) return "N/A";

      // Split the meal codes and return with the corresponding icons
      return mealService
        .split(",")
        .map((meal) => {
          const trimmedMeal = meal.trim();
          const icon = this.getMealIcon(trimmedMeal); // Get the corresponding icon
          return `${icon} ${trimmedMeal}`; // Icon followed by meal code
        })
        .join(", "); // Use ", " as the separator between meals
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
  },
};
</script>

<style scoped>
.main-container {
  padding: 20px;
  border-radius: 12px;
  background: linear-gradient(
    135deg,
    #e9f1f7,
    #ffffff
  ); /* Light gradient background */
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
  border-radius: 8px; /* Rounded edges for softer look */
  border: 1px solid #ccc;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease;
}

.filter-input:focus {
  border-color: #1f5ed7;
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
  background-color: #fff;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}

thead {
  background: linear-gradient(135deg, #1f5ed7, #004aad); /* Gradient header */
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 1; /* Ensure the header is above other content */
}

th,
td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
  font-size: 15px;
  line-height: 1.6;
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    transform 0.3s ease; /* Add transform transition */
}

th {
  font-weight: bold;
  text-transform: uppercase;
}

/* tbody tr:nth-child(even) {
  background-color: #f7f9fc;
}

tbody tr:nth-child(even):hover,
tr:hover {
  color: #fff;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
}

tbody tr:nth-child(even):hover,
tr:hover {
  background: #558ee4;
} */

tbody tr:hover {
  background: #558ee4;
  color: #fff;
}

tbody tr:hover td {
  background: #66aaff;
}

thead th {
  background-color: #1f5ed7;
  color: #fff;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

td {
  font-size: 14px;
  line-height: 1.6;
}

.modal-content button:hover {
  background: linear-gradient(135deg, #1f5ed7, #0056b3); /* Gradient hover */
  transition: background 0.3s ease;
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
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* Deeper shadow for modal */
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
  background-color: #1f5ed7;
  color: white;
}

.modal-content button {
  margin-top: 20px;
  padding: 10px 20px;
  background: #1f5ed7;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.meal-item {
  display: inline-block;
  margin-right: 8px; /* Spacing between items */
  font-size: 14px; /* Adjust font size as needed */
}
</style>
