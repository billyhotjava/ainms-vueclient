<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="ainmsVueclientApp.accessController.home.createOrEditLabel"
          data-cy="AccessControllerCreateUpdateHeading"
        >创建或修改AC</h2>
        <div>
          <div class="form-group" v-if="accessController.id">
            <label>AC编号</label>
            <input type="text" class="form-control" id="id" name="id" v-model="accessController.id" readonly />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('ainmsVueclientApp.accessController.aliasname')"
              for="access-controller-aliasname"
            ></label>
            <input
              type="text"
              class="form-control"
              name="aliasname"
              id="access-controller-aliasname"
              data-cy="aliasname"
              :class="{ valid: !v$.aliasname.$invalid, invalid: v$.aliasname.$invalid }"
              v-model="v$.aliasname.$model"
            />
          </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('ainmsVueclientApp.accessController.neip')" for="access-controller-neip"></label>
            <input
              type="text"
              class="form-control"
              name="neip"
              id="access-controller-neip"
              data-cy="neip"
              :class="{ valid: !v$.neip.$invalid, invalid: v$.neip.$invalid }"
              v-model="v$.neip.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('ainmsVueclientApp.accessController.nestate')"
              for="access-controller-nestate"
            ></label>
            <input
              type="number"
              class="form-control"
              name="nestate"
              id="access-controller-nestate"
              data-cy="nestate"
              :class="{ valid: !v$.nestate.$invalid, invalid: v$.nestate.$invalid }"
              v-model.number="v$.nestate.$model"
            />
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
<script lang="ts" src="./access-controller-update.component.ts"></script>
