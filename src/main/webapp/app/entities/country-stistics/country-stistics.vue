<template>
  <div>
    <h2 id="page-heading" data-cy="CountryStisticsHeading">
      <span v-text="t$('ainmsVueclientApp.countryStistics.home.title')" id="country-stistics-heading"></span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="t$('ainmsVueclientApp.countryStistics.home.refreshListLabel')"></span>
        </button>
        <router-link :to="{ name: 'CountryStisticsCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-country-stistics"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="t$('ainmsVueclientApp.countryStistics.home.createLabel')"></span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && countryStistics && countryStistics.length === 0">
      <span v-text="t$('ainmsVueclientApp.countryStistics.home.notFound')"></span>
    </div>
    <div class="table-responsive" v-if="countryStistics && countryStistics.length > 0">
      <table class="table table-striped" aria-describedby="countryStistics">
        <thead>
          <tr>
            <th scope="row"><span v-text="t$('global.field.id')"></span></th>
            <th scope="row"><span v-text="t$('ainmsVueclientApp.countryStistics.name')"></span></th>
            <th scope="row"><span v-text="t$('ainmsVueclientApp.countryStistics.totalCount')"></span></th>
            <th scope="row"><span v-text="t$('ainmsVueclientApp.countryStistics.onlineCount')"></span></th>
            <th scope="row"><span v-text="t$('ainmsVueclientApp.countryStistics.offlineCount')"></span></th>
            <th scope="row"><span v-text="t$('ainmsVueclientApp.countryStistics.otherCount')"></span></th>
            <th scope="row"><span v-text="t$('ainmsVueclientApp.countryStistics.statisticDate')"></span></th>
            <th scope="row"><span v-text="t$('ainmsVueclientApp.countryStistics.statisticTime')"></span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="countryStistics in countryStistics" :key="countryStistics.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'CountryStisticsView', params: { countryStisticsId: countryStistics.id } }">{{
                countryStistics.id
              }}</router-link>
            </td>
            <td>{{ countryStistics.name }}</td>
            <td>{{ countryStistics.totalCount }}</td>
            <td>{{ countryStistics.onlineCount }}</td>
            <td>{{ countryStistics.offlineCount }}</td>
            <td>{{ countryStistics.otherCount }}</td>
            <td>{{ countryStistics.statisticDate }}</td>
            <td>{{ formatDateShort(countryStistics.statisticTime) || '' }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link
                  :to="{ name: 'CountryStisticsView', params: { countryStisticsId: countryStistics.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.view')"></span>
                  </button>
                </router-link>
                <router-link
                  :to="{ name: 'CountryStisticsEdit', params: { countryStisticsId: countryStistics.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.edit')"></span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(countryStistics)"
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
          id="ainmsVueclientApp.countryStistics.delete.question"
          data-cy="countryStisticsDeleteDialogHeading"
          v-text="t$('entity.delete.title')"
        ></span>
      </template>
      <div class="modal-body">
        <p id="ainms-delete-countryStistics-heading" v-text="t$('ainmsVueclientApp.countryStistics.delete.question', { id: removeId })"></p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" v-text="t$('entity.action.cancel')" v-on:click="closeDialog()"></button>
          <button
            type="button"
            class="btn btn-primary"
            id="ainms-confirm-delete-countryStistics"
            data-cy="entityConfirmDeleteButton"
            v-text="t$('entity.action.delete')"
            v-on:click="removeCountryStistics()"
          ></button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./country-stistics.component.ts"></script>
