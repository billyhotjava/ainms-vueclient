<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="powerPlant">
        <h2 class="jh-entity-heading" data-cy="powerPlantDetailsHeading">
          <span>查看场站</span> {{ powerPlant.powerPlantName }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>场站名称</span>
          </dt>
          <dd>
            <span>{{ powerPlant.powerPlantName }}</span>
          </dd>
          <dt>
            <span>所属省份</span>
          </dt>
          <dd>
            {{powerPlant.province.id}}
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link
          v-if="powerPlant.id"
          :to="{ name: 'PowerPlantEdit', params: { powerPlantId: powerPlant.id } }"
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

<script lang="ts" src="./power-plant-details.component.ts"></script>
