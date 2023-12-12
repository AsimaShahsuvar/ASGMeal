<template>
  <el-dialog
    v-model="dialogFormVisible"
    title="Link ULd to Outbound Flight"
  >
    <el-card class="box-card mb-1">
      <div class="container-fluid">
        <div class="row">
          <div class="col-2">
            <el-input
              v-model="filter.destination"
              placeholder="Please input"
              clearable
              @change="searchPaletteByDestination()"
            />
          </div>
          <div class="col-2">
            <el-input
              v-model="filter.uld"
              placeholder="Please input"
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
          @click=" uldLinkToFlight"
        >Confirm</el-button>
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
<!--import {ElLoading} from "element-plus";-->

<!--export default {-->
<!--  name: 'Etv',-->
<!--  data() {-->
<!--    return {-->
<!--      selectedFlightId: '',-->
<!--      input1: '',-->
<!--      input2: '',-->
<!--      allFlight: [],-->
<!--      multipleSelection: [],-->
<!--      // paletteUpdateIds: [],-->
<!--      allPaletteUpdate: [],-->
<!--      allPalette: [],-->
<!--      dialogFormVisible: false,-->
<!--      value1: '',-->
<!--      value2: '',-->
<!--      search: {-->
<!--        arrivalStatus: false,-->
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
<!--      this.link.flightId = id-->
<!--      this.dialogFormVisible = true-->
<!--      const loading = ElLoading.service({-->
<!--        lock: true,-->
<!--        text: 'Loading',-->
<!--        background: 'rgba(255, 255, 255, 0.7)',-->
<!--      })-->
<!--      const {data: paletteData} = await paletteService.get({'arrivalStatus': this.search.arrivalStatus})-->
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
<!--    async uldLinkToFlight() {-->
<!--      this.link.paletteId = [...new Set(this.multipleSelection.map(x => x.id))]-->

<!--      const {data: paletteData} = await paletteService.uldLinkToFlight({-->
<!--        'flightId': this.link.flightId,-->
<!--        'paletteId': this.link.paletteId-->
<!--      })-->
<!--      this.allPaletteUpdate = paletteData-->
<!--      this.dialogFormVisible = false-->
<!--    }-->
<!--  }-->
<!--}-->

<!--</script>-->

<style scoped>

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


.dropdown-menu li:hover {
  background-color: rgb(31 58 115);

}

/* Hide Dropdowns by Default */
.dropdown-menu ul {
  display: none;
  position: absolute;
  top: 0; /* the height of the main nav */
}

/* Display Dropdowns on Hover */
.dropdown-menu li ul.submenu {
  /*display: inherit;*/
  /*left: 100%;*/
  z-index: 1000;
  /* display: none; */
  float: left;
  min-width: 160px;

  margin: 2px 0 0;
  font-size: 14px;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ccc;
  border: 1px solid rgba(0, 0, 0, .15);
  border-radius: 4px;
  -webkit-box-shadow: 0 6px 12px rgb(0 0 0 / 18%);
  box-shadow: 0 6px 12px rgb(0 0 0 / 18%);
}

.posName {
  font-weight: bold;
  color: #1f3a73;
  text-shadow: 1px 1px 1px #3699ff;
  text-align: left;
  font-size: 9px !important;
  line-height: 3;
  width: 10px;
  height: 30px;
}

.dropdown-menu li:hover > ul.submenu2 {
  /*display: inherit;*/
  /*left: 99%;*/
  z-index: 1000;
  float: left;
  min-width: 160px;

  margin: 2px 0 0;
  font-size: 14px;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ccc;
  border: 1px solid rgba(0, 0, 0, .15);
  border-radius: 4px;
  -webkit-box-shadow: 0 6px 12px rgb(0 0 0 / 18%);
  box-shadow: 0 6px 12px rgb(0 0 0 / 18%);
}

/* Fisrt Tier Dropdown */
.dropdown-menu ul li {
  width: 170px;
  float: none;
  padding: 2px 11px;
  display: list-item;
  position: relative;
}

.vertical {
  vertical-align: inherit;
  text-align: center;
}

.dropdown-menu li a {
  display: block;
  padding: 5px;
}

ul.dubSubmenu {
  top: 0;
}


/* Change this in order to change the Dropdown symbol */
li > a:after {
  content: ' +';
}

.submenu2 {
  height: 500px;
  overflow-y: scroll;
}

.bg-white {
  background: white;
}

li > a:only-child:after {
  content: '';
}

.thead-primary {
  color: #fff;
  background-color: #337ab7;
  border-color: #337ab7;
}

.box {
  background: white;
  border: 1px solid #eef0f8;
  border-radius: 5px;
  padding: 3px;
  text-align: center;
  margin: auto;
  box-shadow: 1px 1px 1px 2px #1f3a734f;
  color: #337ab7;
  margin-bottom: 0 !important;
  font-weight: 600;
  margin-bottom: 13px;
}

.box:hover {
  background: #eef0f8;
  transition: 1s;
  color: #337ab7;
}
</style>
