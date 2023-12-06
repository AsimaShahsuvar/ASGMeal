<template>
  <el-dialog
      v-model="dialogFormVisibleAdd"
      title="Add Company"
  >
    <div class="border-content ">
      <div class="row">
        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.company"
                placeholder="Company"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.post"
                placeholder="Post"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.web"
                placeholder="WEB"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-select
                v-model="editItem.countryId"
                filterable
                clearable
                remote
                :remote-method="remoteMethod"
                placeholder="Country"
            >
              <el-option
                  v-for="item in allCountry"
                  :key="item.id"
                  :label="item.fullName"
                  :value="item.id"
              />
            </el-select>
          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.address"
                placeholder="Address"
            />
          </div>
        </div>

        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.phone"
                placeholder="Phone"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.eMail"
                placeholder="Email"
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
        >Add Company</el-button>
      </span>
    </template>
  </el-dialog>
  <el-row class="mb-4" :gutter="20">
    <el-col :span="4">
      <label>Search by name</label>
      <el-input v-model="name" placeholder="Search " :suffix-icon="Search" @change="getCompanyTruckList"/>
    </el-col>
    <el-col :span="2">
      <label>By row</label>
      <el-select
          v-model="perPage"
          placeholder="Select"
          @change="getCompanyTruckList"
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
          @click="addCompany"
      >
        Add Company
      </el-button>
    </el-col>
  </el-row>
  <div class="row">
    <el-table
        v-loading="loading"
        :data="allCompanyList"
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
          width="90"
          prop="company"
          label="Company"
      />
      <el-table-column
          prop="country.fullName"
          label="Country"
      />
      <el-table-column
          width="450"
          prop="address"
          label="Address"
      />
      <el-table-column

          prop="eMail"
          label="Email"
      />
      <el-table-column

          prop="phone"
          label="Phone"
      />
      <el-table-column

          prop="post"
          label="Post"
      />
      <el-table-column

          prop="web"
          label="Web"
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
import countryService from '@/services/countryService'
import {ElNotification} from 'element-plus'
import {Delete, Edit, Search} from '@element-plus/icons'

const {pagination, setPagination, currentPage, perPage, perPageCounts} = usePagination()

export default {
  name: 'Etv',

  data() {
    return {
      loading: true,
      allCountry: [],
      dialogFormVisibleAdd: false,
      isNewData: false,
      editItem: {
        company: '',
        countryId: '',
        post: '',
        web: '',
        address: '',
        phone: '',
        eMail: '',

      },
      defaultCompany: {
        company: '',
        countryId: '',
        post: '',
        web: '',
        address: '',
        phone: '',
        eMail: '',

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
    await this.getCompanyTruckList()

  },
  methods: {
    handleClick(e) {
      console.log(event)
    },
    addCompany() {
      this.isNewData = true
      this.editItem = Object.assign({}, this.defaultCompany)
      this.dialogFormVisibleAdd = true
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(async () => {
          this.loading = false;

          const {data: countryData} = await countryService.countryforsearch({name: query})
          this.allCountry = countryData.data

        }, 200);
      } else {
        this.options = [];
      }
    },
    async saveData () {

      const {} = await truckService.addCompany(this.editItem)
      this.dialogFormVisibleAdd = false
      await this.getCompanyTruckList()
      ElNotification({ type: 'Success', title: 'Success' })
    },

    async getCompanyTruckList() {
      this.loading = true
      try {
        const {data: companyData} = await truckService.getCompanyList({name:this.name}, this.currentPage, this.perPage)
        this.allCompanyList = companyData.items
        setPagination(companyData.meta)
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
      await this.getCompanyTruckList()
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
