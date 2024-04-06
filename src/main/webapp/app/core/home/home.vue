<template>
  <div class="home row">
    <div class="col-md-12" v-if="authenticated">
      <!-- <div ref="chartContainer" style="width: 1600px; height:400px;"></div> -->
      <div ref="chartContainer" style="width: 100%; height: 400px;"></div>

    </div>
  </div>
</template>

<script lang="ts" src="./home.component.ts"></script>
