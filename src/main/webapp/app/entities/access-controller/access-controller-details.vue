<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="accessController">
        <h2 class="jh-entity-heading" data-cy="accessControllerDetailsHeading">
          <span v-text="t$('ainmsVueclientApp.accessController.detail.title')"></span> {{ accessController.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessController.nedn')"></span>
          </dt>
          <dd>
            <span>{{ accessController.nedn }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessController.neid')"></span>
          </dt>
          <dd>
            <span>{{ accessController.neid }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessController.aliasname')"></span>
          </dt>
          <dd>
            <span>{{ accessController.aliasname }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessController.nename')"></span>
          </dt>
          <dd>
            <span>{{ accessController.nename }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessController.necategory')"></span>
          </dt>
          <dd>
            <span>{{ accessController.necategory }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessController.netype')"></span>
          </dt>
          <dd>
            <span>{{ accessController.netype }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessController.nevendorname')"></span>
          </dt>
          <dd>
            <span>{{ accessController.nevendorname }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessController.neesn')"></span>
          </dt>
          <dd>
            <span>{{ accessController.neesn }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessController.neip')"></span>
          </dt>
          <dd>
            <span>{{ accessController.neip }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessController.nemac')"></span>
          </dt>
          <dd>
            <span>{{ accessController.nemac }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessController.version')"></span>
          </dt>
          <dd>
            <span>{{ accessController.version }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessController.nestate')"></span>
          </dt>
          <dd>
            <span>{{ accessController.nestate }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessController.createtime')"></span>
          </dt>
          <dd>
            <span>{{ accessController.createtime }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessController.neiptype')"></span>
          </dt>
          <dd>
            <span>{{ accessController.neiptype }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessController.subnet')"></span>
          </dt>
          <dd>
            <span>{{ accessController.subnet }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessController.neosversion')"></span>
          </dt>
          <dd>
            <span>{{ accessController.neosversion }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link
          v-if="accessController.id"
          :to="{ name: 'AccessControllerEdit', params: { accessControllerId: accessController.id } }"
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

<script lang="ts" src="./access-controller-details.component.ts"></script>
