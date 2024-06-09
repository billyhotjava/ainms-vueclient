<template>
  <div class="statistics table row" v-if='authenticated'>
    <div class="col-md-12">
      <div class="card jh-card">
        <div class="card-header">
          <span class="float-right" v-text="t$('home.apStistics.online')"></span >
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-12">
              <!-- <div ref="tableContainer" style="width: 100%; height: 500px;"></div> -->
              <div ref="chartContainer" style="width: 100%; height: 500px;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--  disable statis part -->
  <!--
  <div class="statistics row" v-if='authenticated'>
    <div class="col-md-12">
      <div class="card jh-card">
        <div class="card-body">
          <div class="row">
            <div class="col-md-6">
              <div class="card jh-card">
                <div class="card-header">
                  <span class="float-left" v-text="t$('home.apStistics.byProvince')"></span>&nbsp;&nbsp;
                  <button @click="downloadCsvByProvince"><span v-text="t$('home.apStistics.downloadAsCSV')"></span></button>
                </div>
                <div class="card-body">
                  <div class="col-md-12">
                    <table class="table">
                      <thead>
                        <tr>
                          <th><span v-text="t$('home.apStistics.province')"></span></th>
                          <th><span v-text="t$('home.apStistics.total')"></span></th>
                          <th><span v-text="t$('home.apStistics.standby')"></span></th>
                          <th><span v-text="t$('home.apStistics.offline')"></span></th>
                          <th><span v-text="t$('home.apStistics.other')"></span></th>
                          <th><span v-text="t$('home.apStistics.rate')"></span></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="apStatisticsByProvince in apStatisticsByProvinces" :key="apStatisticsByProvince.provinceId" data-cy="entityTable">
                          <td class="custom-font-size">{{ apStatisticsByProvince.provinceName}}</td>
                          <td class="custom-font-size">{{ apStatisticsByProvince.totalAPs}}</td>
                          <td class="custom-font-size">{{ apStatisticsByProvince.standByAPCount}}</td>
                          <td class="custom-font-size">{{ apStatisticsByProvince.offlineAPCount}}</td>
                          <td class="custom-font-size">{{ apStatisticsByProvince.otherAPCount}}</td>
                          <td class="custom-font-size">
                            {{ 
                            ((apStatisticsByProvince.standByAPCount / apStatisticsByProvince.totalAPs) * 100).toFixed(1) + '%'
                            }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card jh-card">
                <div class="card-header">
                  <span class="float-left" v-text="t$('home.apStistics.byPowerPlant')"></span>&nbsp;&nbsp;
                  <button @click="downloadCsvByPowerPlant"><span v-text="t$('home.apStistics.downloadAsCSV')"></span></button>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12">
                      <table class="table">
                      <thead>
                        <tr>
                          <th><span class="custom-header-font-size" v-text="t$('home.apStistics.powerplant')"></span></th>
                          <th><span class="custom-header-font-size" v-text="t$('home.apStistics.total')"></span></th>
                          <th><span class="custom-header-font-size" v-text="t$('home.apStistics.standby')"></span></th>
                          <th><span class="custom-header-font-size" v-text="t$('home.apStistics.offline')"></span></th>
                          <th><span class="custom-header-font-size" v-text="t$('home.apStistics.other')"></span></th>
                          <th><span class="custom-header-font-size" v-text="t$('home.apStistics.rate')"></span></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="apStatisticsByPowerPlant in apStatisticsByPowerPlants" :key="apStatisticsByPowerPlant.province">
                          <td class="custom-font-size">{{ apStatisticsByPowerPlant.powerPlantName}}</td>
                          <td class="custom-font-size">{{ apStatisticsByPowerPlant.totalAPs}}</td>
                          <td class="custom-font-size">{{ apStatisticsByPowerPlant.standByAPCount}}</td>
                          <td class="custom-font-size">{{ apStatisticsByPowerPlant.offlineAPCount}}</td>
                          <td class="custom-font-size">{{ apStatisticsByPowerPlant.otherAPCount}}</td>
                          <td class="custom-font-size">
                            {{ 
                            ((apStatisticsByPowerPlant.standByAPCount / apStatisticsByPowerPlant.totalAPs) * 100).toFixed(1) + '%'
                            }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
-->

</template>

<script lang="ts" src="./home.component.ts"></script>

<style>
.custom-font-size {
  font-size: 14px;
}

.custom-header-font-size {
  font-size: 16px;
}
</style>