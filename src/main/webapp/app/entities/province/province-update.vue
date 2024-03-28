<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="ainmsVueclientApp.province.home.createOrEditLabel"
          data-cy="ProvinceCreateUpdateHeading"
        >创建或编辑省份</h2>
        <div>
          <div class="form-group" v-if="province.id">
            <label >省份id</label>
            <input type="text" class="form-control" id="id" name="id" v-model="province.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label"  for="province-provinceCode">省份编码</label>
            <input
              type="number"
              class="form-control"
              name="provinceCode"
              id="province-provinceCode"
              data-cy="provinceCode"
              :class="{ valid: !v$.provinceCode.$invalid, invalid: v$.provinceCode.$invalid }"
              v-model.number="v$.provinceCode.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label"  for="province-provinceName">省份名称</label>
            <input
              type="text"
              class="form-control"
              name="provinceName"
              id="province-provinceName"
              data-cy="provinceName"
              :class="{ valid: !v$.provinceName.$invalid, invalid: v$.provinceName.$invalid }"
              v-model="v$.provinceName.$model"
            />
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
<script lang="ts" src="./province-update.component.ts"></script>
