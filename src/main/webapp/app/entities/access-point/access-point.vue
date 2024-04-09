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
              <span v-text="t$('global.field.id')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <!-- <th scope="row" v-on:click="changeOrder('nedn')">
              <span v-text="t$('ainmsVueclientApp.accessPoint.nedn')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'nedn'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('neid')">
              <span v-text="t$('ainmsVueclientApp.accessPoint.neid')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'neid'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('aliasname')">
              <span v-text="t$('ainmsVueclientApp.accessPoint.aliasname')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'aliasname'"></jhi-sort-indicator>
            </th> -->
            <th scope="row" v-on:click="changeOrder('nename')">
              <span v-text="t$('ainmsVueclientApp.accessPoint.nename')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'nename'"></jhi-sort-indicator>
            </th>
            <!-- <th scope="row" v-on:click="changeOrder('necategory')">
              <span v-text="t$('ainmsVueclientApp.accessPoint.necategory')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'necategory'"></jhi-sort-indicator>
            </th>
          -->
            <th scope="row" v-on:click="changeOrder('netype')">
              <span v-text="t$('ainmsVueclientApp.accessPoint.netype')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'netype'"></jhi-sort-indicator>
            </th> 
            <!--
            <th scope="row" v-on:click="changeOrder('nevendorname')">
              <span v-text="t$('ainmsVueclientApp.accessPoint.nevendorname')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'nevendorname'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('neesn')">
              <span v-text="t$('ainmsVueclientApp.accessPoint.neesn')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'neesn'"></jhi-sort-indicator>
            </th> 
            <th scope="row" v-on:click="changeOrder('neip')">
              <span v-text="t$('ainmsVueclientApp.accessPoint.neip')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'neip'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('nemac')">
              <span v-text="t$('ainmsVueclientApp.accessPoint.nemac')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'nemac'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('version')">
              <span v-text="t$('ainmsVueclientApp.accessPoint.version')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'version'"></jhi-sort-indicator>
            </th> -->
            <th scope="row" v-on:click="changeOrder('nestate')">
              <span v-text="t$('ainmsVueclientApp.accessPoint.nestate')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'nestate'"></jhi-sort-indicator>
            </th>
            <!-- <th scope="row" v-on:click="changeOrder('createtime')">
              <span v-text="t$('ainmsVueclientApp.accessPoint.createtime')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'createtime'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('neiptype')">
              <span v-text="t$('ainmsVueclientApp.accessPoint.neiptype')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'neiptype'"></jhi-sort-indicator>
            </th> 
            <th scope="row" v-on:click="changeOrder('subnet')">
              <span v-text="t$('ainmsVueclientApp.accessPoint.subnet')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'subnet'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('neosversion')">
              <span v-text="t$('ainmsVueclientApp.accessPoint.neosversion')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'neosversion'"></jhi-sort-indicator>
            </th> -->
            <th scope="row" v-on:click="changeOrder('group.id')">
              <span v-text="t$('ainmsVueclientApp.accessPoint.group')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'group.id'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <!-- AccessPoint表 -->
          <tr v-for="accessPoint in accessPoints" :key="accessPoint.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'AccessPointView', params: { accessPointId: accessPoint.id } }">{{ accessPoint.id }}</router-link>
            </td>
            <!-- <td>{{ accessPoint.nedn }}</td>
            <td>{{ accessPoint.neid }}</td>
            <td>{{ accessPoint.aliasname }}</td> -->
            <td>{{ accessPoint.nename }}</td>
            <!-- <td>{{ accessPoint.necategory }}</td> -->
            <td>{{ accessPoint.netype }}</td>
            <!-- <td>{{ accessPoint.nevendorname }}</td>
            <td>{{ accessPoint.neesn }}</td>
            <td>{{ accessPoint.neip }}</td>
            <td>{{ accessPoint.nemac }}</td>
            <td>{{ accessPoint.version }}</td> -->
            <!-- <td>{{ accessPoint.nestate }}</td> -->
            <td>{{ getStatusText(accessPoint.nestate) }}</td>
            <!-- <td>{{ accessPoint.createtime }}</td>
            <td>{{ accessPoint.neiptype }}</td>
            <td>{{ accessPoint.subnet }}</td>
            <td>{{ accessPoint.neosversion }}</td> -->
            <td>
              <div v-if="accessPoint.group">
                <router-link :to="{ name: 'AccessPointGroupView', params: { accessPointGroupId: accessPoint.group.id } }">
                  {{ getAccessPointGroupName(accessPoint.group.id)}}
                </router-link>
              </div>
            </td>
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
