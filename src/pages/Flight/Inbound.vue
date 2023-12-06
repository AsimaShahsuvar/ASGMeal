<template>
  <el-dialog
      v-model="dialogFormVisibleFlight"
      title="Link To Flight"
  >
    <linkToFlight
        :awb-list="multipleSelection"
        :speial-handling-code="selectShipmentPlanDetails"
        @closeDialog="updateAwb"
    />
  </el-dialog>
  <el-row
      class="mb-4"
      :gutter="20"
  >
    <el-col :span="3">
      <el-date-picker
          v-model="startDate"
          style="width: 100%"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
          type="date"
          placeholder="Start Date"
      />
    </el-col>
    <el-col :span="3">
      <el-date-picker
          v-model="endDate"
          style="width: 100%"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
          type="date"
          placeholder="End Date"
      />
    </el-col>

    <el-col :span="4">
      <el-button
          :icon="Search"
          @click="getFlightList"
      />
    </el-col>
  </el-row>
  <div class="row">
    <el-table
        ref="multipleTableRef"
        v-loading="loading"
        :data="allFlightList"
        stripe
        max-height="750"
        @row-dblclick="getShipmentPlanListForTrip"
        border
        header-row-class-name="custom_table_header"
        header-cell-class-name="custom_header_cell"
    >
      <el-table-column type="index" width="50" />
      <el-table-column
          label="Flight"
          prop="flight"
          width="80"
      />
      <el-table-column
          label="Take off"
          width="100"
      >
        <template #default="scope">
          {{ !isArrival ? $moment(new Date(scope.row.arrivalTime)).format('YYYY-MM-DD') : $moment(new Date(scope.row.takeoffTime)).format('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column
          label="Time"
          width="80"
      >
        <template #default="scope">
          {{ !isArrival ? $moment(new Date(scope.row.arrivalTime)).format('hh:mm') : $moment(new Date(scope.row.takeoffTime)).format('hh:mm') }}
        </template>
      </el-table-column>

      <el-table-column
          label="From"
          width="80"
      >
        <template #default="scope">
          {{ isArrival ? scope.row.departure : scope.row.destination }}
        </template>
      </el-table-column>
      <el-table-column
          prop="aircraftType"
          label="Ac Type"
          width="80"
      />
      <el-table-column
          label="Reg No"
          prop="regNo"
          width="100"
      />
      <el-table-column
          label="Awb Count"
          prop="awbCount"
          width="100"
      />
      <el-table-column label="Plan">
        <el-table-column
            label="Pieces"
            prop="planPcs"
            width="100"
        />
        <el-table-column
            label="Weight"
            prop="planWeight"
            width="100"
        />
      </el-table-column>
      <el-table-column label="Fact">
        <el-table-column
            label="Pieces"
            prop="factPcs"
            width="100"
        />
        <el-table-column
            label="Weight"
            prop="factWeight"
            width="100"
        />
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {Delete, Edit, Search} from '@element-plus/icons'
import consigneeService from '@/services/consigneeService'
import awbService from "@/services/awbService";
import stationService from "@/services/stationService";
import shipperService from "@/services/shipperService";
import linkToFlight from "@/components/linkToFlight.vue";
import tripService from "@/services/tripService";


export default {
  name: 'Etv',

  components: {
    linkToFlight
  },
  data() {
    return {
      isArrival: true,
      startDate: this.$moment(new Date()).format('YYYY-MM-DD'),
      endDate: this.$moment(new Date()).format('YYYY-MM-DD'),
      dialogFormVisibleFlight: false,

      allFlightList: [],
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
  async mounted() {
    this.getFlightList()
  },
  methods: {
    handleClick(e) {
      console.log(event)
    },

    async getFlightList() {
      const {data: FlightData} = await tripService.getFlightList({
        startDate: this.startDate,
        endDate: this.endDate,
        isArrival: this.isArrival,
      })
      this.allFlightList = FlightData
    },
    getShipmentPlanListForTrip(row) {
      console.log(row)
      // this.$router.push({name: 'ShipmentPlan', params: {id: row.id}})
      const routeData = this.$router.resolve({name: 'ShipmentPlan', params: {id: row.id}});
      window.open(routeData.href, '_blank');
    }

  }
}
</script>
<style lang="scss">
.custom_table_header {
  background-color: #8cbbe6 !important;
  color: #fff;
}
.el-table thead.is-group th.el-table__cell {
  text-align: center;
}
.custom_header_cell {
  background: transparent !important;
}
</style>
