<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="accessPoint">
        <h2 class="jh-entity-heading" data-cy="accessPointDetailsHeading">
          <span >AP名称</span> {{ accessPoint.aliasname }}
        </h2>
        <div class="row">
        <dl class="col-md-6 jh-entity-details">
        <dt>
            <span >设备DN</span>
          </dt>
          <dd>
            <span>{{ accessPoint.nedn }}</span>
          </dd>
          <dt>
            <span>原厂设备ID序列号</span>
          </dt>
          <dd>
            <span>{{ accessPoint.neid }}</span>
          </dd>
          <dt>
            <span>设备所属网管名称</span>
          </dt>
          <dd>
            <span>{{ accessPoint.aliasname }}</span>
          </dd>
          <dt>
            <span >设备名称</span>
          </dt>
          <dd>
            <span>{{ accessPoint.nename }}</span>
          </dd>
          <dt>
            <span>设备分类</span>
          </dt>
          <dd>
            <span>{{ accessPoint.necategory }}</span>
          </dd>
          <dt>
            <span>设备类型</span>
          </dt>
          <dd>
            <span>{{ accessPoint.netype }}</span>
          </dd>
          <dt>
            <span>设备厂商ID</span>
          </dt>
          <dd>
            <span>{{ accessPoint.nevendorname }}</span>
          </dd>
          <dt>
            <span>设备序列号</span>
          </dt>
          <dd>
            <span>{{ accessPoint.neesn }}</span>
          </dd>
        </dl>
          
          <dl class="col-md-6 jh-entity-details">
          <dt>
            <span >IP地址</span>
          </dt>
          <dd>
            <span>{{ accessPoint.neip }}</span>
          </dd>
          <dt>
            <span>设备MAC</span>
          </dt>
          <dd>
            <span>{{ accessPoint.nemac }}</span>
          </dd>
          <dt>
            <span>设备版本</span>
          </dt>
          <dd>
            <span>{{ accessPoint.version }}</span>
          </dd>
          <dt>
            <span>设备状态</span>
          </dt>
          <dd>
            <span>{{ accessPoint.nestate }}</span>
          </dd>
          <dt>
            <span>创建时间</span>
          </dt>
          <dd>
            <span>{{ accessPoint.createtime }}</span>
          </dd>
          <dt>
            <span>IP地址类型</span>
          </dt>
          <dd>
            <span>{{ accessPoint.neiptype }}</span>
          </dd>
          <dt>
            <span>所属子网</span>
          </dt>
          <dd>
            <span>{{ accessPoint.subnet }}</span>
          </dd>
          <dt>
            <span>软件版本</span>
          </dt>
          <dd>
            <span>{{ accessPoint.neosversion }}</span>
          </dd>
          </dl>
        </div>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link
          v-if="accessPoint.id"
          :to="{ name: 'AccessPointEdit', params: { accessPointId: accessPoint.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.edit')"></span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./access-point-details.component.ts"></script>
<style scoped>
/* 使用scoped属性确保样式只适用于当前组件 */
.jh-entity-details {
  display: flex;
  flex-wrap: wrap; /* 如果子元素超出父元素的宽度，允许它们换行 */
}

.jh-entity-details dt,
.jh-entity-details dd {
  flex: 0 0 50%; /* 让dt和dd元素占据父元素的一半宽度 */
  padding: 5px; /* 可以根据需要调整内边距 */
}

/* 可以进一步调整样式以满足您的设计需求 */
</style>

