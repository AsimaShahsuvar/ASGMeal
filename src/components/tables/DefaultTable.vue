<template>

  <div class="dataTables_wrapper dt-bootstrap4 no-footer">
    <v-server-table :columns="columns" :options="options" ref="table">
      <template class="55" v-for="(col, i) in columns" v-slot:[col]="props">
        <slot :name="'col_' + col" v-bind:row="props.row"></slot>
      </template>
    </v-server-table>
  </div>

</template>

<script>

import axios from "axios"
import api from "../../services/api";
import {useStore} from 'vuex'

const store = useStore()

export default {
  props: {
    link: {
      type: String,
    },
    cols: {
      type: Array,
      default: ['id']
    },
    heads: {
      type: Object,
      default: {
        id: '#ID'
      }
    },
    sortable: {
      type: Array,
      default: []
    },
    isFilter: {
      type: Boolean,
      default: false
    },
    filters: {
      type: Object,
      default: {}
    },
    isSelectable: {
      type: Boolean,
      default: false
    },
    columnClasses: {
      type: Object,
      default: {
        id: 'w60',
        actions: 'w120'
      }
    },
    routeViewName: {
      type: String,
      default: null
    },
    needRefresh: {
      type: Boolean,
      default: false
    },
    needReload: {
      type: Boolean,
      default: false
    },
  },

  data() {
    return {
      isLoading: false,
      columns: this.cols,
      cancelToken: null,
      cancelSource: null,
      options: {
        requestFunction: async (data) => {
          if (this.cancelSource) {
            this.cancelSource.cancel();
          }

          this.cancelToken = axios.CancelToken;
          this.cancelSource = axios.CancelToken.source();

          return await api.get(this.link, {
            cancelToken: this.cancelSource.token,
            params: data
          }).then((response) => {
            return response.data
          }).catch(function (e) {

          });
        },
        headings: this.heads,
        texts: {
          count: "Показано {from}-{to} из {count} записей|{count} записи|Одна запись",
          first: 'First',
          last: 'Last',
          filter: "Поиск:",
          filterPlaceholder: "Введите запрос",
          limit: "Записей:",
          page: "Страница:",
          noResults: "Нет данных для отображения",
          filterBy: "Фильтр по {column}",
          loading: 'Загружка. Пожалуйста ждите...',
          defaultOption: 'Выбрать {column}',
          columns: 'Колонки'
        },
        perPage: 10,
        sortable: this.sortable,
        filterable: this.isFilter,
        skin: 'table table-separate table-hover table-head-custom dataTable no-footer collapsed',
        sortIcon: {
          base: 'la',
          up: 'la-long-arrow-down text-success pt-1',
          down: 'la-long-arrow-up text-success pt-1',
          is: 'la-arrows-v text-muted pt-1'
        },
      }
    }
  },
  watch: {
    needRefresh: function () {
      this.$refs.table.refresh()
      this.$emit('refreshed')
    },
    needReload: function () {
      this.$refs.table.getData()
      this.$emit('reloaded')
    },
    filters: {
      deep: true,
      handler() {
        this.toggleFilters(this.filters)
      }
    }
  },
  methods: {
    rowClick: function (evt) {
      if (this.routeViewName && evt.row.id) {
        this.$router.push({name: this.routeViewName, params: {id: evt.row.id}})
      }
    },
    toggleFilters: function (filters) {
      this.$refs.table.setPage(1);
      let table = this.$refs.table;
      for (let key in filters) {
        table.customQueries[key] = filters[key];
      }
      setTimeout(function () {
        table.getData();
      }.bind(this), 100);
    },
  },
  created() {
    if (this.isSelectable) {
      this.options.selectable = {
        mode: 'multiple', // or 'multiple'
        only: function (row) {
          return true // any condition
        },
        selectAllMode: 'all', // or 'page',
        programmatic: false
      }
    }
    if (this.columnClasses) {
      this.options.columnsClasses = this.columnClasses
    }
  }
}

</script>
<style>
.w60 {
  width: 60px;
}

.w120 {
  width: 120px;
}

.w-auto {
  width: auto;
}
</style>
