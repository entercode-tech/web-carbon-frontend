<script>
import axios from 'axios';

// Components
import SectionMain from '@/components/SectionMain.vue'

// Layout
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'

export default {
  data() {
    return {
      apiDomain: import.meta.env.VITE_API_URL,
      dataUser: []
    };
  },
  components: {
    SectionMain,
    LayoutAuthenticated,
  },
  created() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(`${this.apiDomain}/api/v1/guests`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          this.dataUser = response.data.data;
        } else {
          console.error('Failed to fetch dataUser');
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
        List User
      </h1>

      <div class="border-[1px] border-[#cccccc] rounded-md p-4 mt-6">
        <table class="table-auto">
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in dataUser" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ user.first_name }} {{ user.last_name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.location }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
