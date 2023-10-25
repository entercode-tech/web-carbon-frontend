<script>
import axios from 'axios';

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
      departureType: ['Going Home', 'One Way', 'Multi City'],
      transportationType: ['Economy', 'Premium'],
      currency: ['USD', 'EUR', 'IDR'],
      fuelType: ['Diesel', 'Gasoline (Petrol)', 'Biodiesel'],
      manyPeople: 1,
      flightType: [],
      airplaneType: [],
      totalFlightComponent: 1,
      totalMetricTons: 0,
      totalPriceMetricTons: 0,
      selectCurrency: 'USD',
      selectAirplaneType: null,
      selectFlightType: null,
      selectDepartureType: null,
      selectTransportationType: null,
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
        {
          title: 'Multiple Trips',
          value: 'Multiple Trips',
        },
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
      tripsType: '',
      tripsBoatType: '',
      dayBoat: 0,
      peopleBoat: 0,
      shortFlight: 0,
      mediumFlight: 0,
      longFlight: 0,
      hourDuration: 0,
      minuteDuration: 0,
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
    onSelectAirplaneType(option) {
      this.selectAirplaneType = option;
    },
    onSelectFuelType(option) {
      this.selectFuelType = option;
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
      if(this.section === 'flight') {
        if(this.tripsType === 'One Trips') {
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
        }else if(this.tripsType === 'Charter') {
          const departureType = this.selectDepartureType === 'One Way' ? 'Oneway' : this.selectDepartureType === 'Going Home' ? 'Round' : 'Multicity';
          const payload = {};
          payload.travelType = 'Flight';
          payload.tripType = 'Charter';
          payload.aircraftTypeId = this.selectAirplaneType.id;
          payload.aircraftTypeName = this.selectAirplaneType.name;
          payload.hours = this.hourDuration;
          payload.minutes = this.minuteDuration;

          this.onFlightCalc(payload)
        }
      }
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
    selectSection(param) {
      this.section = param
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

      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  },
};
</script>

<template>
  <div class="carbon text-left text-[#2e2e2e]">
    <div class="grid grid-cols-3 gap-4">
      <div class="col-span-2">
        <div class="left-section border-[1px] border-[#cccccc] rounded-md py-4 px-6 bg-white bg-opacity-50">
          <h1 class="text-xl font-semibold">
            Trip Details
          </h1>

          <div class="button-group mt-4">
            <div class="flex">
              <button @click="selectSection('flight')" :class="section === 'flight' ? 'bg-[#163331] text-white' : 'bg-transparent'" class="flex items-center font-medium border-[1px] border-[#163331] hover:text-white hover:bg-[#163331] px-4 py-2 w-[33%] rounded-l-md">
                <svg :class="section === 'flight' ? 'fill-white' : 'fill-[#2e2e2e]'" class="mr-2" width="15" height="15" viewBox="0 0 58.568 58.568" xmlns="http://www.w3.org/2000/svg">
                  <path id="flight_plane" data-name="flight plane" d="M1023.994,672.006c2.4-3.218,3.843-6.559,3.85-8.946a3.323,3.323,0,0,0-.453-1.828,1.706,1.706,0,0,0-.578-.584,3.265,3.265,0,0,0-1.852-.466c-2.381,0-5.723,1.442-8.942,3.849a77.166,77.166,0,0,0-8.806,8.487q-.917.966-1.934,2.031l-6.976-2.091.02-.02a1.566,1.566,0,0,0-.005-2.2l-1.259-1.261a1.571,1.571,0,0,0-1.11-.461,1.541,1.541,0,0,0-1.1.458l-1.885,1.886-1-.3a1.563,1.563,0,0,0-.125-2.063l-1.266-1.265a1.568,1.568,0,0,0-1.109-.457,1.534,1.534,0,0,0-1.1.458l-1.73,1.73-7.094-2.125a1.775,1.775,0,0,0-.507-.072,1.875,1.875,0,0,0-1.311.531l-2.494,2.494a1.463,1.463,0,0,0-.439,1.029,1.433,1.433,0,0,0,.761,1.284l14.918,8.334a2.607,2.607,0,0,1,.362.275l4.253,4.252c-3.978,4.191-7.522,8.25-10.284,11.781-.258.328-.5.649-.742.965l-11.541-1.048a1.573,1.573,0,0,0-.2-.012,2.127,2.127,0,0,0-1.429.591l-1.163,1.161a1.449,1.449,0,0,0-.446,1.029,1.418,1.418,0,0,0,.839,1.3l8.119,3.857a1.843,1.843,0,0,1,.311.223l.674.668a4.938,4.938,0,0,0-.325,1.561,2.053,2.053,0,0,0,.567,1.5l.029.026.008.005a2.056,2.056,0,0,0,1.493.56,4.964,4.964,0,0,0,1.548-.322l.684.682a1.956,1.956,0,0,1,.212.3l3.848,8.1a1.435,1.435,0,0,0,1.294.851h.008a1.446,1.446,0,0,0,1.026-.432l1.192-1.2a2.132,2.132,0,0,0,.569-1.426c0-.066,0-.117-.005-.144l-1.051-11.581c.317-.238.636-.484.965-.739,3.536-2.766,7.6-6.313,11.779-10.286l4.256,4.26a2.314,2.314,0,0,1,.278.365l8.318,14.891a1.451,1.451,0,0,0,2.322.342l2.512-2.51a1.9,1.9,0,0,0,.514-1.31,1.769,1.769,0,0,0-.069-.491l-2.125-7.095,1.729-1.733a1.563,1.563,0,0,0,0-2.205l-1.268-1.267a1.559,1.559,0,0,0-2.062-.129l-.3-.995,1.887-1.886a1.577,1.577,0,0,0,.455-1.107,1.54,1.54,0,0,0-.455-1.1l-1.262-1.262a1.563,1.563,0,0,0-2.217,0l-.013.012-2.089-6.976q1.082-1.032,2.062-1.96C1019.32,677.193,1022.053,674.6,1023.994,672.006Z" transform="translate(-969.276 -660.182)"/>
                </svg>
                Flight
              </button>
              <button @click="selectSection('car')" :class="section === 'car' ? 'bg-[#163331] text-white' : 'bg-transparent'" class="flex items-center font-medium border-[1px] border-[#163331] hover:text-white hover:bg-[#163331] px-4 py-2 w-[34%]">
                <svg :class="section === 'car' ? 'fill-white' : 'fill-[#2e2e2e]'" version="1.0" class="mr-2" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                    width="15" height="15" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
                  <path fill="#2e2e2e" d="M60,28c0-8.301-5.016-24-24-24h-8C9.016,4,4,19.699,4,28c-2.211,0-4,1.789-4,4v16c0,2.211,1.789,4,4,4h4v4
                    c0,2.211,1.789,4,4,4h4c2.211,0,4-1.789,4-4v-4h24v4c0,2.211,1.789,4,4,4h4c2.211,0,4-1.789,4-4v-4h4c2.211,0,4-1.789,4-4V32
                    C64,29.789,62.211,28,60,28z M16,44c-2.211,0-4-1.789-4-4s1.789-4,4-4s4,1.789,4,4S18.211,44,16,44z M12,28c0-0.652,0.184-16,16-16
                    h8c15.41,0,15.984,14.379,16,16H12z M48,44c-2.211,0-4-1.789-4-4s1.789-4,4-4s4,1.789,4,4S50.211,44,48,44z"/>
                </svg>
                Car
              </button>
              <button @click="selectSection('boat')" :class="section === 'boat' ? 'bg-[#163331] text-white' : 'bg-transparent'" class="flex items-center font-medium border-[1px] border-[#163331] hover:text-white hover:bg-[#163331] px-4 py-2 w-[33%] rounded-r-md">
                <svg :class="section === 'boat' ? 'fill-white' : 'fill-[#2e2e2e]'" class="mr-2" width="15" height="15" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
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
              <div class="mt-6 flex items-center justify-between">
                <Dropdown :options="departureType" placeholder="Select Option" @selected="onSelectDepartureType" />

                <div class="flex items-center border-[1px] border-[#163331] rounded-md pl-4">
                  <svg width="20" height="20" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#163331" class="bi bi-people-fill">
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                    <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                  </svg>
                  <input type="number" v-model="manyPeople" class="bg-transparent w-full border-none outline-none focus:outline-none">
                </div>

                <Dropdown class="mr-4" :options="transportationType" placeholder="Select Option" @selected="onSelectTransportationType" />

              </div>

              <div v-for="(item, index) in totalFlightComponent" :key="index" class="mt-6 flex items-center">
                <InputAutoComplete class="w-full" placeholder="Select Option" @selected="onSelectFlightFrom" />
                
                <svg width="40" height="40" class="mx-4" viewBox="0 -9 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
                        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-256.000000, -1200.000000)" fill="#163331">
                            <path d="M287.718,1206.22 L281.795,1200.28 C281.404,1199.89 280.768,1199.89 280.376,1200.28 C279.984,1200.68 279.984,1201.31 280.376,1201.71 L284.635,1205.98 L259.365,1205.98 L263.624,1201.71 C264.016,1201.31 264.016,1200.68 263.624,1200.28 C263.232,1199.89 262.597,1199.89 262.205,1200.28 L256.282,1206.22 C256.073,1206.43 255.983,1206.71 255.998,1206.98 C255.983,1207.26 256.073,1207.54 256.282,1207.75 L262.205,1213.69 C262.597,1214.08 263.232,1214.08 263.624,1213.69 C264.016,1213.29 264.016,1212.66 263.624,1212.26 L259.365,1207.99 L284.635,1207.99 L280.376,1212.26 C279.984,1212.66 279.984,1213.29 280.376,1213.69 C280.768,1214.08 281.404,1214.08 281.795,1213.69 L287.718,1207.75 C287.927,1207.54 288.017,1207.26 288.002,1206.98 C288.017,1206.71 287.927,1206.43 287.718,1206.22" id="arrow-left-right" sketch:type="MSShapeGroup"></path>
                        </g>
                    </g>
                </svg>

                <InputAutoComplete class="w-full" placeholder="Select Option" @selected="onSelectFlightTo" />
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
              
              <Dropdown class="mt-6" :options="transportationType" placeholder="Select Option" @selected="onSelectTransportationType" />

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
                <DropdownV2 class="mt-6" :options="airplaneType" placeholder="Select Option" @selected="onSelectAirplaneType" />
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
                    Flights Type
                  </h1>
                </div>
              </div>
              <Dropdown class="mt-6" :options="flightType" placeholder="Select Option" @selected="onSelectFlightType" />
            </div>
            <div class="flex items-center justify-between mt-2">
              <div class="flex items-center">
                <div >
                  <h1 class="text-md font-bold">
                    Calculate With
                  </h1>
                </div>
              </div>
              <Dropdown class="mt-6" :options="flightType" placeholder="Select Option" @selected="onSelectFlightType" />
            </div>
              <div class="flex items-center justify-between mt-2">
                <div class="flex items-center">
                  <div>
                    <h1 class="text-md font-bold">
                      Duration
                    </h1>
                  </div>
                </div>
                <div class="flex">
                  <div>
                    <input type="number" :value="hourDuration" class="border-[1px] w-[79.5%] border-[#163331] w-full bg-transparent bg-opacity-50 rounded-md">
                    <button class="px-2 py-1 bg-[#163331] text-white font-bold rounded-r-md" style="cursor: pointer">Hour</button>
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
                <PlusMinus @value-updated="dayBoat = $event" :value="dayBoat" :min="0" :max="100" />
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
                <PlusMinus @value-updated="dayBoat = $event" :value="dayBoat" :min="0" :max="100" />
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
                <Dropdown class="mt-6" :options="fuelType" placeholder="Select Option" @selected="onSelectFuelType" />
              </div>
            </div>
          </div>
        </div>

        <button class="bg-[#476b6b] mt-4 text-white px-8 py-2 rounded-md font-medium hover:bg-[#223d3d] transition duration-300 ease-in-out" @click="onSubmit">
          Calculation
        </button>
      </div>
      <div class="right-section border-[1px] border-[#cccccc] rounded-md py-4 px-6 bg-white bg-opacity-50">
        <h1 class="text-xl font-semibold">
          Your Carbon Footprint
        </h1>

        <img :src="CloudIcon" class="mx-auto mt-10">

        <div class="flex justify-between">
          <p class="text-md font-nromal mt-4">
            Total Metric Tons
          </p>
          <p class="text-md font-nromal mt-4">
            {{ totalMetricTons }}
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