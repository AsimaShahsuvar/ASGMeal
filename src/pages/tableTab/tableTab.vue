<template>
  <div class="main-container">
    <div class="table-container left">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Flight No</th>
            <th>Route</th>
            <th>LT</th>
            <th>ETD</th>
            <th>ETA</th>
            <th>Bort No</th>
            <th>Parking</th>
            <th>Supervisor</th>
            <th>Notes</th>
            <th>Action</th>
            <!-- Added column header for the "+" button -->
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in itemsLeft"
            :key="'left-' + item.id"
            :style="getRowStyle(item)"
            @click="openModal(item)"
          >
            <td>{{ index + 1 }} </td>
            <td>{{ item.flight }}</td>
            <td>{{ item.route }}</td>
            <td>{{ item.time_a }}</td>
            <td>{{ item.time_tkf }}</td>
            <td>{{ item.time_bt }}</td>
            <td>{{ item.ac }}</td>
            <td>{{ item.stand }}</td>
            <td></td>
            <td>{{ item.remark }}</td>
            <td @click="openModal(item)">
              <button class="plus-button" @click.stop="openModal(item)">
                +
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table-container right">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Flight No</th>
            <th>Route</th>
            <th>LT</th>
            <th>ETD</th>
            <th>ETA</th>
            <th>Bort No</th>
            <th>Parking</th>
            <th>Supervisor</th>
            <th>Notes</th>
            <th>Action</th>
            <!-- Added column header for the "+" button -->
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in itemsRight"
            :key="'right-' + item.id"
            :style="getRowStyle(item)"
            @click="openModal(item)"
          >
            <td>{{ itemsLeft.length + index + 1 }}</td>
            <td>{{ item.flight }}</td>
            <td>{{ item.route }}</td>
            <td>{{ item.time_a }}</td>
            <td>{{ item.time_tkf }}</td>
            <td>{{ item.time_bt }}</td>
            <td>{{ item.ac }}</td>
            <td>{{ item.stand }}</td>
            <td></td>
            <td>{{ item.remark }}</td>
            <td>
              <button class="plus-button" @click="addSupervisor()">+</button>
              <!-- "+" button -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="modalVisible" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h2>Flight Details</h2>
        <p><strong>Flight No:</strong> {{ selectedFlight.flight }}</p>
        <p><strong>Route:</strong> {{ selectedFlight.route }}</p>
        <p><strong>LT:</strong> {{ selectedFlight.time_a }}</p>
        <p><strong>ETD:</strong> {{ selectedFlight.time_tkf }}</p>
        <p><strong>ETA:</strong> {{ selectedFlight.time_bt }}</p>
        <p><strong>Bort No:</strong> {{ selectedFlight.ac }}</p>
        <p><strong>Parking:</strong> {{ selectedFlight.stand }}</p>
        <p>
          <strong>Supervisor:</strong>
          {{ getSupervisorName(selectedFlight.supervisorId) }}
        </p>

        <!-- Notes section with input -->
        <p><strong>Notes:</strong></p>
        <textarea
          v-model="newNote"
          placeholder="Enter your note here"
          rows="3"
        ></textarea>

        <button @click="addNewNote">Save Note</button>

        <button @click="closeModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import api from "@/services/api";

export default {
  name: "TableTab",
  data() {
    return {
      itemsLeft: [],
      itemsRight: [],
      modalVisible: false,
      selectedFlight: null,
      predefinedNotes: [
        { id: "DBML", text: "Diabetic meal (DBML)" },
        { id: "GFML", text: "Gluten-free meal (GFML)" },
        { id: "KSML", text: "Kosher meal (KSML)" },
        { id: "VJML", text: "Jain – Vegetarian Hindu meal (VJML)" },
        { id: "AVML", text: "Asian Vegetarian Meal (AVML)" },
        { id: "HNML", text: "Hindu Non-Vegetarian Meal (HNML)" },
        { id: "VGML", text: "Strict vegan meal (VGML)" },
      ],
      newNote: "",
      supervisorData: [], // New property for supervisor data
    };
  },
  async mounted() {
    try {
      // const authResponse = await axios.post(
      //   "http://fdm.asg.az:8080/meals/api/auth/login",
      //   {
      //     username: "murad123",
      //     password: "murad123",
      //   },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      // localStorage.setItem("token", authResponse.data.token);
      // const responseToken = authResponse.data.token;

      // const headers = {
      //   Authorization: `Bearer ${responseToken}`,
      // };







      try {
        // Fetch flight data
        const flightResponse = await api.get("/v1/flight?date=2024-12-12");
        const flightData = flightResponse.data.data;
        const halfLength = Math.ceil(flightData.length / 2);

        this.itemsLeft = flightData.slice(0, halfLength);
        this.itemsRight = flightData.slice(halfLength);

        // Fetch supervisor data
        const supervisorResponse = await axios.get(
          "/apifm.asg.az/api/Flight/getflightbyemplooyerlist" // Updated endpoint
        );
        this.supervisorData = supervisorResponse.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error(
            "Endpoint not found (404). Please check the URL and API endpoint."
          );
        } else {
          console.error("Error fetching data:", error.message);
        }
      }

      const response = await api.get("/v1/flight?date=2024-12-12", {
        //   headers,
      });

      const data = response.data.data;
      const halfLength = Math.ceil(data.length / 2);

      this.itemsLeft = data.slice(0, halfLength);
      this.itemsRight = data.slice(halfLength);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error(
          "Endpoint not found (404). Please check the URL and API endpoint."
        );
      } else {
        console.error("Error fetching data:", error.message);
      }
    }






// İlk dəfə məlumatları əldə edin
await this.fetchFlightData();

// Hər 5 dəqiqədən bir məlumatları avtomatik yenilə
this.refreshInterval = setInterval(() => {
  this.fetchFlightData();
}, 300000); // 300000 millisecond = 5 dəqiqə
},
beforeUnmount() {
// Komponent məhv edilərkən intervalı təmizlə
clearInterval(this.refreshInterval);











  },


  methods: {

  // Məlumatları API-dən gətirən metod
  async fetchFlightData() {
      try {
        const flightResponse = await api.get("/v1/flight?date=2024-12-12");
        const flightData = flightResponse.data.data;
        const halfLength = Math.ceil(flightData.length / 2);

        this.itemsLeft = flightData.slice(0, halfLength);
        this.itemsRight = flightData.slice(halfLength);

        // Müvəffəqiyyətlə məlumatları aldıqdan sonra konsolda xəbərdarlıq verin
        console.log("Məlumatlar uğurla yeniləndi.");
      } catch (error) {
        console.error("Məlumatları yeniləyərkən xəta baş verdi:", error.message);
      }
    },







    // addSupervisor() {
    //   axios
    //     .get(
    //       // Yeni api supervisor
    //       // "http://fdm.asg.az:8080/meals/api/v1/supervisor"    
    //       "https://apifm.asg.az/api/EmployeeWorkFlow/getemployeelist?shift_id=0"
    //     )
    //     .then((response) => {
    //       this.supervisorData = response.data; // Store the supervisor data
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching supervisor data:", error);
    //     });
    // },

    openModal(flight) {
      this.selectedFlight = flight;
      this.newNote = flight.remark || ""; // Initialize the newNote with existing remark
      this.modalVisible = true;
    },
    closeModal() {
      this.modalVisible = false;
      this.selectedFlight = null;
    },



// asagidaki newnote hisseye tekrar bax!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//     addNewNote() {
//   // Yeni qeyd serverə göndərilə bilər
//   axios.post('API_URL', {
//     flightId: this.selectedFlight.id,
//     remark: this.newNote.trim()
//   }).then(() => {
//     this.selectedFlight.remark = this.newNote.trim();
//     this.$forceUpdate(); // Vizual yeniləmə
//     this.newNote = "";
//   }).catch(error => {
//     console.error("Qeyd saxlanılarkən xəta baş verdi:", error);
//   });
// }






    addNewNote() {
      // Update the selected flight's remark property with the new note
      this.selectedFlight.remark = this.newNote.trim();

      // Reflect changes in the table by forcing a reactivity update
      this.$forceUpdate();

      // Reset the new note input
      this.newNote = "";
    },
    getRowStyle(item) {
      const isSpecialFlight = item.flight.startsWith("J2");
      const textColor = isSpecialFlight ? "#2c3e50" : "#64c0eb"; // Darker blue and red for better contrast
      const fontStyle = "normal"; // Normal font style for readability
      const fontWeight = "500"; // Medium weight for better readability

      return `
      letter-spacing: 0.5px;
      font-size: 16px;
      font-weight: ${fontWeight};
      font-style: ${fontStyle};
      color: ${textColor};
      text-align: center;
      padding: 8px;
    `;
    },
    // getSupervisorName(supervisorId) {
    //   const supervisor = this.supervisorData.find(
    //     (s) => s.workerId === supervisorId
    //   );
    //   return supervisor ? supervisor.fullName : "Unknown";
    // },
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-wrap: wrap; /* Allow wrapping on smaller screens */
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  overflow: hidden;
  background-color: #f0f4f8;
  padding: 10px;
  border-radius: 8px;
}

.table-container {
  flex: 1;
  margin: 10px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  min-width: 300px; /* Ensure tables have a minimum width */
}

.table-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

/* .main-container::before {
  content: "";
  position: absolute;
  top: 10px;
  bottom: 10px;
  left: 50%;
  width: 6px;
  background: linear-gradient(to bottom, #3c82f6, #1f5ed7);
  transform: translateX(-50%);
  border-radius: 3px;
} */

table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
}

thead th {
  position: sticky;
  top: 0;
  background-color: #1f5ed7;
  color: white;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 14px 12px;
  border-right: 1px solid #ddd;
  border-bottom: 2px solid #e74c3c;
}

thead th:first-child {
  border-top-left-radius: 8px;
}

thead th:last-child {
  border-top-right-radius: 8px;
  border-right: none;
}

th,
td {
  padding: 10px 14px;
  border: 1px solid #e0e0e0;
  text-align: center;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

tbody tr {
  transition: background-color 0.2s ease;
}

tr:nth-child(odd) {
  background-color: #f9f9f9;
}

tr:nth-child(even) {
  background-color: #f1f7fc;
}

tbody tr:hover {
  background-color: #4b8bdf;
  cursor: pointer;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-10px);
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
  opacity: 0;
  animation: slideUp 0.3s ease forwards;
}

.modal-content textarea {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  transition: border-color 0.3s ease;
}

.modal-content textarea:focus {
  border-color: #1f5ed7;
}

button {
  margin-top: 10px;
  padding: 10px 16px;
  background-color: #1f5ed7;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
}

button:hover {
  background-color: #154ebd;
  transform: translateY(-2px);
}

.plus-button {
  background: none;
  color: #64c0eb;
  font-size: 16px;
  font-weight: bold;
  width: 10px;
  height: 10px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.plus-button:hover {
  background-color: #154ebd;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.plus-button:focus {
  outline: none;
}

.modal-active .main-container {
  filter: blur(5px); /* Adjust the blur amount as needed */
  transition: filter 0.3s ease;
}

@keyframes fadeIn {
  from {
    background: rgba(0, 0, 0, 0);
  }
  to {
    background: rgba(0, 0, 0, 0.6);
  }
}

@keyframes slideUp {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (min-width: 1024px) {
  .main-container {
    flex-direction: row;
  }

  .main-container::before {
    display: block;
  }
}

@media (max-width: 1023px) {
  .table-container {
    margin: 10px 0;
  }

  table {
    font-size: 12px; /* Adjusted font size for better readability */
  }

  th,
  td {
    padding: 6px 10px; /* Adjusted padding for better spacing */
  }

  .main-container {
    flex-direction: column;
  }

  .main-container::before {
    display: none;
  }
}

@media (max-width: 768px) {
  .table-container {
    margin: 10px 0;
  }

  table {
    font-size: 10px;
  }

  th,
  td {
    padding: 4px 8px;
  }

  .main-container {
    flex-direction: column;
  }

  .main-container::before {
    display: none;
  }
}

@media (max-width: 480px) {
  table {
    font-size: 8px;
  }

  th,
  td {
    padding: 2px 4px;
  }

  .modal-content {
    width: 100%;
  }
}
</style>
