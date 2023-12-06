<template>
  <el-dialog
    v-model="dialogFormShipmentPlan"
    title="Shipment Plan"
    @closed="link.uld_id=''"
  >
    <el-table
      v-loading="loading"
      :data="allShipmentPlanToUld"
      stripe
      max-height="750"
      border
      style="width: 100%;max-width: 100%"
      header-row-class-name="custom_table_header"
      header-cell-class-name="custom_header_cell"
      :row-class-name="tableRowClassName"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        prop="id"
        label="Id"
        type="selection"
      />
      <el-table-column
        prop="id"
        label="Id"
        align="center"
      />
      <el-table-column
        prop="awbId"
        label="awbId"
        align="center"
      />
      <el-table-column
        width="110"
        label="SHCS"
      >
        <template #default="scope">
          <span>
            <template v-for="code in scope.row.awbShipmentPlanShcs">
              {{ code.shcCode }}/
            </template>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        width="100"
        prop="chargeableWeight"
        label="Ch Weight"
      />
      <el-table-column
        width="100"
        prop="commodityItem"
        label="Com Item"
      />
      <el-table-column

        width="400"
        prop="description"
        label="Description"
      />
      <el-table-column
        width="110"
        prop="grossWeight"
        label="GrossWeight"
      />
      <el-table-column
        prop="rateClass"
        label=" Class"
      />
      <el-table-column
        prop="chargeMin"
        label="Ch Min"
      />

      <el-table-column
        prop="charge"
        label="Charge"
      />
      <el-table-column
        prop="awbShipmentPlanShcs.shcCode"
        label="Code"
      />

      <el-table-column
        prop="height"
        label="Height"
      />
      <el-table-column
        prop="total"
        label="Total"
      />

      <el-table-column
        prop="length"
        label="Length"
      />
      <el-table-column
        prop="pcs"
        label="Pieces"
      />
      <el-table-column
        prop="volume"
        label="Volume"
      />
      <el-table-column
        prop="width"
        label="Width"
      />
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormShipmentPlan = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="shipmentPlanLinkToUld()"
        >Link To UlD</el-button>
      </span>
    </template>
  </el-dialog>

  <el-row>
    <el-col :span="6">
      <el-table
        v-loading="loading"
        :data="allUldList"
        max-height="750"
        border
        row-key="id"
        style="width: 100%;max-width: 100%"
        header-row-class-name="custom_table_header"
        header-cell-class-name="custom_header_cell"
        :row-class-name="tableRowClassName"
        @rowClick="openShipmentPlan"

      >
        <el-table-column
          prop="uldName"
          label="UldName"
        />
      </el-table>
    </el-col>
  </el-row>
</template>
<script>

import {ElNotification} from 'element-plus'
import {Delete, Edit, Search} from '@element-plus/icons'
import awbService from "@/services/awbService";
import uldService from "@/services/uldService";
import {rowKey} from "element-plus/es/components/table-v2/src/common";


export default {
  name: 'Etv',
  data() {
    return {
      loading: true,
      dialogFormShipmentPlan: false,
      allShipmentPlanToUld: [],
      allUldList: [],
      name: '',
      link: {
        uld_id:'',
        awbShipmentPlan_id:[]
      },
      multipleSelection: [],
      allUldUpdate: [],
   }
  },
  computed: {
    rowKey() {
      return rowKey
    }

  },
  async mounted() {
    await this.getUldforSelect()

  },
  methods: {
    handleClick(e) {
      console.log(event)
    },
    async getUldforSelect() {
      const {data: uldData} = await uldService.getUldForSelect(this.name)
      this.allUldList = uldData.data
      this.loading = false

    },
    handleSelectionChange(val) {

       this.multipleSelection = val
         console.log(this.multipleSelection)

      },
    tableRowClassName({row, rowIndex}) {
      console.log(3333,row)
      if(row.id===this.link.uld_id){
        return 'bg-primary-o-95'
      }
      if (rowIndex % 2 === 0) {
        return 'bg-secondary-o-95'
      } else {
        return 'warning-row'
      }
    },
    async openShipmentPlan(row) {
      console.log(2222,row)
      this.link.uld_id=row.id
      this.dialogFormShipmentPlan = true
      const {data: shipmentData} = await awbService.getShipmentplanforuldlink()
      this.allShipmentPlanToUld = shipmentData.data
      this.loading = false
    },
    async shipmentPlanLinkToUld(){
      this.link.awbShipmentPlan_id = [...new Set(this.multipleSelection.map(x => x.id))]
      const {data: uldData} = await uldService.shipmentplanlinktould(
          {
            'uld_id':this.link.uld_id,
            'awbShipmentPlan_id':this.link.awbShipmentPlan_id

          }
      )
      this.allUldUpdate = uldData
    }
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
</style>
