<template>
  <div>
    <h2 id="page-heading" data-cy="PowerPlantStisticsHeading">
      <span v-text="t$('ainmsVueclientApp.powerPlantStistics.home.title')" id="power-plant-stistics-heading"></span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="t$('ainmsVueclientApp.powerPlantStistics.home.refreshListLabel')"></span>
        </button>
        <router-link :to="{ name: 'PowerPlantStisticsCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-power-plant-stistics"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="t$('ainmsVueclientApp.powerPlantStistics.home.createLabel')"></span>
          </button>
        </router-link>
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
            <th scope="row"><span v-text="t$('global.field.id')"></span></th>
            <th scope="row"><span v-text="t$('ainmsVueclientApp.powerPlantStistics.name')"></span></th>
            <th scope="row"><span v-text="t$('ainmsVueclientApp.powerPlantStistics.totalCount')"></span></th>
            <th scope="row"><span v-text="t$('ainmsVueclientApp.powerPlantStistics.onlineCount')"></span></th>
            <th scope="row"><span v-text="t$('ainmsVueclientApp.powerPlantStistics.offlineCount')"></span></th>
            <th scope="row"><span v-text="t$('ainmsVueclientApp.powerPlantStistics.otherCount')"></span></th>
            <th scope="row"><span v-text="t$('ainmsVueclientApp.powerPlantStistics.statisticDate')"></span></th>
            <th scope="row"><span v-text="t$('ainmsVueclientApp.powerPlantStistics.statisticTime')"></span></th>
            <th scope="row"><span v-text="t$('ainmsVueclientApp.powerPlantStistics.province')"></span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="powerPlantStistics in powerPlantStistics" :key="powerPlantStistics.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'PowerPlantStisticsView', params: { powerPlantStisticsId: powerPlantStistics.id } }">{{
                powerPlantStistics.id
              }}</router-link>
            </td>
            <td>{{ powerPlantStistics.name }}</td>
            <td>{{ powerPlantStistics.totalCount }}</td>
            <td>{{ powerPlantStistics.onlineCount }}</td>
            <td>{{ powerPlantStistics.offlineCount }}</td>
            <td>{{ powerPlantStistics.otherCount }}</td>
            <td>{{ powerPlantStistics.statisticDate }}</td>
            <td>{{ formatDateShort(powerPlantStistics.statisticTime) || '' }}</td>
            <td>
              <div v-if="powerPlantStistics.province">
                <router-link :to="{ name: 'ProvinceStisticsView', params: { provinceStisticsId: powerPlantStistics.province.id } }">{{
                  powerPlantStistics.province.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link
                  :to="{ name: 'PowerPlantStisticsView', params: { powerPlantStisticsId: powerPlantStistics.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.view')"></span>
                  </button>
                </router-link>
                <router-link
                  :to="{ name: 'PowerPlantStisticsEdit', params: { powerPlantStisticsId: powerPlantStistics.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.edit')"></span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(powerPlantStistics)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="t$('entity.action.delete')"></span>
                </b-button>
              </div>
            </td>
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
