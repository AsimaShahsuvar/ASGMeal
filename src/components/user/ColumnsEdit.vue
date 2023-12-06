<template>
  <a
    href="#"
    class="btn btn-sm btn-success font-weight-bold"
    @click="userColumnsDialog = true"
  >
    <i class="flaticon-settings-1" /> Изменить колонки
  </a>
  <el-dialog
    v-model="userColumnsDialog"
    title="Изменить колонки"
    width="30%"
  >
    <el-tree
      ref="tree"
      :allow-drop="allowDrop"
      :data="currentColumns"
      :default-checked-keys="selectedKeys"
      :expand-on-click-node="false"
      :props="props"
      check-on-click-node
      default-expand-all
      draggable
      node-key="value"
      show-checkbox
      style="max-width: 400px;"
      @node-drag-start="handleDragStart"
      @node-drag-end="handleDragEnd"
    >
      <template #default="{ node }">
        <span>{{ node?.label }}</span>
        <span>
          <span class="svg-icon svg-icon-primary svg-icon-2x"><!--begin::Svg Icon | path:/var/www/preview.keenthemes.com/metronic/releases/2021-02-01-052524/theme/html/demo1/dist/../src/media/svg/icons/Text/Align-justify.svg--><svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
          >
            <g
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <rect
                x="0"
                y="0"
                width="24"
                height="24"
              />
              <path
                d="M5,5 L19,5 C19.5522847,5 20,5.44771525 20,6 C20,6.55228475 19.5522847,7 19,7 L5,7 C4.44771525,7 4,6.55228475 4,6 C4,5.44771525 4.44771525,5 5,5 Z M5,13 L19,13 C19.5522847,13 20,13.4477153 20,14 C20,14.5522847 19.5522847,15 19,15 L5,15 C4.44771525,15 4,14.5522847 4,14 C4,13.4477153 4.44771525,13 5,13 Z"
                fill="#000000"
                opacity="0.3"
              />
              <path
                d="M5,9 L19,9 C19.5522847,9 20,9.44771525 20,10 C20,10.5522847 19.5522847,11 19,11 L5,11 C4.44771525,11 4,10.5522847 4,10 C4,9.44771525 4.44771525,9 5,9 Z M5,17 L19,17 C19.5522847,17 20,17.4477153 20,18 C20,18.5522847 19.5522847,19 19,19 L5,19 C4.44771525,19 4,18.5522847 4,18 C4,17.4477153 4.44771525,17 5,17 Z"
                fill="#000000"
              />
            </g>
          </svg><!--end::Svg Icon--></span>
        </span>
      </template>
    </el-tree>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">Отмена</el-button>
        <el-button
          type="primary"
          @click="saveColumns"
        >Сохранить</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const props = {
  label: 'label',
}
let selectedColumns = computed(() => store.getters['userColumns/GET_SELECTED_COLUMNS'])
let columns = computed(() => store.getters['userColumns/GET_COLUMNS'])
let currentColumns = ref([...columns.value])
let selectedKeys = selectedColumns.value.map(el => el.value)
let tempCheckedKeys = ref([])
let changedProductColumns = []
const tree = ref(null)
const userColumnsDialog = ref(false)

const handleDragStart = () => {
  tempCheckedKeys.value = tree.value.getCheckedKeys()
}
const handleDragEnd = () => {
  tree.value.setCheckedKeys(tempCheckedKeys.value)
}
const saveColumns = () => {
  let selectedKeys = tree.value.getCheckedKeys()
  let columns = tree.value.data
  userColumnsDialog.value = false
  store.dispatch('userColumns/SAVE_COLUMNS', { columns, selectedKeys })
}
const closeDialog = () => {
  currentColumns.value = [...columns.value]
  tree.value.setCheckedKeys(selectedColumns.value.map(el => el.value))
  userColumnsDialog.value = false
}
const allowDrop = (draggingNode, dropNode, type) => {
  return type !== 'inner'
}

</script>
