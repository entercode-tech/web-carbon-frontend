<script>
import axios from 'axios';
import Swal from 'sweetalert2'

// Components
import SectionMain from '@/components/SectionMain.vue'
import InputDynamic from '@/components/Form/Input.vue'
import ModalPopup from '@/components/Modal/Modal.vue'

// Layout
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'

export default {
  data() {
    return {
      apiDomain: import.meta.env.VITE_API_URL,
      title: '',
      titleEdit: '',
      fileEdit: null,
      modalShow: false,
      file: null,
      fileList: [],
      setFile: null,
    };
  },
  components: {
    SectionMain,
    ModalPopup,
    InputDynamic,
    LayoutAuthenticated,
  },
  created() {
    this.fetchFileData();
  },
  methods: {
    async onSubmit() {
      try {
        let load = document.querySelector('.in-load')
        load.innerHTML += '<i class="ml-2 fa-solid fa-circle-notch load"></i>'
        const formData = new FormData();
        formData.append('name', this.title);
        formData.append('image', this.file);

        const token = localStorage.getItem('access_token');
        const response = await axios.post(`${this.apiDomain}/api/v1/postcard-templates`, formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          await this.fetchFileData()
          load.innerHTML = 'Submit'
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Data has been saved successfully',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              this.title = ''
              this.file = null
            }
          });
        } else {
          load.innerHTML = 'Submit'
          console.error('Failed to upload the file');
        }
      } catch (error) {
        console.error('An error occurred while uploading the file:', error);
      }
    },
    async fetchFileData() {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(`${this.apiDomain}/api/v1/postcard-templates`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          this.fileList = response.data.data;
        } else {
          console.error('Failed to fetch dataUser');
        }
      } catch (error) {
        console.error('An error occurred while fetching dataUser:', error);
      }
    },
    async onEdit() {
      try {
        const formData = new FormData();
        formData.append('name', this.titleEdit);
        if(this.fileEdit) formData.append('image', this.fileEdit);

        const token = localStorage.getItem('access_token');
        const response = await axios.post(`${this.apiDomain}/api/v1/postcard-templates/${this.setFile.id}?_method=PUT`, formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          this.openModal()
          await this.fetchFileData()
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Data has been saved successfully',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              this.titleEdit = ''
              this.fileEdit = null
            }
          });
        } else {
          console.error('Failed to upload the file');
        }
      } catch (error) {
        console.error('An error occurred while uploading the file:', error);
      }
    },
    async deleteFile(item){
      Swal.fire({
        icon: 'warning',
        title: 'Delete Confirmation',
        text: 'Are you sure you want to delete this data?',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it',
        cancelButtonText: 'No, cancel',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const token = localStorage.getItem('access_token');
          try {
            const response = await axios.delete(`${this.apiDomain}/api/v1/postcard-templates/${item.id}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });

            if (response.status === 200) {
              await this.fetchFileData();
              Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Data has been deleted successfully',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
              });
            } else {
              console.error('Failed to delete the file');
            }
          } catch (error) {
            console.error('An error occurred while deleting the file:', error);
          }
        }
      });

    },
    onFileChange(event) {
      this.file = event.target.files[0];
    },
    onFileChangeEdit(event) {
      this.fileEdit = event.target.files[0];
    },
    selectedFile(item){
      this.modalShow = !this.modalShow
      this.setFile = item
      this.titleEdit = item.name
    },
    openModal(){
      this.modalShow = !this.modalShow
    }
  }
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <h1 class="text-xl md:text-3xl font-semibold">
        List File
      </h1>

      <div class="border-[1px] border-[#cccccc] rounded-md p-4 mt-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputDynamic placeholder="Masukan Nama Template" :value="title" inputId="namaBelakangInput" type="text" @value-updated="title = $event" />
          <input type="file" name="file" id="file" class="border-[1px] mt-2 border-[#cccccc] w-full bg-white bg-opacity-50 rounded-md" @change="onFileChange">

          <button class="in-load bg-[#476b6b] text-white px-8 mt-2 rounded-md font-medium hover:bg-[#223d3d] transition duration-300 ease-in-out" @click="onSubmit">
            Submit
          </button>
        </div>

        <table class="table-auto mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>File</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in fileList" :key="index">
              <td>{{ index + 1 }}</td>
              <td>
                <img :src="item.image_path" style="height: 45px;">
              </td>
              <td>{{ item.name }}</td>
              <td>
                <div class="flex">
                  <button @click="selectedFile(item)" class="bg-[#ffbb3e] text-white px-4 py-2 rounded-md mr-2">
                    Edit
                  </button>
                  <button @click="deleteFile(item)" class="bg-[#ff5555] text-white px-4 py-2 rounded-md mr-2">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </SectionMain>
    <ModalPopup :show="modalShow">
      <div class="p-4">
        <h2 class="text-xl font-bold">Edit File "{{setFile.name}}"</h2>
        <p>Input your field.</p>

        <div class="mt-10">
          <label :for="inputId" class="mb-2">
            Title:
          </label>
          <InputDynamic class="mb-2" :value="titleEdit" inputId="namaBelakangInput" type="text" @value-updated="titleEdit = $event" />
          <label :for="inputId">
            File:
          </label>
          <input type="file" name="file" id="file" class="border-[1px] mt-2 border-[#cccccc] w-full bg-white bg-opacity-50 rounded-md" @change="onFileChangeEdit">
        </div>
        <div class="flex mt-8 justify-end">
          <button @click="openModal" class="bg-red-500 text-white px-4 py-2 mr-3 rounded">Close</button>
          <button @click="onEdit" class="bg-[#476b6b] text-white px-4 py-2 rounded">Submit</button>
        </div>
      </div>
    </ModalPopup>
  </LayoutAuthenticated>
</template>
