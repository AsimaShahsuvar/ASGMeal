<template >
  <el-row
    class="mb-4"
    :gutter="20"
  >
    <el-col :span="5">
      <el-select
        v-model="isArrival"
        placeholder="Status"
        remote
        clearable
        filterable
      >
        <el-option
          v-for="item in allStatusList"
          :key="item.id"
          :label="item.title"
          :value="item.value"
        />
      </el-select>
    </el-col>
    <el-col :span="5">
      <el-date-picker
        v-model="startDate"
        style="width: 100%"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
        type="date"
        placeholder="Start Date"
      />
    </el-col>
    <el-col :span="5">
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
  <hr>
  <div class="row"  >
    <div class="col-md-3">
      <el-table

        ref="multipleTableRef"
        style="border-radius: 0!important;"
        :data="allFlightList"
        max-height="280"
        border
        header-row-class-name="custom_table_header"
        header-cell-class-name="custom_header_cell"
        :row-class-name="tableRowClassName"
        @selection-change="handleSelectionChange"
        @rowClick="getFlightId"
      >
        <el-table-column
          label="Flight"
        >
          <template #default="scope">
            {{ scope.row.flightTrip.carrier + scope.row.flightTrip.factCode }}
          </template>
        </el-table-column>
        <el-table-column
        label="Date"
        style="text-transform: uppercase">
          <template #default="scope" >
            {{ $moment(scope.row.flightTrip.takeoff).format('DDMMMYY')}}
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="col-md-9" >
      <el-table
        ref="multipleTableRef"
        style="border-radius: 0!important;"
        :data="awbList"
        stripe
        max-height="600px"
        border
        header-row-class-name="custom_table_header"
        header-cell-class-name="custom_header_cell"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          label="AWB"
          width="100"
        >
          <template #default="scope">
            {{ scope.row.prefix + scope.row.serialNo }}
          </template>
        </el-table-column>
        <el-table-column
          prop="numberOfPieces"
          label="Pieces"
          width="90"
        >
          <template #default="scope">
            <el-input
              v-if="scope.row.editable"
              v-model="scope.row.numberOfPieces"
              placeholder="Pieces"
              @change="scope.row.editable=false"
            />
            <div
              v-else
              class="editdiv"
              @click="scope.row.editable=true"
            >
              {{ scope.row.numberOfPieces }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="weight"
          label="Wight"
          width="90"
        >
          <template #default="scope">
            <el-input
              v-if="scope.row.editable"
              v-model="scope.row.weight"
              placeholder="Weight"
              @change="scope.row.editable=false"
            />
            <div
              v-else
              class="editdiv"
              @click="scope.row.editable=true"
            >
              {{ scope.row.weight }}
            </div>
          </template>
        </el-table-column>

        <el-table-column
          label="SHC"
          width="200"
        >
          <template #default="scope"  >
           <div   v-if="scope.row.editableselect"  >
             <el-select
              v-model="scope.row.awbItemGroups[0].awbItemGroupShcs"
              filterable
              clearable
              multiple
              collapse-tags
              remote
              :remote-method="remoteMethodSpcListForSearch"
              placeholder="SHC"
              value-key="id"
            >
              <el-option
                v-for="item in selectShipmentPlanDetails"
                :key="item.id"
                :label="item.shcCode"
                :value="item"
              />
            </el-select></div>
            <div
              v-else
              class="editdiv"
              @click="activate(scope.row )"
            >
              <template v-for="code in scope.row.awbItemGroups[0].awbItemGroupShcs">
                {{ code.shcCode }},
              </template>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <div
    class="col-md-12"
    style="position: relative;
    padding: 25px 0;"
  >
    <span class="dialog-footer">
      <el-button @click="$emit('closeDialog')">Cancel</el-button>
      <el-button
        type="primary"
        @click="saveLinkToFlight()"
      >Link To Flight</el-button>
    </span>
  </div>
</template>
<script>
import tripService from "@/services/tripService";
import {Delete, Discount, Edit, Search} from "@element-plus/icons";
import awbService from "@/services/awbService";
import loading from "@element-plus/icons/lib/Loading";
import {ElNotification} from "element-plus";


export default {

  name: 'LinkToFlight',
  components: {Discount},
  props: {
    awbList: {
      type: Array,
      required: true,

    },


    // selectShipmentPlanDetails: {
    //   type: Array,
    //   required: true
    // }
  },
  data() {
    return {
      count: 1,
      allFlightList: [],
      dialogFormVisibleFlight: false,
      startDate: this.$moment(new Date()).add(-2, 'days').format('YYYY-MM-DD'),
      isArrival: false,
      endDate: this.$moment(new Date()).add(3, 'days').format('YYYY-MM-DD'),
      allStatusList: [
        {
          id: 1,
          title: 'Outbound',
          value: false
        },
        {
          id: 1,
          title: 'Inbound',
          value: true
        }
      ],
      selectedFlightId: '',

      selectShipmentPlanDetails: [],
      tripId: '',
      planPcs: '',
      planGrossWeight: '',
      speialHandlingCode: [],
      allAwbShipperPlanList: []
    }
  },

  computed: {
    loading() {
      return loading
    },
    Search() {
      return Search
    },
    Delete() {
      return Delete
    },
    Edit() {
      return Edit
    },
    // itemGroups (){
    //  return  this.selectShipmentPlanDetails.map(el=>el.awbItemGroups).map(el=>el.awbItemGroupShcs)
    // }
  },
  async mounted() {
     this.getFlightList()
  },
  methods: {
    handleClick(e) {
      console.log(event)
    },

    handleSelectionChange(val) {

      this.multipleSelection = val
      console.log(this.multipleSelection)

    },
    async getFlightList() {

      const {data: tripData} = await tripService.getflighttriplistforsearch({
        startDate: this.startDate,
        endDate: this.endDate,
        isArrival: this.isArrival,

      })
      this.allFlightList = tripData


    },
    remoteMethodSpcListForSearch(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(async () => {
          this.loading = false;

          const {data: planData} = await awbService.getSpcListForSearch({code: query})
          this.selectShipmentPlanDetails = planData.data

        }, 200);
      } else {
        this.options = [];
      }
    },
    activate(row) {

      this.count++
      if (this.count > 1) {
        this.selectShipmentPlanDetails = row.awbItemGroups[0].awbItemGroupShcsIds
      }
      row.editableselect = true
      this.selectShipmentPlanDetails = row.awbItemGroups[0].awbItemGroupShcs
      row.awbItemGroupShcsIds = this.selectShipmentPlanDetails.map(el => el.id)

    },
    getFlightId(row) {
      this.selectedFlightId = row.id
      this.tripId = row.id
    },
    tableRowClassName({row, rowIndex}) {

      if (row.id === this.selectedFlightId) {
        return 'bg-primary-o-95'
      }

    },
    async saveLinkToFlight() {
      let tt = []

      this.awbList.forEach(el => {
        tt.push({
          'awbId': el.id,
          "planPcs": el.numberOfPieces,
          "planGrossWeight": el.weight,
          "speialHandlingCode": el.awbItemGroups[0].awbItemGroupShcs.map(el=>el.id),
        })
      })

      const {data: shipperPlanData} = await awbService.addShipmentPlan({
        tripId: this.tripId,
        addSHipmentPlan: tt

      })
      this.allAwbShipperPlanList = shipperPlanData.data
      ElNotification({type: 'Success', title: 'Success', zIndex: 999999})
      this.$emit('closeDialog')

    },

  }
}

</script>
<style></style>