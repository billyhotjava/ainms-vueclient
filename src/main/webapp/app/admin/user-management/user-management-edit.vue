<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" v-if="userAccount">
        <h2 id="myUserLabel" v-text="t$('userManagement.home.createOrEditLabel')"></h2>
        <div>
          <div class="form-group" :hidden="!userAccount.id">
            <label v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" name="id" v-model="userAccount.id" readonly />
          </div>

          <div class="form-group">
            <label class="form-control-label" v-text="t$('userManagement.login')"></label>
            <input type="text" class="form-control" name="login"
              :class="{ valid: !v$.userAccount.login.$invalid, invalid: v$.userAccount.login.$invalid }"
              v-model="v$.userAccount.login.$model" />

            <div v-if="v$.userAccount.login.$anyDirty && v$.userAccount.login.$invalid">
              <small class="form-text text-danger" v-if="!v$.userAccount.login.required"
                v-text="t$('entity.validation.required')"></small>

              <small class="form-text text-danger" v-if="!v$.userAccount.login.maxLength"
                v-text="t$('entity.validation.maxlength', { max: 50 })"></small>

              <small class="form-text text-danger" v-if="!v$.userAccount.login.pattern"
                v-text="t$('entity.validation.patternLogin')"></small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="firstName" v-text="t$('userManagement.firstName')"></label>
            <input type="text" class="form-control" id="firstName" name="firstName"
              v-bind:placeholder="t$('settings.form[\'firstname.placeholder\']')"
              :class="{ valid: !v$.userAccount.firstName.$invalid, invalid: v$.userAccount.firstName.$invalid }"
              v-model="v$.userAccount.firstName.$model" />
            <div v-if="v$.userAccount.firstName.$anyDirty && v$.userAccount.firstName.$invalid">
              <small class="form-text text-danger" v-if="!v$.userAccount.firstName.maxLength"
                v-text="t$('entity.validation.maxlength', { max: 50 })"></small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="lastName" v-text="t$('userManagement.lastName')"></label>
            <input type="text" class="form-control" id="lastName" name="lastName"
              v-bind:placeholder="t$('settings.form[\'lastname.placeholder\']')"
              :class="{ valid: !v$.userAccount.lastName.$invalid, invalid: v$.userAccount.lastName.$invalid }"
              v-model="v$.userAccount.lastName.$model" />
            <div v-if="v$.userAccount.lastName.$anyDirty && v$.userAccount.lastName.$invalid">
              <small class="form-text text-danger" v-if="!v$.userAccount.lastName.maxLength"
                v-text="t$('entity.validation.maxlength', { max: 50 })"></small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="email" v-text="t$('userManagement.email')"></label>
            <input type="email" class="form-control" id="email" name="email"
              v-bind:placeholder="t$('global.form[\'email.placeholder\']')"
              :class="{ valid: !v$.userAccount.email.$invalid, invalid: v$.userAccount.email.$invalid }"
              v-model="v$.userAccount.email.$model" email />
            <div v-if="v$.userAccount.email.$anyDirty && v$.userAccount.email.$invalid">
              <small class="form-text text-danger" v-if="!v$.userAccount.email.required"
                v-text="t$('global.messages.validate.email.required')"></small>
              <small class="form-text text-danger" v-if="!v$.userAccount.email.email"
                v-text="t$('global.messages.validate.email.invalid')"></small>
              <small class="form-text text-danger" v-if="!v$.userAccount.email.minLength"
                v-text="t$('global.messages.validate.email.minlength')"></small>
              <small class="form-text text-danger" v-if="!v$.userAccount.email.maxLength"
                v-text="t$('global.messages.validate.email.maxlength')"></small>
            </div>
          </div>
          <!-- // province -->
          <div class="form-group" v-if="provinces ">
            <label for="province" v-text="t$('userManagement.province')"></label>
            <select class="form-control" id="provinceId" name="provinceId" v-model="userAccount.provinceId" v-on:change="getPlantsfromProvinceid(userAccount.provinceId)">

              <option v-bind:value="null"></option>
              <!-- <option 
                v-bind:value="provinceOption.id && provinceOption.id === userAccount.province.id? userAccount.province : provinceOption"
                v-for="provinceOption in provinces"
                :key="provinceOption.id"
              >
                {{ provinceOption.provinceName }}
              </option> -->
              <option v-bind:value="provinceOption.id" v-for="provinceOption in provinces" :key="provinceOption.id">
                {{ provinceOption.provinceName }}
              </option>
            </select>
          </div>
          <!-- //plantt -->
          <div class="form-group" >
            <label for="plantId" v-text="t$('userManagement.plant')"></label>
            <select class="form-control" id="plantId" name="plantId" v-model="userAccount.plantId">

              <option v-bind:value="0"></option>
              <option v-bind:value="plantOption.powerPlantId" v-for="plantOption in plants" :key="plantOption.powerPlantId">
                {{ plantOption.powerPlantName }}
              </option>
            </select>
          </div>

          <div class="form-group" v-if="languages && Object.keys(languages).length > 0">
            <label for="langKey" v-text="t$('userManagement.langKey')"></label>
            <select class="form-control" id="langKey" name="langKey" v-model="userAccount.langKey">
              <option v-for="(language, key) in languages" :value="key" :key="key">{{ language.name }}</option>
            </select>
          </div>
          <div class="form-group">
            <label v-text="t$('userManagement.profiles')"></label>
            <select class="form-control" multiple name="authority" v-model="userAccount.authorities">
              <option v-for="authority of authorities" :value="authority" :key="authority">{{ authority }}</option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.cancel')"></span>
          </button>
          <button type="submit" :disabled="v$.userAccount.$invalid || isSaving" class="btn btn-primary">
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.save')"></span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" src="./user-management-edit.component.ts"></script>
