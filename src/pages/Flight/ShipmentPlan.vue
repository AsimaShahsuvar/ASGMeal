<template>


  <div class="row">
    <el-table
        ref="multipleTableRef"
        v-loading="loading"
        :data="allShiperPlanList"
        stripe
        max-height="750"

        border
        style="width: 100%"
        header-row-class-name="custom_table_header"
        header-cell-class-name="custom_header_cell"
    >
      <el-table-column type="index" width="50" />
      <el-table-column
          label="Awb"
          prop="awb"
          width="100"
      />
      <el-table-column
          label="Dep"
          prop="departure"
          width="70"
      />
      <el-table-column
          label="Des"
          prop="destination"
          width="70"
      />
      <el-table-column
          label="Fact Pcs"
          prop="factPcs"
          width="80"
      />
      <el-table-column
          label="Fact Weight"
          prop="factGrossWeight"
          width="100"
      />
           <el-table-column
          label="Plan Pcs"
          prop="planPcs"
          width="85"
      />
      <el-table-column
          label="Plan Weight"
          prop="planGrossWeight"
          width="100"
      />
      <el-table-column
          label="Consignee"
          prop="consignee"

      />
      <el-table-column
          label="Shipper"
          prop="shipper"

      />
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

      allShiperPlanList: [],
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
    await this.getShipmentPlanListForTrip()
  },
  methods: {
    handleClick(e) {
      console.log(event)
    },

    async getShipmentPlanListForTrip() {

      console.log('The id is: ' + this.$route.params.id);
      const {data: ShipperPlanData} = await awbService.getShipmentPlanListForTrip(this.$route.params.id)
      this.allShiperPlanList = ShipperPlanData.data


    },


  }
}
</script>
<style lang="scss">
.custom_table_header {
  background-color: #8cbbe6 !important;
  color: #fff;
}

.custom_header_cell {
  background: transparent !important;
}
</style>
