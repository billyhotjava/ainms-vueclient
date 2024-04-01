<template>
  <div>
    <h2 id="page-heading" data-cy="AccessControllerHeading">
      <span v-text="t$('ainmsVueclientApp.accessController.home.title')" id="access-controller-heading"></span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="t$('ainmsVueclientApp.accessController.home.refreshListLabel')"></span>
        </button>
        <router-link :to="{ name: 'AccessControllerCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-access-controller"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="t$('ainmsVueclientApp.accessController.home.createLabel')"></span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && accessControllers && accessControllers.length === 0">
      <span v-text="t$('ainmsVueclientApp.accessController.home.notFound')"></span>
    </div>
    <div class="table-responsive" v-if="accessControllers && accessControllers.length > 0">
      <table class="table table-striped" aria-describedby="accessControllers">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span v-text="t$('global.field.id')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <!-- <th scope="row" v-on:click="changeOrder('nedn')">
              <span v-text="t$('ainmsVueclientApp.accessController.nedn')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'nedn'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('neid')">
              <span v-text="t$('ainmsVueclientApp.accessController.neid')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'neid'"></jhi-sort-indicator>
            </th> -->
            <!-- <th scope="row" v-on:click="changeOrder('aliasname')">
              <span v-text="t$('ainmsVueclientApp.accessController.aliasname')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'aliasname'"></jhi-sort-indicator>
            </th> -->
            <th scope="row" v-on:click="changeOrder('nename')">
              <span v-text="t$('ainmsVueclientApp.accessController.nename')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'nename'"></jhi-sort-indicator>
            </th>
            <!-- <th scope="row" v-on:click="changeOrder('necategory')">
              <span v-text="t$('ainmsVueclientApp.accessController.necategory')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'necategory'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('netype')">
              <span v-text="t$('ainmsVueclientApp.accessController.netype')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'netype'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('nevendorname')">
              <span v-text="t$('ainmsVueclientApp.accessController.nevendorname')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'nevendorname'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('neesn')">
              <span v-text="t$('ainmsVueclientApp.accessController.neesn')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'neesn'"></jhi-sort-indicator>
            </th> -->
            <th scope="row" v-on:click="changeOrder('neip')">
              <span v-text="t$('ainmsVueclientApp.accessController.neip')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'neip'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('nemac')">
              <span v-text="t$('ainmsVueclientApp.accessController.nemac')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'nemac'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('version')">
              <span v-text="t$('ainmsVueclientApp.accessController.version')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'version'"></jhi-sort-indicator>
            </th>
            <!--<th scope="row" v-on:click="changeOrder('nestate')">
              <span v-text="t$('ainmsVueclientApp.accessController.nestate')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'nestate'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('createtime')">
              <span v-text="t$('ainmsVueclientApp.accessController.createtime')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'createtime'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('neiptype')">
              <span v-text="t$('ainmsVueclientApp.accessController.neiptype')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'neiptype'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('subnet')">
              <span v-text="t$('ainmsVueclientApp.accessController.subnet')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'subnet'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('neosversion')">
              <span v-text="t$('ainmsVueclientApp.accessController.neosversion')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'neosversion'"></jhi-sort-indicator>
            </th> -->
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="accessController in accessControllers" :key="accessController.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'AccessControllerView', params: { accessControllerId: accessController.id } }">{{
                accessController.id
              }}</router-link>
            </td>
            <!-- <td>{{ accessController.nedn }}</td>
            <td>{{ accessController.neid }}</td>
            <td>{{ accessController.aliasname }}</td> -->
            <td>{{ accessController.nename }}</td>
            <!-- <td>{{ accessController.necategory }}</td>
            <td>{{ accessController.netype }}</td>
            <td>{{ accessController.nevendorname }}</td>
            <td>{{ accessController.neesn }}</td> -->
            <td>{{ accessController.neip }}</td>
            <td>{{ accessController.nemac }}</td>
            <td>{{ accessController.version }}</td>
            <!--<td>{{ accessController.nestate }}</td>
            <td>{{ accessController.createtime }}</td>
            <td>{{ accessController.neiptype }}</td>
            <td>{{ accessController.subnet }}</td>
            <td>{{ accessController.neosversion }}</td> -->
            <td class="text-right">
              <div class="btn-group">
                <router-link
                  :to="{ name: 'AccessControllerView', params: { accessControllerId: accessController.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.view')"></span>
                  </button>
                </router-link>
                <router-link
                  :to="{ name: 'AccessControllerEdit', params: { accessControllerId: accessController.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.edit')"></span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(accessController)"
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
          id="ainmsVueclientApp.accessController.delete.question"
          data-cy="accessControllerDeleteDialogHeading"
          v-text="t$('entity.delete.title')"
        ></span>
      </template>
      <div class="modal-body">
        <p
          id="ainms-delete-accessController-heading"
          v-text="t$('ainmsVueclientApp.accessController.delete.question', { id: removeId })"
        ></p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" v-text="t$('entity.action.cancel')" v-on:click="closeDialog()"></button>
          <button
            type="button"
            class="btn btn-primary"
            id="ainms-confirm-delete-accessController"
            data-cy="entityConfirmDeleteButton"
            v-text="t$('entity.action.delete')"
            v-on:click="removeAccessController()"
          ></button>
        </div>
      </template>
    </b-modal>
    <div v-show="accessControllers && accessControllers.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./access-controller.component.ts"></script>
