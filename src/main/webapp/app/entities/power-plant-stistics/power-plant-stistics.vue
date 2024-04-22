<template>
  <div>
    <h2 id="page-heading" data-cy="PowerPlantStisticsHeading">
      <span v-text="t$('ainmsVueclientApp.powerPlantStistics.home.title')" id="power-plant-stistics-heading"></span>
      <div class="d-flex justify-content-end">
        <input type="date" v-model="selectedDate">
        <button class="btn btn-info mr-2" v-on:click="handleSyncListByDate" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="t$('ainmsVueclientApp.powerPlantStistics.home.queryByDate')"></span>
        </button>

        <button class="btn btn-info mr-2" v-on:click="downloadCsvByPowerPlant" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="t$('ainmsVueclientApp.powerPlantStistics.home.downloadascsv')"></span>
        </button>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && powerPlantStistics && powerPlantStistics.length === 0">
      <span v-text="t$('ainmsVueclientApp.powerPlantStistics.home.notFound')"></span>
    </div>
    <div class="table-responsive" v-if="powerPlantStistics && powerPlantStistics.length > 0">
      <table class="table table-striped" aria-describedby="powerPlantStistics">
        <thead>
          <tr>
            <!-- <th scope="row"><span v-text="t$('global.field.id')"></span></th> -->
            <th scope="row"><span v-text="t$('ainmsVueclientApp.powerPlantStistics.name')"></span></th>
            <th scope="row"><span v-text="t$('ainmsVueclientApp.powerPlantStistics.totalCount')"></span></th>
            <th scope="row"><span v-text="t$('ainmsVueclientApp.powerPlantStistics.onlineCount')"></span></th>
            <th scope="row"><span v-text="t$('ainmsVueclientApp.powerPlantStistics.offlineCount')"></span></th>
            <th scope="row"><span v-text="t$('ainmsVueclientApp.powerPlantStistics.otherCount')"></span></th>
            <th scope="row"><span v-text="t$('ainmsVueclientApp.powerPlantStistics.onlineRate')"></span></th>
            <th scope="row"><span v-text="t$('ainmsVueclientApp.powerPlantStistics.statisticDate')"></span></th>
            <th scope="row"><span v-text="t$('ainmsVueclientApp.powerPlantStistics.statisticTime')"></span></th>
            <!-- <th scope="row"><span v-text="t$('ainmsVueclientApp.powerPlantStistics.province')"></span></th> -->
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="powerPlantStistics in powerPlantStistics" :key="powerPlantStistics.id" data-cy="entityTable">
            <!-- <td>
              <router-link :to="{ name: 'PowerPlantStisticsView', params: { powerPlantStisticsId: powerPlantStistics.id } }">{{
                powerPlantStistics.id
              }}</router-link>
            </td> -->
            <td>{{ powerPlantStistics.name }}</td>
            <td>{{ powerPlantStistics.totalCount }}</td>
            <td>{{ powerPlantStistics.onlineCount }}</td>
            <td>{{ powerPlantStistics.offlineCount }}</td>
            <td>{{ powerPlantStistics.otherCount }}</td>
            <td class="custom-font-size"> {{ ((powerPlantStistics.onlineCount / powerPlantStistics.totalCount) * 100).toFixed(1) + '%' }} </td>
            <td>{{ powerPlantStistics.statisticDate }}</td>
            <td>{{ formatTime(powerPlantStistics.statisticTime) || '' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <template #modal-title>
        <span
          id="ainmsVueclientApp.powerPlantStistics.delete.question"
          data-cy="powerPlantStisticsDeleteDialogHeading"
          v-text="t$('entity.delete.title')"
        ></span>
      </template>
      <div class="modal-body">
        <p
          id="ainms-delete-powerPlantStistics-heading"
          v-text="t$('ainmsVueclientApp.powerPlantStistics.delete.question', { id: removeId })"
        ></p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" v-text="t$('entity.action.cancel')" v-on:click="closeDialog()"></button>
          <button
            type="button"
            class="btn btn-primary"
            id="ainms-confirm-delete-powerPlantStistics"
            data-cy="entityConfirmDeleteButton"
            v-text="t$('entity.action.delete')"
            v-on:click="removePowerPlantStistics()"
          ></button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./power-plant-stistics.component.ts"></script>
