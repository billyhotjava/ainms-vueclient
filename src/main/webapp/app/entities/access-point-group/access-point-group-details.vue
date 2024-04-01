<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="accessPointGroup">
        <h2 class="jh-entity-heading" data-cy="accessPointGroupDetailsHeading">
          <span v-text="t$('ainmsVueclientApp.accessPointGroup.detail.title')"></span> {{ accessPointGroup.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessPointGroup.name')"></span>
          </dt>
          <dd>
            <span>{{ accessPointGroup.name }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessPointGroup.controller')"></span>
          </dt>
          <dd>
            <div v-if="accessPointGroup.controller">
              <router-link :to="{ name: 'AccessControllerView', params: { accessControllerId: accessPointGroup.controller.id } }">{{
                accessPointGroup.controller.id
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessPointGroup.powerPlant')"></span>
          </dt>
          <dd>
            <div v-if="accessPointGroup.powerPlant">
              <router-link :to="{ name: 'PowerPlantView', params: { powerPlantId: accessPointGroup.powerPlant.id } }">{{
                accessPointGroup.powerPlant.id
              }}</router-link>
            </div>
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
