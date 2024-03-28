<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="province">
        <h2 class="jh-entity-heading" data-cy="provinceDetailsHeading">
          <span> 省份</span> {{ province.provinceName }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>省份编码</span>
          </dt>
          <dd>
            <span>{{ province.provinceCode }}</span>
          </dd>
          <dt>
            <span>省份名称</span>
          </dt>
          <dd>
            <span>{{ province.provinceName }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link v-if="province.id" :to="{ name: 'ProvinceEdit', params: { provinceId: province.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.edit')"></span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./province-details.component.ts"></script>
