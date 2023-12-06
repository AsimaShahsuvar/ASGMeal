<template>
  <router-view v-if="!isAuthorized" />
  <div v-if="isAuthorized">
    <!--    <HeaderMobileBlock />-->
    <!--    <div class="d-flex flex-column flex-root">-->
    <!--      &lt;!&ndash;begin::Page&ndash;&gt;-->
    <!--      <div class="d-flex flex-row flex-column-fluid page">-->
    <!--        <AsideBlock />-->

    <!--begin::Wrapper-->
    <!--        <div-->
    <!--          id="kt_wrapper"-->
    <!--          class="d-flex flex-column flex-row-fluid wrapper pb-16"-->
    <!--        >-->
    <HeaderBlock />
    <!--          <div class="mobile-margin d-md-none mt-6" />-->

    <el-dialog
      v-model="centerDialogVisible"
      class="text-center"
      title="Warning"
      width="30%"
      center
      :close-on-click-modal="false"
      :show-close="false"
    >
      <el-select
        v-model="building"
        placeholder="Select"
      >
        <el-option
          v-for="buildingData in allBuilding"
          :key="buildingData.id"
          :label="buildingData.name"
          :value="buildingData.id"
        />
      </el-select>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            type="primary"
            @click="setBuilding"
          >Confirm</el-button>
        </span>
      </template>
    </el-dialog>


    <div class="container-fluid mt-58" >
      <router-view />
    </div>
    <!--          <UserPanel />-->
    <!--        </div>-->
    <!--end::Wrapper-->
    <!--      </div>-->
    <!--end::P
      age-->
    <!--    </div>-->
  </div>
</template>

<script setup>

import HeaderBlock from './components/HeaderBlock.vue'

import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
// import buildingService from '@/services/buildingService'

let centerDialogVisible = ref(false)
const router = useRouter()
const store = useStore()
const value = ref('')
const allBuilding = ref('')
const building = ref('')


onMounted(async () => {


  // if (!store.getters['auth/IS_AUTH']) {
  //   await router.push({ name: 'auth' })
  // }else{
    // console.log(223)
    // const { data: buildingData } = await buildingService.load()
    // allBuilding.value = buildingData
    // if (!buildingState.value){
    //   centerDialogVisible.value = true
    // }
  // }


})
const setBuilding = ()=>{
  if (!building.value){
    return
  }
 store.commit('auth/SET_BUILDING',building.value)
  centerDialogVisible.value = false

}
const isAuthorized = computed(() => store.getters['auth/IS_AUTH'])
const buildingState = computed(() => store.getters['auth/GET_BUILDING'])

</script>

<style lang="scss">
.el-select{
  width:100%;
  .el-input{
    width:100%;
  }
}
</style>
