<template>
  <div
    id="contextMenu"
    class="dropdown clearfix"
  >
    <ul
      class="dropdown-menu"
      role="menu"
      aria-labelledby="dropdownMenu"
      style="display:block;position:static;margin-bottom:5px;"
    >
      <li>
        <a
          href="#"

          @mouseover="hovSubmenu()"
        >Floor</a>
        <!-- Second Tier Drop Down -->
        <ul
          class="submenu submenu1"
          @mouseleave="mouseoutMenu()"
        >
          <li
            v-for="(item,index) in floors"
            :key="index"

            @click="secondClick(item)"
          >
            <a
              href="#"
              @mouseover="getPosition(item)"
            >{{ item }}</a>
            <ul class="submenu submenu2">
              <li
                v-for="(item,index) in allPosition"
                :key="index"
              >
                <a
                  href="#"
                  @click="changePosition(item)"
                >{{ item.title }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <div
    id="contextMenu2"
    class="dropdown clearfix"
  >
    <ul
      class="dropdown-menu"
      role="menu"
      aria-labelledby="dropdownMenu"
      style="display:block;position:static;margin-bottom:5px;"
    >
      <li v-if="copiedPosition.statusCode===102">
        <a
          href="#"
          @click="copyPalette()"
        >Copy</a>
      </li>
      <li v-if="copiedPosition.statusCode===101 && isCopied">
        <a
          href="#"
          @click="pastePalette()"
        >Paste</a>
      </li>
    </ul>
  </div>
  <!--  {{allPosition }}-->
  <div class="container-fluid">
    <el-card class="box-card mb-1">
      <div class="container-fluid">
        <div class="row">
          <div class="col-2">
            <el-input
              v-model="search.uld"
              placeholder="Please input"
              @change="searchFlight()"
            />
          </div>
          <h3 style="font-weight: bold;color: #1f3a73;">
            Arrival
          </h3>
          <div
            v-for="flight in allFlight"
            :key="flight.id"
            class="inline-block"
            @click="getPalletByFlightId(flight.id)"
          >
            <div
              class="box"
              :class="{'bg-danger cwhite':selectedFlightId===flight.id }"
            >
              {{ flight.flightNo }}
            </div>
          </div>
          <div class="col-1">
            <el-select
              v-model="filter.destination"

              clearable
              placeholder="Select"
            >
              <el-option
                v-for="item in allDestinationList"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </div>
          <div class="col-1">
            <el-select
              v-model="filter.contour"

              placeholder="Select"
              clearable
            >
              <el-option
                v-for="item in allContourList"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </div>
          <div>
            <el-button
              :disabled="building==1"
              type="success"
              @click="changeTerminal('1')"
            >
              T1
            </el-button>
            <el-button
              :disabled="building==2"
              type="warning"
              @click="changeTerminal('2')"
            >
              T2
            </el-button>
          </div>
        </div>
      </div>
    </el-card>
    <div class="row">
      <div
        id="palletTAB"
        class="col-md-5"
      >
        <div class="table_div">
          <table class="table table-bordered table-hover">
            <thead class="thead-primary">
              <tr>
                <th scope="col">
                  ULD
                </th>
                <th scope="col">
                  From
                </th>
                <th scope="col">
                  Weight
                </th>
                <th scope="col">
                  Contour
                </th>
                <th scope="col">
                  Position
                </th>
                <th scope="col">
                  FlightNo
                </th>
                <th scope="col">
                  Terminal
                </th>
              </tr>
            </thead>
            <tbody ref="body">
              <tr
                v-for="pallet in allPalette"
                id="pallet.id"
                :key="pallet.id"
                @contextmenu.prevent="openContextMenu(pallet.id)"
              >
                <td>{{ pallet.uld }}</td>
                <td>{{ pallet.destination }}</td>
                <td>{{ pallet.weight }}</td>
                <td>{{ pallet.contour }}</td>
                <td>{{ pallet.whPosition }}</td>
                <td>{{ pallet.flightNo }}</td>
                <td>{{ pallet.terminal }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-md-7">
        <table
          id="palletTable"
          class="table table-bordered table-hover"
        >
          <tbody>
            <tr
              v-for="(positions,index) in allPositionByFloor"
              :key="index"
            >
              <td
                v-if="positions.floor === 9"
                class="vertical"
              >
                ETV
              </td>
              <td
                v-else
                class="vertical"
              >
                {{ positions.floor }}
              </td>
              <td>
                <div
                  v-for="(floorList,index) in positions.floorList"
                  :key="index"
                  class="width100"
                >
                  <div class="posName">
                    {{ floorList.segment }}
                  </div>
                  <div
                    v-for="position in floorList.position"
                    :key="position.id"
                    :class="{'bg-primary':position.statusCode===101,'bg-danger':position.statusCode===102,'bg-info':position.storageGroup===10,'bg-secondary':position.storageGroup===9,'bg-success':position.storageGroup===8,'bg-white':position.statusCode===404,'bg-yellow':filterData(position)}"
                    class="tittle-align"
                    @contextmenu.prevent="openContextMenu2(position)"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<!--<script>-->
<!--import flightService from '@/services/flightService'-->
<!--import paletteService from '@/services/paletteService'-->
<!--import positionsService from '@/services/positionsService'-->
<!--import changePaletteService from '@/services/changePaletteService'-->
<!--import {ElLoading, ElNotification} from 'element-plus'-->
<!--import {mapMutations} from "vuex";-->

<!--export default {-->
<!--  name: 'Etv',-->
<!--  data() {-->
<!--    return {-->
<!--      selectedFlightId: '',-->
<!--      floors: [1, 2, 3],-->
<!--      id: '',-->
<!--      allFlight: '',-->
<!--      allPalette: [],-->
<!--      allPosition: '',-->
<!--      allChangePalette: '',-->
<!--      centerDialogVisible: false,-->
<!--      fillPositionStatus: 102,-->
<!--      allPositionByFloor: '',-->
<!--      copiedPosition: [],-->
<!--      isCopied: false,-->
<!--      search: {-->
<!--        checkin: '',-->
<!--        flightId: '',-->
<!--        terminal: this.$store.getters['auth/GET_BUILDING'],-->
<!--        arrivalStatus: true,-->
<!--        endDate: '',-->
<!--        startDate: ''-->
<!--      },-->
<!--      allDestinationList: [],-->
<!--      filter: {-->
<!--        destination: '',-->
<!--        contour: ''-->
<!--      },-->
<!--      allContourList: []-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    building() {-->
<!--      return this.$store.getters['auth/GET_BUILDING']-->
<!--    }-->
<!--  },-->
<!--  watch: {-->
<!--    // whenever question changes, this function will run-->
<!--    building(newBuilding, oldQuestion) {-->
<!--      if (newBuilding) {-->
<!--        this.getAllPosition()-->
<!--        this.search.terminal = newBuilding-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  async mounted() {-->
<!--    const {data: flightData} = await flightService.load({-->
<!--      'arrivalStatus': this.search.arrivalStatus,-->
<!--      'endDate': '',-->
<!--      'startDate': ''-->
<!--    })-->
<!--    this.allFlight = flightData-->
<!--    window.addEventListener('click', function (e) {-->
<!--      if (document.getElementById('contextMenu').contains(e.target)) {-->
<!--        // Clicked in box-->
<!--      } else {-->
<!--        document.getElementById('contextMenu').style.display = 'none'-->
<!--      }-->
<!--    })-->
<!--    window.addEventListener('click', function (e) {-->
<!--      if (document.getElementById('contextMenu2').contains(e.target)) {-->
<!--        // Clicked in box-->
<!--      } else {-->
<!--        document.getElementById('contextMenu2').style.display = 'none'-->
<!--      }-->
<!--    })-->
<!--    await this.getAllPosition()-->
<!--    await this.getDestinationList()-->
<!--    await this.getContourList()-->
<!--  },-->
<!--  methods: {-->
<!--    ...mapMutations({-->
<!--      setBuilding: 'auth/SET_BUILDING'-->
<!--    }),-->
<!--    openContextMenu(id) {-->
<!--      this.id = id-->
<!--      const e = event-->

<!--      const menu = document.querySelector('#contextMenu')-->
<!--      e.preventDefault()-->
<!--      // Show the context menu-->
<!--      menu.style.display = 'block'-->
<!--      // just for the pen :-->
<!--      menu.style.transform = 'translate(0)'-->
<!--      // set position X of the menu-->
<!--      if ((window.innerWidth - e.clientX) > menu.offsetWidth + 10) {-->
<!--        menu.style.left = e.clientX + 'px'-->
<!--      } else {-->
<!--        menu.style.left = (e.clientX - menu.offsetWidth) + 'px'-->
<!--      }-->
<!--      // set position Y of the menu-->
<!--      if ((window.innerHeight - e.clientY) > menu.offsetHeight + 10) {-->
<!--        menu.style.top = e.clientY + 'px'-->
<!--      } else {-->
<!--        menu.style.top = (e.clientY - menu.offsetHeight) + 'px'-->
<!--      }-->

<!--    },-->
<!--    openContextMenu2(position) {-->
<!--      this.copiedPosition = position-->

<!--      if (position.statusCode === 102) {-->
<!--        this.id = position.paletteId-->
<!--      } else if (position.statusCode === 101 && !this.isCopied) {-->
<!--        return-->
<!--      }-->
<!--      const e = event-->

<!--      const menu = document.querySelector('#contextMenu2')-->
<!--      e.preventDefault()-->
<!--      // Show the context menu-->
<!--      menu.style.display = 'block'-->
<!--      // just for the pen :-->
<!--      menu.style.transform = 'translate(0)'-->
<!--      // set position X of the menu-->
<!--      if ((window.innerWidth - e.clientX) > menu.offsetWidth + 10) {-->
<!--        menu.style.left = e.clientX + 'px'-->
<!--      } else {-->
<!--        menu.style.left = (e.clientX - menu.offsetWidth) + 'px'-->
<!--      }-->
<!--      // set position Y of the menu-->
<!--      if ((window.innerHeight - e.clientY) > menu.offsetHeight + 10) {-->
<!--        menu.style.top = e.clientY + 'px'-->
<!--      } else {-->
<!--        menu.style.top = (e.clientY - menu.offsetHeight) + 'px'-->
<!--      }-->

<!--    },-->
<!--    copyPalette() {-->
<!--      this.isCopied = true-->
<!--      ElNotification.success({-->
<!--        title: 'Success',-->
<!--        message: 'This pallet is copied',-->
<!--        offset: 100,-->
<!--      })-->

<!--      document.getElementById('contextMenu2').style.display = 'none'-->

<!--    },-->
<!--    async pastePalette() {-->
<!--      if (!this.isCopied) {-->
<!--        return-->
<!--      }-->
<!--      await this.changePosition(this.copiedPosition)-->
<!--      ElNotification.success({-->
<!--        title: 'Success',-->
<!--        message: 'This pallet is pasted',-->
<!--        offset: 100,-->
<!--      })-->
<!--      document.getElementById('contextMenu2').style.display = 'none'-->
<!--      this.isCopied = false-->
<!--    },-->
<!--    hovSubmenu() {-->
<!--      const menu = document.querySelector('.submenu1')-->
<!--      const e = event-->
<!--      // console.log(e)-->
<!--      // e.preventDefault();-->
<!--      // Show the context menu-->
<!--      menu.style.display = 'block'-->
<!--      // just for the pen :-->
<!--      menu.style.transform = 'translate(0)'-->
<!--      // set position X of the menu-->
<!--      if ((window.innerWidth - e.clientX - menu.offsetWidth) > menu.offsetWidth + 10) {-->
<!--        menu.style.left = 130 + 'px'-->
<!--      } else {-->
<!--        // menu.style.left = (e.clientX - menu.offsetWidth) + "px";-->
<!--        menu.style.left = (e.clientX - menu.offsetWidth) + 'px'-->
<!--      }-->
<!--      // set position Y of the menu-->
<!--      if ((window.innerHeight - e.clientY) > menu.offsetHeight + 10) {-->
<!--        menu.style.top = -65 + 'px'-->
<!--        // menu.style.bottom = 100 + "px";-->
<!--      } else {-->
<!--        menu.style.top = -65 + 'px'-->
<!--        // menu.style.top = (e.clientY - menu.offsetHeight) + "px";-->
<!--      }-->

<!--    },-->
<!--    mouseoutMenu() {-->
<!--      const menu = document.querySelector('.submenu1')-->
<!--      menu.style.display = 'none'-->
<!--    },-->
<!--    async getPalletByFlightId(id) {-->
<!--      this.selectedFlightId = id-->
<!--      const loading = ElLoading.service({-->
<!--        lock: true,-->
<!--        text: 'Loading',-->
<!--        background: 'rgba(255, 255, 255, 0.7)',-->
<!--      })-->
<!--      const {data: paletteData} = await paletteService.get({'flightId': id, 'terminal': this.search.terminal})-->
<!--      this.allPalette = paletteData-->
<!--      loading.close()-->
<!--    },-->
<!--    async searchFlight() {-->
<!--      // this.search.terminal=this.$store.getters['auth/GET_BUILDING']-->
<!--      const {data: paletteData} = await paletteService.get(this.search)-->
<!--      this.allPalette = paletteData-->
<!--      this.selectedFlightId = ''-->
<!--    },-->
<!--    secondClick(item) {-->
<!--      document.getElementById('contextMenu').style.display = 'none'-->
<!--    },-->
<!--    async getPosition(floor) {-->
<!--      const e = event-->
<!--      const menu = document.querySelector('.submenu2')-->
<!--      const submenu1 = document.querySelector('.submenu1')-->

<!--      // Show the context menu-->
<!--      menu.style.display = 'block'-->
<!--      // just for the pen :-->
<!--      menu.style.transform = 'translate(0)'-->
<!--      // set position X of the menu-->
<!--      if ((window.innerWidth - e.clientX) > menu.offsetWidth + 10) {-->
<!--        menu.style.left = submenu1.offsetWidth + 'px'-->
<!--      } else {-->
<!--        menu.style.left = (e.clientX - menu.offsetWidth) + 'px'-->
<!--      }-->
<!--      // set position Y of the menu-->
<!--      if ((window.innerHeight) / 2 > e.clientY + 10) {-->
<!--        // menu.style.top = -100 + "px";-->
<!--        menu.style.top = -(e.clientY - (window.innerHeight - menu.offsetHeight) / 2) + 'px'-->

<!--      } else {-->

<!--        // menu.style.top = -43 + "vh";-->
<!--        let top = -(e.clientY - (window.innerHeight - menu.offsetHeight) / 2)-->
<!--        if (e.clientY > menu.offsetHeight) {-->
<!--          top = -menu.offsetHeight + submenu1.offsetHeight-->
<!--        }-->
<!--        menu.style.top = top + 'px'-->
<!--      }-->

<!--      const {data: positionData} = await positionsService.getList(this.building, floor, 101)-->
<!--      this.allPosition = positionData-->
<!--    },-->
<!--    async changePosition(position) {-->
<!--      const {data: changePaletteData} = await changePaletteService.changePalette(position.id, this.id, this.fillPositionStatus)-->
<!--      this.allChangePalette = changePaletteData-->
<!--      // console.log( this.allPalette.filter(x => x.id === this.id))-->
<!--      this.allPalette.filter(x => x.id === this.id).map(x => x.whPosition = position.title)-->
<!--      this.allPalette.filter(x => x.id === this.id).map(x => x.terminal = position.terminal)-->
<!--      await this.getAllPosition()-->
<!--      this.id = ''-->
<!--    },-->
<!--    async getAllPosition() {-->
<!--      if (!this.building) {-->
<!--        return false-->
<!--      }-->
<!--      const {data: positionData} = await positionsService.getGroupedPositions(this.building)-->
<!--      this.allPositionByFloor = positionData-->

<!--    },-->
<!--    async getDestinationList() {-->
<!--      const {data: destinationData} = await flightService.destinationList({'arrivalStatus': this.search.arrivalStatus})-->
<!--      this.allDestinationList = destinationData-->
<!--    },-->
<!--    async getContourList() {-->
<!--      const {data: contourData} = await paletteService.contourList()-->
<!--      this.allContourList = contourData-->
<!--    },-->

<!--    filterData(position) {-->
<!--      if (this.filter.destination && this.filter.contour) {-->
<!--        return this.filter.destination === position.destination && this.filter.contour === position.contour-->
<!--      } else if (this.filter.destination === '' || this.filter.contour) {-->
<!--        return this.filter.contour === position.contour-->
<!--      } else if (this.filter.contour === '' || this.filter.destination) {-->
<!--        return this.filter.destination === position.destination-->
<!--      }-->


<!--    },-->
<!--    async changeTerminal(terminal) {-->
<!--      this.setBuilding(terminal)-->
<!--    }-->

<!--  }-->
<!--}-->
<!--const body = document.body,-->
<!--    html = document.documentElement-->

<!--const height = Math.max(body.scrollHeight, body.offsetHeight,-->
<!--    html.clientHeight, html.scrollHeight, html.offsetHeight)-->
<!--</script>-->

<style scoped>
.bg-yellow {
  background: yellow !important;
  box-shadow: 5px -3px 1px #d9c123;
}

.bg-yellow.bg-danger.tittle-align {
  box-shadow: 5px -3px 1px #cccc07;
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

.width100:nth-child(3) {
  margin-top: 37px;
}

.tittle-align {
  height: 30px;
  border: 1px solid #ffffffb8;
  text-align: center;
  margin-top: 2px;
  font-weight: bold;
  margin-right: 3px;
  margin-bottom: 3px;
  /*box-shadow: 5px -3px 1px #ffffff;*/
}

.el-card {
  --el-card-padding: 3px;
}

.bg-primary.tittle-align {
  box-shadow: 5px -3px 1px #3699ff;
}

.width100 {
  display: grid;
  width: 100%;
  grid-auto-flow: column;
  width: 100%;
}

.bg-danger.tittle-align {
  box-shadow: 5px -3px 1px #f64e60;
}

.inline-block {
  padding: 0 7px;
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
  background: #1f3a73;
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

/*.table thead tr th, .table tbody tr td {*/
/*  text-align: center;*/
/*  font-size: 14px;*/
/*  padding: 5px 8px !important;*/
/*  white-space: nowrap;*/
/*}*/
.table_div {

  background: #fff;
  border-radius: 6px;
  box-shadow: 0 3px 20px 0px rgb(0 0 0 / 10%);
}

.table_div {
  overflow-y: scroll;
  height: 75vh;
}

#contextMenu, #contextMenu2 {
  position: absolute;
  display: none;
  z-index: 1000;
}

.wrap {
  width: 90%;
  display: block;
  margin: 0 auto;
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
