<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="powerPlantStistics">
        <h2 class="jh-entity-heading" data-cy="powerPlantStisticsDetailsHeading">
          <span v-text="t$('ainmsVueclientApp.powerPlantStistics.detail.title')"></span> {{ powerPlantStistics.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('ainmsVueclientApp.powerPlantStistics.name')"></span>
          </dt>
          <dd>
            <span>{{ powerPlantStistics.name }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.powerPlantStistics.totalCount')"></span>
          </dt>
          <dd>
            <span>{{ powerPlantStistics.totalCount }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.powerPlantStistics.onlineCount')"></span>
          </dt>
          <dd>
            <span>{{ powerPlantStistics.onlineCount }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.powerPlantStistics.offlineCount')"></span>
          </dt>
          <dd>
            <span>{{ powerPlantStistics.offlineCount }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.powerPlantStistics.otherCount')"></span>
          </dt>
          <dd>
            <span>{{ powerPlantStistics.otherCount }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.powerPlantStistics.statisticDate')"></span>
          </dt>
          <dd>
            <span>{{ powerPlantStistics.statisticDate }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.powerPlantStistics.statisticTime')"></span>
          </dt>
          <dd>
            <span v-if="powerPlantStistics.statisticTime">{{ formatDateLong(powerPlantStistics.statisticTime) }}</span>
          </dd>
          <dt>
            <span v-text="t$('ainmsVueclientApp.powerPlantStistics.province')"></span>
          </dt>
          <dd>
            <div v-if="powerPlantStistics.province">
              <router-link :to="{ name: 'ProvinceStisticsView', params: { provinceStisticsId: powerPlantStistics.province.id } }">{{
                powerPlantStistics.province.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link
          v-if="powerPlantStistics.id"
          :to="{ name: 'PowerPlantStisticsEdit', params: { powerPlantStisticsId: powerPlantStistics.id } }"
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

<script lang="ts" src="./power-plant-stistics-details.component.ts"></script>
