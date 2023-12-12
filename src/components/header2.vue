<template>
  <div class="mb-1"
       style="position: fixed;
    width: 100%;
    z-index: 99999;"
  >
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo fixed-top"
        mode="horizontal"
        background-color="#5389bf"
        text-color="#fff"
        :router="true"
        active-text-color="#ffd04b"
    >
      <el-sub-menu index="5">
        <template #title>
          Dictionary
        </template>
        <el-menu-item
            index="shipper"
            :route="{name: 'shipper'}"
        >
          Shipper
        </el-menu-item>
        <el-menu-item
            index="consignee"
            :route="{name: 'consignee'}"
        >
          Consignee
        </el-menu-item>
        <el-menu-item
            index="agent"
            :route="{name: 'agent'}"
        >
          Agent
        </el-menu-item>
        <el-menu-item
            index="truck"
            :route="{name: 'truck'}"
        >
          Truck List
        </el-menu-item>
        <el-menu-item
            index="company"
            :route="{name: 'company'}"
        >
          Truck Company
        </el-menu-item>
        <el-menu-item
            index="uld"
            :route="{name: 'uld'}"
        >
          ULD List
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>
          Flight
        </template>
        <el-menu-item
            index="Inbound"
            :route="{name: 'Inbound'}"
        >
          Inbound
        </el-menu-item>

        <el-menu-item
            index="Outbound"
            :route="{name: 'Outbound'}"
        >
          Outbound
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item
          index="general"
          :route="{name: 'general'}"
      >
        Awb
      </el-menu-item>
      <el-menu-item
          index="trip"
          :route="{name: 'trip'}"
      >
        Trip
      </el-menu-item>
      <el-menu-item
          index="awb"
          :route="{name: 'awb'}"
      >
        AWB List
      </el-menu-item>

      <!--      <el-menu-item-->
      <!--          index="linkToUld"-->
      <!--          :route="{name: 'linkToUld'}"-->
      <!--      >-->
      <!--        ShipmentPlan for Uld-->
      <!--      </el-menu-item>-->
      <div class="flex-grow"/>
      <el-menu-item
          index="6"
          style="float:right"
          @click="logout()"
      >
        Log out
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script setup>
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {computed, onMounted, ref} from 'vue'

const route = useRoute()
const router = useRouter()
const store = useStore()

const logout = () => {
  store.dispatch('auth/LOGOUT')
}

let activeIndex = ref('')

onMounted(async () => {
  await router.isReady()
  activeIndex.value = route.name
})

const routeName = computed(() => {
  const routes = {
    '/users': 'Клиенты',
    '/internal-users': 'Модераторы',
  }
  return routes[route.path]
})

const getNameFirstLetter = () => {
  return store.getters['auth/GET_USER_NAME_FIRST_LETTER']
}

const showUserPanel = () => {
  store.commit('theme/CHANGE_USER_PANEL')
}

</script>
<style>
.flex-grow {
  flex-grow: 1;
}

</style>
