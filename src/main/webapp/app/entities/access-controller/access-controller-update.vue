<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="ainmsVueclientApp.accessController.home.createOrEditLabel"
          data-cy="AccessControllerCreateUpdateHeading"
          v-text="t$('ainmsVueclientApp.accessController.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="accessController.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="accessController.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('ainmsVueclientApp.accessController.nedn')" for="access-controller-nedn"></label>
            <input
              type="text"
              class="form-control"
              name="nedn"
              id="access-controller-nedn"
              data-cy="nedn"
              :class="{ valid: !v$.nedn.$invalid, invalid: v$.nedn.$invalid }"
              v-model="v$.nedn.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('ainmsVueclientApp.accessController.neid')" for="access-controller-neid"></label>
            <input
              type="number"
              class="form-control"
              name="neid"
              id="access-controller-neid"
              data-cy="neid"
              :class="{ valid: !v$.neid.$invalid, invalid: v$.neid.$invalid }"
              v-model.number="v$.neid.$model"
            />
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
          <div class="form-group">
            <label class="form-control-label" v-text="t$('ainmsVueclientApp.accessController.nename')" for="access-controller-nename"></label>
            <input
              type="text"
              class="form-control"
              name="nename"
              id="access-controller-nename"
              data-cy="nename"
              :class="{ valid: !v$.nename.$invalid, invalid: v$.nename.$invalid }"
              v-model="v$.nename.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('ainmsVueclientApp.accessController.necategory')"
              for="access-controller-necategory"
            ></label>
            <input
              type="text"
              class="form-control"
              name="necategory"
              id="access-controller-necategory"
              data-cy="necategory"
              :class="{ valid: !v$.necategory.$invalid, invalid: v$.necategory.$invalid }"
              v-model="v$.necategory.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('ainmsVueclientApp.accessController.netype')" for="access-controller-netype"></label>
            <input
              type="text"
              class="form-control"
              name="netype"
              id="access-controller-netype"
              data-cy="netype"
              :class="{ valid: !v$.netype.$invalid, invalid: v$.netype.$invalid }"
              v-model="v$.netype.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('ainmsVueclientApp.accessController.nevendorname')"
              for="access-controller-nevendorname"
            ></label>
            <input
              type="text"
              class="form-control"
              name="nevendorname"
              id="access-controller-nevendorname"
              data-cy="nevendorname"
              :class="{ valid: !v$.nevendorname.$invalid, invalid: v$.nevendorname.$invalid }"
              v-model="v$.nevendorname.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('ainmsVueclientApp.accessController.neesn')" for="access-controller-neesn"></label>
            <input
              type="text"
              class="form-control"
              name="neesn"
              id="access-controller-neesn"
              data-cy="neesn"
              :class="{ valid: !v$.neesn.$invalid, invalid: v$.neesn.$invalid }"
              v-model="v$.neesn.$model"
            />
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
            <label class="form-control-label" v-text="t$('ainmsVueclientApp.accessController.nemac')" for="access-controller-nemac"></label>
            <input
              type="text"
              class="form-control"
              name="nemac"
              id="access-controller-nemac"
              data-cy="nemac"
              :class="{ valid: !v$.nemac.$invalid, invalid: v$.nemac.$invalid }"
              v-model="v$.nemac.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('ainmsVueclientApp.accessController.version')" for="access-controller-version"></label>
            <input
              type="text"
              class="form-control"
              name="version"
              id="access-controller-version"
              data-cy="version"
              :class="{ valid: !v$.version.$invalid, invalid: v$.version.$invalid }"
              v-model="v$.version.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('ainmsVueclientApp.accessController.nestate')" for="access-controller-nestate"></label>
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
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('ainmsVueclientApp.accessController.createtime')"
              for="access-controller-createtime"
            ></label>
            <input
              type="text"
              class="form-control"
              name="createtime"
              id="access-controller-createtime"
              data-cy="createtime"
              :class="{ valid: !v$.createtime.$invalid, invalid: v$.createtime.$invalid }"
              v-model="v$.createtime.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('ainmsVueclientApp.accessController.neiptype')"
              for="access-controller-neiptype"
            ></label>
            <input
              type="number"
              class="form-control"
              name="neiptype"
              id="access-controller-neiptype"
              data-cy="neiptype"
              :class="{ valid: !v$.neiptype.$invalid, invalid: v$.neiptype.$invalid }"
              v-model.number="v$.neiptype.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('ainmsVueclientApp.accessController.subnet')" for="access-controller-subnet"></label>
            <input
              type="text"
              class="form-control"
              name="subnet"
              id="access-controller-subnet"
              data-cy="subnet"
              :class="{ valid: !v$.subnet.$invalid, invalid: v$.subnet.$invalid }"
              v-model="v$.subnet.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('ainmsVueclientApp.accessController.neosversion')"
              for="access-controller-neosversion"
            ></label>
            <input
              type="text"
              class="form-control"
              name="neosversion"
              id="access-controller-neosversion"
              data-cy="neosversion"
              :class="{ valid: !v$.neosversion.$invalid, invalid: v$.neosversion.$invalid }"
              v-model="v$.neosversion.$model"
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
<script lang="ts" src="./access-controller-update.component.ts"></script>
