<template>
  <el-dialog
    v-model="dialogFormVisibleLinkToFly"
    title="Link ULd to Outbound Flight"
  >
    <div class="container-fluid">
      <el-card class="box-card mb-1">
        <div class="container-fluid">
          <div class="row">
            <div class="col-4">
              <el-date-picker
                v-model="outboundSearch.startDate"
                type="date"
                format="DD-MM-YYYY"
                value-format="YYYY-MM-DD"
                :placeholder="'Start date'"
                @change="searchOutboundFlight"
              />
            </div>

            <div class="col-3">
              <el-date-picker
                v-model="outboundSearch.endDate"
                type="date"
                format="DD-MM-YYYY"
                value-format="YYYY-MM-DD"
                :placeholder="'End date'"
                @change="searchOutboundFlight"
              />
            </div>
          </div>
        </div>
      </el-card>
      <div class="row">
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
                    Destination
                  </th>
                </tr>
              </thead>
              <tbody ref="body">
                <tr
                  v-for="outboundFlight in allOutboundFlight"
                  id="outboundFlight.id"
                  :key="outboundFlight.id"
                  :class="{'bg-lightblue':outboundByFlightId===outboundFlight.id }"
                  @click="getOutboundByFlightId(outboundFlight.id)"
                >
                  <td>{{ outboundFlight.flightNo }}</td>
                  <td>{{ outboundFlight.destination }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisibleLinkToFly = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="linkPaletteToFlight"
        >Confirm</el-button>

      </span>
    </template>
  </el-dialog>

  <el-dialog
    v-model="dialogFormVisible"
    title="Pallets"
  >
    <el-card class="box-card mb-1">
      <div class="container-fluid">
        <div class="row">
          <div class="col-5">
            <el-input
              v-model="filter.destination"
              placeholder="Please entered destination and press enter"
              clearable
              @change="searchPaletteByDestination()"
            />
          </div>
          <div class="col-5">
            <el-input
              v-model="filter.uld"
              placeholder="Please entered uld and press enter"
              clearable
              @change="searchPaletteByUld()"
            />
          </div>
        </div>
      </div>
    </el-card>
    <div
      class="table_div"
      style="height: 55vh"
    >
      <el-table
        ref="multipleTableRef"
        :data="allPalette"
        border
        :header-cell-style="{ background: '#1f3a73',color:'white' }"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          property="uld"
          label="ULD"
          width="120"
        />
        <el-table-column
          property="contour"
          label="Contour"
          width="120"
        />
        <el-table-column
          property="destination"
          label="Destination"
          show-overflow-tooltip
        />
        <el-table-column
          property="weight"
          label="Weight"
          show-overflow-tooltip
        />
        <el-table-column
          property="terminal"
          label="Terminal"
          show-overflow-tooltip
        />
      </el-table>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          @click=" uldLinkToWarehouse"
        >Save in Warehouse</el-button>
        <el-button
          type="primary"
          @click=" uldLinkToFlight"
        >Link to Flight</el-button>
        <el-button
          type="primary"
          @click=" uldLeftOnBoard"
        >Left on Board</el-button>
      </span>
    </template>
  </el-dialog>


  <div class="container-fluid">
    <el-card class="box-card mb-1">
      <div class="container-fluid">
        <div class="row">
          <div class="col-2">
            <el-date-picker
              v-model="search.startDate"
              type="date"
              format="DD-MM-YYYY"
              value-format="YYYY-MM-DD"
              :placeholder="'Start date'"
              @change="searchFlight"
            />
            <div style="float: right">
              ---
            </div>
          </div>

          <div class="col-2">
            <el-date-picker
              v-model="search.endDate"
              type="date"
              format="DD-MM-YYYY"
              value-format="YYYY-MM-DD"
              :placeholder="'End date'"
              @change="searchFlight"
            />
          </div>
        </div>
      </div>
    </el-card>
    <div class="row">
      <div

        class="col-md-2"
      >
        <div class="table_div">
          <table class="table table-bordered table-hover">
            <thead class="thead-primary">
              <tr>
                <th scope="col">
                  Flight
                </th>
                <th scope="col">
                  Destination
                </th>
              </tr>
            </thead>
            <tbody ref="body">
              <tr
                v-for="flight in allFlight"
                id="flight.id"
                :key="flight.id"
                :class="{'bg-danger cwhite':selectedFlightId===flight.id }"
                @click="getPalletByFlightId(flight.id)"
              >
                <td>{{ flight.flightNo }}</td>
                <td>{{ flight.destination }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div

        class="col-md-5"
      />
    </div>
  </div>
</template>

<!--<script>-->

<!--import flightService from "@/services/flightService";-->
<!--import paletteService from "@/services/paletteService";-->
<!--import {ElLoading, ElNotification} from "element-plus";-->
<!--import dayjs from "dayjs";-->

<!--export default {-->
<!--  name: 'Etv',-->
<!--  data() {-->
<!--    return {-->
<!--      allOutboundFlight: [],-->
<!--      outboundByFlightId: '',-->
<!--      selectedFlightId: '',-->
<!--      input1: '',-->
<!--      input2: '',-->
<!--      allFlight: [],-->
<!--      multipleSelection: [],-->
<!--      // paletteUpdateIds: [],-->
<!--      allPaletteUpdate: [],-->
<!--      allOutboundPaletteLinkFlight: [],-->
<!--      allUldLeftOnBoard: [],-->
<!--      allPalette: [],-->
<!--      dialogFormVisible: false,-->
<!--      dialogFormVisibleLinkToFly: false,-->
<!--      value1: '',-->
<!--      value2: '',-->
<!--      search: {-->
<!--        arrivalStatus: true,-->
<!--        endDate: '',-->
<!--        startDate: '',-->

<!--      },-->
<!--      outboundSearch: {-->
<!--        arrivalStatus: true,-->
<!--        endDate: '',-->
<!--        startDate: '',-->

<!--      },-->

<!--      filter: {-->
<!--        destination: '',-->
<!--        checkin: '',-->
<!--        selectedPalleteId: ''-->
<!--      },-->
<!--      link: {-->
<!--        flightId: '',-->
<!--        paletteId: []-->
<!--      },-->
<!--      lefTonBoard: {-->
<!--        flightId: 1,-->
<!--        paletteId: []-->
<!--      }-->
<!--    }-->
<!--  },-->

<!--  async mounted() {-->

<!--  },-->
<!--  methods: {-->
<!--    async searchFlight() {-->

<!--      // this.search.terminal=this.$store.getters['auth/GET_BUILDING']-->
<!--      const {data: FlightData} = await flightService.load(this.search)-->
<!--      this.allFlight = FlightData-->

<!--    },-->
<!--    async getPalletByFlightId(id) {-->
<!--      this.selectedFlightId = id-->

<!--      this.dialogFormVisible = true-->
<!--      const loading = ElLoading.service({-->
<!--        lock: true,-->
<!--        text: 'Loading',-->
<!--        background: 'rgba(255, 255, 255, 0.7)',-->
<!--      })-->
<!--      const {data: paletteData} = await paletteService.get({-->
<!--        'flightId': id,-->
<!--        'arrivalStatus': this.search.arrivalStatus-->
<!--      })-->
<!--      this.allPalette = paletteData-->
<!--      this.defaultPalette = paletteData-->
<!--      loading.close()-->

<!--    },-->
<!--    async searchPaletteByUld() {-->
<!--      if (this.filter.checkin == '') {-->
<!--        this.allPalette = this.defaultPalette-->
<!--      } else {-->
<!--        this.allPalette = this.allPalette.filter(x => x.checkin === this.filter.checkin)-->
<!--      }-->


<!--    },-->
<!--    async searchPaletteByDestination() {-->
<!--      if (this.filter.destination == '') {-->
<!--        this.allPalette = this.defaultPalette-->
<!--      } else {-->
<!--        this.allPalette = this.allPalette.filter(x => x.destination === this.filter.destination)-->
<!--      }-->

<!--    },-->

<!--    handleSelectionChange(val) {-->

<!--      this.multipleSelection = val-->
<!--      console.log(this.multipleSelection)-->

<!--    },-->
<!--    async uldLinkToWarehouse() {-->
<!--      // this.link.paletteId = [...new Set(this.multipleSelection.map(x => x.id))]-->
<!--      //-->
<!--      // const {data: paletteData} = await paletteService.uldLinkToFlight({-->
<!--      //   'flightId': this.link.flightId,-->
<!--      //   'paletteId': this.link.paletteId-->
<!--      // })-->
<!--      // this.allPaletteUpdate = paletteData-->
<!--      // this.dialogFormVisible = false-->
<!--      // ElNotification.success({-->
<!--      //   title: 'Success',-->
<!--      //   message: 'This pallet is saved in warehouse',-->
<!--      //   offset: 100,-->
<!--      // })-->
<!--    },-->
<!--    async uldLinkToFlight() {-->
<!--      this.dialogFormVisibleLinkToFly = true-->
<!--      this.outboundSearch.arrivalStatus = false-->
<!--      this.outboundSearch.startDate = dayjs(new Date()).format('YYYY/MM/DD')-->
<!--      const {data: FlightData} = await flightService.load(this.outboundSearch)-->
<!--      this.allOutboundFlight = FlightData-->

<!--    },-->
<!--    async searchOutboundFlight() {-->
<!--      const {data: FlightData} = await flightService.load(this.outboundSearch)-->
<!--      this.allOutboundFlight = FlightData-->
<!--    },-->
<!--    async getOutboundByFlightId(id) {-->
<!--      this.outboundByFlightId = id-->
<!--      this.link.flightId = id-->
<!--      console.log(this.outboundByFlightId)-->
<!--    },-->
<!--    async linkPaletteToFlight() {-->
<!--      this.link.paletteId = [...new Set(this.multipleSelection.map(x => x.id))]-->

<!--      const {data: paletteData} = await paletteService.uldLinkToFlight({-->
<!--        'flightId': this.link.flightId,-->
<!--        'paletteId': this.link.paletteId-->
<!--      })-->
<!--      this.allOutboundPaletteLinkFlight = paletteData-->
<!--      this.dialogFormVisibleLinkToFly = false-->
<!--      ElNotification.success({-->
<!--        title: 'Success',-->
<!--        message: 'This pallet is linked to flight',-->
<!--        offset: 100,-->
<!--      })-->
<!--    },-->
<!--    async uldLeftOnBoard() {-->
<!--      this.lefTonBoard.paletteId = [...new Set(this.multipleSelection.map(x => x.id))]-->

<!--      const {data: paletteData} = await paletteService.setLefTonBoard({-->

<!--        'paletteId': this.lefTonBoard.paletteId-->
<!--      })-->
<!--      this.allUldLeftOnBoard = paletteData-->

<!--      ElNotification.success({-->
<!--        title: 'Success',-->
<!--        message: 'This pallet left on board',-->
<!--        offset: 100,-->
<!--      })-->
<!--    },-->

<!--  }-->
<!--}-->

<!--</script>-->

<style scoped>
.bg-lightblue {
  background: #94ffc485 !important;
}

.dialog-footer button:first-child {
  margin-right: 10px;
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

.thead-primary {
  color: #fff;
  background-color: #337ab7;
  border-color: #337ab7;
}

</style>
