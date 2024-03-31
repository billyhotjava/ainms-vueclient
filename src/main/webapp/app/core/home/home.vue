<template>
 <div style="width: 100%;text-align: center;" v-if='authenticated'>
    <div style="width: 50%; display: inline-block; padding-left:160px">
        <div ref="chartRef_station" style="width: 700px; height: 600px;"></div>
    </div>
    <div style="width: 50%; display: inline-block;padding-left:160px">
        <div ref="chartRef_Ap" style="width: 600px; height: 600px;"></div>
    </div>
</div>
   <acc v-if='authenticated'></acc>
   <div v-if='!authenticated' class='ale'>请您点击右上角进行登录</div>
</template>

<script lang="ts" src="./home.component.ts"></script>
<style scop>
	.ale{

		margin:0 auto;
		font-size:20px
	}
</style>