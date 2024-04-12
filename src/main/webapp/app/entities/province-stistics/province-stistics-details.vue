<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="provinceStistics">
        <h2 class="jh-entity-heading" data-cy="provinceStisticsDetailsHeading">
          <span v-text="t$('ainmsVueclientApp.provinceStistics.detail.title')"></span> {{ provinceStistics.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('ainmsVueclientApp.provinceStistics.name')"></span>
          </dt>
          <dd>
            <span>{{ provinceStistics.name }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.provinceStistics.totalCount')"></span>
          </dt>
          <dd>
            <span>{{ provinceStistics.totalCount }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.provinceStistics.onlineCount')"></span>
          </dt>
          <dd>
            <span>{{ provinceStistics.onlineCount }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.provinceStistics.offlineCount')"></span>
          </dt>
          <dd>
            <span>{{ provinceStistics.offlineCount }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.provinceStistics.otherCount')"></span>
          </dt>
          <dd>
            <span>{{ provinceStistics.otherCount }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.provinceStistics.statisticDate')"></span>
          </dt>
          <dd>
            <span>{{ provinceStistics.statisticDate }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.provinceStistics.statisticTime')"></span>
          </dt>
          <dd>
            <span v-if="provinceStistics.statisticTime">{{ formatDateLong(provinceStistics.statisticTime) }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.provinceStistics.country')"></span>
          </dt>
          <dd>
            <div v-if="provinceStistics.country">
              <router-link :to="{ name: 'CountryStisticsView', params: { countryStisticsId: provinceStistics.country.id } }">{{
                provinceStistics.country.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link
          v-if="provinceStistics.id"
          :to="{ name: 'ProvinceStisticsEdit', params: { provinceStisticsId: provinceStistics.id } }"
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

<script lang="ts" src="./province-stistics-details.component.ts"></script>
