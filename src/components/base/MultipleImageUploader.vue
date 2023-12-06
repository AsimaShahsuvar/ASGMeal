<template>
  <el-upload
    action="#"
    list-type="picture-card"
    :auto-upload="false"
    multiple
    :on-remove="onRemove"
    :on-change="onChange"
    :limit="max"
    accept=".png,.jpg,.jpeg"
    :on-preview="handlePictureCardPreview"
    :file-list="images"
  >
    <template #default>
      <el-icon><plus /></el-icon>
    </template>
    <template #tip>
      <div class="el-upload__tip">
        {{ tip }}
      </div>
    </template>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <img
      style="width:100%;"
      :src="dialogImageUrl"
      alt=""
    >
  </el-dialog>
</template>
<script lang="ts">
import { Plus, } from '@element-plus/icons'
export default {
  components: {
    Plus,
  },
  props: {
    images: {
      type: Object,
      default: null,
    },
    tip: {
      type: String,
      default: '',
    },
    max: {
      type: Number,
      default: null,
    },
    preview: {
      type: Boolean,
      default: false,
    },
    download: {
      type: Boolean,
      default: false,
    },
    onRemove: {
      required: true,
      type: Function,
    },
    onChange: {
      required: true,
      type: Function,
    },
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
    }
  },
  methods: {
    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    },
  },
}
</script>
