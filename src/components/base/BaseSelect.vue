<template>
  <div class="form-group">
    <label v-if="label">{{ label }}</label>
    <el-select
      :value="value"
      no-match-text="Совпадения не найдены"
      no-data-text="Нет данных"
      loading-text="Загрузка"
      v-bind="$attrs"
      @input="updateInput"
    >
      <el-option
        v-for="item in options"
        :key="item[optionValue]"
        :label="item[optionTitle]"
        :value="item[optionValue]"
      />
    </el-select>
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
export default {
  name: 'BaseSelect',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    hint: {
      type: String,
      default: ''
    },
    error: {
      type: [Object, String],
      default: ''
    },
    value: [Number, String],
    options: {
      type: [Object, Array],
      default: () => [],
      required: true
    },
    optionTitle: {
      type: String,
      default: 'title',
    },
    optionValue: {
      type: String,
      default: 'id',
    },
  },

  methods: {
    updateInput(evt) {
      this.$emit('input', evt)
    }
  }
}
</script>

<style scoped>
.el-select {
  display: block
}
</style>
