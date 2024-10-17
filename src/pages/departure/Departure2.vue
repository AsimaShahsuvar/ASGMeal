<template>
  <div class="main-container">
    <div class="panel-body">
      <div class="row">
        <div class="col-md-2" style="display: inherit; column-gap: 7px;">
          <div class="form-group">
            <input type="date" class="form-control" id="fromSt" v-model="selectedDate" @change="updateStartDate">
          </div>
          <button class="btn btn-primary" @click="changeDate('-')">Prev</button>
          <button class="btn btn-primary" @click="changeDate('+')">Next</button>
        </div>
        <div class="col-md-2">
          <div class="terminal" style="font-size: 18px" id="terminal">
            <fieldset style="display: inline-block">
              <input class="small-radio" type="radio" name="action" id="t1" value="dep" v-model="selectedRoute" @change="fetchData">
              <label for="track">DEP</label>
              <input class="small-radio" type="radio" name="action" id="t2" value="dest" v-model="selectedRoute" @change="fetchData">
              <label for="event">DEST</label>
            </fieldset>
          </div>
        </div>
        <div class="col-md-1">
          <div class="terminal" id="isInternational">

          </div>
        </div>
        <div class="col-md-2">
          <div class="terminal" id="isLocal">

          </div>
        </div>
        <div class="col-md-1">
          <div class="terminal" id="status">
          </div>
        </div>
        <div class="col-md-1">
        </div>
        <div class="col-md-3">
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
        </div>
      </div>
    </div>

    <div class="table-container">
      <table>
        <!--        <thead>-->
        <!--          <tr>-->
        <!--            <th rowspan="2" style="height: 80px; width: 50px"></th>-->
        <!--            <th rowspan="2">-->
        <!--              <div class="filter-container">-->
        <!--                <div class="input-wrapper">-->
        <!--                  <input-->
        <!--                    type="text"-->
        <!--                    v-model="searchQuery"-->
        <!--                    placeholder="Enter flight name"-->
        <!--                    class="filter-input"-->
        <!--                  />-->
        <!--                  <span class="input-icon">🔍</span>-->
        <!--                </div>-->
        <!--              </div>-->
        <!--            </th>-->
        <!--            <th rowspan="2" colspan="3">Cabin</th>-->
        <!--            <th class="special-service-header" rowspan="2">Special Service</th>-->
        <!--          </tr>-->
        <!--        </thead>-->

        <tbody>
        <tr>
          <th>
            #
          </th>
          <th>
            Flight
          </th>
          <th>
            Dest
          </th>
          <th>
            Dep
          </th>
          <th>
            Flt-Time
          </th>
          <th @click="openCabinModal('business')">C</th>
          <th @click="openCabinModal('comfort')">W</th>
          <th @click="openCabinModal('economy')">Y</th>
          <th style="width: 1000px!important;">
            Special Service
          </th>
        </tr>
        <tr
            v-for="(flight, index) in filteredFlights"
            :key="flight.id"
            @click="openCabinModal(1,flight)"
        >
          <td style="font-size: 24px" class="flight-number">
            <span class="flight-index">{{ index + 1 }}</span>
          </td>
          <td  class="flight-info">
             <span style="font-size: 24px" class="flight-info-text">
                {{flight.flt}}
             </span>
          </td>
          <td class="flight-info">
             <span style="font-size: 24px" class="flight-info-text">
                {{flight.dep}}
             </span>
          </td>
          <td class="flight-info">
             <span style="font-size: 24px" class="flight-info-text">
                {{flight.dest}}
             </span>
         </td>
          <td class="flight-info">
            <span style="font-size: 24px" class="flight-info-text">
             {{ formatFlightDate(flight.fltDt) }}
            </span>
          </td>
          <td style="font-size: 24px">
            {{ extractCabin(flight.cabin_business) }}
          </td>
          <td style="font-size: 24px">
            {{ extractCabin(flight.cabin_comfort) }}
          </td>
          <td style="font-size: 24px">
            {{ extractCabin(flight.cabin_econom) }}
          </td>
          <td >
              <span style="font-size: 18px"
                  v-for="(meal, mealIndex) in getMealArray(flight.meal_service)"
                  :key="mealIndex"
                  class="meal-item"
              >
                {{ meal }}
              </span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-if="isModalVisible" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h2>Flight Information</h2>
        <p><strong>Flight Number:</strong> {{ selectedFlight.flt }}</p>
        <p><strong>Departure:</strong> {{ selectedFlight.dep }}</p>
        <p><strong>Destination:</strong> {{ selectedFlight.dest }}</p>
        <p><strong>SSR Code:</strong> {{ selectedFlight.ssr_code }}</p>
        <table v-if="passengers.length > 0" class="passenger-table">
          <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>SSR</th>
            <th>Meal</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(passenger, index) in passengers" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ passenger.pax || "N/A" }}</td>
            <td>{{ passenger.ssr_code || "N/A" }}</td>
            <td>{{ passenger.meal || "N/A" }}</td>


          </tr>
          </tbody>
        </table>
        <p v-else>No passengers found for this flight.</p>
        <button @click="closeModal">Close</button>
      </div>
    </div>

    <!-- Meal Modal -->
    <div
        v-if="isMealModalVisible"
        class="modal-overlay"
        @click="closeMealModal"
    >
      <div class="modal-content" @click.stop>
        <h2>{{ selectedMeal }} Details</h2>
        <div class="meal-description">
          <span class="meal-icon">{{ selectedMeal}}</span>
          <span>{{ mealDetails }}</span>
        </div>
        <button @click="closeMealModal">Close</button>
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
      selectedDate: '',
      selectedRoute: 'dep',
      flights: [],
      searchQuery: "",
      isModalVisible: false,
      selectedFlight: {},
      passengers: [],
      isMealModalVisible: false,
      selectedMeal: "",
      mealDetails: "",
      mealTotals: {}, // Store meal counts
      mealDetailsMap: {
        CHML: "CHML", // Child Meal
        BBML: "BBML", // Baby Meal
        AVML: "AVML", // Asian Vegetarian Meal
        RVML: "RVML", // Raw Vegetarian Meal
        VGML: "VGML", // Vegetarian Vegan Meal
        VLML: "VLML", // Vegetarian Lacto-Ovo Meal
        NLML: "NLML", // Non-Lactose Meal
        VOML: "VOML", // Vegetarian Oriental Meal
        DBML: "DBML", // Diabetic Meal
        GFML: "GFML", // Gluten-Free Meal
        LFML: "LFML", // Low Fat Meal
        LSML: "LSML", // Low Salt Meal
        LCML: "LCML", // Low Calorie Meal
        LPML: "LPML", // Low Protein Meal
        PRML: "PRML", // Low Purine Meal
        HNML: "HNML", // Hindu Non-Vegetarian Meal
        KSML: "KSML", // Kosher Meal
        MOML: "MOML", // Muslim Meal
        ORML: "ORML", // Oriental Meal
        VJML: "VJML", // Vegetarian Jain Meal
        SFML: "SFML", // Seafood Meal
        BLML: "BLML", // Bland/Soft Meal
        FPML: "FPML", // Fruit Platter Meal
        NFML: "NFML", // No Fish Meal
        HFML: "HFML", // High Fiber Meal
      },
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
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    this.selectedDate = `${year}-${month}-${day}`;
    await this.fetchData()
  },





  methods: {
    async fetchData() {
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

        const date = this.selectedDate;
        const route = this.selectedRoute;

        const response = await axios.get(
            `http://fdm.asg.az:8080/meals/api/v1/flight/orders?date=${date}&route=${route}`,
            { headers }
        );
        this.flights = response.data.data || [];
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    },
    async updateStartDate() {
      await this.fetchData();
    },
    changeDate(direction) {
      const date = new Date(this.selectedDate);
      if (direction === '+') {
        date.setDate(date.getDate() + 1);
      } else {
        date.setDate(date.getDate() - 1);
      }
      this.selectedDate = date.toISOString().split('T')[0];
      this.fetchData();
    },
    formatFlightDate(dateString) {
      const date = new Date(dateString);
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    },


    extractCabin(cabinInfo) {
      return cabinInfo || "N/A";
    },

    formatFlightNumber(flightNumber) {
      const prefix = flightNumber.slice(0, 2);
      const suffix = flightNumber.slice(2);
      return `${prefix} - ${suffix}`;
    },

    countMealOccurrences(mealService, mealCode) {
      if (!mealService) return 0;
      const meals = mealService.split(",");
      return meals.filter((meal) => meal.includes(mealCode)).length;
    },

    // getMealIcon(mealCode) {
    //   const mealIcons = {
    //     AVML: "🥗", // Asian Vegetarian Meal
    //     CHML: "🍗", // Child Meal
    //     HNML: "🍖", // Hindu Non-Vegetarian Meal
    //     KSML: "🥓", // Kosher Meal
    //     VJML: "🥬", // Vegetarian Jain Meal
    //     VLML: "🌱", // Vegetarian Lacto-Ovo Meal
    //     SFML: "🐟", // Seafood Meal
    //     RVML: "🍠", // Raw Vegetarian Meal
    //     BBML: "👶", // Baby Meal
    //     VGML: "🥑", // Vegetarian Vegan Meal
    //     NLML: "🥛", // Non-Lactose Meal
    //     VOML: "🍜", // Vegetarian Oriental Meal
    //     DBML: "🍏", // Diabetic Meal
    //     GFML: "🍞", // Gluten-Free Meal
    //     LFML: "🥗", // Low Fat Meal
    //     LSML: "🧂", // Low Salt Meal
    //     LCML: "⚖️", // Low Calorie Meal
    //     LPML: "🍽️", // Low Protein Meal
    //     PRML: "🍒", // Low Purine Meal
    //     MOML: "🍛", // Muslim Meal
    //     ORML: "🍚", // Oriental Meal
    //     BLML: "🍲", // Bland/Soft Meal
    //     FPML: "🍉", // Fruit Platter Meal
    //     NFML: "🐠", // No Fish Meal
    //     HFML: "🌾", // High Fiber Meal
    //   };
    //   return mealIcons[mealCode] || "";
    // },

    formatMealService(mealService) {
      if (!mealService) return "N/A";
      return mealService
          .split(",")
          .map((meal) => {
            const trimmedMeal = meal.trim();
            return `${trimmedMeal}`;
          })
          .join(", ");
    },

    getMealArray(mealService) {
      const meals = mealService
          ? mealService.split(",").map((m) => {
            const trimmedMeal = m.trim();
            const mealParts = trimmedMeal.split("-");
            if (mealParts.length === 2) {
              return `${mealParts[1].trim()} - ${mealParts[0].trim()}`.trim();
            }
            return `${trimmedMeal}`.trim();
          })
          : [];

      return meals.filter(Boolean); // Filter out any empty or undefined values
    },

    async openCabinModal(cabinType, flight) {
      // Set the selected flight for the modal
      this.selectedFlight = flight;
      this.isModalVisible = true;

      try {
        const responseToken = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${responseToken}` };

        // Fetching passengers for the specific cabin in the selected flight
        const passengerResponse = await api.get(
            `/v1/passenger?flight_id=${flight.id}&cabin_type=${cabinType}`,
            { headers }
        );

        this.passengers = passengerResponse.data.data.map((passenger) => {
          const mealCode = passenger.meal_code; // Adjust based on actual structure
          return {
            ...passenger,
            meal: this.mealDetailsMap[mealCode] || "No Meal",
          };
        });
      } catch (error) {
        console.error("Error fetching passenger data for cabin:", error);
        this.passengers = [];
      }
    },

    openModal(flight) {
      this.selectedFlight = flight;
      this.isModalVisible = true;

      try {
        const responseToken = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${responseToken}` };

        // Fetching passengers for the selected flight
        const passengerResponse = api.get(
            `/v1/passenger?flight_id=${flight.id}`,
            { headers }
        );

        // Assuming passengerResponse.data.data contains an array of passengers
        this.passengers = passengerResponse.data.data.map((passenger) => {
          const mealCode = passenger.meal_code; // Adjust based on actual structure
          return {
            ...passenger,
            meal: this.mealDetailsMap[mealCode] || "No Meal",
          };
        });
      } catch (error) {
        console.error("Error fetching passenger data:", error);
        this.passengers = [];
      }
    },

    closeModal() {
      this.isModalVisible = false;
      this.selectedFlight = {};
    },

    openMealModal(mealCode, mealService) {
      const count = this.countMealOccurrences(mealService, mealCode);
      this.selectedMeal = mealCode;
      this.mealDetails = `${this.mealDetailsMap[mealCode] || "Details not available."} - Count: ${count}`;
      this.isMealModalVisible = true;
    },

    closeMealModal() {
      this.isMealModalVisible = false;
      this.selectedMeal = "";
      this.mealDetails = "";
    },
  },
};
</script>

<style scoped>

.flight-number {
  text-align: center;
  padding-left: 0;
}

.flight-index {
  font-weight: bold;
  margin-right: 0;
}

.flight-info {
  padding: 5px;
  margin: 0;
}

.flight-info-text {
  display: inline-block;
  vertical-align: middle;
  line-height: 1.2;
  font-size: 16px;
}

.main-container {
  padding: 2px;
  border-radius: 12px;
  background: linear-gradient(135deg, #e9f1f7, #ffffff);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.filter-container {
  display: flex;
  justify-content: flex-start;
}

.input-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.filter-input {
  width: 250px;
  padding: 8px 25px 8px 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
  background: #b7c6f0;
}

.filter-input:focus {
  border-color: #1f5ed7;
}

.input-icon {
  position: absolute;
  right: 10px;
  font-size: 18px;
  color: #d6d3d3;
}

.table-container {
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
  background-color: #fff;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 12px;
  overflow: hidden;
}

thead {
  background: linear-gradient(135deg, #1f5ed7, #004aad);
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 1;
}

th,
td {
  border: 1px solid #ddd;
  padding: 5px;
  text-align: center;
  font-size: 16px;
  line-height: 1.5;
  transition:
      background-color 0.3s ease,
      color 0.3s ease;
}

th {
  font-weight: bold;
  text-transform: uppercase;
}

/* Tablo başlığı için özel stil */
th {
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  color: #ffffff;
  background: linear-gradient(135deg, #1f5ed7, #004aad);
  padding: 12px 8px;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  letter-spacing: 1.2px;
}

th[colspan="8"] {
  text-align: center;
  font-size: 20px;
  background: linear-gradient(135deg, #1a73e8, #4285f4);
  color: #ffffff;
  padding: 14px;
  letter-spacing: 1.5px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

th[colspan="8"]:hover {
  background: linear-gradient(135deg, #1456d8, #2b66f4);
  transition: background 0.4s ease;
}

.special-service-header {
  text-align: center;
  font-size: 26px;
  background: linear-gradient(135deg, #1f5ed7, #004aad, #003e80);
  position: sticky;
  top: 0;
  z-index: 1;
  color: #ffffff;
  padding: 20px 28px;
  letter-spacing: 2.5px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
  border-radius: 0 0 0 0;
  text-transform: uppercase;
  white-space: nowrap;
  transition: all 0.4s ease-in-out;
  font-weight: bold;
}
tbody tr:hover {
  background: #558ee4;
  color: #fff;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}
tbody tr:nth-child(even):hover {
  background-color: #558ee4;
}

td {
  font-size: 16px;
  line-height: 1.2;
}

.modal-content button:hover {
  background: linear-gradient(135deg, #1f5ed7, #0056b3);
  transition: background 0.3s ease;
}

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
  backdrop-filter: blur(5px);
  z-index: 999;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  z-index: 1000;
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
  padding: 10px;
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
  display: inline-flex;
  align-items: center;
  margin: 5px;
  padding: 6px 12px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  color: #003f91;
  font-weight: 600;
  transition:
      transform 0.3s ease,
      box-shadow 0.3s ease,
      background 0.3s ease;
}

.meal-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  background: #e0f0ff;
}

.meal-item:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.meal-description {
  display: flex;
  align-items: center;
}

.meal-icon {
  font-size: 24px;
  margin-right: 10px;
}
.passenger-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.passenger-table th,
.passenger-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.passenger-table th {
  background-color: #f2f2f2;
  color: #333;
}

.passenger-table tr:hover {
  background-color: #467df3;
}


.terminal {
  display: flex;
  justify-content: flex-end;
  align-content: center;
  font-size: 12px;
}

.small-radio {
  transform: scale(0.8);
  width: 18px;
  height: 18px;
}

#zoom-range {
  margin-top: 10px;
}

.b-sch-event .b-sch-event-content {
  font-size: 18px;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
  letter-spacing: -0.5px;
  font-weight: bold
}

#isNarrow {
  display: flex;
  justify-content: flex-start;
}

#timeFilter {
  width: 100%;
  border: 2px solid #007BB3;
  border-radius: 8px
}

@media (min-width: 1612px) {
  .terminal {
    display: flex;
    justify-content: flex-end;
    align-content: center;
  }
  #zoom-range {
    margin-top: 10px;
    width: 200px;
  }
}

@media (min-width: 1538px) and (max-width: 1612px) {
  .terminal {
    display: flex;
    justify-content: flex-end;
    align-content: center;
    font-size: 15px;
  }
  #zoom-range {
    margin-top: 10px;
    width: 100px;
  }
}

@media (min-width: 1323px) and (max-width: 1538px) {
  .terminal {
    display: flex;
    justify-content: flex-end;
    align-content: center;
  }
  #zoom-range {
    margin-top: 10px;
    width: 75px;
  }
  .btn {
    --bs-btn-font-size: 10px;
  }
  .form-control {
  }
  .form-select {
  }
}

@media (min-width: 1252px) and (max-width: 1323px) {
  .terminal {
    display: flex;
    justify-content: flex-end;
    align-content: center;
  }
  #zoom-range {
    margin-top: 10px;
    width: 60px;
  }
  .btn {
    --bs-btn-font-size: 7px;
  }
  .form-control {
  }
  .form-select {
  }
}

@media (min-width: 992px) and (max-width: 1252px) {
  .terminal {
    display: flex;
    justify-content: flex-end;
    align-content: center;
    font-size: 10px;
  }
  #zoom-range {
    margin-top: 10px;
    width: 45px;
  }
  .btn {
    --bs-btn-font-size: 6px;
  }
  .form-control {
  }
  .form-select {
    font-size: 5px;
  }
}

@media (min-width: 500px) and (max-width: 991px) {
  .panel-body {
    display: none;
  }
}


</style>
