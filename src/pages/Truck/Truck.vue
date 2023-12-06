<template>
  <el-dialog
      v-model="dialogFormVisibleAdd"
      title="Add Truck"
  >
    <div class="border-content ">
      <div class="row">
        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.regNo1"
                placeholder="Reg No1"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.regNo2"
                placeholder="Reg No2"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.vansize"
                placeholder="Size"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-select
                v-model="editItem.companyId"
                filterable
                clearable
                remote
                :remote-method="remoteMethod"
                placeholder="Select"
                @change="getCompany"
            >
              <el-option
                  v-for="item in allCompany"
                  :key="item.id"
                  :label="item.company"
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
            <el-input
                v-model="editItem.remark"
                placeholder="remark"
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
            @click="saveData()"
        >Add Truck</el-button>
      </span>
    </template>
  </el-dialog>
  <el-row class="mb-4" :gutter="20">
    <el-col :span="4">
      <label>Search by name</label>
      <el-input v-model="name" placeholder="Search " :suffix-icon="Search" @change="getTruckList"/>
    </el-col>
    <el-col :span="2">
      <label>By row</label>
      <el-select
          v-model="perPage"
          placeholder="Select"
          @change="getTruckList"
      >
        <el-option
            v-for="item in perPageCounts"
            :key="item"
            :label="item"
            :value="item"
        />
      </el-select>
    </el-col>
    <el-col :span="4">
      <el-button
          class="mt-5"
          type="warning"
          @click="addTruck"
      >
        Add Truck
      </el-button>
    </el-col>
  </el-row>
  <div class="row">

    <el-table
        v-loading="loading"
        :data="allTruckList"
        stripe
        max-height="750"
        border
        style="width: 100%"
        header-row-class-name="custom_table_header"
        header-cell-class-name="custom_header_cell"
        :row-class-name="tableRowClassName"
    >
      <el-table-column
          prop="id"
          label="Id"
          width="40"
          align="center"
      />
      <el-table-column
          prop="regNo1"
          label="Truck Reg No1"

      />
      <el-table-column
          prop="regNo2"
          label="Truck Reg No2"

      />
      <el-table-column

          prop="company.company"
          label="Company"

      />
      <el-table-column

          prop="vansize"
          label="Size"

      />
      <el-table-column

          prop="remark"
          label="Remark"

      />

      <el-row justify="center">
        <el-pagination
            v-model:currentPage="currentPage"
            :hide-on-single-page="true"
            layout="prev, pager, next"
            sortable="custom"
            v-bind="pagination"
            @update:current-page="onCurrentPageUpdated"
        />
      </el-row>
    </el-table>
  </div>
</template>

<script>
import usePagination from '@/composables/common/usePagination'
import truckService from '@/services/truckService'
import {ElNotification} from 'element-plus'
import {Delete, Edit, Search} from '@element-plus/icons'
import shipperService from "@/services/shipperService";
import ConsigneeService from "@/services/consigneeService";

const {pagination, setPagination, currentPage, perPage, perPageCounts} = usePagination()

export default {
  name: 'Etv',

  data() {
    return {
      loading: true,
      allTruckList: [],
      dialogFormVisibleAdd: false,
      isNewData: false,
      editItem: {
        regNo1: '',
        regNo2: '',
        companyId: '',
        vansize: '',
        driversId: '',
        remark: '',
      },
      allCompany: [],
      defaultTruck: {
        regNo1: '',
        regNo2: '',
        companyId: '',
        vansize: '',
        driversId: '',
        remark: '',

      },
      currentPage: currentPage.value,
      perPage: perPage.value,
      perPageCounts: perPageCounts.value,
      pagination: pagination,
      name:''
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
    await this.getTruckList()

  },
  methods: {
    handleClick(e) {
      console.log(event)
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(async () => {
          this.loading = false;

          const {data: companyData} = await truckService.searchcompanyfortruck({company: query})
          this.allCompany = companyData.data

        }, 200);
      } else {
        this.options = [];
      }
    },
    async saveData () {

      const {} = await truckService.addTruck(this.editItem)
      this.dialogFormVisibleAdd = false
      await this.getTruckList()
      ElNotification({ type: 'Success', title: 'Success' })
    },
    async getCompany() {
      // const {data: companyData} = await truckService.searchcompanyfortruck(this.editItem.companyId)
      // this.allCompany = companyData.items
    },
    async getTruckList() {
      this.loading = true
      try {
        const {data: truckData} = await truckService.getList({name:this.name}, this.currentPage, this.perPage)
        this.allTruckList = truckData.items
        setPagination(truckData.meta)
      } finally {
        this.loading = false
      }

    },

    tableRowClassName({row, rowIndex}) {
      if (rowIndex % 2 === 0) {
        return 'bg-secondary-o-95'
      } else {
        return 'warning-row'
      }
    },
    setPagination(e) {
      setPagination(e)
    },
    async onCurrentPageUpdated(page) {
      currentPage.value = page
      await this.getTruckList()
    },
    addTruck() {
      this.isNewData = true
      this.editItem = Object.assign({}, this.defaultTruck)
      this.dialogFormVisibleAdd = true
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
