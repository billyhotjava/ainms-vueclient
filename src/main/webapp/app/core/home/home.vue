<template>
  <div class="home row">
    <div class="col-md-12" v-if="authenticated">
      <div ref="chartRef" :option="option" style="width: 1200px;height:400px;"></div>
    </div>
  </div>
</template>

<script lang="ts" src="./home.component.ts"></script>
