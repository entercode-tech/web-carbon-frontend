<script>
import axios from 'axios';

// Components
import SectionMain from '@/components/SectionMain.vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// Layout
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'

export default {
  data() {
    return {
      apiDomain: import.meta.env.VITE_API_URL,
      dataUser: [],
      dataDonation: [],
      totalAmountDonation: 0,
      totalAmountTransaction: 0,
      dataTransaction: [],
      chartData: {
        labels: [],
        datasets: []
      },
      chartOptions: {
        responsive: true
      }
    };
  },
  components: {
    SectionMain,
    Bar,
    LayoutAuthenticated,
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const token = localStorage.getItem('access_token');
        const responseUser = await axios.get(`${this.apiDomain}/api/v1/guests`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (responseUser.status === 200) {
          const dataUs = responseUser.data.data;
          this.dataUser = dataUs;

          const monthCounts = {};

          // Mengelompokkan data berdasarkan bulan dan menghitung jumlah data per bulan
          dataUs.forEach(item => {
            const date = new Date(item.created_at);
            const month = date.toLocaleString('en-US', { month: 'long' }); // Mengambil nama bulan

            if (!monthCounts[month]) {
              monthCounts[month] = 0;
            }

            monthCounts[month]++;
          });

          // Membuat array labels dan datasets berdasarkan data yang sudah dihitung
          const labels = Object.keys(monthCounts);
          const datasets = [{ data: Object.values(monthCounts) }];

          // Membangun model data untuk Vue
          const chartData = { labels, datasets };
          this.chartData = chartData
        } else {
          console.error('Failed to fetch data users');
        }

        const responseDonation = await axios.get(`${this.apiDomain}/api/v1/donations`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (responseDonation.status === 200) {
          const dataDon = responseDonation.data.data;
          this.dataDonation = dataDon;

          let totalDonation = 0;
          for (const donation of dataDon) {
            totalDonation += parseInt(donation.amount);
          }

          const formattedTotalDonation = totalDonation.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });

          this.totalAmountDonation = formattedTotalDonation;
        } else {
          console.error('Failed to fetch data donation');
        }

        const responseTransaction = await axios.get(`${this.apiDomain}/api/v1/transactions`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (responseTransaction.status === 200) {
          const dataTrans = responseTransaction.data.data;
          this.dataTransaction = dataTrans;

          let totalTransaction = 0;
          for (const transactions of dataTrans) {
            totalTransaction += parseInt(transactions.amount);
          }

          const formattedTotalTransaction = totalTransaction.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });

          this.totalAmountTransaction = formattedTotalTransaction;
        } else {
          console.error('Failed to fetch data transactions');
        }
      } catch (error) {
        console.error('An error occurred while fetching dataUser:', error);
      }
    }
  }
};
</script>


<template>
  <LayoutAuthenticated>
    <SectionMain>
      <h1 class="text-xl md:text-3xl font-semibold">
        Dashboard
      </h1>

      <div class="grid grid-cols-3 gap-4 mt-4">
        <div class="border-[1px] border-[#cccccc] rounded-md p-4 mt-6">
          <p class="font-normal text-md">Total User</p>
          <h1 class="font-bold text-2xl">{{ dataUser.length }}</h1>
        </div>
        <div class="border-[1px] border-[#cccccc] rounded-md p-4 mt-6">
          <p class="font-normal text-md">Total Donation</p>
          <h1 class="font-bold text-2xl">{{ totalAmountDonation }}</h1>
        </div>
        <div class="border-[1px] border-[#cccccc] rounded-md p-4 mt-6">
          <p class="font-normal text-md">Total Transaction</p>
          <h1 class="font-bold text-2xl">{{ totalAmountTransaction }}</h1>
        </div>
      </div>

      <div class="mt-10">
        <h1 class="font-bold text-2xl">Chart User</h1>
        <Bar
          id="my-chart-id"
          :options="chartOptions"
          :data="chartData"
        />
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
