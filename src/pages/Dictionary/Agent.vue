<template>
  <el-dialog
      v-model="dialogFormVisibleAdd"
      title="Add Agent"
  >
    <div class="border-content">
      <div class="row">
        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.name"
                placeholder="Name"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.accountNumber"
                placeholder="AccountNumber"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.iataCargoCode"
                placeholder="iataCargoCode"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.iataCargoAddress"
                placeholder="iataCargoAddress"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.participantIdentifier"
                placeholder="Identifier"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.place"
                placeholder="Place"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.referenceData"
                placeholder="ReferenceData"
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
        >Add Agent</el-button>
      </span>
    </template>
  </el-dialog>
  <el-row class="mb-4" :gutter="20">
    <el-col :span="4">
      <label>Search by name</label>
      <el-input v-model="name" placeholder="Search " :suffix-icon="Search" @change="getAgentList"/>
    </el-col>
    <el-col :span="2">
      <label>By row</label>
      <el-select
          v-model="perPage"
          placeholder="Select"
          @change="getAgentList"
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
          @click="addAgent"
      >
        Add Agent
      </el-button>
    </el-col>
  </el-row>
  <div class="row">
    <el-table
        v-loading="loading"
        :data="allAgentList"
        stripe
        max-height="750"
        border
        style="width: 100%"
        header-row-class-name="custom_table_header"
        header-cell-class-name="custom_header_cell"
        :row-class-name="tableRowClassName"
    >
      <el-table-column
          prop="name"
          label="Name"
          width="180"
      />

      <el-table-column
          prop="accountNumber"
          label="Ac Num"
      />
      <el-table-column
          prop="iataCargoCode"
          label="IATA Code"
      />
      <el-table-column
          prop="iataCargoAddress"
          label="Address"
          width="400"
      />
      <el-table-column
          prop="participantIdentifier"
          label="Identifier"
      />
      <el-table-column
          prop="place"
          label="place"
      />
      <el-table-column
          prop="referenceData"
          label="Ref Data"
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
  </div>
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

</template>
<script>

import {Delete, Edit, Search} from '@element-plus/icons'

import {ElNotification} from 'element-plus'
import agentService from '@/services/agentService'
import usePagination from '@/composables/common/usePagination'

const {pagination, setPagination, currentPage, perPage, perPageCounts} = usePagination()

export default {
  name: 'Etv',

  data() {
    return {
      loading: false,
      dialogFormVisibleAdd: false,
      isNewData: false,
      editItem: {
        name: '',
        accountNumber: '',
        iataCargoCode: '',
        iataCargoAddress: '',
        participantIdentifier: '',
        place: '',
        referenceData: ''

      },
      defaultAgent: {
        name: '',
        accountNumber: '',
        iataCargoCode: '',
        iataCargoAddress: '',
        participantIdentifier: '',
        place: '',
        referenceData: ''
      },
      allAgentList: [],
      currentPage: currentPage.value,
      perPage: perPage.value,
      perPageCounts: perPageCounts.value,
      pagination: pagination,
      name: ''
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
    await this.getAgentList()
  },
  methods: {
    handleClick(e) {
      console.log(event)
    },
    async saveData() {

      const {} = await agentService.create(this.editItem)
      this.dialogFormVisibleAdd = false
      await this.getAgentList()
      ElNotification({type: 'Success', title: 'Success'})
    },
    async addAgent() {
      this.isNewData = true
      this.editItem = Object.assign({}, this.defaultAgent)
      this.dialogFormVisibleAdd = true
    },
    async getAgentList() {
      this.loading = true
      try {
        const {data: agentData} = await agentService.getList({name: this.name}, this.currentPage, this.perPage)
        this.allAgentList = agentData.items
        setPagination(agentData.meta)
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

    async onCurrentPageUpdated(page) {
      currentPage.value = page
      await this.getAgentList()
    }
  }
}
</script>
<style>

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
