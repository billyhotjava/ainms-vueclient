<template>
  <div>
    <h2 id="page-heading" data-cy="PowerPlantHeading">
      <span v-text="t$('ainmsVueclientApp.powerPlant.home.title')" id="power-plant-heading"></span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="t$('ainmsVueclientApp.powerPlant.home.refreshListLabel')"></span>
        </button>
        <router-link :to="{ name: 'PowerPlantCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-power-plant"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="t$('ainmsVueclientApp.powerPlant.home.createLabel')"></span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && powerPlants && powerPlants.length === 0">
      <span v-text="t$('ainmsVueclientApp.powerPlant.home.notFound')"></span>
    </div>
    <div class="table-responsive" v-if="powerPlants && powerPlants.length > 0">
      <table class="table table-striped" aria-describedby="powerPlants">
        <thead>
          <tr>
            <th scope="row"><span v-text="t$('global.field.id')"></span></th>
            <th scope="row"><span v-text="t$('ainmsVueclientApp.powerPlant.powerPlantName')"></span></th>
            <th scope="row"><span v-text="t$('ainmsVueclientApp.powerPlant.province')"></span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="powerPlant in powerPlants" :key="powerPlant.powerPlant.id" data-cy="entityTable">
            <td>
              {{ powerPlant.powerPlant.id}}
            </td>
            <td>{{ powerPlant.powerPlant.powerPlantName }}</td>
            <td>
              {{powerPlant.provinceName}}
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'PowerPlantView', params: { powerPlantId: powerPlant.powerPlant.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.view')"></span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'PowerPlantEdit', params: { powerPlantId: powerPlant.powerPlant.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.edit')"></span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(powerPlant.powerPlant)"
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
          id="ainmsVueclientApp.powerPlant.delete.question"
          data-cy="powerPlantDeleteDialogHeading"
          v-text="t$('entity.delete.title')"
        ></span>
      </template>
      <div class="modal-body">
        <p id="ainms-delete-powerPlant-heading" v-text="t$('ainmsVueclientApp.powerPlant.delete.question', { id: removeId })"></p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" v-text="t$('entity.action.cancel')" v-on:click="closeDialog()"></button>
          <button
            type="button"
            class="btn btn-primary"
            id="ainms-confirm-delete-powerPlant"
            data-cy="entityConfirmDeleteButton"
            v-text="t$('entity.action.delete')"
            v-on:click="removePowerPlant()"
          ></button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./power-plant.component.ts"></script>
