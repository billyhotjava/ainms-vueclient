<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="ainmsVueclientApp.provinceStistics.home.createOrEditLabel"
          v-text="t$('ainmsVueclientApp.provinceStistics.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="provinceStistics.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="provinceStistics.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('ainmsVueclientApp.provinceStistics.name')" for="province-stistics-name"></label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="province-stistics-name"
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
              v-text="t$('ainmsVueclientApp.provinceStistics.totalCount')"
              for="province-stistics-totalCount"
            ></label>
            <input
              type="number"
              class="form-control"
              name="totalCount"
              id="province-stistics-totalCount"
              data-cy="totalCount"
              :class="{ valid: !v$.totalCount.$invalid, invalid: v$.totalCount.$invalid }"
              v-model.number="v$.totalCount.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('ainmsVueclientApp.provinceStistics.onlineCount')"
              for="province-stistics-onlineCount"
            ></label>
            <input
              type="number"
              class="form-control"
              name="onlineCount"
              id="province-stistics-onlineCount"
              data-cy="onlineCount"
              :class="{ valid: !v$.onlineCount.$invalid, invalid: v$.onlineCount.$invalid }"
              v-model.number="v$.onlineCount.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('ainmsVueclientApp.provinceStistics.offlineCount')"
              for="province-stistics-offlineCount"
            ></label>
            <input
              type="number"
              class="form-control"
              name="offlineCount"
              id="province-stistics-offlineCount"
              data-cy="offlineCount"
              :class="{ valid: !v$.offlineCount.$invalid, invalid: v$.offlineCount.$invalid }"
              v-model.number="v$.offlineCount.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('ainmsVueclientApp.provinceStistics.otherCount')"
              for="province-stistics-otherCount"
            ></label>
            <input
              type="number"
              class="form-control"
              name="otherCount"
              id="province-stistics-otherCount"
              data-cy="otherCount"
              :class="{ valid: !v$.otherCount.$invalid, invalid: v$.otherCount.$invalid }"
              v-model.number="v$.otherCount.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('ainmsVueclientApp.provinceStistics.statisticDate')"
              for="province-stistics-statisticDate"
            ></label>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="province-stistics-statisticDate"
                  v-model="v$.statisticDate.$model"
                  name="statisticDate"
                  class="form-control"
                  :locale="currentLanguage"
                  button-only
                  today-button
                  reset-button
                  close-button
                >
                </b-form-datepicker>
              </b-input-group-prepend>
              <b-form-input
                id="province-stistics-statisticDate"
                data-cy="statisticDate"
                type="text"
                class="form-control"
                name="statisticDate"
                :class="{ valid: !v$.statisticDate.$invalid, invalid: v$.statisticDate.$invalid }"
                v-model="v$.statisticDate.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('ainmsVueclientApp.provinceStistics.statisticTime')"
              for="province-stistics-statisticTime"
            ></label>
            <div class="d-flex">
              <input
                id="province-stistics-statisticTime"
                data-cy="statisticTime"
                type="datetime-local"
                class="form-control"
                name="statisticTime"
                :class="{ valid: !v$.statisticTime.$invalid, invalid: v$.statisticTime.$invalid }"
                :value="convertDateTimeFromServer(v$.statisticTime.$model)"
                @change="updateInstantField('statisticTime', $event)"
              />
            </div>

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
<script lang="ts" src="./province-stistics-update.component.ts"></script>
