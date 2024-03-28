<template>
  <div class="table-responsive">
    <h2 id="logs-page-heading" v-text="t$('logs.title')" data-cy="logsPageHeading"></h2>

    <div v-if="loggers">
      <p v-text="t$('logs.nbloggers', { total: loggers.length })"></p>

      <span v-text="t$('logs.filter')"></span> <input type="text" v-model="filtered" class="form-control" />

      <table class="table table-sm table-striped table-bordered" aria-describedby="Logs">
        <thead>
          <tr title="click to order">
            <th v-on:click="changeOrder('name')" scope="col" style="text-align:center"><span v-text="t$('logs.table.name')"></span></th>
            <th v-on:click="changeOrder('level')" scope="col" style="text-align:center"><span v-text="t$('logs.table.level')"></span></th>
          </tr>
        </thead>

        <tr v-for="logger in pagedLoggers" :key="logger.name">
          <td>
            <small>{{ logger.name }}</small>
          </td>
          <td style="text-align:center"> 
            <button
              v-on:click="updateLevel(logger.name, 'TRACE')"
              :class="logger.level === 'TRACE' ? 'btn-primary' : 'btn-light'"
              class="btn btn-sm"
            >
              TRACE
            </button>
            <button
              v-on:click="updateLevel(logger.name, 'DEBUG')"
              :class="logger.level === 'DEBUG' ? 'btn-success' : 'btn-light'"
              class="btn btn-sm"
            >
              DEBUG
            </button>
            <button
              v-on:click="updateLevel(logger.name, 'INFO')"
              :class="logger.level === 'INFO' ? 'btn-info' : 'btn-light'"
              class="btn btn-sm"
            >
              INFO
            </button>
            <button
              v-on:click="updateLevel(logger.name, 'WARN')"
              :class="logger.level === 'WARN' ? 'btn-warning' : 'btn-light'"
              class="btn btn-sm"
            >
              WARN
            </button>
            <button
              v-on:click="updateLevel(logger.name, 'ERROR')"
              :class="logger.level === 'ERROR' ? 'btn-danger' : 'btn-light'"
              class="btn btn-sm"
            >
              ERROR
            </button>
            <button
              v-on:click="updateLevel(logger.name, 'OFF')"
              :class="logger.level === 'OFF' ? 'btn-secondary' : 'btn-light'"
              class="btn btn-sm"
            >
              OFF
            </button>
          </td>
        </tr>
      </table>

      <!-- 简化的分页控件 -->
      <nav aria-label="Page navigation">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="prevPage">Previous</a>
          </li>
          <li class="page-item" v-if="showFirstDots">
            <span class="page-link">...</span>
          </li>
          <li class="page-item" v-for="page in visiblePages" :key="page" :class="{ active: page === currentPage }">
            <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
          </li>
          <li class="page-item" v-if="showLastDots">
            <span class="page-link">...</span>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<style scoped>
.level-buttons {
  display: flex;
  justify-content: flex-end;
}
</style>
<script lang="ts" src="./logs.component.ts"></script>
