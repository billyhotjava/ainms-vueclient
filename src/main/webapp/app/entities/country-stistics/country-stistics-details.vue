<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="countryStistics">
        <h2 class="jh-entity-heading" data-cy="countryStisticsDetailsHeading">
          <span v-text="t$('ainmsVueclientApp.countryStistics.detail.title')"></span> {{ countryStistics.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('ainmsVueclientApp.countryStistics.name')"></span>
          </dt>
          <dd>
            <span>{{ countryStistics.name }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.countryStistics.totalCount')"></span>
          </dt>
          <dd>
            <span>{{ countryStistics.totalCount }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.countryStistics.onlineCount')"></span>
          </dt>
          <dd>
            <span>{{ countryStistics.onlineCount }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.countryStistics.offlineCount')"></span>
          </dt>
          <dd>
            <span>{{ countryStistics.offlineCount }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.countryStistics.otherCount')"></span>
          </dt>
          <dd>
            <span>{{ countryStistics.otherCount }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.countryStistics.statisticDate')"></span>
          </dt>
          <dd>
            <span>{{ countryStistics.statisticDate }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.countryStistics.statisticTime')"></span>
          </dt>
          <dd>
            <span v-if="countryStistics.statisticTime">{{ formatDateLong(countryStistics.statisticTime) }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link
          v-if="countryStistics.id"
          :to="{ name: 'CountryStisticsEdit', params: { countryStisticsId: countryStistics.id } }"
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

<script lang="ts" src="./country-stistics-details.component.ts"></script>
