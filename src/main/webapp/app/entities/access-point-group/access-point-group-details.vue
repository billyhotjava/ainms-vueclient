<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="accessPointGroup">
        <h2 class="jh-entity-heading" data-cy="accessPointGroupDetailsHeading">
          <span>AP组</span> {{ accessPointGroup.name }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>名称</span>
          </dt>
          <dd>
            <span>{{ accessPointGroup.name }}</span>
          </dd>
          <dt>
            <span>所属AC</span>
          </dt>
          <dd>
            {{ accessPointGroup.controller.aliasname}}
          </dd>
          <dt>
            <span >所属场站</span>
          </dt>
          <dd>
           {{accessPointGroup.powerPlant.powerPlantName}}
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link
          v-if="accessPointGroup.id"
          :to="{ name: 'AccessPointGroupEdit', params: { accessPointGroupId: accessPointGroup.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.edit')"></span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./access-point-group-details.component.ts"></script>
