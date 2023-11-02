<script>
import axios from 'axios';

// Components
import SectionMain from '@/components/SectionMain.vue'
import ModalPopup from '@/components/Modal/Modal.vue'

// Layout
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'

export default {
  data() {
    return {
      apiDomain: import.meta.env.VITE_API_URL,
      modalShow: false,
      fileSelect: '',
      dataUser: []
    };
  },
  components: {
    SectionMain,
    LayoutAuthenticated,
    ModalPopup
  },
  created() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(`${this.apiDomain}/api/v1/donations`, {
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
    },
    openModal(){
      this.modalShow = !this.modalShow
    },
    onSelect(e){
      this.fileSelect = e
      this.openModal()
    }
  }
};
</script>


<template>
  <LayoutAuthenticated>
    <SectionMain>
      <h1 class="text-xl md:text-3xl font-semibold">
        List Donation
      </h1>

      <div class="border-[1px] border-[#cccccc] rounded-md p-4 mt-6">
        <table class="table-auto">
          <thead>
            <tr>
              <th>#</th>
              <th>Order Id</th>
              <th>Donor</th>
              <th>Email</th>
              <th>Location</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Post Card</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in dataUser" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ user.order_id }}</td>
              <td>{{ user.guest.first_name }} {{ user.guest.last_name }}</td>
              <td>{{ user.guest.email }}</td>
              <td>{{ user.guest.location }}</td>
              <td>{{ user.amount }}</td>
              <td>{{ user.status }}</td>
              <td>
                <button class="bg-[#476b6b] text-white px-8 py-2 rounded-md font-medium hover:bg-[#223d3d] transition duration-300 ease-in-out" @click="onSelect(user.postcard.file_carbon_path)">
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </SectionMain>
    <ModalPopup :show="modalShow">
      <div class="p-4">
        <img :src="fileSelect" alt="Photo Postcard">
        <div class="flex mt-8 justify-end">
          <button @click="openModal" class="bg-red-500 text-white px-4 py-2 mr-3 rounded">Close</button>
        </div>
      </div>
    </ModalPopup>
  </LayoutAuthenticated>
</template>
