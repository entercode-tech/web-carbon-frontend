// i18n.js
import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    navbar: [
      'Home',
      'About',
      'Post Card',
      'Carbon',
      'Donation',
    ],
    landingPage: {
      title: 'Tackling Pollution Solutions for a Clean Future',
      description: 'In an increasingly environmentally conscious era, pursuing solutions to tackle pollution is an important step towards a clean and sustainable future.',
      button: 'Carbon'
    },
    allPostCard: {
      title: 'Hello,',
      description: 'Thank you for helping us by donating, whatever your donation is, it means a lot to us.'
    },
    formUser: {
      title: 'Fill Out the Form First',
      subtitle: 'Fill in your details to continue the Carbon calculation process.',
      biodataSection: 'Biodata Form',
      firstNameLabel: 'First Name',
      lastNameLabel: 'Last Name',
      emailLabel: 'Email',
      locationSection: 'Location',
      submitButton: 'Submit',
      formTitle: 'Fill Out the Form First',
      formSubtitle: 'Fill in your details to continue the Carbon calculation process.',
    }
  },
  id: {
    navbar: [
      'Beranda',
      'Tentang',
      'Kartu Pos',
      'Karbon',
      'Donasi',
    ],
    landingPage: {
      title: 'Menangani Solusi Polusi untuk Masa Depan yang Bersih',
      description: 'Di era yang semakin peduli lingkungan, mengejar solusi untuk mengatasi polusi adalah langkah penting menuju masa depan yang bersih dan berkelanjutan.',
      button: 'Karbon'
    },
    allPostCard: {
      title: 'Halo,',
      description: 'Terima kasih telah membantu kami dengan berdonasi, berapapun donasi Anda, itu sangat berarti bagi kami.'
    },
    formUser: {
      title: 'Isi Formulir Terlebih Dahulu',
      subtitle: 'Isi detail Anda untuk melanjutkan proses perhitungan Karbon.',
      biodataSection: 'Formulir Biodata',
      firstNameLabel: 'Nama Depan',
      lastNameLabel: 'Nama Belakang',
      emailLabel: 'Email',
      locationSection: 'Lokasi',
      submitButton: 'Kirim',
      formTitle: 'Isi Formulir Terlebih Dahulu',
      formSubtitle: 'Isi detail Anda untuk melanjutkan proses perhitungan Karbon.',
    }
  },
};

const i18n = createI18n({
  locale: localStorage.getItem('lang') || 'en',
  messages,
});

export default i18n;
