<template>
  <el-dialog
      v-model="dialogFormVisibleAdd"
      title="Add Uld"
  >
    <div class="border-content ">
      <div class="row">
        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.uldName"
                placeholder="ULD Name"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.contour"
                placeholder="Contour"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-select
                v-model="editItem.uldTypesId"
                filterable
                clearable
                remote
                :remote-method="remoteMethod"
                placeholder="ULD Types"
            >
              <el-option
                  v-for="item in allUld"
                  :key="item.id"
                  :label="item.code"
                  :value="item.id"
              />
            </el-select>
          </div>
        </div>
        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.description"
                placeholder="Description"
            />
          </div>
        </div>

        <div class="col-4">
          <div class="col-form-label">
            <el-input
                v-model="editItem.weight"
                placeholder="Weight"
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
        >Add Uld</el-button>
      </span>
    </template>
  </el-dialog>
  <el-row class="mb-4" :gutter="20">
    <el-col :span="4">
      <label>Search by name</label>
      <el-input v-model="name" placeholder="Search " :suffix-icon="Search" @change="getUldList"/>
    </el-col>
    <el-col :span="2">
      <label>By row</label>
      <el-select
          v-model="perPage"
          placeholder="Select"
          @change="getUldList"
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
          @click="addUld"
      >
        Add Uld
      </el-button>
    </el-col>
  </el-row>
  <div class="row">
    <el-table
        v-loading="loading"
        :data="allUldList"
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
          prop="uldName"
          label="ULD"

      />
      <el-table-column
          prop="contour"
          label="Contour"

      />
      <el-table-column

          prop="description"
          label="Description"

      />
      <el-table-column

          prop="weight"
          label="Weight"

      />
      <el-table-column

          prop="uldTypes.code"
          label="Code"

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
import {ElNotification} from 'element-plus'
import {Delete, Edit, Search} from '@element-plus/icons'
import shipperService from "@/services/shipperService";
import ConsigneeService from "@/services/consigneeService";
import uldService from "@/services/uldService";

const {pagination, setPagination, currentPage, perPage, perPageCounts} = usePagination()

export default {
  name: 'Etv',

  data() {
    return {
      loading: true,
      allUldList: [],
      dialogFormVisibleAdd: false,
      isNewData: false,
      editItem: {
        uldName:'',
        weight:'',
        contour:'',
        uldTypesId:'',
        description:'',

      },
      allUld: [],
      defaultUld: {
        uldName:'',
        weight:'',
        contour:'',
        uldTypesId:'',
        description:'',

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
    await this.getUldList()

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

          const {data: UldData} = await uldService.searchuldtypeforuld({code: query})
          this.allUld = UldData.data

        }, 200);
      } else {
        this.options = [];
      }
    },
    async saveData () {

      const {} = await uldService.addUld(this.editItem)
      this.dialogFormVisibleAdd = false
      await this.getUldList()
      ElNotification({ type: 'Success', title: 'Success' })
    },

    async getUldList() {
      this.loading = true
      try {
        const {data: uldData} = await uldService.getList({name:this.name}, this.currentPage, this.perPage)
        this.allUldList = uldData.items
        setPagination(uldData.meta)
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
      await this.getUldList()
    },
    addUld() {
      this.isNewData = true
      this.editItem = Object.assign({}, this.defaultUld)
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
