<template>
  <div>
    <b-dropdown-item to="/access-controller">
      <font-awesome-icon icon="asterisk" />
      <span v-text="t$('global.menu.entities.accessController')"></span>
    </b-dropdown-item>
    <b-dropdown-item to="/access-point">
      <font-awesome-icon icon="asterisk" />
      <span v-text="t$('global.menu.entities.accessPoint')"></span>
    </b-dropdown-item>
    <b-dropdown-item to="/access-point-group">
      <font-awesome-icon icon="asterisk" />
      <span v-text="t$('global.menu.entities.accessPointGroup')"></span>
    </b-dropdown-item>
    <b-dropdown-item to="/power-plant">
      <font-awesome-icon icon="asterisk" />
      <span v-text="t$('global.menu.entities.powerPlant')"></span>
    </b-dropdown-item>
    <b-dropdown-item to="/province">
      <font-awesome-icon icon="asterisk" />
      <span v-text="t$('global.menu.entities.province')"></span>
    </b-dropdown-item>
    <!-- <b-dropdown-item to="/province-stistics">
      <font-awesome-icon icon="asterisk" />
      <span v-text="t$('global.menu.entities.provinceStistics')"></span>
    </b-dropdown-item>
    <b-dropdown-item to="/power-plant-stistics">
      <font-awesome-icon icon="asterisk" />
      <span v-text="t$('global.menu.entities.powerPlantStistics')"></span>
    </b-dropdown-item> -->
  </div>
</template>

<script lang="ts" src="./entities-menu.component.ts"></script>
