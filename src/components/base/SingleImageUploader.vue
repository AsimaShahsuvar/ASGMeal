<template>
  <el-upload
    ref="uploader"
    :auto-upload="false"
    class="single-image-uploader"
    :class="{'hide-upload': hideUploadIcon}"
    :on-preview="handlePictureCardPreview"
    :on-remove="onRemove"
    :on-change="onChange"
    :file-list="image ? [image] : []"
    :limit="1"
    accept=".png,.jpg,.jpeg"
    action="#"
    list-type="picture-card"
  >
    <el-icon
      class="avatar-uploader-icon"
    >
      <plus />
    </el-icon>
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

<script>
import { Plus } from '@element-plus/icons'

export default {
  name: 'SingleImageUploader',
  components: {
    Plus
  },
  props: {
    image: {
      type: [Object, String],
      default: null,
    },
    tip: {
      type: String,
      default: '',
    },
    hideUploadIcon: {
      default: false,
      type: Boolean,
    },
    onPreview: {
      required: false,
      default: () => (function () {}),
      type: Function,
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
  data () {
    return {
      dialogVisible: false,
      dialogImageUrl: '',
    }
  },
  methods: {
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
  }
}
</script>

<style>
.single-image-uploader.hide-upload div.el-upload.el-upload--picture-card {
  display: none;
}

.el-icon-plus.avatar-uploader-icon {
  color: #8c939d !important;
}
</style>
