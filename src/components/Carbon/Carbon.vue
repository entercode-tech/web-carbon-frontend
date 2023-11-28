<script>
import axios from 'axios';
import { useRouter } from 'vue-router'

// Icon
import CloudIcon from '@/assets/icon/Cloud.svg'

// Components
import RadioButtonGroup from '@/components/RadioButton/RadioButtonGroup.vue';
import Dropdown from '@/components/Form/Dropdown.vue';
import DropdownV2 from '@/components/Form/DropdownV2.vue';
import InputAutoComplete from '@/components/Form/InputAutoComplete.vue';
import InputDynamic from '@/components/Form/Input.vue'
import PlusMinus from '@/components/Form/PlusMinus.vue'

export default {
  data() {
    return {
      apiKeyCarbon: import.meta.env.VITE_API_KEY_CARBON,
      apiDomainCarbon: import.meta.env.VITE_API_URL_CARBON,
      CloudIcon: CloudIcon,
      departureType: ['Round Trip', 'One Way', 'Multi-City'],
      transportationType: ['Economy', 'Premium'],
      currency: ['USD', 'EUR', 'IDR'],
      distanceTypeCar: ['Kilometer', 'Miles'],
      calculateTypeCar: ['Distance'],
      fuelType: ['Diesel', 'Gasoline (Petrol)', 'Biodiesel'],
      localTransportationType: '',
      allMetricCalc: [],
      localTripType: '',
      localTotalMetric: '',
      localTotalPriceMetric: '',
      manyPeople: 1,
      flightType: [],
      airplaneType: [],
      vehicleType: [],
      totalFlightComponent: 1,
      distanceValue: 0,
      totalMetricTons: 0,
      totalPriceMetricTons: 0,
      selectCurrency: 'USD',
      selectDistanceTypeCar: 'Distance',
      selectDistanceCar: 'Kilometer',
      selectAirplaneType: null,
      selectVehicleType: null,
      selectFlightType: null,
      selectDepartureType: 'Round Trip',
      selectCalculateType: null,
      selectTransportationType: 'Economy',
      isDoneLoad: false,
      isDoneCalc: false,
      selectFuelType: '',
      startFrom: '',
      flightFrom: [],
      flightFromIata: [],
      flightTo: [],
      flightToIata: [],
      section: 'flight',
      listRadioButton: [
        {
          title: 'One Trips',
          value: 'One Trips',
        },
        // {
        //   title: 'Multiple Trips',
        //   value: 'Multiple Trips',
        // },
        {
          title: 'Charter',
          value: 'Charter',
        },
      ],
      listRadioButtonBoat: [
        {
          title: 'Cruise',
          value: 'Cruise',
        },
        {
          title: 'Livea Board',
          value: 'Livea Board',
        },
        {
          title: 'Yacht',
          value: 'Yacht',
        },
      ],
      tripsType: 'One Trips',
      tripsBoatType: 'Cruise',
      dayBoat: 0,
      peopleBoat: 0,
      shortFlight: 0,
      mediumFlight: 0,
      longFlight: 0,
      hourDuration: 0,
      minuteDuration: 0,
      hourDurationCar: 0,
    };
  },
  components: {
    RadioButtonGroup,
    Dropdown,
    PlusMinus,
    DropdownV2,
    InputAutoComplete,
    InputDynamic
  },
  methods: {
    onSelectDepartureType(option) {
      this.selectDepartureType = option;
    },
    onSelectTransportationType(option) {
      this.selectTransportationType = option;
    },
    onSelectFlightType(option) {
      this.selectFlightType = option;
    },
    onSelectVehicleType(option) {
      this.selectVehicleType = option;
    },
    onSelectCalculateType(option) {
      this.selectCalculateType = option;
    },
    onSelectAirplaneType(option) {
      this.selectAirplaneType = option;
    },
    onSelectFuelType(option) {
      this.selectFuelType = option;
    },
    onSelectDistanceType(option) {
      this.selectDistanceTypeCar = option;
    },
    onSelectDistance(option) {
      this.selectDistanceCar = option;
    },
    onRadioButtonSelected(selectedValue) {
      this.tripsType = selectedValue;

      if(selectedValue === 'Charter') this.fetchDataAirplane();
    },
    onRadioButtonSelectedBoat(selectedValue) {
      this.tripsBoatType = selectedValue;
    },
    onAddAnotherFlight(){
      this.totalFlightComponent = this.totalFlightComponent+1;
    },
    onSubmit() {
      let load = document.querySelector('.in-load')
      load.innerHTML = 'Calculate <i class="ml-2 fa-solid fa-circle-notch load"></i>'
      this.isDoneCalc = false
      if(this.section === 'flight') {
        this.localTransportationType = 'Flight';

        if(this.tripsType === 'Charter') {
          this.localTripType = 'Charter';

          const departureType = this.selectDepartureType === 'One Way' ? 'Oneway' : this.selectDepartureType === 'Going Home' ? 'Round' : 'Multicity';
          const payload = {};
          payload.travelType = 'Flight';
          payload.tripType = 'Charter';
          payload.aircraftTypeId = this.selectAirplaneType.id;
          payload.aircraftTypeName = this.selectAirplaneType.name;
          payload.hours = this.hourDuration;
          payload.minutes = this.minuteDuration;

          this.onFlightCalc(payload)
        }else {
          this.localTripType = 'One Trips';

          const departureType = this.selectDepartureType === 'One Way' ? 'Oneway' : this.selectDepartureType === 'Going Home' ? 'Round' : 'Multicity';
          const payload = {};
          payload.travelType = 'Flight';
          payload.tripType = 'Single';
          payload.singleTripType = departureType;
          payload.passengerCount = this.manyPeople;
          payload.flightType = this.selectTransportationType;
          payload.locationFrom = this.flightFrom
          payload.locationFromIata = this.flightFromIata;
          payload.locationTo = this.flightTo;
          payload.locationToIata = this.flightToIata;

          this.onFlightCalc(payload)
        }
      }else if(this.section === 'car') {
          this.localTransportationType = 'Car';
          this.localTripType = '-';

          const payload = {};
          payload.travelType = 'Vehicle';
          payload.vehicleTypeId = this.selectVehicleType.id;
          payload.vehicleTypeName = this.selectVehicleType.name;
          if(this.selectCalculateType === 'Hour') {
            payload.calculateUnit = 'jam';
            payload.time = this.hourDurationCar;
            payload.distance = 0;
          }else{
            payload.distance = this.distanceValue;
            payload.calculateUnit = this.selectDistanceCar;
          }

          this.onVehicleCalc(payload)
      }else {
        this.localTransportationType = 'Boat';

        if(this.tripsBoatType === 'Cruise') {
          this.localTripType = 'Cruise';

          const payload = {};
          payload.travelType = 'Boat';
          payload.boatType = 'Cruise';
          payload.days = this.dayBoat;
          payload.peoples = this.peopleBoat;
          this.onBoatCalc(payload)
        }else if(this.tripsBoatType === 'Livea Board') {
          this.localTripType = 'Livea Board';

          const payload = {};
          payload.travelType = 'Boat';
          payload.boatType = 'Liveaboard';
          payload.days = this.dayBoat;
          payload.peoples = this.peopleBoat;
          this.onBoatCalc(payload)
        }else{
          this.localTripType = 'Yachts';

          const payload = {};
          payload.travelType = 'Boat';
          payload.boatType = 'Yachts';
          payload.fuelType = this.selectFuelType === 'Gasoline (Petrol)' ? 'Gasoline' : this.selectFuelType ;
          payload.fuelConsumption = 0;
          payload.fuelUnit = 'Gallons';
          this.onBoatCalc(payload)
        }

      }
      load.innerHTML = 'Calculate'
      this.isDoneCalc = true
    },
    async fetchDataAirplane(){
      axios.post(`${this.apiDomainCarbon}/api/get-charter-planes-list`, {}, {
        headers: {
          'Client-Key': this.apiKeyCarbon
        }
      })
      .then(response => {
        const data = response.data.result.charterPlanes;
        const mappedData = data.reduce((result, region) => {
          const regionName = Object.keys(region)[0];
          const airportsInRegion = region[regionName];
          return result.concat(airportsInRegion);
        }, []);

        this.airplaneType = mappedData;
      })
      .catch(error => {
        console.error('Error:', error);
      });

    },
    async fetchDataVehicle(){
      axios.post(`${this.apiDomainCarbon}/api/get-vehicle-types`, {}, {
        headers: {
          'Client-Key': this.apiKeyCarbon
        }
      })
      .then(response => {
        const data = response.data.result.vehicleTypes;

        this.vehicleType = data;
      })
      .catch(error => {
        console.error('Error:', error);
      });

    },
    selectSection(param) {
      this.section = param
      if(param === 'car') this.fetchDataVehicle();
    },
    onSelectFlightFrom(e){
      this.flightFrom.push(e.id); 
      this.flightFromIata.push(e.iataCode); 
    },
    onSelectFlightTo(e){
      this.flightTo.push(e.id); 
      this.flightToIata.push(e.iataCode); 
    },
    onSelectCurrency(e){
      this.selectCurrency = e
      switch (e) {
        case 'USD':
          this.totalPriceMetricTons = parseFloat((this.totalMetricTons * 16).toFixed(2));
          break;
        case 'IDR':
          this.totalPriceMetricTons = parseFloat((this.totalMetricTons * 224000).toFixed(2));
          break;
        case 'EUR':
          this.totalPriceMetricTons = parseFloat((this.totalMetricTons * 15.09).toFixed(2));
          break;
        default:
          this.totalPriceMetricTons = parseFloat((this.totalMetricTons * 16).toFixed(2));
      }
    },
    onFlightCalc(payload){
      axios.post(`${this.apiDomainCarbon}/api/user/flight-calculator`, payload, {
        headers: {
          'Client-Key': this.apiKeyCarbon
        }
      })
      .then(response => {
        const totalMetricTons = response.data.result.calculate;
        this.totalMetricTons = parseFloat(totalMetricTons.toFixed(2));
        this.localTotalMetric = parseFloat(totalMetricTons.toFixed(2));
        this.localTotalPriceMetric = parseFloat((totalMetricTons * 16).toFixed(2));

        switch (this.selectCurrency) {
          case 'USD':
            this.totalPriceMetricTons = parseFloat((totalMetricTons * 16).toFixed(2));
            break;
          case 'IDR':
            this.totalPriceMetricTons = parseFloat((totalMetricTons * 224000).toFixed(2));
            break;
          case 'EUR':
            this.totalPriceMetricTons = parseFloat((totalMetricTons * 15.09).toFixed(2));
            break;
          default:
            this.totalPriceMetricTons = parseFloat((totalMetricTons * 16).toFixed(2));
        }

        const logData = {};
        logData.category = "Flight Footprint ";
        logData.title = "Flight: " + payload.flightType;
        logData.metric = parseFloat(totalMetricTons.toFixed(2));

        const existingCategory = this.allMetricCalc.find(item => item.category === logData.category);

        if (existingCategory) {
          const existingLogData = existingCategory.data.find(item => item.title === logData.title);

          if (existingLogData) {
            Object.assign(existingLogData, logData);
          } else {
            existingCategory.data.push(logData);
          }
        } else {
          this.allMetricCalc.push({
            category: logData.category,
            data: [logData]
          });
        }

        this.isDoneLoad = true
      })
      .catch(error => {
        console.error('Error:', error);
      });
    },
    onVehicleCalc(payload){
      axios.post(`${this.apiDomainCarbon}/api/user/vehicle-calculator`, payload, {
        headers: {
          'Client-Key': this.apiKeyCarbon
        }
      })
      .then(response => {
        const totalMetricTons = response.data.result.calculate;
        this.totalMetricTons = parseFloat(totalMetricTons.toFixed(2));
        this.localTotalMetric = parseFloat(totalMetricTons.toFixed(2));
        this.localTotalPriceMetric = parseFloat((totalMetricTons * 16).toFixed(2));

        switch (this.selectCurrency) {
          case 'USD':
            this.totalPriceMetricTons = parseFloat((totalMetricTons * 16).toFixed(2));
            break;
          case 'IDR':
            this.totalPriceMetricTons = parseFloat((totalMetricTons * 224000).toFixed(2));
            break;
          case 'EUR':
            this.totalPriceMetricTons = parseFloat((totalMetricTons * 15.09).toFixed(2));
            break;
          default:
            this.totalPriceMetricTons = parseFloat((totalMetricTons * 16).toFixed(2));
        }
        
        const logData = {};
        logData.category = "Car Footprint ";
        logData.title = "Car: " + payload.vehicleTypeName;
        logData.metric = parseFloat(totalMetricTons.toFixed(2));

        const existingCategory = this.allMetricCalc.find(item => item.category === logData.category);

        if (existingCategory) {
          const existingLogData = existingCategory.data.find(item => item.title === logData.title);

          if (existingLogData) {
            Object.assign(existingLogData, logData);
          } else {
            existingCategory.data.push(logData);
          }
        } else {
          this.allMetricCalc.push({
            category: logData.category,
            data: [logData]
          });
        }

        this.isDoneLoad = true

      })
      .catch(error => {
        console.error('Error:', error);
      });
    },
    onBoatCalc(payload){
      axios.post(`${this.apiDomainCarbon}/api/user/boat-calculator`, payload, {
        headers: {
          'Client-Key': this.apiKeyCarbon
        }
      })
      .then(response => {
        const totalMetricTons = response.data.result.calculate;
        this.totalMetricTons = parseFloat(totalMetricTons.toFixed(2));
        this.localTotalMetric = parseFloat(totalMetricTons.toFixed(2));
        this.localTotalPriceMetric = parseFloat((totalMetricTons * 16).toFixed(2));

        switch (this.selectCurrency) {
          case 'USD':
            this.totalPriceMetricTons = parseFloat((totalMetricTons * 16).toFixed(2));
            break;
          case 'IDR':
            this.totalPriceMetricTons = parseFloat((totalMetricTons * 224000).toFixed(2));
            break;
          case 'EUR':
            this.totalPriceMetricTons = parseFloat((totalMetricTons * 15.09).toFixed(2));
            break;
          default:
            this.totalPriceMetricTons = parseFloat((totalMetricTons * 16).toFixed(2));
        }

        const logData = {};
        logData.category = "Boat Footprint ";
        logData.title = "Boat: " + payload.boatType;
        logData.metric = parseFloat(totalMetricTons.toFixed(2));

        const existingCategory = this.allMetricCalc.find(item => item.category === logData.category);

        if (existingCategory) {
          const existingLogData = existingCategory.data.find(item => item.title === logData.title);

          if (existingLogData) {
            Object.assign(existingLogData, logData);
          } else {
            existingCategory.data.push(logData);
          }
        } else {
          this.allMetricCalc.push({
            category: logData.category,
            data: [logData]
          });
        }

        this.isDoneLoad = true
      })
      .catch(error => {
        console.error('Error:', error);
      });
    },
    onPostcard(){
      let load = document.querySelector('.in-load2')
      load.innerHTML = 'Submit <i class="ml-2 fa-solid fa-circle-notch load"></i>'
      const data = {}
      data.transportationType = this.localTransportationType
      data.tripType = this.localTripType
      data.totalMetricTons = this.calculateTotalMetric
      data.totalPriceMetricTons = this.totalPriceMetricTons

      localStorage.setItem('dataCarbon', JSON.stringify(data));
      localStorage.setItem('dataAllCarbon', JSON.stringify(this.allMetricCalc));
      this.$router.push('/postcard');
    },
    removeLogData(categoryIndex, dataIndex) {
      this.allMetricCalc[categoryIndex].data.splice(dataIndex, 1);
      if (this.allMetricCalc[categoryIndex].data.length === 0) {
        this.allMetricCalc.splice(categoryIndex, 1);
      }
    }
  },
  computed: {
    calculateTotalMetric() {
      let totalMetric = 0;
      for (const category of this.allMetricCalc) {
        for (const logData of category.data) {
          totalMetric += logData.metric;
        }
      }
      this.onSelectCurrency(this.selectCurrency)
      this.totalMetricTons = totalMetric.toFixed(2);
      return totalMetric.toFixed(2);
    }
  }
};
</script>

<template>
  <div class="carbon text-left text-[#2e2e2e]">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="col-span-1 md:col-span-2">
        <div class="left-section border-[1px] border-[#cccccc] rounded-md py-4 px-6 bg-white bg-opacity-50">
          <h1 class="text-xl font-semibold">
            Trip Details
          </h1>

          <div class="button-group mt-4">
            <div class="flex">
              <button @click="selectSection('flight')" :class="section === 'flight' ? 'bg-[#163331] text-white' : 'bg-transparent'" class="flex items-center font-medium border-[1px] border-[#163331] hover:text-white hover:bg-[#163331] px-4 py-2 w-[33%] rounded-l-md">
                <svg class="mr-2 hidden md:block" :class="section === 'flight' ? 'fill-white' : 'fill-[#2e2e2e]'" width="15" height="15" viewBox="0 0 58.568 58.568" xmlns="http://www.w3.org/2000/svg">
                  <path id="flight_plane" data-name="flight plane" d="M1023.994,672.006c2.4-3.218,3.843-6.559,3.85-8.946a3.323,3.323,0,0,0-.453-1.828,1.706,1.706,0,0,0-.578-.584,3.265,3.265,0,0,0-1.852-.466c-2.381,0-5.723,1.442-8.942,3.849a77.166,77.166,0,0,0-8.806,8.487q-.917.966-1.934,2.031l-6.976-2.091.02-.02a1.566,1.566,0,0,0-.005-2.2l-1.259-1.261a1.571,1.571,0,0,0-1.11-.461,1.541,1.541,0,0,0-1.1.458l-1.885,1.886-1-.3a1.563,1.563,0,0,0-.125-2.063l-1.266-1.265a1.568,1.568,0,0,0-1.109-.457,1.534,1.534,0,0,0-1.1.458l-1.73,1.73-7.094-2.125a1.775,1.775,0,0,0-.507-.072,1.875,1.875,0,0,0-1.311.531l-2.494,2.494a1.463,1.463,0,0,0-.439,1.029,1.433,1.433,0,0,0,.761,1.284l14.918,8.334a2.607,2.607,0,0,1,.362.275l4.253,4.252c-3.978,4.191-7.522,8.25-10.284,11.781-.258.328-.5.649-.742.965l-11.541-1.048a1.573,1.573,0,0,0-.2-.012,2.127,2.127,0,0,0-1.429.591l-1.163,1.161a1.449,1.449,0,0,0-.446,1.029,1.418,1.418,0,0,0,.839,1.3l8.119,3.857a1.843,1.843,0,0,1,.311.223l.674.668a4.938,4.938,0,0,0-.325,1.561,2.053,2.053,0,0,0,.567,1.5l.029.026.008.005a2.056,2.056,0,0,0,1.493.56,4.964,4.964,0,0,0,1.548-.322l.684.682a1.956,1.956,0,0,1,.212.3l3.848,8.1a1.435,1.435,0,0,0,1.294.851h.008a1.446,1.446,0,0,0,1.026-.432l1.192-1.2a2.132,2.132,0,0,0,.569-1.426c0-.066,0-.117-.005-.144l-1.051-11.581c.317-.238.636-.484.965-.739,3.536-2.766,7.6-6.313,11.779-10.286l4.256,4.26a2.314,2.314,0,0,1,.278.365l8.318,14.891a1.451,1.451,0,0,0,2.322.342l2.512-2.51a1.9,1.9,0,0,0,.514-1.31,1.769,1.769,0,0,0-.069-.491l-2.125-7.095,1.729-1.733a1.563,1.563,0,0,0,0-2.205l-1.268-1.267a1.559,1.559,0,0,0-2.062-.129l-.3-.995,1.887-1.886a1.577,1.577,0,0,0,.455-1.107,1.54,1.54,0,0,0-.455-1.1l-1.262-1.262a1.563,1.563,0,0,0-2.217,0l-.013.012-2.089-6.976q1.082-1.032,2.062-1.96C1019.32,677.193,1022.053,674.6,1023.994,672.006Z" transform="translate(-969.276 -660.182)"/>
                </svg>
                Flight
              </button>
              <button @click="selectSection('car')" :class="section === 'car' ? 'bg-[#163331] text-white' : 'bg-transparent'" class="flex items-center font-medium border-[1px] border-[#163331] hover:text-white hover:bg-[#163331] px-4 py-2 w-[34%]">
                <svg :class="section === 'car' ? 'fill-white' : 'fill-[#2e2e2e]'" version="1.0" class="mr-2 hidden md:block" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                    width="15" height="15" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
                  <path fill="#2e2e2e" d="M60,28c0-8.301-5.016-24-24-24h-8C9.016,4,4,19.699,4,28c-2.211,0-4,1.789-4,4v16c0,2.211,1.789,4,4,4h4v4
                    c0,2.211,1.789,4,4,4h4c2.211,0,4-1.789,4-4v-4h24v4c0,2.211,1.789,4,4,4h4c2.211,0,4-1.789,4-4v-4h4c2.211,0,4-1.789,4-4V32
                    C64,29.789,62.211,28,60,28z M16,44c-2.211,0-4-1.789-4-4s1.789-4,4-4s4,1.789,4,4S18.211,44,16,44z M12,28c0-0.652,0.184-16,16-16
                    h8c15.41,0,15.984,14.379,16,16H12z M48,44c-2.211,0-4-1.789-4-4s1.789-4,4-4s4,1.789,4,4S50.211,44,48,44z"/>
                </svg>
                Car
              </button>
              <button @click="selectSection('boat')" :class="section === 'boat' ? 'bg-[#163331] text-white' : 'bg-transparent'" class="flex items-center font-medium border-[1px] border-[#163331] hover:text-white hover:bg-[#163331] px-4 py-2 w-[33%] rounded-r-md">
                <svg :class="section === 'boat' ? 'fill-white' : 'fill-[#2e2e2e]'" class="mr-2 hidden md:block" width="15" height="15" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M477.77,246.42c-2.13-6-7.23-9.55-12.56-11.95L432,221.38V92a20,20,0,0,0-20-20H336V40a16,16,0,0,0-16-16H192a16,16,0,0,0-16,16V72H100A20,20,0,0,0,80,92V221.46L46.92,234.52c-5.33,2.4-10.58,6-12.72,12s-3.16,11.81-1,19L84.25,415.7h1.06c34.12,0,64-17.41,85.31-43.82C191.94,398.29,221.8,414,255.92,414s64-15.76,85.31-42.17c21.32,26.41,51.18,43.87,85.3,43.87h1.06l51.25-150.17C481,259.53,479.91,252.43,477.77,246.42ZM256,152,112,208.83V108a4,4,0,0,1,4-4H396a4,4,0,0,1,4,4V208.76Z"/><path d="M345.22,407c-52.25,36.26-126.35,36.25-178.6,0,0,0-45.64,63-94.64,63l13.33,1c29.86,0,58.65-11.73,85.31-25.59a185.33,185.33,0,0,0,170.6,0c26.66,13.87,55.45,25.6,85.31,25.6l13.33-1C392.21,470,345.22,407,345.22,407Z"/>
                </svg>
                Boat
              </button>
            </div>
          </div>

          <div v-if="section === 'flight'">
            <div class="mt-6">
              <RadioButtonGroup :listRadioButton="listRadioButton" @selected="onRadioButtonSelected" />          
            </div>
            
            <div v-if="tripsType === 'One Trips'">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Dropdown :options="departureType" @selected="onSelectDepartureType" defaultValue="Round Trip" />

                <div class="flex items-center border-[1px] border-[#163331] rounded-md pl-4">
                  <svg width="20" height="20" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#163331" class="bi bi-people-fill">
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                    <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                  </svg>
                  <input placeholder="Many People?" type="number" v-model="manyPeople" class="bg-transparent w-full border-none outline-none focus:outline-none">
                </div>

                <Dropdown class="mr-4" :options="transportationType" @selected="onSelectTransportationType" defaultValue="Economy" />
              </div>

              <div v-for="(item, index) in totalFlightComponent" :key="index" class="mt-6 flex items-center">
                <InputAutoComplete placeholder="Where From?" class="w-full" @selected="onSelectFlightFrom" />
                
                <svg width="40" height="40" class="mx-4" viewBox="0 -9 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
                        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-256.000000, -1200.000000)" fill="#163331">
                            <path d="M287.718,1206.22 L281.795,1200.28 C281.404,1199.89 280.768,1199.89 280.376,1200.28 C279.984,1200.68 279.984,1201.31 280.376,1201.71 L284.635,1205.98 L259.365,1205.98 L263.624,1201.71 C264.016,1201.31 264.016,1200.68 263.624,1200.28 C263.232,1199.89 262.597,1199.89 262.205,1200.28 L256.282,1206.22 C256.073,1206.43 255.983,1206.71 255.998,1206.98 C255.983,1207.26 256.073,1207.54 256.282,1207.75 L262.205,1213.69 C262.597,1214.08 263.232,1214.08 263.624,1213.69 C264.016,1213.29 264.016,1212.66 263.624,1212.26 L259.365,1207.99 L284.635,1207.99 L280.376,1212.26 C279.984,1212.66 279.984,1213.29 280.376,1213.69 C280.768,1214.08 281.404,1214.08 281.795,1213.69 L287.718,1207.75 C287.927,1207.54 288.017,1207.26 288.002,1206.98 C288.017,1206.71 287.927,1206.43 287.718,1206.22" id="arrow-left-right" sketch:type="MSShapeGroup"></path>
                        </g>
                    </g>
                </svg>

                <InputAutoComplete placeholder="Where To?" class="w-full" @selected="onSelectFlightTo" />
              </div>
              <div v-if="selectDepartureType === 'Multi City'">
                <button class="bg-[#476b6b] w-full mt-4 text-white px-8 py-2 rounded-md font-medium hover:bg-[#223d3d] transition duration-300 ease-in-out" @click="onAddAnotherFlight">
                  Add another flight
                </button>
              </div>
            </div>
            <div v-if="tripsType === 'Multiple Trips'">
              <h1 class="text-md font-bold mt-6">
                How many round-trip flights do you want to be compensated for?
              </h1>
              
              <Dropdown class="mt-6" :options="transportationType" @selected="onSelectTransportationType" />

              <div class="flex items-center justify-between mt-6">
                <div class="flex items-center">
                  <svg class="text-[#163331]" width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path fill="none" d="M0 0h24v24H0z"/>
                        <path d="M10.478 11.632L5.968 4.56l1.931-.518 6.951 6.42 5.262-1.41a1.5 1.5 0 0 1 .776 2.898L5.916 15.96l-.776-2.898.241-.065 2.467 2.445-2.626.704a1 1 0 0 1-1.133-.48L1.466 10.94l1.449-.388 2.466 2.445 5.097-1.366zM4 19h16v2H4v-2z"/>
                    </g>
                  </svg>
                  <div class="ml-4">
                    <h1 class="text-md font-bold">
                      Short Flights
                    </h1>
                    <p class="text-xs font-medium">
                      Less than 3 hours
                    </p>
                  </div>
                </div>
                <PlusMinus @value-updated="shortFlight = $event" :value="shortFlight" :min="0" :max="100" />
              </div>

              <div class="flex items-center justify-between mt-6">
                <div class="flex items-center">
                  <svg class="text-[#163331]" width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path fill="none" d="M0 0h24v24H0z"/>
                        <path d="M10.478 11.632L5.968 4.56l1.931-.518 6.951 6.42 5.262-1.41a1.5 1.5 0 0 1 .776 2.898L5.916 15.96l-.776-2.898.241-.065 2.467 2.445-2.626.704a1 1 0 0 1-1.133-.48L1.466 10.94l1.449-.388 2.466 2.445 5.097-1.366zM4 19h16v2H4v-2z"/>
                    </g>
                  </svg>
                  <div class="ml-4">
                    <h1 class="text-md font-bold">
                      Medium Flights
                    </h1>
                    <p class="text-xs font-medium">
                      3-66 hours
                    </p>
                  </div>
                </div>
                <PlusMinus @value-updated="mediumFlight = $event" :value="mediumFlight" :min="0" :max="100" />
              </div>

              <div class="flex items-center justify-between mt-6">
                <div class="flex items-center">
                  <svg class="text-[#163331]" width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path fill="none" d="M0 0h24v24H0z"/>
                        <path d="M10.478 11.632L5.968 4.56l1.931-.518 6.951 6.42 5.262-1.41a1.5 1.5 0 0 1 .776 2.898L5.916 15.96l-.776-2.898.241-.065 2.467 2.445-2.626.704a1 1 0 0 1-1.133-.48L1.466 10.94l1.449-.388 2.466 2.445 5.097-1.366zM4 19h16v2H4v-2z"/>
                    </g>
                  </svg>
                  <div class="ml-4">
                    <h1 class="text-md font-bold">
                      Long Flights
                    </h1>
                    <p class="text-xs font-medium">
                      6+ hours
                    </p>
                  </div>
                </div>
                <PlusMinus @value-updated="longFlight = $event" :value="longFlight" :min="0" :max="100" />
              </div>
            </div>
            <div v-if="tripsType === 'Charter'">
              <div class="flex items-center justify-between mt-6">
                <div class="flex items-center">
                  <svg class="text-[#163331]" width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path fill="none" d="M0 0h24v24H0z"/>
                        <path d="M10.478 11.632L5.968 4.56l1.931-.518 6.951 6.42 5.262-1.41a1.5 1.5 0 0 1 .776 2.898L5.916 15.96l-.776-2.898.241-.065 2.467 2.445-2.626.704a1 1 0 0 1-1.133-.48L1.466 10.94l1.449-.388 2.466 2.445 5.097-1.366zM4 19h16v2H4v-2z"/>
                    </g>
                  </svg>
                  <div class="ml-4">
                    <h1 class="text-md font-bold">
                      Flights Type
                    </h1>
                  </div>
                </div>
                <DropdownV2 class="mt-6" :options="airplaneType" @selected="onSelectAirplaneType" />
              </div>
              <div class="flex items-center justify-between mt-2">
                <div class="flex items-center">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 6V12" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16.24 16.24L12 12" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <div class="ml-4">
                    <h1 class="text-md font-bold">
                      Duration
                    </h1>
                  </div>
                </div>
                <div class="flex justify-end">
                  <div class="flex items-center justify-end w-[30%]">
                    <input type="number" v-model="hourDuration" class="border-[1px]  border-[#163331] w-full bg-transparent bg-opacity-50 rounded-md">
                    <h1 class="px-2 py-1 bg-[#163331] text-white font-bold rounded-r-md">Hour</h1>
                  </div>
                  <div class="flex items-center justify-end w-[30%] ml-2">
                    <input type="number" v-model="minuteDuration" class="border-[1px] border-[#163331] w-full bg-transparent bg-opacity-50 rounded-md">
                    <h1 class="px-2 py-1 bg-[#163331] text-white font-bold rounded-r-md">Minute</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="section === 'car'">
            <div class="flex items-center justify-between mt-6">
              <div class="flex items-center">
                <div>
                  <h1 class="text-md font-bold">
                    Vehicle
                  </h1>
                </div>
              </div>
              <DropdownV2 class="mt-6" :options="vehicleType" @selected="onSelectVehicleType" zero="Standar Car" />
            </div>
            <div class="flex items-center justify-between mt-2">
              <div class="flex items-center">
                <div >
                  <h1 class="text-md font-bold">
                    Calculate With
                  </h1>
                </div>
              </div>
              <Dropdown :options="calculateTypeCar" :placeholder="selectDistanceTypeCar" @selected="onSelectDistanceType" />
            </div>
            <div v-if="selectDistanceTypeCar === 'Hour'" class="flex items-center justify-between mt-2">
              <div class="flex items-center">
                <div>
                  <h1 class="text-md font-bold">
                    Duration
                  </h1>
                </div>
              </div>
              <div class="flex justify-end">
                <div class="flex items-center justify-end w-[50%]">
                  <input placeholder="Hour Duration Car?" type="number" v-model="hourDurationCar" class="border-[1px]  border-[#163331] w-full bg-transparent bg-opacity-50 rounded-md">
                  <h1 class="px-2 py-1 bg-[#163331] text-white font-bold rounded-r-md">Hour</h1>
                </div>
              </div>
            </div>
            <div v-else class="flex items-center justify-between mt-2">
              <div class="flex items-center">
                <div>
                  <h1 class="text-md font-bold">
                    Distance
                  </h1>
                </div>
              </div>
              <div class="flex justify-end">
                <div class="flex items-center justify-end w-[60%]">
                  <input placeholder="Distance?" type="number" v-model="distanceValue" class="border-[1px]  border-[#163331] w-full bg-transparent bg-opacity-50 rounded-md">
                  <Dropdown :options="distanceTypeCar" placeholder="Kilometer" class="ml-3" @selected="onSelectDistance" />
                </div>
              </div>
            </div>
          </div>
          <div v-if="section === 'boat'">
            <div class="mt-6">
              <RadioButtonGroup :listRadioButton="listRadioButtonBoat" @selected="onRadioButtonSelectedBoat" />          
            </div>
            
            <div v-if="tripsBoatType === 'Cruise'">
              <div class="flex items-center justify-between mt-6">
                <div class="flex items-center">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 10V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V10M20 10V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V10M20 10H4M8 3V7M16 3V7" stroke="#163331" stroke-width="2" stroke-linecap="round"/>
                    <rect x="6" y="12" width="3" height="3" rx="0.5" fill="#163331"/>
                    <rect x="10.5" y="12" width="3" height="3" rx="0.5" fill="#163331"/>
                    <rect x="15" y="12" width="3" height="3" rx="0.5" fill="#163331"/>
                  </svg>
                  <div class="ml-4">
                    <h1 class="text-md font-bold">
                      Day
                    </h1>
                  </div>
                </div>
                <PlusMinus @value-updated="dayBoat = $event" :value="dayBoat" :min="0" :max="100" />
              </div>
              <div class="flex items-center justify-between mt-2">
                <div class="flex items-center">
                  <svg fill="#163331" width="30" height="30" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.313 26.102l-6.296-3.488c2.34-1.841 2.976-5.459 2.976-7.488v-4.223c0-2.796-3.715-5.91-7.447-5.91-3.73 0-7.544 3.114-7.544 5.91v4.223c0 1.845 0.78 5.576 3.144 7.472l-6.458 3.503s-1.688 0.752-1.688 1.689v2.534c0 0.933 0.757 1.689 1.688 1.689h21.625c0.931 0 1.688-0.757 1.688-1.689v-2.534c0-0.994-1.689-1.689-1.689-1.689zM23.001 30.015h-21.001v-1.788c0.143-0.105 0.344-0.226 0.502-0.298 0.047-0.021 0.094-0.044 0.139-0.070l6.459-3.503c0.589-0.32 0.979-0.912 1.039-1.579s-0.219-1.32-0.741-1.739c-1.677-1.345-2.396-4.322-2.396-5.911v-4.223c0-1.437 2.708-3.91 5.544-3.91 2.889 0 5.447 2.44 5.447 3.91v4.223c0 1.566-0.486 4.557-2.212 5.915-0.528 0.416-0.813 1.070-0.757 1.739s0.446 1.267 1.035 1.589l6.296 3.488c0.055 0.030 0.126 0.063 0.184 0.089 0.148 0.063 0.329 0.167 0.462 0.259v1.809zM30.312 21.123l-6.39-3.488c2.34-1.841 3.070-5.459 3.070-7.488v-4.223c0-2.796-3.808-5.941-7.54-5.941-2.425 0-4.904 1.319-6.347 3.007 0.823 0.051 1.73 0.052 2.514 0.302 1.054-0.821 2.386-1.308 3.833-1.308 2.889 0 5.54 2.47 5.54 3.941v4.223c0 1.566-0.58 4.557-2.305 5.915-0.529 0.416-0.813 1.070-0.757 1.739 0.056 0.67 0.445 1.267 1.035 1.589l6.39 3.488c0.055 0.030 0.126 0.063 0.184 0.089 0.148 0.063 0.329 0.167 0.462 0.259v1.779h-4.037c0.61 0.46 0.794 1.118 1.031 2h3.319c0.931 0 1.688-0.757 1.688-1.689v-2.503c-0.001-0.995-1.689-1.691-1.689-1.691z"></path>
                  </svg>
                  <div class="ml-4">
                    <h1 class="text-md font-bold">
                      People
                    </h1>
                  </div>
                </div>
                <PlusMinus @value-updated="peopleBoat = $event" :value="peopleBoat" :min="0" :max="100" />
              </div>
            </div>
            <div v-if="tripsBoatType === 'Livea Board'">
              <div class="flex items-center justify-between mt-6">
                <div class="flex items-center">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 10V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V10M20 10V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V10M20 10H4M8 3V7M16 3V7" stroke="#163331" stroke-width="2" stroke-linecap="round"/>
                    <rect x="6" y="12" width="3" height="3" rx="0.5" fill="#163331"/>
                    <rect x="10.5" y="12" width="3" height="3" rx="0.5" fill="#163331"/>
                    <rect x="15" y="12" width="3" height="3" rx="0.5" fill="#163331"/>
                  </svg>
                  <div class="ml-4">
                    <h1 class="text-md font-bold">
                      Day
                    </h1>
                  </div>
                </div>
                <PlusMinus @value-updated="dayBoat = $event" :value="dayBoat" :min="0" :max="100" />
              </div>
              <div class="flex items-center justify-between mt-2">
                <div class="flex items-center">
                  <svg fill="#163331" width="30" height="30" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.313 26.102l-6.296-3.488c2.34-1.841 2.976-5.459 2.976-7.488v-4.223c0-2.796-3.715-5.91-7.447-5.91-3.73 0-7.544 3.114-7.544 5.91v4.223c0 1.845 0.78 5.576 3.144 7.472l-6.458 3.503s-1.688 0.752-1.688 1.689v2.534c0 0.933 0.757 1.689 1.688 1.689h21.625c0.931 0 1.688-0.757 1.688-1.689v-2.534c0-0.994-1.689-1.689-1.689-1.689zM23.001 30.015h-21.001v-1.788c0.143-0.105 0.344-0.226 0.502-0.298 0.047-0.021 0.094-0.044 0.139-0.070l6.459-3.503c0.589-0.32 0.979-0.912 1.039-1.579s-0.219-1.32-0.741-1.739c-1.677-1.345-2.396-4.322-2.396-5.911v-4.223c0-1.437 2.708-3.91 5.544-3.91 2.889 0 5.447 2.44 5.447 3.91v4.223c0 1.566-0.486 4.557-2.212 5.915-0.528 0.416-0.813 1.070-0.757 1.739s0.446 1.267 1.035 1.589l6.296 3.488c0.055 0.030 0.126 0.063 0.184 0.089 0.148 0.063 0.329 0.167 0.462 0.259v1.809zM30.312 21.123l-6.39-3.488c2.34-1.841 3.070-5.459 3.070-7.488v-4.223c0-2.796-3.808-5.941-7.54-5.941-2.425 0-4.904 1.319-6.347 3.007 0.823 0.051 1.73 0.052 2.514 0.302 1.054-0.821 2.386-1.308 3.833-1.308 2.889 0 5.54 2.47 5.54 3.941v4.223c0 1.566-0.58 4.557-2.305 5.915-0.529 0.416-0.813 1.070-0.757 1.739 0.056 0.67 0.445 1.267 1.035 1.589l6.39 3.488c0.055 0.030 0.126 0.063 0.184 0.089 0.148 0.063 0.329 0.167 0.462 0.259v1.779h-4.037c0.61 0.46 0.794 1.118 1.031 2h3.319c0.931 0 1.688-0.757 1.688-1.689v-2.503c-0.001-0.995-1.689-1.691-1.689-1.691z"></path>
                  </svg>
                  <div class="ml-4">
                    <h1 class="text-md font-bold">
                      People
                    </h1>
                  </div>
                </div>
                <PlusMinus @value-updated="peopleBoat = $event" :value="peopleBoat" :min="0" :max="100" />
              </div>
            </div>
            <div v-if="tripsBoatType === 'Yacht'">
              <div class="flex items-center justify-between mt-2">
                <div class="flex items-center">
                  <div>
                    <h1 class="text-md font-bold">
                      Fuel Type
                    </h1>
                  </div>
                </div>
                <Dropdown class="mt-6" :options="fuelType" @selected="onSelectFuelType" />
              </div>
            </div>
          </div>
        </div>

        <button class="in-load bg-[#476b6b] mt-4 text-white px-8 py-2 rounded-md font-medium hover:bg-[#223d3d] transition duration-300 ease-in-out" @click="onSubmit">
          Calculate
        </button>
      </div>
      <div class="right-section border-[1px] border-[#cccccc] rounded-md py-4 px-6 bg-white bg-opacity-50">
        <h1 class="text-xl font-semibold">
          Your Carbon Footprint
        </h1>


        <div v-if="isDoneCalc" class="relative">
          <svg class="mx-auto mt-10" width="242" height="94" viewBox="0 0 242 94" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M240.733 56.4533C240.452 56.4531 240.182 56.3582 239.976 56.1879C239.771 56.0175 239.646 55.7843 239.626 55.5352C238.9 46.7639 234.475 38.5599 227.235 32.5648C219.996 26.5697 210.476 23.2258 200.582 23.2021C199.398 23.2021 198.154 23.2556 196.885 23.3612C196.672 23.3789 196.459 23.3419 196.269 23.2546C196.08 23.1673 195.923 23.0335 195.817 22.869C191.272 15.7976 184.485 10.0726 176.303 6.40835C168.121 2.74413 158.905 1.30301 149.808 2.26484C140.71 3.22666 132.132 6.54883 125.145 11.8167C118.157 17.0847 113.07 24.065 110.518 31.8867C110.451 32.0963 110.307 32.28 110.109 32.409C109.911 32.5379 109.671 32.6048 109.426 32.599L109.13 32.5911C108.977 32.5865 108.823 32.5817 108.668 32.5817C101.164 32.6026 93.8927 34.9037 88.0616 39.1032C82.2306 43.3027 78.1902 49.1482 76.6109 55.6697C76.5583 55.8913 76.4216 56.0901 76.2237 56.2328C76.0259 56.3755 75.7788 56.4533 75.524 56.4533H1.11074C0.816151 56.4533 0.53363 56.3493 0.325327 56.1642C0.117023 55.979 0 55.7279 0 55.466C0 55.2042 0.117023 54.953 0.325327 54.7679C0.53363 54.5827 0.816151 54.4787 1.11074 54.4787H74.6351C76.486 47.6954 80.8397 41.6587 87.0014 37.3319C93.1631 33.005 100.778 30.6375 108.63 30.607C111.426 22.5693 116.787 15.4261 124.063 10.0454C131.339 4.66461 140.216 1.27785 149.616 0.296527C159.016 -0.684798 168.534 0.78155 177.015 4.51743C185.495 8.2533 192.572 14.0979 197.387 21.3412C198.48 21.2655 199.551 21.2274 200.582 21.2274C211.038 21.2526 221.098 24.7866 228.748 31.1222C236.398 37.4577 241.075 46.1276 241.842 55.3968C241.852 55.5262 241.834 55.6561 241.788 55.779C241.741 55.902 241.668 56.0157 241.573 56.1136C241.477 56.2115 241.361 56.2917 241.23 56.3495C241.099 56.4074 240.957 56.4419 240.812 56.4509C240.785 56.4526 240.759 56.4533 240.733 56.4533Z" fill="#9CA3AF"></path>
            <path d="M227.517 69.1124H45.3563C45.0618 69.1124 44.7792 69.0084 44.5709 68.8233C44.3626 68.6381 44.2456 68.387 44.2456 68.1251C44.2456 67.8633 44.3626 67.6121 44.5709 67.427C44.7792 67.2418 45.0618 67.1378 45.3563 67.1378H227.517C227.812 67.1378 228.094 67.2418 228.303 67.427C228.511 67.6121 228.628 67.8633 228.628 68.1251C228.628 68.387 228.511 68.6381 228.303 68.8233C228.094 69.0084 227.812 69.1124 227.517 69.1124Z" fill="#9CA3AF"></path>
            <path d="M89.7862 83.4289H28.6957C28.4011 83.4289 28.1186 83.3249 27.9103 83.1397C27.702 82.9546 27.585 82.7034 27.585 82.4416C27.585 82.1797 27.702 81.9286 27.9103 81.7434C28.1186 81.5583 28.4011 81.4543 28.6957 81.4543H89.7862C90.0808 81.4543 90.3633 81.5583 90.5716 81.7434C90.78 81.9286 90.897 82.1797 90.897 82.4416C90.897 82.7034 90.78 82.9546 90.5716 83.1397C90.3633 83.3249 90.0808 83.4289 89.7862 83.4289Z" fill="#9CA3AF"></path>
            <path d="M240.733 56.7536C240.452 56.7534 240.182 56.6585 239.976 56.4882C239.771 56.3178 239.646 56.0846 239.626 55.8355C238.9 47.0642 234.475 38.8602 227.235 32.8651C219.996 26.87 210.476 23.526 200.582 23.5024C199.398 23.5024 198.154 23.5559 196.885 23.6615C196.672 23.6792 196.459 23.6422 196.269 23.5549C196.08 23.4676 195.923 23.3337 195.817 23.1693C191.272 16.0979 184.485 10.3729 176.303 6.70864C168.121 3.04443 158.905 1.6033 149.808 2.56513C140.71 3.52695 132.132 6.84912 125.145 12.117C118.157 17.385 113.07 24.3653 110.518 32.187C110.451 32.3966 110.307 32.5803 110.109 32.7093C109.911 32.8382 109.671 32.9051 109.426 32.8993L109.13 32.8913C108.977 32.8868 108.823 32.882 108.668 32.882C101.164 32.9028 93.8927 35.204 88.0616 39.4035C82.2306 43.603 78.1902 49.4485 76.6109 55.97C76.5583 56.1916 76.4216 56.3904 76.2237 56.5331C76.0259 56.6758 75.7788 56.7536 75.524 56.7536H1.11074C0.816151 56.7536 0.53363 56.6496 0.325327 56.4645C0.117023 56.2793 0 56.0282 0 55.7663C0 55.5045 0.117023 55.2533 0.325327 55.0682C0.53363 54.883 0.816151 54.779 1.11074 54.779H74.6351C76.486 47.9957 80.8397 41.959 87.0014 37.6322C93.1631 33.3053 100.778 30.9378 108.63 30.9073C111.426 22.8696 116.787 15.7264 124.063 10.3457C131.339 4.9649 140.216 1.57815 149.616 0.59682C159.016 -0.384506 168.534 1.08184 177.015 4.81772C185.495 8.5536 192.572 14.3982 197.387 21.6415C198.48 21.5658 199.551 21.5277 200.582 21.5277C211.038 21.5529 221.098 25.0869 228.748 31.4225C236.398 37.758 241.075 46.4279 241.842 55.6971C241.852 55.8265 241.834 55.9564 241.788 56.0793C241.741 56.2023 241.668 56.316 241.573 56.4139C241.477 56.5118 241.361 56.592 241.23 56.6498C241.099 56.7077 240.957 56.7422 240.812 56.7512C240.785 56.7529 240.759 56.7536 240.733 56.7536Z" fill="url(#paint0_linear_588:8903)"></path>
            <path d="M227.517 69.4127H45.3563C45.0618 69.4127 44.7792 69.3087 44.5709 69.1235C44.3626 68.9384 44.2456 68.6873 44.2456 68.4254C44.2456 68.1636 44.3626 67.9124 44.5709 67.7273C44.7792 67.5421 45.0618 67.4381 45.3563 67.4381H227.517C227.812 67.4381 228.094 67.5421 228.303 67.7273C228.511 67.9124 228.628 68.1636 228.628 68.4254C228.628 68.6873 228.511 68.9384 228.303 69.1235C228.094 69.3087 227.812 69.4127 227.517 69.4127Z" fill="url(#paint1_linear_588:8903)"></path>
            <path d="M89.7862 83.7292H28.6957C28.4011 83.7292 28.1186 83.6252 27.9103 83.44C27.702 83.2549 27.585 83.0037 27.585 82.7419C27.585 82.48 27.702 82.2289 27.9103 82.0437C28.1186 81.8586 28.4011 81.7545 28.6957 81.7545H89.7862C90.0808 81.7545 90.3633 81.8586 90.5716 82.0437C90.78 82.2289 90.897 82.48 90.897 82.7419C90.897 83.0037 90.78 83.2549 90.5716 83.44C90.3633 83.6252 90.0808 83.7292 89.7862 83.7292Z" fill="url(#paint2_linear_588:8903)"></path>
            <path d="M130.785 87.5V78.162H129.119L126.221 85.358L123.309 78.162H121.643V87.5H122.805V79.646L125.983 87.5H126.459L129.623 79.646V87.5H130.785ZM135.988 87.668C137.08 87.668 137.99 87.29 138.676 86.618L138.172 85.932C137.626 86.492 136.856 86.8 136.072 86.8C134.616 86.8 133.734 85.736 133.65 84.462H139.11V84.196C139.11 82.166 137.906 80.57 135.862 80.57C133.93 80.57 132.53 82.152 132.53 84.112C132.53 86.226 133.972 87.668 135.988 87.668ZM138.074 83.678H133.636C133.692 82.656 134.406 81.438 135.848 81.438C137.388 81.438 138.06 82.684 138.074 83.678ZM142.532 87.668C143.134 87.668 143.512 87.486 143.778 87.234L143.47 86.436C143.33 86.59 143.064 86.73 142.756 86.73C142.308 86.73 142.084 86.366 142.084 85.862V81.662H143.456V80.738H142.084V78.89H141.02V80.738H139.9V81.662H141.02V86.086C141.02 87.094 141.524 87.668 142.532 87.668ZM145.975 87.5V82.712C146.283 82.166 147.165 81.634 147.823 81.634C147.977 81.634 148.103 81.648 148.229 81.662V80.584C147.305 80.584 146.521 81.116 145.975 81.816V80.738H144.925V87.5H145.975ZM150.079 79.772C150.471 79.772 150.779 79.464 150.779 79.072C150.779 78.68 150.471 78.358 150.079 78.358C149.687 78.358 149.365 78.68 149.365 79.072C149.365 79.464 149.687 79.772 150.079 79.772ZM150.597 87.5V80.738H149.547V87.5H150.597ZM155.673 87.668C156.905 87.668 157.633 87.164 158.151 86.492L157.451 85.848C157.003 86.45 156.429 86.73 155.729 86.73C154.301 86.73 153.391 85.61 153.391 84.112C153.391 82.614 154.301 81.508 155.729 81.508C156.429 81.508 157.003 81.76 157.451 82.376L158.151 81.746C157.633 81.074 156.905 80.57 155.673 80.57C153.657 80.57 152.299 82.11 152.299 84.112C152.299 86.114 153.657 87.668 155.673 87.668ZM164.981 87.668C165.583 87.668 165.961 87.486 166.227 87.234L165.919 86.436C165.779 86.59 165.513 86.73 165.205 86.73C164.757 86.73 164.533 86.366 164.533 85.862V81.662H165.905V80.738H164.533V78.89H163.469V80.738H162.349V81.662H163.469V86.086C163.469 87.094 163.973 87.668 164.981 87.668ZM170.329 87.668C172.387 87.668 173.675 86.072 173.675 84.112C173.675 82.152 172.387 80.57 170.329 80.57C168.271 80.57 166.983 82.152 166.983 84.112C166.983 86.072 168.271 87.668 170.329 87.668ZM170.329 86.73C168.887 86.73 168.089 85.498 168.089 84.112C168.089 82.74 168.887 81.508 170.329 81.508C171.771 81.508 172.569 82.74 172.569 84.112C172.569 85.498 171.771 86.73 170.329 86.73ZM181 87.5V82.754C181 81.284 180.258 80.57 178.858 80.57C177.836 80.57 176.912 81.144 176.436 81.718V80.738H175.386V87.5H176.436V82.558C176.842 82.012 177.612 81.508 178.438 81.508C179.348 81.508 179.964 81.872 179.964 83.076V87.5H181ZM185.267 87.668C187.003 87.668 187.913 86.758 187.913 85.624C187.913 82.992 183.727 83.958 183.727 82.488C183.727 81.886 184.301 81.424 185.225 81.424C186.107 81.424 186.835 81.788 187.241 82.278L187.731 81.55C187.199 81.004 186.387 80.57 185.225 80.57C183.615 80.57 182.719 81.452 182.719 82.516C182.719 85.022 186.905 84.014 186.905 85.652C186.905 86.324 186.331 86.814 185.295 86.814C184.371 86.814 183.517 86.366 183.069 85.848L182.537 86.604C183.223 87.318 184.147 87.668 185.267 87.668ZM196.196 87.668C198.254 87.668 199.542 86.072 199.542 84.112C199.542 82.152 198.254 80.57 196.196 80.57C194.138 80.57 192.85 82.152 192.85 84.112C192.85 86.072 194.138 87.668 196.196 87.668ZM196.196 86.73C194.754 86.73 193.956 85.498 193.956 84.112C193.956 82.74 194.754 81.508 196.196 81.508C197.638 81.508 198.436 82.74 198.436 84.112C198.436 85.498 197.638 86.73 196.196 86.73ZM202.598 87.5V81.662H203.97V80.738H202.598V80.22C202.598 79.352 202.976 78.89 203.676 78.89C204.012 78.89 204.278 79.016 204.502 79.212L204.936 78.54C204.516 78.148 204.054 78.022 203.508 78.022C202.318 78.022 201.548 78.834 201.548 80.22V80.738H200.428V81.662H201.548V87.5H202.598ZM213.321 87.668C214.973 87.668 216.093 86.884 216.877 85.806L215.897 85.274C215.365 86.058 214.385 86.632 213.321 86.632C211.277 86.632 209.723 85.05 209.723 82.838C209.723 80.598 211.277 79.044 213.321 79.044C214.385 79.044 215.365 79.604 215.897 80.402L216.863 79.856C216.121 78.792 214.973 78.008 213.321 78.008C210.633 78.008 208.519 79.968 208.519 82.838C208.519 85.708 210.633 87.668 213.321 87.668ZM222.614 87.668C225.372 87.668 227.262 85.596 227.262 82.838C227.262 80.08 225.372 78.008 222.614 78.008C219.856 78.008 217.98 80.08 217.98 82.838C217.98 85.596 219.856 87.668 222.614 87.668ZM222.614 86.632C220.514 86.632 219.184 85.008 219.184 82.838C219.184 80.654 220.514 79.044 222.614 79.044C224.7 79.044 226.058 80.654 226.058 82.838C226.058 85.008 224.7 86.632 222.614 86.632ZM232.745 89.544V88.858H229.903C231.555 87.654 232.717 86.632 232.717 85.512C232.717 84.364 231.737 83.86 230.715 83.86C229.931 83.86 229.119 84.154 228.657 84.742L229.119 85.274C229.413 84.882 230.001 84.546 230.687 84.546C231.289 84.546 231.877 84.854 231.877 85.568C231.877 86.478 230.813 87.374 228.671 88.914V89.544H232.745Z" fill="#333333"></path>
            <defs>
            <linearGradient id="paint0_linear_588:8903" x1="120.922" y1="0.300293" x2="120.922" y2="56.7536" gradientUnits="userSpaceOnUse">
            <stop stop-color="#008370"></stop>
            <stop offset="1" stop-color="#97C93D"></stop>
            </linearGradient>
            <linearGradient id="paint1_linear_588:8903" x1="136.437" y1="67.4381" x2="136.437" y2="69.4127" gradientUnits="userSpaceOnUse">
            <stop stop-color="#008370"></stop>
            <stop offset="1" stop-color="#97C93D"></stop>
            </linearGradient>
            <linearGradient id="paint2_linear_588:8903" x1="59.241" y1="81.7545" x2="59.241" y2="83.7292" gradientUnits="userSpaceOnUse">
            <stop stop-color="#008370"></stop>
            <stop offset="1" stop-color="#97C93D"></stop>
            </linearGradient>
            </defs>
          </svg>
          <p class="text-md font-bold absolute top-[40%] right-[38%]">{{totalMetricTons}}</p>
        </div>

        <div v-else class="relative">
          <svg class="mx-auto mt-10" width="242" height="84" viewBox="0 0 242 84" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M240.589 56.9611C240.309 56.9609 240.038 56.8661 239.833 56.6959C239.628 56.5257 239.503 56.2927 239.483 56.0439C238.758 47.2814 234.335 39.0855 227.099 33.0964C219.864 27.1073 210.351 23.7667 200.462 23.743C199.279 23.743 198.036 23.7965 196.767 23.9019C196.555 23.9196 196.342 23.8827 196.152 23.7955C195.963 23.7083 195.806 23.5745 195.7 23.4102C191.158 16.3459 184.375 10.6266 176.198 6.96601C168.02 3.30545 158.811 1.86577 149.718 2.82663C140.626 3.7875 132.053 7.10636 125.07 12.369C118.087 17.6317 113.003 24.6051 110.452 32.419C110.385 32.6284 110.241 32.8119 110.043 32.9407C109.846 33.0696 109.605 33.1363 109.36 33.1306L109.065 33.1226C108.912 33.118 108.758 33.1132 108.604 33.1132C101.103 33.1341 93.8366 35.4329 88.0091 39.6283C82.1815 43.8236 78.1436 49.6632 76.5652 56.1783C76.5126 56.3996 76.376 56.5983 76.1783 56.7408C75.9805 56.8833 75.7336 56.9611 75.4789 56.9611H1.11007C0.815664 56.9611 0.533312 56.8572 0.325132 56.6722C0.116953 56.4872 0 56.2364 0 55.9748C0 55.7132 0.116953 55.4623 0.325132 55.2773C0.533312 55.0924 0.815664 54.9884 1.11007 54.9884H74.5905C76.4404 48.2119 80.7915 42.1812 86.9495 37.8587C93.1075 33.5362 100.718 31.171 108.565 31.1405C111.359 23.1108 116.717 15.9748 123.989 10.5994C131.26 5.22402 140.132 1.84063 149.527 0.860288C158.921 -0.120059 168.434 1.34483 176.909 5.07698C185.384 8.80913 192.458 14.6479 197.269 21.884C198.361 21.8084 199.432 21.7703 200.462 21.7703C210.912 21.7955 220.966 25.3259 228.612 31.6552C236.257 37.9845 240.931 46.6457 241.698 55.9057C241.708 56.0349 241.69 56.1646 241.643 56.2875C241.597 56.4104 241.524 56.5239 241.429 56.6217C241.333 56.7195 241.217 56.7996 241.086 56.8574C240.956 56.9152 240.814 56.9497 240.668 56.9587C240.642 56.9604 240.615 56.9611 240.589 56.9611Z" fill="#9CA3AF"></path>
            <path d="M227.381 69.6075H45.3288C45.0344 69.6075 44.7521 69.5036 44.5439 69.3187C44.3357 69.1337 44.2188 68.8828 44.2188 68.6212C44.2188 68.3596 44.3357 68.1088 44.5439 67.9238C44.7521 67.7388 45.0344 67.6349 45.3288 67.6349H227.381C227.675 67.6349 227.958 67.7388 228.166 67.9238C228.374 68.1088 228.491 68.3596 228.491 68.6212C228.491 68.8828 228.374 69.1337 228.166 69.3187C227.958 69.5036 227.675 69.6075 227.381 69.6075Z" fill="#9CA3AF"></path>
            <path d="M89.7325 83.9097H28.6784C28.384 83.9097 28.1017 83.8058 27.8935 83.6208C27.6853 83.4359 27.5684 83.185 27.5684 82.9234C27.5684 82.6618 27.6853 82.4109 27.8935 82.2259C28.1017 82.041 28.384 81.937 28.6784 81.937H89.7325C90.0269 81.937 90.3093 82.041 90.5175 82.2259C90.7256 82.4109 90.8426 82.6618 90.8426 82.9234C90.8426 83.185 90.7256 83.4359 90.5175 83.6208C90.3093 83.8058 90.0269 83.9097 89.7325 83.9097Z" fill="#9CA3AF"></path>
            <path v-if="!isDoneCalc" opacity="0.3" d="M146.769 33.6021H151.36C151.36 33.6021 151.36 30.1772 155.365 30.1158C157.445 30.0844 158.521 31.2948 158.962 32.2228C159.471 33.2997 159.317 34.5274 158.635 35.5262C157.857 36.6665 156.18 37.8128 153.085 37.3288L153.056 46.4159H157.595V41.0288C157.595 41.0288 163.962 39.5667 163.962 33.3331C163.962 27.3685 158.534 26.08 155.616 25.9972C153.992 25.9511 153.404 25.889 151.396 26.1421C148.838 26.4652 146.714 29.105 146.769 33.6021Z" fill="#D1D5DB"></path>
            <path v-if="!isDoneCalc" opacity="0.3" d="M157.652 48.3104H153.045V52.1333H157.652V48.3104Z" fill="#D1D5DB"></path>
            <path v-if="!isDoneCalc" d="M144.868 33.602H149.458C149.458 33.602 149.458 30.177 153.464 30.1156C155.544 30.0842 156.62 31.2946 157.061 32.2227C157.569 33.2995 157.415 34.5273 156.734 35.5261C155.955 36.6664 154.249 37.7032 151.156 37.2192V46.4157H155.695V41.0286C155.695 41.0286 162.06 39.5665 162.06 33.3329C162.06 27.3683 156.041 25.983 153.464 25.983C151.494 25.9817 144.781 26.4063 144.868 33.602Z" fill="#9CA3AF"></path>
            <path v-if="!isDoneCalc" d="M155.749 48.3104H151.143V52.1333H155.749V48.3104Z" fill="#9CA3AF"></path>
          </svg>
        </div>

        <div class="mt-4">
          <div class="border-b-2 mb-2 pb-2 border-b-[#ccccc]" v-for="(category, categoryIndex) in allMetricCalc" :key="categoryIndex">
            <p class="text-lg mb-2 font-bold">{{ category.category }}</p>
            
            <div class="flex justify-between" v-for="(logData, index) in category.data" :key="index">
              <p class="text-md font-normal">{{ logData.title }}</p>
              <div class="flex items-center">
                <p class="text-md font-normal">{{ logData.metric }}</p>
                <p class="m-0 ml-2 text-[red] cursor-pointer" @click="removeLogData(categoryIndex, index)">x</p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-between">
          <p class="text-md font-nromal mt-4">
            Total Metric Tons
          </p>
          <p class="text-md font-nromal mt-4">
            {{ calculateTotalMetric }}
          </p>
        </div>

        <div class="flex justify-between">
          <p class="text-md font-bold ">
            Price
          </p>
          <p class="text-md font-bold">
            {{selectCurrency === 'USD' ? '$' : selectCurrency === 'IDR' ? 'Rp.' : '€'}} {{ totalPriceMetricTons }}
          </p>
        </div>

        <div class="flex justify-end mt-4">
          <Dropdown :options="currency" placeholder="USD" @selected="onSelectCurrency" />
        </div>

        <button v-if="isDoneLoad" class="in-load2 bg-[#476b6b] w-full mt-4 text-white px-8 py-2 rounded-md font-medium hover:bg-[#223d3d] transition duration-300 ease-in-out" @click="onPostcard">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
button:hover svg {
  fill: white;
}
button:hover svg path {
  fill: white;
}
</style>