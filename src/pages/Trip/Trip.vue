<template>
  <el-dialog
      v-model="dialogFormVisibleAdd"
      title="Add Trip"
  >
    <div class="border-content">
      <div class="row">
        <div class="col-4">
          <div class="col-form-label">
            <el-select
                v-model="editItem.truckId"
                placeholder="Truck"
                remote
                clearable
                filterable
                :remote-method="remoteTruckMethod"
            >
              <el-option
                  v-for="item in allTruckList"
                  :key="item.id"
                  :label="item.regNo1"
                  :value="item.id"
              />
            </el-select>
          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.driversId"
                placeholder="Driver"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-select
                v-model="editItem.origin"
                placeholder="Origin"
                remote
                clearable
                filterable
                :remote-method="remoteOriginMethod"
            >
              <el-option
                  v-for="item in allOriginList"
                  :key="item.iata"
                  :label="item.iata"
                  :value="item.iata"
              />
            </el-select>

          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-select
                v-model="editItem.destination"
                placeholder="Destination"
                remote
                clearable
                filterable
                :remote-method="remoteDestinationMethod"
            >
              <el-option
                  v-for="item in allOriginList"
                  :key="item.iata"
                  :label="item.iata"
                  :value="item.iata"
              />
            </el-select>

          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-date-picker
                style="width: 100%"

                v-model="editItem.depDt"
                type="datetime"
                placeholder="Departure Date"

            />
          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-date-picker
                style="width: 100%"

                v-model="editItem.arvDt"
                type="datetime"
                placeholder="Arrival Date"

            />
          </div>
        </div>

      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">Cancel</el-button>
        <el-button
            type="primary"
            @click="saveTrip()"
        >Add Trip</el-button>
      </span>
    </template>
  </el-dialog>
  <el-row
      class="mb-4 "
      gutter="2"
  >
    <el-col :span="3">
      <el-date-picker
          style="width: 100%"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
          v-model="startDate"
          type="date"
          placeholder="Pick a day"

      />
    </el-col>
    <el-col :span="3">
      <el-date-picker
          format="YYYY/MM/DD"
          style="width: 100%"
          value-format="YYYY-MM-DD"
          v-model="endDate"
          type="date"
          placeholder="Pick a day"

      />
    </el-col>
    <el-col :span="2">
      <el-button
          :icon="Search"

          @click="getArrivalTripList"
      >

      </el-button>

    </el-col>
    <el-col :span="2">
      <el-button
          type='primary'
          @click="openAddTruck"
      >
        Add Trip
      </el-button>

    </el-col>
  </el-row>
  <div class="row">
    <el-table
        v-loading="loading"
        :data="allArrivalTripList"

        stripe
        border
        style="width: 100%"
        header-row-class-name="custom_table_header"
        header-cell-class-name="custom_header_cell"
        :row-class-name="tableRowClassName"
        @rowClick="openShipmentPlan"
    >
      <el-table-column

          label="Reg No"
          align="center"
      >
        <template #default="scope">
          {{ scope.row.truckTrip.regNo }}
        </template>
      </el-table-column>

      <el-table-column

          label="Origin"
          align="center"
      >
        <template #default="scope">
          {{ scope.row.truckTrip.destination }}
        </template>
      </el-table-column>
      <el-table-column

          label="Destination"
          align="center"
      >
        <template #default="scope">
          {{ scope.row.truckTrip.origin }}
        </template>
      </el-table-column>
      <el-table-column

          label="Arrival Date"
          align="center"
      >
        <template #default="scope">
          {{ $moment(scope.row.truckTrip.arvDt).format("DD MM YYYY hh:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column

          label="Departure Date"
          align="center"
      >
        <template #default="scope">
          {{ $moment(scope.row.truckTrip.depDt).format("DD MM YYYY hh:mm:ss") }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import usePagination from '@/composables/common/usePagination'
import shipperService from '@/services/shipperService'
import {ElNotification} from 'element-plus'
import {Delete, Edit, Search} from '@element-plus/icons'
import tripService from "@/services/tripService";
import agentService from "@/services/agentService";
import truckService from "@/services/truckService";
import stationService from "@/services/stationService";
import awbService from "@/services/awbService";

export default {
  name: 'Etv',

  data() {
    return {
      startDate:'',
      endDate:'',
      allOriginList:[],
      allDestinationList:[],
      allArrivalTripList: [],
      dialogFormVisibleAdd: false,
      allTruckList: [],
      isNewData: false,
      editItem: {
        truckId: '',
        driversID: '',
        origin: '',
        destination: '',
        depDt: '',
        arvDt: '',
      },
      defaultTrip: {
        truckId: '',
        driversID: '',
        origin: '',
        destination: '',
        depDt: '',
        arvDt: '',
      },

    }
  },
  computed: {
    Search() {
      return Search
    },
    Delete() {
      return Delete
    },
    Edit() {
      return Edit
    }
  },

  methods: {
    handleClick(e) {
      console.log(event)
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex % 2 === 0) {
        return 'bg-secondary-o-95'
      } else {
        return 'warning-row'
      }
    },
    async getArrivalTripList() {

      const {data: tripData} = await tripService.getarrivaltriplist({startDate: this.startDate, endDate: this.endDate})
      this.allArrivalTripList = tripData

    },
    openAddTruck() {
      this.isNewData = true
      this.editItem = Object.assign({}, this.defaultTrip)
      this.dialogFormVisibleAdd = true
    },
    remoteTruckMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(async () => {
          this.loading = false;

          const {data: truckData} = await truckService.searchtruckwithregno({regno: query})
          this.allTruckList = truckData

        }, 200);
      } else {
        this.options = [];
      }
    },
    remoteOriginMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(async () => {
          this.loading = false;

          const {data: originData} = await stationService.getstationforsearch({text: query})
          this.allOriginList = originData.data

        }, 200);
      } else {
        this.options = [];
      }
    },
    remoteDestinationMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(async () => {
          this.loading = false;

          const {data: destinationData} = await stationService.getstationforsearch({text: query})
          this.allDestinationList = destinationData.data

        }, 200);
      } else {
        this.options = [];
      }
    },
    async saveTrip() {

      const {data: resp} = await tripService.addTruckTrip(this.editItem)
      this.dialogFormVisibleAdd = false
console.log(resp)

      this.allArrivalTripList.push(resp)
      ElNotification({type: 'Success', title: 'Success'})
    },
  }
}
</script>

<style lang="scss">

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #3f3f3f;
}

.custom_table_header {
  background-color: #8cbbe6 !important;
  color: #fff;
}

.custom_header_cell {
  background: transparent !important;
}

/*table {*/
/*  border: 1px solid rgba(221, 221, 221, 1);*/
/*}*/

/*tr:nth-child(even) {*/
/*  background: #F5F5F5*/
/*}*/
/*.el-table tr td {*/
/*  padding: 0!important;*/
/*}*/
/*.el-table--fit {*/
/*  height: 75vh!important;*/
/*}*/
</style>
