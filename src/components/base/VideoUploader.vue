<template>
  <el-upload
    ref="uploader"
    :auto-upload="false"
    :on-remove="onRemove"
    :on-change="onChange"
    :file-list="video ? [video] : []"
    :limit="1"
    accept=".mp4,.mov,.flv,.avi,.webm"
    action="#"
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
  name: "VideoUploader",
  props: {
    video: {
      type: Object,
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

