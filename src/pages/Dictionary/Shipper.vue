<template>
  <el-dialog
      v-model="dialogFormVisibleAdd"
      title="Add Shipper"
  >
    <div class="border-content">
      <div class="row">
        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.shipperName1"
                placeholder="shipperName1"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.shipperName2"
                placeholder="shipperName2"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.shipperAddress1"
                placeholder="shipperAddress1"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.shipperAddress2"
                placeholder="shipperAddress2"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.shipperLocationPlace"
                placeholder="shipperLocationPlace"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.shipperLocationState"
                placeholder="shipperLocationState"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.shipperCodedLocPostCode"
                placeholder="shipperCodedLocPostCode"
            />
          </div>
        </div>

        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.accountNumber"
                placeholder="accountNumber"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.certificationSign"
                placeholder="certificationSign"
            />
          </div>
        </div>
        <div class="col-2">
          <div class="col-form-label">
            <el-input
                v-model="editItem.shipperContactDetails.contactIdentifier"
                placeholder="+994"
            />
          </div>
        </div>
        <div class="col-3">
          <div class="col-form-label">
            <el-input
                v-model="editItem.shipperContactDetails.contactNumber"
                placeholder="contactNumber"
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
        >Add Shipper</el-button>
      </span>
    </template>
  </el-dialog>


  <el-row class="mb-4" gutter="20">

    <el-col :span="4">
      <label>Search by name</label>
      <el-input v-model="name" placeholder="Search " :suffix-icon="Search" @change="getShipperList"/>
    </el-col>
    <el-col :span="2">
      <label>By row</label>
      <el-select
          v-model="perPage"
          placeholder="Select"
          @change="getShipperList"
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
          @click="addShipper"
      >
        Add Shipper
      </el-button>
    </el-col>
  </el-row>
  <div class="row">
    <el-table
        v-loading="loading"
        :data="allShipperList"
        stripe
        max-height="750"
        border
        style="width: 100%;max-width: 100%"

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
          prop="shipperName1"
          label="Name 1"
          width="150"
      />
      <el-table-column
          prop="shipperName1"
          label="Name 2"
          width="150"
      />
      <el-table-column
          prop="accountNumber"
          label="Ac Num"
      />
      <el-table-column
          prop="shipperAddress1"
          label="Address1"
          width="250"
      />
      <el-table-column
          prop="shipperAddress2"
          label="Address2"
          width="250"
      />
      <el-table-column
          prop="shipperCodedLocCountry"
          label="Country"
      />
      <el-table-column
          prop="shipperCodedLocPostCode"
          label="PostCode"
      />
      <el-table-column
          prop="shipperLocationPlace"
          label="Place"
      />
      <el-table-column
          class-name="actions"
          label="Action"
          width="140"
      >
        <template #default="scope">
          <el-button
              :icon="Edit"
              type="primary"
              @click="editData(scope.row)"
          />
          <el-popconfirm
              cancel-button-text="Отмена"
              confirm-button-text="Да"
              title="Are you sure you want to delete your data?"
              @confirm="deleteData(scope.row)"
          >
            <template #reference>
              <el-button
                  :icon="Delete"
                  type="danger"
              />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
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
  </div>

</template>

<script>
import usePagination from '@/composables/common/usePagination'
import shipperService from '@/services/shipperService'
import {ElNotification} from 'element-plus'
import {Delete, Edit, Search} from '@element-plus/icons'

const {pagination, setPagination, currentPage, perPage, perPageCounts} = usePagination()

export default {
  name: 'Etv',

  data() {
    return {
      loading: true,
      allShipperList: [],
      dialogFormVisibleAdd: false,
      isNewData: false,
      editItem: {
        shipperName1: '',
        shipperName2: '',
        shipperAddress1: '',
        shipperAddress2: '',
        shipperLocationPlace: '',
        shipperLocationState: '',
        shipperCodedLocCountry: '',
        shipperCodedLocPostCode: '',
        accountNumber: '',
        certificationSign: '',
        shipperContactDetails: [
          {
            contactIdentifier: '',
            contactNumber: ''
          }
        ],

      },
      defaultShipper: {
        shipperName1: '',
        shipperName2: '',
        shipperAddress1: '',
        shipperAddress2: '',
        shipperLocationPlace: '',
        shipperLocationState: '',
        shipperCodedLocCountry: '',
        shipperCodedLocPostCode: '',
        accountNumber: '',
        certificationSign: '',
        shipperContactDetails: [
          {
            contactIdentifier: '',
            contactNumber: ''
          }
        ],

      },
      currentPage: currentPage.value,
      perPage: perPage.value,
      perPageCounts: perPageCounts.value,
      pagination: pagination,
      name: '',
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
    await this.getShipperList()

  },
  methods: {
    handleClick(e) {
      console.log(event)
    },
    async saveData() {

      const {} = await shipperService.create(this.editItem)
      this.dialogFormVisibleAdd = false
      await this.getShipperList()
      ElNotification({type: 'Success', title: 'Success'})
    },
    addShipper() {
      this.isNewData = true
      this.editItem = Object.assign({}, this.defaultShipper)
      this.dialogFormVisibleAdd = true
    },
    async getShipperList() {
      this.loading = true
      try {
        const {data: shipperData} = await shipperService.getList({name: this.name}, this.currentPage, this.perPage)
        this.allShipperList = shipperData.items
        setPagination(shipperData.meta)
      } finally {
        this.loading = false
      }

    },
    deleteData(data) {
    },
    editData(data) {
      this.editItem = Object.assign({}, data)
      this.isNewData = false
      this.dialogFormVisibleAdd = true
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
      await this.getShipperList()
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
