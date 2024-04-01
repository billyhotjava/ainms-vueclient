<template>
  <div>
    <h2 id="page-heading" data-cy="AccessPointGroupHeading">
      <span v-text="t$('ainmsVueclientApp.accessPointGroup.home.title')" id="access-point-group-heading"></span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="t$('ainmsVueclientApp.accessPointGroup.home.refreshListLabel')"></span>
        </button>
        <!-- <router-link :to="{ name: 'AccessPointGroupCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-access-point-group"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="t$('ainmsVueclientApp.accessPointGroup.home.createLabel')"></span>
          </button>
        </router-link> -->
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && accessPointGroups && accessPointGroups.length === 0">
      <span v-text="t$('ainmsVueclientApp.accessPointGroup.home.notFound')"></span>
    </div>
    <div class="table-responsive" v-if="accessPointGroups && accessPointGroups.length > 0">
      <table class="table table-striped" aria-describedby="accessPointGroups">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span v-text="t$('global.field.id')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('name')">
              <span v-text="t$('ainmsVueclientApp.accessPointGroup.name')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'name'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('controller.id')">
              <span v-text="t$('ainmsVueclientApp.accessPointGroup.controller')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'controller.id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('powerPlant.id')">
              <span v-text="t$('ainmsVueclientApp.accessPointGroup.powerPlant')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'powerPlant.id'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="accessPointGroup in accessPointGroups" :key="accessPointGroup.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'AccessPointGroupView', params: { accessPointGroupId: accessPointGroup.id } }">{{
                accessPointGroup.id
              }}</router-link>
            </td>
            <td>{{ accessPointGroup.name }}</td>
            <td>
              <div v-if="accessPointGroup.controller">
                <router-link :to="{ name: 'AccessControllerView', params: { accessControllerId: accessPointGroup.controller.id } }">{{
                  accessPointGroup.controller.id
                }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="accessPointGroup.powerPlant">
                <router-link :to="{ name: 'PowerPlantView', params: { powerPlantId: accessPointGroup.powerPlant.id } }">{{
                  accessPointGroup.powerPlant.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link
                  :to="{ name: 'AccessPointGroupView', params: { accessPointGroupId: accessPointGroup.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.view')"></span>
                  </button>
                </router-link>
                <!-- <router-link
                  :to="{ name: 'AccessPointGroupEdit', params: { accessPointGroupId: accessPointGroup.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.edit')"></span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(accessPointGroup)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="t$('entity.action.delete')"></span>
                </b-button> -->
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <template #modal-title>
        <span
          id="ainmsVueclientApp.accessPointGroup.delete.question"
          data-cy="accessPointGroupDeleteDialogHeading"
          v-text="t$('entity.delete.title')"
        ></span>
      </template>
      <div class="modal-body">
        <p id="ainms-delete-accessPointGroup-heading" v-text="t$('ainmsVueclientApp.accessPointGroup.delete.question', { id: removeId })"></p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" v-text="t$('entity.action.cancel')" v-on:click="closeDialog()"></button>
          <button
            type="button"
            class="btn btn-primary"
            id="ainms-confirm-delete-accessPointGroup"
            data-cy="entityConfirmDeleteButton"
            v-text="t$('entity.action.delete')"
            v-on:click="removeAccessPointGroup()"
          ></button>
        </div>
      </template>
    </b-modal>
    <div v-show="accessPointGroups && accessPointGroups.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./access-point-group.component.ts"></script>
