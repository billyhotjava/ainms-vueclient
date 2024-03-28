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
    <!-- jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here -->
  </div>
</template>

<script lang="ts" src="./entities-menu.component.ts"></script>
