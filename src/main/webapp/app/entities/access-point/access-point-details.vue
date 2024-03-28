<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="accessPoint">
        <h2 class="jh-entity-heading" data-cy="accessPointDetailsHeading">
          <span v-text="t$('ainmsVueclientApp.accessPoint.detail.title')"></span> {{ accessPoint.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessPoint.nedn')"></span>
          </dt>
          <dd>
            <span>{{ accessPoint.nedn }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessPoint.neid')"></span>
          </dt>
          <dd>
            <span>{{ accessPoint.neid }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessPoint.aliasname')"></span>
          </dt>
          <dd>
            <span>{{ accessPoint.aliasname }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessPoint.nename')"></span>
          </dt>
          <dd>
            <span>{{ accessPoint.nename }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessPoint.necategory')"></span>
          </dt>
          <dd>
            <span>{{ accessPoint.necategory }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessPoint.netype')"></span>
          </dt>
          <dd>
            <span>{{ accessPoint.netype }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessPoint.nevendorname')"></span>
          </dt>
          <dd>
            <span>{{ accessPoint.nevendorname }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessPoint.neesn')"></span>
          </dt>
          <dd>
            <span>{{ accessPoint.neesn }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessPoint.neip')"></span>
          </dt>
          <dd>
            <span>{{ accessPoint.neip }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessPoint.nemac')"></span>
          </dt>
          <dd>
            <span>{{ accessPoint.nemac }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessPoint.version')"></span>
          </dt>
          <dd>
            <span>{{ accessPoint.version }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessPoint.nestate')"></span>
          </dt>
          <dd>
            <span>{{ accessPoint.nestate }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessPoint.createtime')"></span>
          </dt>
          <dd>
            <span>{{ accessPoint.createtime }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessPoint.neiptype')"></span>
          </dt>
          <dd>
            <span>{{ accessPoint.neiptype }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessPoint.subnet')"></span>
          </dt>
          <dd>
            <span>{{ accessPoint.subnet }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessPoint.neosversion')"></span>
          </dt>
          <dd>
            <span>{{ accessPoint.neosversion }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.accessPoint.group')"></span>
          </dt>
          <dd>
            <div v-if="accessPoint.group">
              <router-link :to="{ name: 'AccessPointGroupView', params: { accessPointGroupId: accessPoint.group.id } }">{{
                accessPoint.group.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link
          v-if="accessPoint.id"
          :to="{ name: 'AccessPointEdit', params: { accessPointId: accessPoint.id } }"
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

<script lang="ts" src="./access-point-details.component.ts"></script>
