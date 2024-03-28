<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="ainmsVueclientApp.accessPoint.home.createOrEditLabel"
          data-cy="AccessPointCreateUpdateHeading"
          v-text="t$('ainmsVueclientApp.accessPoint.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="accessPoint.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="accessPoint.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('ainmsVueclientApp.accessPoint.nedn')" for="access-point-nedn"></label>
            <input
              type="text"
              class="form-control"
              name="nedn"
              id="access-point-nedn"
              data-cy="nedn"
              :class="{ valid: !v$.nedn.$invalid, invalid: v$.nedn.$invalid }"
              v-model="v$.nedn.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('ainmsVueclientApp.accessPoint.neid')" for="access-point-neid"></label>
            <input
              type="number"
              class="form-control"
              name="neid"
              id="access-point-neid"
              data-cy="neid"
              :class="{ valid: !v$.neid.$invalid, invalid: v$.neid.$invalid }"
              v-model.number="v$.neid.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('ainmsVueclientApp.accessPoint.aliasname')" for="access-point-aliasname"></label>
            <input
              type="text"
              class="form-control"
              name="aliasname"
              id="access-point-aliasname"
              data-cy="aliasname"
              :class="{ valid: !v$.aliasname.$invalid, invalid: v$.aliasname.$invalid }"
              v-model="v$.aliasname.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('ainmsVueclientApp.accessPoint.nename')" for="access-point-nename"></label>
            <input
              type="text"
              class="form-control"
              name="nename"
              id="access-point-nename"
              data-cy="nename"
              :class="{ valid: !v$.nename.$invalid, invalid: v$.nename.$invalid }"
              v-model="v$.nename.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('ainmsVueclientApp.accessPoint.necategory')" for="access-point-necategory"></label>
            <input
              type="text"
              class="form-control"
              name="necategory"
              id="access-point-necategory"
              data-cy="necategory"
              :class="{ valid: !v$.necategory.$invalid, invalid: v$.necategory.$invalid }"
              v-model="v$.necategory.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('ainmsVueclientApp.accessPoint.netype')" for="access-point-netype"></label>
            <input
              type="text"
              class="form-control"
              name="netype"
              id="access-point-netype"
              data-cy="netype"
              :class="{ valid: !v$.netype.$invalid, invalid: v$.netype.$invalid }"
              v-model="v$.netype.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('ainmsVueclientApp.accessPoint.nevendorname')"
              for="access-point-nevendorname"
            ></label>
            <input
              type="text"
              class="form-control"
              name="nevendorname"
              id="access-point-nevendorname"
              data-cy="nevendorname"
              :class="{ valid: !v$.nevendorname.$invalid, invalid: v$.nevendorname.$invalid }"
              v-model="v$.nevendorname.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('ainmsVueclientApp.accessPoint.neesn')" for="access-point-neesn"></label>
            <input
              type="text"
              class="form-control"
              name="neesn"
              id="access-point-neesn"
              data-cy="neesn"
              :class="{ valid: !v$.neesn.$invalid, invalid: v$.neesn.$invalid }"
              v-model="v$.neesn.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('ainmsVueclientApp.accessPoint.neip')" for="access-point-neip"></label>
            <input
              type="text"
              class="form-control"
              name="neip"
              id="access-point-neip"
              data-cy="neip"
              :class="{ valid: !v$.neip.$invalid, invalid: v$.neip.$invalid }"
              v-model="v$.neip.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('ainmsVueclientApp.accessPoint.nemac')" for="access-point-nemac"></label>
            <input
              type="text"
              class="form-control"
              name="nemac"
              id="access-point-nemac"
              data-cy="nemac"
              :class="{ valid: !v$.nemac.$invalid, invalid: v$.nemac.$invalid }"
              v-model="v$.nemac.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('ainmsVueclientApp.accessPoint.version')" for="access-point-version"></label>
            <input
              type="text"
              class="form-control"
              name="version"
              id="access-point-version"
              data-cy="version"
              :class="{ valid: !v$.version.$invalid, invalid: v$.version.$invalid }"
              v-model="v$.version.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('ainmsVueclientApp.accessPoint.nestate')" for="access-point-nestate"></label>
            <input
              type="number"
              class="form-control"
              name="nestate"
              id="access-point-nestate"
              data-cy="nestate"
              :class="{ valid: !v$.nestate.$invalid, invalid: v$.nestate.$invalid }"
              v-model.number="v$.nestate.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('ainmsVueclientApp.accessPoint.createtime')" for="access-point-createtime"></label>
            <input
              type="text"
              class="form-control"
              name="createtime"
              id="access-point-createtime"
              data-cy="createtime"
              :class="{ valid: !v$.createtime.$invalid, invalid: v$.createtime.$invalid }"
              v-model="v$.createtime.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('ainmsVueclientApp.accessPoint.neiptype')" for="access-point-neiptype"></label>
            <input
              type="number"
              class="form-control"
              name="neiptype"
              id="access-point-neiptype"
              data-cy="neiptype"
              :class="{ valid: !v$.neiptype.$invalid, invalid: v$.neiptype.$invalid }"
              v-model.number="v$.neiptype.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('ainmsVueclientApp.accessPoint.subnet')" for="access-point-subnet"></label>
            <input
              type="text"
              class="form-control"
              name="subnet"
              id="access-point-subnet"
              data-cy="subnet"
              :class="{ valid: !v$.subnet.$invalid, invalid: v$.subnet.$invalid }"
              v-model="v$.subnet.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('ainmsVueclientApp.accessPoint.neosversion')"
              for="access-point-neosversion"
            ></label>
            <input
              type="text"
              class="form-control"
              name="neosversion"
              id="access-point-neosversion"
              data-cy="neosversion"
              :class="{ valid: !v$.neosversion.$invalid, invalid: v$.neosversion.$invalid }"
              v-model="v$.neosversion.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('ainmsVueclientApp.accessPoint.group')" for="access-point-group"></label>
            <select class="form-control" id="access-point-group" data-cy="group" name="group" v-model="accessPoint.group">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  accessPoint.group && accessPointGroupOption.id === accessPoint.group.id ? accessPoint.group : accessPointGroupOption
                "
                v-for="accessPointGroupOption in accessPointGroups"
                :key="accessPointGroupOption.id"
              >
                {{ accessPointGroupOption.id }}
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
<script lang="ts" src="./access-point-update.component.ts"></script>
