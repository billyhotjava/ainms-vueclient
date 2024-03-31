<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="ainmsVueclientApp.powerPlant.home.createOrEditLabel"
          data-cy="PowerPlantCreateUpdateHeading"
        >创建或编辑场站</h2>
        <div>
          <div class="form-group" v-if="powerPlant.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="powerPlant.id" readonly />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              for="power-plant-powerPlantName"
            >场站名称</label>
            <input
              type="text"
              class="form-control"
              name="powerPlantName"
              id="power-plant-powerPlantName"
              data-cy="powerPlantName"
              :class="{ valid: !v$.powerPlantName.$invalid, invalid: v$.powerPlantName.$invalid }"
              v-model="v$.powerPlantName.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="power-plant-province">请选择省份</label>
            <select class="form-control" id="power-plant-province" data-cy="province" name="province" v-model="powerPlant.province">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="powerPlant.province && provinceOption.id === powerPlant.province.id ? powerPlant.province : provinceOption"
                v-for="provinceOption in provinces"
                :key="provinceOption.id"
              >
                {{ provinceOption.provinceName }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.cancel')"></span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="v$.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.save')"></span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./power-plant-update.component.ts"></script>
