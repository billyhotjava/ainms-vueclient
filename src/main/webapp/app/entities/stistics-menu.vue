<template>
  <div>
    <b-dropdown-item to="/province-stistics">
      <font-awesome-icon icon="asterisk" />
      <span v-text="t$('global.menu.entities.provinceStistics')"></span>
    </b-dropdown-item>
    <b-dropdown-item to="/power-plant-stistics">
      <font-awesome-icon icon="asterisk" />
      <span v-text="t$('global.menu.entities.powerPlantStistics')"></span>
    </b-dropdown-item>
    <!-- jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here -->
  </div>
</template>

<script lang="ts" src="./stistics-menu.component.ts"></script>
