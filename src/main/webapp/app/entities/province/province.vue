<template>
  <div>
    <h2 id="page-heading" data-cy="ProvinceHeading">
      <span id="province-heading">省份配置</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span>刷新列表</span>
        </button>
        <!-- <router-link :to="{ name: 'ProvinceCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-province"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span>新建省份</span>
          </button>
        </router-link> -->
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && provinces && provinces.length === 0">
      <span v-text="t$('ainmsVueclientApp.province.home.notFound')"></span>
    </div>
    <div class="table-responsive" v-if="provinces && provinces.length > 0">
      <table class="table table-striped" aria-describedby="provinces">
        <thead>
          <tr>
            <th scope="row"><span>省份id</span></th>
            <th scope="row"><span>省份编码</span></th>
            <th scope="row"><span>省份名称</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="province in provinces" :key="province.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ProvinceView', params: { provinceId: province.id } }">{{ province.id }}</router-link>
            </td>
            <td>{{ province.provinceCode }}</td>
            <td>{{ province.provinceName }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'ProvinceView', params: { provinceId: province.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.view')"></span>
                  </button>
                </router-link>
                <!-- <router-link :to="{ name: 'ProvinceEdit', params: { provinceId: province.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.edit')"></span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(province)"
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
          id="ainmsVueclientApp.province.delete.question"
          data-cy="provinceDeleteDialogHeading"
          v-text="t$('entity.delete.title')"
        ></span>
      </template>
      <div class="modal-body">
        <p id="ainms-delete-province-heading" v-text="t$('ainmsVueclientApp.province.delete.question', { id: removeId })"></p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" v-text="t$('entity.action.cancel')" v-on:click="closeDialog()"></button>
          <button
            type="button"
            class="btn btn-primary"
            id="ainms-confirm-delete-province"
            data-cy="entityConfirmDeleteButton"
            v-text="t$('entity.action.delete')"
            v-on:click="removeProvince()"
          ></button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./province.component.ts"></script>
