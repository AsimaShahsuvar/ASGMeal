<template>
  <div class="form-group">
    <label v-if="label">{{ label }}</label>
    <el-input
      v-bind="$attrs"
      v-model="message"
      :class="{'is-invalid': error}"
      :disabled="disabled"
      :type="type"
      :aria-invalid="error?true:null"
      :placeholder="label"
    />
    <div
      v-if="error"
      class="invalid-feedback"
    >
      {{ error }}
    </div>
    <span
      v-if="hint"
      class="form-text text-muted"
    >{{ hint }}</span>
  </div>
</template>

<script>
import { useModelWrapper } from '@/services/modelWrapper'

export default {
  name: 'BaseInput',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hint: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    // eslint-disable-next-line vue/require-default-prop
    modelValue: {
      type: [Number, String],
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    return {
      message: useModelWrapper(props, emit, 'modelValue'),
    }
  },

}
</script>
