<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="ainmsVueclientApp.accessPointGroup.home.createOrEditLabel"
          data-cy="AccessPointGroupCreateUpdateHeading"
        >创建或编辑AP组</h2>
        <div>
          <div class="form-group" v-if="accessPointGroup.id">
            <label for="id" >ID编号</label>
            <input type="text" class="form-control" id="id" name="id" v-model="accessPointGroup.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="access-point-group-name">AP组名称</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="access-point-group-name"
              data-cy="name"
              :class="{ valid: !v$.name.$invalid, invalid: v$.name.$invalid }"
              v-model="v$.name.$model"
              required
            />
            <div v-if="v$.name.$anyDirty && v$.name.$invalid">
              <small class="form-text text-danger" v-for="error of v$.name.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              for="access-point-group-controller"
            >所属AC</label>
            <select
              class="form-control"
              id="access-point-group-controller"
              data-cy="controller"
              name="controller"
              v-model="accessPointGroup.controller"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  accessPointGroup.controller && accessControllerOption.id === accessPointGroup.controller.id
                    ? accessPointGroup.controller
                    : accessControllerOption
                "
                v-for="accessControllerOption in accessControllers"
                :key="accessControllerOption.id"
              >
                {{ accessControllerOption.aliasname }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              for="access-point-group-powerPlant"
            >所属场站</label>
            <select
              class="form-control"
              id="access-point-group-powerPlant"
              data-cy="powerPlant"
              name="powerPlant"
              v-model="accessPointGroup.powerPlant"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  accessPointGroup.powerPlant && powerPlantOption.id === accessPointGroup.powerPlant.id
                    ? accessPointGroup.powerPlant
                    : powerPlantOption
                "
                v-for="powerPlantOption in powerPlants"
                :key="powerPlantOption.id"
              >
                {{ powerPlantOption.powerPlant.powerPlantName}}
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
<script lang="ts" src="./access-point-group-update.component.ts"></script>
