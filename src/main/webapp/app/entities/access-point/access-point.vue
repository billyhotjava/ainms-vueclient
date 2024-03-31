<template>
  <div>
    <h2 id="page-heading" data-cy="AccessPointHeading">
      <span v-text="t$('ainmsVueclientApp.accessPoint.home.title')" id="access-point-heading"></span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="t$('ainmsVueclientApp.accessPoint.home.refreshListLabel')"></span>
        </button>
        <router-link :to="{ name: 'AccessPointCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-access-point"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="t$('ainmsVueclientApp.accessPoint.home.createLabel')"></span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && accessPoints && accessPoints.length === 0">
      <span v-text="t$('ainmsVueclientApp.accessPoint.home.notFound')"></span>
    </div>
    <div class="table-responsive" v-if="accessPoints && accessPoints.length > 0">
      <table class="table table-striped" aria-describedby="accessPoints">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span>AP编号</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('aliasname')">
              <span>AP名称</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'aliasname'"></jhi-sort-indicator>
            </th>
            
            <th scope="row" v-on:click="changeOrder('neip')">
              <span>IP地址</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'neip'"></jhi-sort-indicator>
            </th>
           
            <th scope="row" v-on:click="changeOrder('nestate')">
              <span>工作状态</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'nestate'"></jhi-sort-indicator>
            </th>
           
            
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="accessPoint in accessPoints" :key="accessPoint.id" data-cy="entityTable">
            <td>
              {{accessPoint.id}}
            </td>
            <td>{{ accessPoint.aliasname }}</td>
            <td>{{ accessPoint.neip }}</td>
           
            <td>{{ accessPoint.nestate }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'AccessPointView', params: { accessPointId: accessPoint.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.view')"></span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'AccessPointEdit', params: { accessPointId: accessPoint.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.edit')"></span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(accessPoint)"
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
          id="ainmsVueclientApp.accessPoint.delete.question"
          data-cy="accessPointDeleteDialogHeading"
          v-text="t$('entity.delete.title')"
        ></span>
      </template>
      <div class="modal-body">
        <p id="ainms-delete-accessPoint-heading" v-text="t$('ainmsVueclientApp.accessPoint.delete.question', { id: removeId })"></p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" v-text="t$('entity.action.cancel')" v-on:click="closeDialog()"></button>
          <button
            type="button"
            class="btn btn-primary"
            id="ainms-confirm-delete-accessPoint"
            data-cy="entityConfirmDeleteButton"
            v-text="t$('entity.action.delete')"
            v-on:click="removeAccessPoint()"
          ></button>
        </div>
      </template>
    </b-modal>
    <div v-show="accessPoints && accessPoints.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./access-point.component.ts"></script>
