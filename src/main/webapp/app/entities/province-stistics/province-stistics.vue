<template>
  <div>
    <h2 id="page-heading" data-cy="ProvinceStisticsHeading">
      <span v-text="t$('ainmsVueclientApp.provinceStistics.home.title')" id="province-stistics-heading"></span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="t$('ainmsVueclientApp.provinceStistics.home.refreshListLabel')"></span>
        </button>
        <router-link :to="{ name: 'ProvinceStisticsCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-province-stistics"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="t$('ainmsVueclientApp.provinceStistics.home.createLabel')"></span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && provinceStistics && provinceStistics.length === 0">
      <span v-text="t$('ainmsVueclientApp.provinceStistics.home.notFound')"></span>
    </div>
    <div class="table-responsive" v-if="provinceStistics && provinceStistics.length > 0">
      <table class="table table-striped" aria-describedby="provinceStistics">
        <thead>
          <tr>
            <th scope="row"><span v-text="t$('global.field.id')"></span></th>
            <th scope="row"><span v-text="t$('ainmsVueclientApp.provinceStistics.name')"></span></th>
            <th scope="row"><span v-text="t$('ainmsVueclientApp.provinceStistics.totalCount')"></span></th>
            <th scope="row"><span v-text="t$('ainmsVueclientApp.provinceStistics.onlineCount')"></span></th>
            <th scope="row"><span v-text="t$('ainmsVueclientApp.provinceStistics.offlineCount')"></span></th>
            <th scope="row"><span v-text="t$('ainmsVueclientApp.provinceStistics.otherCount')"></span></th>
            <th scope="row"><span v-text="t$('ainmsVueclientApp.provinceStistics.statisticDate')"></span></th>
            <th scope="row"><span v-text="t$('ainmsVueclientApp.provinceStistics.statisticTime')"></span></th>
            <th scope="row"><span v-text="t$('ainmsVueclientApp.provinceStistics.country')"></span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="provinceStistics in provinceStistics" :key="provinceStistics.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ProvinceStisticsView', params: { provinceStisticsId: provinceStistics.id } }">{{
                provinceStistics.id
              }}</router-link>
            </td>
            <td>{{ provinceStistics.name }}</td>
            <td>{{ provinceStistics.totalCount }}</td>
            <td>{{ provinceStistics.onlineCount }}</td>
            <td>{{ provinceStistics.offlineCount }}</td>
            <td>{{ provinceStistics.otherCount }}</td>
            <td>{{ provinceStistics.statisticDate }}</td>
            <td>{{ formatDateShort(provinceStistics.statisticTime) || '' }}</td>
            <td>
              <div v-if="provinceStistics.country">
                <router-link :to="{ name: 'CountryStisticsView', params: { countryStisticsId: provinceStistics.country.id } }">{{
                  provinceStistics.country.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link
                  :to="{ name: 'ProvinceStisticsView', params: { provinceStisticsId: provinceStistics.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.view')"></span>
                  </button>
                </router-link>
                <router-link
                  :to="{ name: 'ProvinceStisticsEdit', params: { provinceStisticsId: provinceStistics.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.edit')"></span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(provinceStistics)"
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
          id="ainmsVueclientApp.provinceStistics.delete.question"
          data-cy="provinceStisticsDeleteDialogHeading"
          v-text="t$('entity.delete.title')"
        ></span>
      </template>
      <div class="modal-body">
        <p
          id="ainms-delete-provinceStistics-heading"
          v-text="t$('ainmsVueclientApp.provinceStistics.delete.question', { id: removeId })"
        ></p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" v-text="t$('entity.action.cancel')" v-on:click="closeDialog()"></button>
          <button
            type="button"
            class="btn btn-primary"
            id="ainms-confirm-delete-provinceStistics"
            data-cy="entityConfirmDeleteButton"
            v-text="t$('entity.action.delete')"
            v-on:click="removeProvinceStistics()"
          ></button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./province-stistics.component.ts"></script>
