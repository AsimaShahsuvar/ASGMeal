<template>
  <el-dialog
      v-model="dialogFormVisibleAdd"
      title="Add Consignee"
  >
    <div class="border-content ">
      <div class="row">
        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.consigneerName1"
                placeholder="consigneerName1"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.consigneerName2"
                placeholder="Consignee rName2"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.consigneerAddress1"
                placeholder="Consigneer Address1"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.consigneerAddress2"
                placeholder="Consigneer Address2"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.consigneerLocationPlace"
                placeholder="consigneerLocationPlace"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.consigneerLocationState"
                placeholder="consigneerLocationState"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.consigneerCodedLocPostCode"
                placeholder="consigneerCodedLocPostCode"
            />
          </div>
        </div>

        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.acountNumber"
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
                v-model="editItem.consigneerContactDetails.contactIdentifier"
                placeholder="+994"
            />
          </div>
        </div>
        <div class="col-3">
          <div class="col-form-label">
            <el-input
                v-model="editItem.consigneerContactDetails.contactNumber"
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
        >Add Consignee</el-button>
      </span>
    </template>
  </el-dialog>
  <el-row class="mb-4" :gutter="20">
    <el-col :span="4">
      <label>Search by name</label>
      <el-input v-model="name" placeholder="Search " :suffix-icon="Search" @change="getConsigneeList"/>
    </el-col>
    <el-col :span="2">
      <label>By Row</label>
      <el-select
          v-model="perPage"
          placeholder="Select"
          @change="getConsigneeList"
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
          @click="addConsignee"
      >
        Add Consignee
      </el-button>
    </el-col>
  </el-row>
  <div class="row">
    <el-table
        v-loading="loading"
        :data="allConsigneeList"
        stripe
        max-height="750"
        border
        style="width: 100%"
        header-row-class-name="custom_table_header"
        header-cell-class-name="custom_header_cell"
        :row-class-name="tableRowClassName"
    >
      <el-table-column
          prop="consigneerName1"
          label="Name 1"
          width="180"
      />
      <el-table-column
          prop="consigneerName2"
          label="Name 2"
          width="180"
      />
      <el-table-column
          prop="acountNumber"
          label="Ac Num"
      />
      <el-table-column
          prop="consigneerAddress1"
          label="cAddress1"
          width="300"
      />
      <el-table-column
          prop="consigneerAddress2"
          label="Address2"
          width="300"
      />
      <el-table-column
          prop="consigneerCodedLocCountry"
          label="Country"
      />
      <el-table-column
          prop="consigneerCodedLocPostCode"
          label="PostCode"
      />
      <el-table-column
          prop="consigneerLocationPlace"
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
import {Delete, Edit, Search} from '@element-plus/icons'

import {ElNotification} from 'element-plus'
import ConsigneeService from '@/services/consigneeService'
import consigneeService from '@/services/consigneeService'

const {pagination, setPagination, currentPage, perPage, perPageCounts} = usePagination()

export default {
  name: 'Etv',

  data() {
    return {
      loading: true,
      dialogFormVisibleAdd: false,
      editItem: {
        consigneerName1: '',
        consigneerName2: '',
        consigneerAddress1: '',
        consigneerAddress2: '',
        consigneerLocationPlace: '',
        consigneerLocationState: '',
        consigneerCodedLocCountry: '',
        consigneerCodedLocPostCode: '',
        acountNumber: '',
        certificationSign: '',
        consigneerContactDetails: [
          {
            contactIdentifier: '',
            contactNumber: ''
          }
        ]

      },
      isNewData: false,
      defaultConsignee: {
        consigneerName1: '',
        consigneerName2: '',
        consigneerAddress1: '',
        consigneerAddress2: '',
        consigneerLocationPlace: '',
        consigneerLocationState: '',
        consigneerCodedLocCountry: '',
        consigneerCodedLocPostCode: '',
        acountNumber: '',
        certificationSign: '',
        consigneerContactDetails: [
          {
            contactIdentifier: '',
            contactNumber: ''
          }
        ]
      },
      allConsigneeList: [],
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
    await this.getConsigneeList()
  },
  methods: {
    handleClick(e) {
      console.log(event)
    },
    async saveData() {

      const {} = await ConsigneeService.create(this.editItem)
      this.dialogFormVisibleAdd = false
      await this.getConsigneeList()
      ElNotification({type: 'Success', title: 'Success'})
    },
    addConsignee() {
      this.isNewData = true
      this.editItem = Object.assign({}, this.defaultConsignee)
      this.dialogFormVisibleAdd = true
    },

    async getConsigneeList() {
      this.loading = true

      try {
        const {data: consigneeData} = await consigneeService.getList({name: this.name}, this.currentPage, this.perPage)
        this.allConsigneeList = consigneeData.items
        setPagination(consigneeData.meta)
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
      await this.getConsigneeList()
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
