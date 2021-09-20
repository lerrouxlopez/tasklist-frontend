<template>
  <div>
    <div class="mt-6">
      <h2>Welcome, {{ $auth.user.name }}</h2>
    </div>
    <div class="mt-8">
      <v-row>
        <v-col md="3" sm="6" cols="12">
          <v-card class="card-shadow">
            <div class="rectangle-1"></div>
            <div class="pa-6">
              <div class="body-2">Total Assigned</div>
              <div class="pt-3"><h1>123,987</h1></div>
            </div>
          </v-card>
        </v-col>
        <v-col md="3" sm="6" cols="12">
          <v-card class="card-shadow">
            <div class="rectangle-2"></div>
            <div class="pa-6">
              <div class="body-2">This Month's Completion</div>
              <div class="pt-3"><h1>100</h1></div>
            </div>
          </v-card>
        </v-col>
        <v-col md="3" sm="6" cols="12">
          <v-card class="card-shadow">
            <div class="rectangle-3"></div>
            <div class="pa-6">
              <div class="body-2">This Month's Pending</div>
              <div class="pt-3"><h1>123,987</h1></div>
            </div>
          </v-card>
        </v-col>
        <v-col md="3" sm="6" cols="12">
          <v-card class="card-shadow">
            <div class="rectangle-4"></div>
            <div class="pa-6">
              <div class="body-2">Assigned to you</div>
              <div class="pt-3"><h1>123,987</h1></div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div class="mt-6">
      <v-row>
        <v-col>
          <v-card class="card-shadow pa-6">
            <div><h3>Tasks Overview</h3></div>
            <apexchart
              type="bar"
              height="430"
              :options="barOptions"
              :series="barseries"
            ></apexchart>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    // return {}
    return {
      sales: 'This month (Apr 2021)',
      items: ['This month (Apr 2021)'],
      series: [50000, 10000, 5000],
      barseries: [
        {
          name: 'Completed',
          data: [44, 55, 41, 64, 22, 43, 21],
        },
        {
          name: 'Pending',
          data: [53, 32, 33, 52, 13, 44, 32],
        },
      ],
      barOptions: {
        chart: {
          type: 'bar',
          height: 430,
          toolbar: {
            show: false,
          },
        },
        colors: ['#4CC8DF', '#7257F6'],
        plotOptions: {
          bar: {
            vertical: true,
            dataLabels: {
              position: 'top',
            },
            columnWidth: '30%',
          },
        },
        legend: {
          position: 'top',
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['#fff'],
        },
        tooltip: {
          shared: true,
          intersect: false,
        },
        xaxis: {
          categories: [
            'Sept 2021',
            'Oct 2021',
            'Nov 2021',
            'Dec 2021',
            'Jan 2022',
            'Feb 2022',
            'Mar 2022',
          ],
        },
      },
    }
  },
  computed: {
    ...mapGetters(['loggedInUser']),
  },
}
</script>

<style>
.rectangle-1 {
  height: 4px;
  background: #2f80ed;
}
.rectangle-2 {
  height: 4px;
  background: #56ccf2;
}
.rectangle-3 {
  height: 4px;
  background: #9b51e0;
}
.rectangle-4 {
  height: 4px;
  background: #27ae60;
}
</style>
