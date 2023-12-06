<template>
  <el-upload
    ref="uploader"
    :auto-upload="false"
    :class="{'hide-upload': hideUploadIcon}"
    :on-preview="onPreview"
    :on-remove="onRemove"
    :on-change="onChange"
    :file-list="image ? [image] : []"
    :limit="1"
    accept=".webm,.flv,.avi,.mp4"
    action="#"
    list-type="text"
  >
    <el-button
      size="small"
      type="primary"
    >
      Нажмите, чтобы загрузить
    </el-button>
    <template #tip>
      <div class="el-upload__tip">
        {{ tip }}
      </div>
    </template>
  </el-upload>
</template>

<script>
export default {
  name: 'SingleImageUploader',
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
