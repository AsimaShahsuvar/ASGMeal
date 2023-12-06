<template>

  <el-dialog
      v-model="dialogFormItemGroup"
      title="Add AWB Detail"
  >
    <div class="border-content">
      <div class="row">
        <div class="col-4 mb-5">
          <el-input
              v-model="awbDetail.pcs"
              placeholder="Pieces"
          />
        </div>
        <div class="col-4 mb-5">
          <el-input
              v-model="awbDetail.grossWeight"
              placeholder="Gross Weight"
          />
        </div>

        <div class="col-4 mb-5">
          <el-input
              v-model="awbDetail.commodityItem"
              placeholder="Commodity Item"
          />
        </div>
        <div class="col-4 mb-5">
          <el-input
              v-model="awbDetail.chargeableWeight"
              placeholder="Chargeable Weight"
          />
        </div>

        <div class="col-4 mb-5">
          <el-input
              v-model="awbDetail.awb_Length"
              placeholder="Length"
          />
        </div>
        <div class="col-4 mb-5">
          <el-input
              v-model="awbDetail.width"
              placeholder="Width"
          />
        </div>
        <div class="col-4 mb-5">
          <el-input
              v-model="awbDetail.height"
              placeholder="Height"
          />
        </div>

        <div class="col-4 mb-5">
          <el-input
              v-model="awbDetail.description"
              placeholder="Description"
          />
        </div>

        <div class="col-4 mb-5">
          <el-select
              v-model="awbDetail.speialHandlingCode"
              filterable
              clearable
              multiple
              collapse-tags
              remote
              :remote-method="remoteMethodSpcListForSearch"
              placeholder="SHC"
          >
            <el-option
                v-for="item in selectShipmentPlanDetails"
                :key="item.id"
                :label="item.shcCode"
                :value="item.id"
            />
          </el-select>
        </div>
      </div>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button
            type="primary"
            @click="addAwbDetail"
        >
          ADD AWB Detail
        </el-button>
        <el-button @click="dialogFormVisibleAdd = false">Cancel</el-button>
      </span>
    </template>
  </el-dialog>

  <div class="col-4 text-center">
    <el-input
        v-model="search.serialNo"
        placeholder="Serial No"
    >
      <template #prepend>
        <el-input
            v-model="search.prefix"
            placeholder="Prefix"
        />
      </template>
      <template #append>
        <el-button
            :icon="Search"
            @click="SearchAwb()"
        />
      </template>
    </el-input>
  </div>

  <div class="row">
    <div class="col-md-12">
      <el-tabs
          v-model="activeName"
          class="demo-tabs mt-3"
      >
        <el-tab-pane
            label="General"
            name="first"
        >
          <div class="row">
            <div class="col-5">
              <fieldset>
                <div class="row">
                  <div class="col-md-12">
                    <span class="tittle">AWB properties:</span>
                  </div>
                  <div class="col-6">
                    <el-input
                        v-model="editItem.awbSerialNo"
                        placeholder="Serial "
                        class="widthserial"
                        maxlength="8"
                    >
                      <template #prepend>
                        <el-input
                            v-model="editItem.awbPrefix"
                            placeholder="Prefix"
                            maxlength="3"
                        />
                      </template>
                    </el-input>
                  </div>
                  <div class="col-3">
                    <el-select
                        v-model="editItem.awbOrigin"
                        placeholder="Origin"
                        filterable
                        clearable
                        remote
                        :remote-method="remoteMethodOrigin"

                    >
                      <el-option
                          v-for="item in allOriginList"
                          :key="item.id"
                          :label="item.iata"
                          :value="item.id"
                      />
                    </el-select>
                  </div>
                  <div class="col-3">
                    <el-select
                        v-model="editItem.awbDestination"
                        placeholder="Destination"
                        filterable
                        clearable
                        remote
                        :remote-method="remoteMethodDestination"

                    >
                      <el-option
                          v-for="item in allDestinationList"
                          :key="item.id"
                          :label="item.iata"
                          :value="item.id"
                      />
                    </el-select>
                  </div>
                </div>
              </fieldset>
            </div>
            <div class="col-12">
              <fieldset>
                <div class="row">
                  <div class="col-md-12">
                    <span class="tittle">Shipper:    <el-button class="plus"><i class="fa fa-plus"/></el-button> </span>
                  </div>

                  <div class="col-3">
                    <el-select
                        v-model="editItem.shipperId"
                        placeholder="shipperName"
                        filterable
                        clearable
                        remote
                        :remote-method="remoteMethod"
                        @change="SelectShipper"
                    >
                      <el-option
                          v-for="item in allShipperList"
                          :key="item.id"
                          :label="item.shipperName1"
                          :value="item.id"
                      />
                    </el-select>
                  </div>
                  <div class="col-1">
                    <el-select
                        v-model="editItem.shipperAccount"
                        placeholder="Account"
                        filterable
                        clearable
                        remote
                        :remote-method="remoteAccountMethod"
                    >
                      <el-option
                          v-for="item in allShipperList"
                          :key="item.id"
                          :label="item.accountNumber"
                          :value="item.id"
                      />
                    </el-select>
                  </div>
                  <div class="col-4 ">
                    <el-input
                        v-model="editItem.addressShipper"
                        placeholder="Address"
                    />
                  </div>
                  <div class="col-2">
                    <el-input
                        v-model="editItem.countryShipper"
                        placeholder="Country"
                    />
                  </div>
                  <div class="col-1">
                    <el-input
                        v-model="editItem.cityShipper"
                        placeholder="City"
                    />
                  </div>
                  <div class="col-1">
                    <el-input
                        v-model="editItem.postCodeShipper"
                        placeholder="Post Code"
                    />
                  </div>
                </div>
              </fieldset>
            </div>
            <div class="col-12">
              <fieldset>
                <div class="row">
                  <div class="col-md-12">
                    <span class="tittle">Consignee:    <el-button class="plus"><i
                        class="fa fa-plus"
                    /></el-button> </span>
                  </div>


                  <div class="col-3">
                    <el-select
                        v-model="editItem.consigneerId"
                        placeholder="Consignee Name"
                        remote
                        filterable
                        :remote-method="remoteConsigneeMethod"
                        @change="SelectConsignee"
                    >
                      <el-option
                          v-for="item in allConsigneeList"
                          :key="item.id"
                          :label="item.consigneerName1"
                          :value="item.id"
                      />
                    </el-select>
                  </div>
                  <div class="col-1">
                    <el-select
                        v-model="editItem.consigneerName1"
                        placeholder=" Account"
                        filterablremote-method="remoteConsigneeAccountMethod"
                    >
                      <el-option
                          v-for="item in allConsigneeList"
                          :key="item.id"
                          :label="item.acountNumber"
                          :value="item.id"
                      />
                    </el-select>
                  </div>
                  <div class="col-4">
                    <el-input
                        v-model="editItem.addressConsignee"
                        placeholder="Address"
                    />
                  </div>
                  <div class="col-2">
                    <el-input
                        v-model="editItem.countryConsignee"
                        placeholder="Country"
                    />
                  </div>
                  <div class="col-1">
                    <el-input
                        v-model="editItem.cityConsignee"
                        placeholder="City"
                    />
                  </div>

                  <div class="col-1">
                    <el-input
                        v-model="editItem.postCodeConsignee"
                        placeholder="Post Code"
                    />
                  </div>
                </div>
              </fieldset>
            </div>
            <div class="col-12">
              <fieldset>
                <div class="row">

                  <div class="col-md-12">
                    <span class="tittle">Agent:    <el-button class="plus"><i
                        class="fa fa-plus"
                    /></el-button> </span>
                  </div>

                  <div class="col-3">
                    <el-select
                        v-model="editItem.agentId"
                        placeholder="AgentName"
                        remote
                        clearable
                        filterable
                        :remote-method="remoteAgentMethod"
                        @change="SelectAgent"
                    >
                      <el-option
                          v-for="item in allAgentList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                      />
                    </el-select>
                  </div>
                  <div class="col-1">
                    <el-select
                        v-model="editItem.agentAccount"
                        placeholder="Account"
                        remote
                        clearable
                        filterable
                        :remote-method="remoteAgentAccountMethod"
                    >
                      <el-option
                          v-for="item in allAgentList"
                          :key="item.id"
                          :label="item.accountNumber"
                          :value="item.id"
                      />
                    </el-select>
                  </div>
                  <div class="col-1">
                    <el-input
                        v-model="editItem.iataCodeAgent"
                        placeholder="IATA Code"
                    />
                  </div>
                  <div class="col-4">
                    <el-input
                        v-model="editItem.addressAgent"
                        placeholder="Address"
                    />
                  </div>

                  <div class="col-3">
                    <el-input
                        v-model="editItem.accountInfoAgent"
                        placeholder="Accounting information"
                    />
                  </div>
                </div>
              </fieldset>
            </div>
            <div class="col-4">
              <fieldset>
                <div class="row">
                  <div class="col-md-12">
                    <span class="tittle">Signed by:</span>
                  </div>

                  <div class="col-4">
                    <el-input
                        v-model="editItem.certificationSign"
                        placeholder="Sign"
                    />
                  </div>

                  <div class="col-8">
                    <el-date-picker
                        v-model="editItem.executedTime"
                        style="width:100%"
                        type="datetime"
                        placeholder="Select date and time"
                    />
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          <el-button
              v-if="this.awbList == null"
              style="float:right"
              type="primary"
              class="mt-5 mb-5 addawbbut"
              @click="addAwb"
          >
            ADD AWB
          </el-button>
        </el-tab-pane>
        <el-tab-pane
            label="Item Group"
            name="second"
        >
          <el-row
              class="mb-4"
              gutter="20"
          >
            <el-col :span="2">
              <el-button
                  type="warning"
                  @click="addItemGroup"
              >
                Add Item Group
              </el-button>
            </el-col>
          </el-row>

          <div class="row">
            <el-table
                v-loading="loading"
                :data="allAwbItemGroups"
                stripe
                max-height="400px"
                border
                style="width: 100%"
                header-row-class-name="custom_table_header"
                header-cell-class-name="custom_header_cell"
            >
              <el-table-column type="index" width="50" />
              <el-table-column
                  prop="pcs"
                  label="Pieces"
                  width="100"
              />
              <el-table-column
                  width="110"
                  prop="grossWeight"
                  label="Gross Weight"
              />
              <el-table-column
                  width="100"
                  prop="chargeableWeight"
                  label="Ch Weight"
              />
              <el-table-column
                  prop="height"
                  label="Height"
                  width="100"
              />
              <el-table-column
                  prop="width"
                  label="Width"
                  width="100"
              />
              <el-table-column
                  prop="length"
                  label="Length"
                  width="100"
              />

              <el-table-column
                  prop="volume"
                  label="Volume"
                  width="100"
              />


              <el-table-column
                  width="150"
                  label="SHC"
              >
                <template #default="scope">
                  <span>
                    <template v-for="code in scope.row.awbItemGroupShcs">
                      {{ code.shcCode }}/
                    </template>
                  </span>
                </template>
              </el-table-column>

              <el-table-column
                  width="100"
                  prop="commodityItem"
                  label="Com Item"

              />

              <el-table-column

                  width="200"
                  prop="description"
                  label="Description"
              />

            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane
            label="Plans"
            name="third"
        >

          <div class="row">
            <el-table
                v-loading="loading"
                :data="awbShipmentPlans"
                max-height="400px"
                stripe
                border
                style="width: 100%"
                header-row-class-name="custom_table_header"
                header-cell-class-name="custom_header_cell"
              >
              <el-table-column type="index" width="50" />
              <el-table-column
                  width="80"
                  prop="flightTrip"
                  label="Flight"
              />
              <el-table-column label="Plan" >
                <el-table-column
                    prop="planPcs"
                    width="100"
                    label="Pieces"
                />
                <el-table-column
                    width="110"
                    prop="planGrossWeight"
                    label="Weight"
                />
              </el-table-column>
              <el-table-column label="Fact"  >
              <el-table-column
                  width="100"
                  prop="factPcs"
                  label="Pieces"
              />
              <el-table-column
                  width="100"
                  prop="factGrossWeight"
                  label="Weight"
              />
              </el-table-column>

              <el-table-column
                  prop="rateClass"
                  width="100"
                  label="Rate Class"
              />
              <el-table-column
                  width="200"
                  label="SHC"
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
                  width="200"
                  prop="description"
                  label="Description"
              />
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>

import {Search} from '@element-plus/icons'

import generalService from '@/services/generalService'

import shipperService from '@/services/shipperService'
import agentService from '@/services/agentService'
import consigneeService from '@/services/consigneeService'
import {ElNotification} from 'element-plus'
import usePagination from '@/composables/common/usePagination'
import awbService from "@/services/awbService";
import AwbService from "@/services/awbService";
import stationService from "@/services/stationService";
import tripService from "@/services/tripService";

const {pagination, setPagination, currentPage, perPage, perPageCounts} = usePagination()

export default {
  name: 'Etv',

  data() {
    return {
      dialogFormVisibleAdd: false,
      dialogFormItemGroup: false,
      activeName: 'first',
      startDate: '',
      endDate: '',
      allAwb: '',
      editItem: {
        agentId: '',
        consigneerId: '',
        shipperId: '',
        addressShipper: "",
        cityShipper: '',
        countryShipper: '',
        postCodeShipper: '',
        addressAgent: '',
        iataCodeAgent: '',
        accountInfoAgent: '',
        addressConsignee: "",
        cityConsignee: '',
        countryConsignee: '',
        postCodeConsignee: '',
        executedTime: '',
        awbPrefix: '',
        awbSerialNo: '',
        awbDestination: '',
        awbOrigin: '',
        certificationSign: '',
        shipperAccount: '',
        agentAccount: '',
        consigneeAccount: '',
        AwbFlt: '',
        AwbOthItems: '',
        AwbRtgs: [],


      },
      allAwbItemGroups: [],
      awbShipmentPlans: [],
      selectShipmentPlanDetails: [],
      awbDetail: {
        awbId: '',
        pcs: '',
        grossWeight: '',
        commodityItem: '',
        chargeableWeight: '',
        awb_Length: '',
        height: '',
        description: '',
        width: '',
        speialHandlingCode: [],


      },
      filter: {},
      allShipperList: [],
      allDestinationList: [],
      allOriginList: [],
      allAgentList: [],
      allConsigneeList: [],
      allArrivalTripList: [],
      selectShipperDetails: [],
      selectAgentDetails: [],
      selectConsigneeDetails: [],
      search: {
        prefix: '501',
        serialNo: '',
      },
      awbDetails: [],
      awbList: [],
      shipmentPlan: {
        awbId: '',
        planPcs: '',
        factPcs: '',
        planGrossWeight: '',
        factGrossWeight: '',
        rateClass: '',
        commodityItem: '',
        chargeableWeight: '',
        length: '',
        height: '',
        description: '',
        width: '',
        chargeMin: '',
        charge: '',
        volume: '',
        tripsId: '',
        speialHandlingCode: [],
        total: '',
      }
    }
  },
  computed: {
    Search() {
      return Search
    }

  },
  async mounted() {

    // await this.getShipperList()
    // await this.getAgentList()
    // await this.getConsigneeList()

  },

  methods: {
    handleClick(e) {
      // console.log(event)
    },
    async addAwb() {
      const {} = await generalService.create(
          {
            awb:
                {
                  "awbPrefix": this.editItem.awbPrefix,
                  "awbSerialNo": this.editItem.awbSerialNo,
                  "awbOrigin": this.editItem.awbOrigin,
                  "awbDestination": this.editItem.awbDestination,
                  "agentId": this.editItem.agentId,
                  "consigneerId": this.editItem.consigneerId,
                  "shipperId": this.editItem.shipperId,
                  "certificationSign": this.editItem.certificationSign,

                }
          }
      )
      ElNotification({type: 'Success', title: 'Success'})


    },

    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(async () => {
          this.loading = false;

          const {data: shipperData} = await shipperService.getByText({name: query})
          this.allShipperList = shipperData.data

        }, 200);
      } else {
        this.options = [];
      }
    },
    remoteAccountMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(async () => {
          this.loading = false;

          const {data: shipperData} = await shipperService.getByText({account: query})
          this.allShipperList = shipperData

        }, 200);
      } else {
        this.options = [];
      }
    },
    remoteAgentMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(async () => {
          this.loading = false;

          const {data: {data: agentData}} = await agentService.getByText({name: query})
          this.allAgentList = agentData

        }, 200);
      } else {
        this.options = [];
      }
    },
    remoteAgentAccountMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(async () => {
          this.loading = false;

          const {data: agentData} = await agentService.getByText({account: query})
          this.allAgentList = agentData

        }, 200);
      } else {
        this.options = [];
      }
    },
    remoteConsigneeMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(async () => {
          this.loading = false;

          const {data: {data: consigneeData}} = await consigneeService.getByText({name: query})
          this.allConsigneeList = consigneeData

        }, 200);
      } else {
        this.options = [];
      }
    },
    remoteConsigneeAccountMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(async () => {
          this.loading = false;

          const {data: consigneeData} = await consigneeService.getByText({account: query})
          this.allConsigneeList = consigneeData

        }, 200);
      } else {
        this.options = [];
      }
    },
    remoteMethodDestination(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(async () => {
          this.loading = false;

          const {data: destinationData} = await stationService.getstationforsearch({text: query})
          this.allDestinationList = destinationData.data

        }, 200);
      } else {
        this.options = [];
      }
    },
    remoteMethodOrigin(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(async () => {
          this.loading = false;

          const {data: originData} = await stationService.getstationforsearch({text: query})
          this.allOriginList = originData.data

        }, 200);
      } else {
        this.options = [];
      }
    },

    async SelectShipper() {

      const {data: shipperData} = await shipperService.get(this.editItem.shipperId)
      this.selectShipperDetails = shipperData.data
      this.editItem.countryShipper = this.selectShipperDetails.shipperCodedLocCountry
      this.editItem.postCodeShipper = this.selectShipperDetails.shipperCodedLocPostCode
      this.editItem.cityShipper = this.selectShipperDetails.shipperLocationState
      this.editItem.addressShipper = this.selectShipperDetails.shipperAddress1
      this.editItem.shipperAccount = this.selectShipperDetails.id
    },
    async SelectAgent() {
      const {data: agentData} = await agentService.get(this.editItem.agentId)
      this.selectAgentDetails = agentData.data
      this.editItem.addressAgent = this.selectAgentDetails.iataCargoAddress
      this.editItem.iataCodeAgent = this.selectAgentDetails.iataCargoCode
      this.editItem.agentAccount = this.selectAgentDetails.id

    },
    async SelectConsignee() {
      const {data: consigneeData} = await consigneeService.get(this.editItem.consigneerId)
      this.selectConsigneeDetails = consigneeData.data
      this.editItem.addressConsignee = this.selectConsigneeDetails.consigneerAddress1
      this.editItem.postCodeConsignee = this.selectConsigneeDetails.consigneerCodedLocPostCode
      this.editItem.countryConsignee = this.selectConsigneeDetails.consigneerCodedLocCountry
      this.editItem.cityConsignee = this.selectConsigneeDetails.consigneerLocationState
      this.editItem.consigneeAccount = this.selectConsigneeDetails.id
    },
    async SearchAwb() {

      const {data: awbData} = await awbService.searchAwb({prefix: this.search.prefix, serialNo: this.search.serialNo})
      this.awbList = awbData.data
      if (this.awbList == null) {

        ElNotification({
          title: 'Error',
          message: 'This serial number is not found,Please add awb below',
          type: 'error',
          zIndex: '977000'
        })
      } else {
        this.shipmentPlan.awbId = this.awbList.id
        this.awbDetail.awbId = this.awbList.id
        this.allShipperList = [this.awbList.shipper]
        this.editItem.awbDestination = this.awbList.destinationNavigation.fullName
        this.editItem.awbOrigin = this.awbList.originNavigation.fullName
        this.editItem.awbSerialNo = this.awbList.serialNo
        this.editItem.awbPrefix = this.awbList.prefix
        //-------------
        this.editItem.addressShipper = this.awbList.shipper.shipperAddress1
        this.editItem.shipperAccount = this.awbList.shipper.id
        this.editItem.shipperId = this.awbList.shipper.id
        this.editItem.countryShipper = this.awbList.shipper.shipperLocationState
        this.editItem.postCodeShipper = this.awbList.shipper.shipperCodedLocPostCode
        this.editItem.cityShipper = this.awbList.shipper.shipperLocationPlace

        //------------------------------

        this.allAgentList = [this.awbList.agent]
        this.editItem.agentId = this.awbList.agent.id
        this.editItem.agentAccount = this.awbList.agent.id

        this.editItem.iataCodeAgent = this.awbList.agent.iataCargoCode
        this.editItem.addressAgent = this.awbList.agent.iataCargoAddress
//---------------------
        this.allConsigneeList = [this.awbList.consigneer]
        this.editItem.consigneerId = this.awbList.consigneer.id
        this.editItem.consigneeAccount = this.awbList.consigneer.id
        this.editItem.addressConsignee = this.awbList.consigneer.consigneerAddress1
        this.editItem.cityConsignee = this.awbList.consigneer.consigneerLocationState
        this.editItem.countryConsignee = this.awbList.consigneer.consigneerLocationPlace
        this.editItem.postCodeConsignee = this.awbList.consigneer.consigneerCodedLocPostCode
        //-----------Itemgroup

        this.awbDetails = this.awbList.awbItemGroups
        this.allAwbItemGroups = this.awbList.awbItemGroups
        console.log(this.awbDetails)
        // this.awbDetail.pcs = this.awbList.awbItemGroups.pcs
        // this.awbDetail.grossWeight = this.awbList.awbItemGroups.grossWeight
        // this.awbDetail.chargeableWeight = this.awbList.awbItemGroups.chargeableWeight
        // this.awbDetail.commodityItem = this.awbList.awbItemGroups.commodityItem
        // this.awbDetail.description = this.awbList.awbItemGroups.description
        // this.awbDetail.height = this.awbList.awbItemGroups.height
        // this.awbDetail.awb_length = this.awbList.awbItemGroups.length
        // this.awbDetail.speialHandlingCode = this.awbList.awbItemGroups.spcHandlingCode
        // this.awbDetail.total = this.awbList.awbItemGroups.total
        // this.awbDetail.volume = this.awbList.awbItemGroups.volume
        // this.awbDetail.width = this.awbList.awbItemGroups.width
        //------------------------
        this.awbShipmentPlans = this.awbList.awbShipmentPlans
      }


    },
    addPlans() {
      this.isNewData = true
      // this.editItem = Object.assign({}, this.defaultShipper)
      this.dialogFormVisibleAdd = true
    },
    addItemGroup() {
      this.isNewData = true
      // this.editItem = Object.assign({}, this.defaultShipper)
      this.dialogFormItemGroup = true
    },
    async addAwbDetail() {
      const {} = await awbService.adddetail(this.awbDetail)
      ElNotification({type: 'Success', title: 'Success', zIndex: 99999})
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
    async saveShipmentPlan() {

      const {} = await awbService.addShipmentPlan(this.shipmentPlan)
      this.dialogFormVisibleAdd = false

      ElNotification({type: 'Success', title: 'Success'})
    },
    async getArrivalTripList() {

      const {data: tripData} = await tripService.getarrivaltriplist({startDate: this.startDate, endDate: this.endDate})
      this.allArrivalTripList = tripData

    },
    async openShipmentPlan(row) {
      console.log(2222, row)
      this.shipmentPlan.tripsId = row.id
      this.dialogFormVisibleAdd = true

    },
  }
}
</script>
<style>

.custom_table_header {
  background-color: #8cbbe6 !important;
  color: #fff;
}

.custom_header_cell {
  background: transparent !important;
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.demo-tabs > .el-tabs__content {
  padding: 0 32px;
}
.el-table thead.is-group th.el-table__cell {
  text-align: center;
}
</style>
