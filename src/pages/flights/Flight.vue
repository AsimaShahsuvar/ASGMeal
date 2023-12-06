<template>
  <el-dialog
    v-model="dialogFormVisibleAdd"
    title="Add Flight"
  >
    <div class="container-fluid">
      <div class="row">
        <div class="col-2 mb-5">
          <el-input
            v-model="editItem.flightNo"
            placeholder="FlightNo "
            clearable
          />
        </div>
        <div class="col-3 mb-5">
          <el-date-picker
            v-model="editItem.flightDate"
            type="datetime"
            placeholder="Pick a Date"
            format="YYYY/MM/DD hh:mm:ss"
          />
        </div>
        <div class="col-2 ">
          <el-input
            v-model="editItem.departure"
            placeholder="Departure "
            clearable
          />
        </div>
        <div class="col-2 mb-5">
          <el-input
            v-model="editItem.destination"
            placeholder="Destination "
            clearable
          />
        </div>
        <div class="col-2 mb-5">
          <el-input
            v-model="editItem.uldCount"
            placeholder="UldCount "
            clearable
          />
        </div>

        <div class="col-2 mb-5">
          <el-input
            v-model="editItem.factAirplane"
            placeholder="Fact Airplane"
            clearable
          />
        </div>
        <div class="col-2 mb-5">
          <el-input
            v-model="editItem.registration"
            placeholder="Registration"
            clearable
          />
        </div>
        <div class="col-2 mb-5">
          <el-input
            v-model="editItem.awbCount"
            placeholder="Awb count"
            clearable
          />
        </div>
        <div class="col-2 mb-5">
          <el-input
            v-model="editItem.pieces"
            placeholder="Pieces "
            clearable
          />
        </div>
        <div class="col-2 mb-5">
          <el-input
            v-model="editItem.totalWeight"
            placeholder="Total Weight"
            clearable
          />
        </div>
        <div class="col-2 mb-5">
          <el-checkbox
            v-model="editItem.isArrival"
            label="IsArrival"
            size="large"
            border
          />
        </div>
        <div class="col-2 mb-5">
          <el-input
            v-model="editItem.weight"
            placeholder="Weight"
            clearable
          />
        </div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="addFlight"
        >Confirm</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog
    v-model="dialogFormVisible"
    title="Edit Flight"
  >
    <div class="container-fluid">
      <div class="row">
        <div class="col-2 mb-5">
          <el-input
            v-model="editItem.flightNo"
            placeholder="FlightNo "
            clearable
          />
        </div>
        <div class="col-3 mb-5">
          <el-date-picker
            v-model="editItem.flightDate"
            type="datetime"
            placeholder="Pick a Date"
            format="YYYY/MM/DD hh:mm:ss"
          />
        </div>
        <div class="col-2 ">
          <el-input
            v-model="editItem.departure"
            placeholder="Departure "
            clearable
          />
        </div>
        <div class="col-2 mb-5">
          <el-input
            v-model="editItem.destination"
            placeholder="Destination "
            clearable
          />
        </div>
        <div class="col-2 mb-5">
          <el-input
            v-model="editItem.uldCount"
            placeholder="UldCount "
            clearable
          />
        </div>

        <div class="col-2 mb-5">
          <el-input
            v-model="editItem.factAirplane"
            placeholder="Fact Airplane"
            clearable
          />
        </div>
        <div class="col-2 mb-5">
          <el-input
            v-model="editItem.registration"
            placeholder="Registration"
            clearable
          />
        </div>
        <div class="col-2 mb-5">
          <el-input
            v-model="editItem.awbCount"
            placeholder="Awb count"
            clearable
          />
        </div>
        <div class="col-2 mb-5">
          <el-input
            v-model="editItem.pieces"
            placeholder="Pieces "
            clearable
          />
        </div>
        <div class="col-2 mb-5">
          <el-input
            v-model="editItem.totalWeight"
            placeholder="Total Weight"
            clearable
          />
        </div>

        <div class="col-2 mb-5">
          <el-checkbox
            v-model="editItem.isArrival"
            label="IsArrival"
            size="large"
            border
          />
        </div>
        <div class="col-2 mb-5">
          <el-input
            v-model="editItem.weight"
            placeholder="Weight"
            clearable
          />
        </div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">


        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="updateFlight"
        >Confirm</el-button>
      </span>
    </template>
  </el-dialog>

  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <el-card class="box-card mb-1">
          <div class="container-fluid">
            <div class="row">
              <div>
                <el-button
                  type="success"
                  @click="additionFlight"
                >
                  Add Flight
                </el-button>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <div

        class="col-md-12"
      >
        <div class="table_div">
          <table class="table table-bordered table-hover">
            <thead class="thead-primary">
              <tr>
                <th scope="col">
                  Flight
                </th>
                <th scope="col">
                  flight date
                </th>
                <th scope="col">
                  Departure
                </th>
                <th scope="col">
                  Destination
                </th>
                <th scope="col">
                  Uld count
                </th>
                <th scope="col">
                  Fact airplane
                </th>
                <th scope="col">
                  Registration
                </th>
                <th scope="col">
                  Awb count
                </th>
                <th scope="col">
                  Pieces
                </th>
                <th scope="col">
                  Weight
                </th>
                <th scope="col">
                  Total weight
                </th>
                <th scope="col">
                  IsArrival
                </th>
              </tr>
            </thead>
            <tbody ref="body">
              <tr
                v-for="flight in allFlight"
                id="flight.id"
                :key="flight.id"
                :class="{'bg-blue':selectedFlightId===flight.id }"
                @click="getPalletByFlightId(flight)"
              >
                <td>{{ flight.flightNo }}</td>
                <td>{{ flight.flightDate }}</td>
                <td>{{ flight.departure }}</td>
                <td>{{ flight.destination }}</td>
                <td>{{ flight.uldCount }}</td>
                <td>{{ flight.factAirplane }}</td>
                <td>{{ flight.registration }}</td>
                <td>{{ flight.awbCount }}</td>
                <td>{{ flight.pieces }}</td>
                <td>{{ flight.weight }}</td>
                <td>{{ flight.totalWeight }}</td>
                <td>{{ flight.isArrival }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import flightService from "@/services/flightService";

export default {
  name: 'Etv',
  data() {
    return {
      editItem: {
        awbCount: '',
        flightNo: '',
        departure: '',
        destination: '',
        factAirplane: '',
        flightDate: '',
        pieces: '',
        registration: '',
        totalWeight: '',
        uldCount: '',
        weight: '',
        isArrival: false
      },
      selectedFlightId: '',
      allFlight: '',
      dialogFormVisible: false,
      dialogFormVisibleAdd: false,

    }
  },

  async mounted() {
    await this.getFlight()
  },
  methods: {
    async getFlight() {
      // this.search.terminal=this.$store.getters['auth/GET_BUILDING']
      const {data: FlightData} = await flightService.getFlight()
      this.allFlight = FlightData

    },
    async getPalletByFlightId(flight) {
      this.dialogFormVisible = true
      this.editItem = flight
      this.selectedFlightId = flight.id

    },
    async updateFlight() {
      const {data: FlightData} = await flightService.update(this.editItem)
      this.allFlight = FlightData
      this.dialogFormVisible = false
      await this.getFlight()

    },
    async addFlight() {
      const {data: FlightData} = await flightService.create(this.editItem)
      this.allFlight = FlightData
      this.dialogFormVisibleAdd = false
      await this.getFlight()
    },
    async additionFlight() {
      this.dialogFormVisibleAdd = true
      this.editItem.awbCount = ''
      this.editItem.flightNo = ''
      this.editItem.departure = ''
      this.editItem.destination = ''
      this.editItem.factAirplane = ''
      this.editItem.flightDate = ''
      this.editItem.pieces = ''
      this.editItem.registration = ''
      this.editItem.totalWeight = ''
      this.editItem.uldCount = ''
      this.editItem.weight = ''
      this.editItem.isArrival = false

    }

  }
}

</script>

<style scoped>
.el-checkbox.el-checkbox--large {
  height: 31px;
}

.bg-blue {
  background: #1f3a73ad !important;
  color: white;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}

#palletTable td:nth-child(1) {
  width: 62px;
}

.cwhite {
  color: white !important;
}


table#palletTable div {

  font-size: 8px;
}

.table thead tr th {
  white-space: nowrap;
  position: sticky;
  /*padding: 2px 6px;*/
  top: -2px;
  z-index: 2;
  background: #1f3a73 !important;
  color: white;
}

#palletTable tr {
  border: 2px solid #3699ff;
}

#palletTable th, #palletTable td {
  padding: 3px 6px;
}

.table_div::-webkit-scrollbar {
  width: 7px;
  border-radius: 10px;
  height: 10px;
  background-color: #3c5a98d6;
}

.table_div::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px #1f3a73;
  background-color: #1f3a73;
}


.table_div {

  background: #fff;
  border-radius: 6px;
  box-shadow: 0 3px 20px 0px rgb(0 0 0 / 10%);
}

.table_div {
  overflow-y: scroll;
  height: 75vh;
}


table {
  border: 1px solid rgba(221, 221, 221, 1);
}

tr:nth-child(even) {
  background: #F5F5F5
}

tr {
  position: relative;
}

tr:hover {
  background: #c9e8f7;
  position: relative;
}


.dropdown-menu ul {
  padding: 0;
  margin: 0;
  list-style: none;
  position: relative;
}


li > a:only-child:after {
  content: '';
}

.thead-primary {
  color: #fff;
  background-color: #337ab7;
  border-color: #337ab7;
}


</style>
