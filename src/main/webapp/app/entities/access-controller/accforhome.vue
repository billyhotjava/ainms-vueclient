<template>
  <div>
    <br />
      <table class="table table-striped" aria-describedby="accessControllers">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span>AC编号</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('aliasname')">
              <span>AC名称</span>
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
          <tr v-for="accessController in accessControllers" :key="accessController.id" data-cy="entityTable">
            <td>
              {{accessController.id}}
            </td>
            <td>{{ accessController.aliasname }}</td>
            <td>{{ accessController.neip }}</td>
            <td>{{ accessController.nestate }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script lang="ts" src="./accforhome.component.ts"></script>
