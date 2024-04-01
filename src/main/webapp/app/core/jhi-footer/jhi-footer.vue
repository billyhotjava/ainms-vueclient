<template>
  <div id="footer ly-footer" class="footer">
    <p v-text="t$('footer')"></p>
  </div>
</template>

<script lang="ts" src="./jhi-footer.component.ts"></script>

<style scoped>
.ly-footer{
  background-color: #353d47;
}

.footer {
  height: 10vh;
}

.footer p {
  text-align: center;
  line-height: 10vh;
}
</style>