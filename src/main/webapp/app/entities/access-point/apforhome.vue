<template>
  <div>
    <h2 id="page-heading" data-cy="AccessPointHeading">
      <span id="access-point-heading">AP列表</span>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && accessPoints && accessPoints.length === 0">
      <span v-text="t$('ainmsVueclientApp.accessPoint.home.notFound')"></span>
    </div>
    <div class="table-responsive" v-if="accessPoints && accessPoints.length > 0">
      <table class="table table-striped" aria-describedby="accessPoints">
        <thead>
          <tr>
            <th scope="row" >
              <span>AP编号</span>
            </th>
            <th scope="row">
              <span>AP名称</span>
            </th>
            <th scope="row" >
              <span>IP地址</span>
            </th>
            <th scope="row" >
              <span>所属AP组</span>
            </th>
            <th scope="row" >
              <span>所属省份</span>
            </th>
             <th scope="row" >
              <span>所属AC</span>
            </th>
            <th scope="row" >
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="accessPoint in accessPoints" :key="accessPoint.id" data-cy="entityTable">
            <td>
              {{accessPoint.id}}
            </td>
            <td>{{ accessPoint.aliasname }}</td>
            <td>{{ accessPoint.neip }}</td>
            <td 
                >{{accessPoint.group.name}}</td>
            <td>{{accessPoint.group.powerPlant.province.provinceName}}</td>
            <td>{{ accessPoint.group.controller.aliasname}}</td>
            
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'AccessPointView', params: { accessPointId: accessPoint.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.view')"></span>
                  </button>
                </router-link>
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

<script lang="ts" src="./apforhome.compoent.ts"></script>
