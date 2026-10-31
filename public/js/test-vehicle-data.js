// Development test fixtures: 10 vehicles covering hatchback, sedan, SUV and MUV, plus Petrol, Diesel, CNG and EV.
// Prices/variants are copied from the existing car-data.js dataset in this project.
const TEST_VEHICLES = [
  {
    "id": "TEST-01",
    "brand": "Maruti Suzuki",
    "model": "Baleno",
    "variant": "Alpha AMT",
    "fuelType": "Petrol",
    "bodyType": "Hatchback",
    "engineCC": 1197,
    "exShowroomPrice": 947000,
    "insuranceCategory": "Hatchback"
  },
  {
    "id": "TEST-02",
    "brand": "Hyundai",
    "model": "Aura",
    "variant": "SX Option",
    "fuelType": "Petrol",
    "bodyType": "Compact Sedan",
    "engineCC": 1197,
    "exShowroomPrice": 816000,
    "insuranceCategory": "Sedan"
  },
  {
    "id": "TEST-03",
    "brand": "Honda",
    "model": "City",
    "variant": "ZX Plus",
    "fuelType": "Petrol",
    "bodyType": "Sedan",
    "engineCC": 1498,
    "exShowroomPrice": 1636000,
    "insuranceCategory": "Sedan"
  },
  {
    "id": "TEST-04",
    "brand": "Tata Motors",
    "model": "Nexon",
    "variant": "Fearless Plus PS DT DCA",
    "fuelType": "Petrol",
    "bodyType": "Compact SUV",
    "engineCC": 1199,
    "exShowroomPrice": 1326000,
    "insuranceCategory": "SUV"
  },
  {
    "id": "TEST-05",
    "brand": "Toyota",
    "model": "Innova Crysta",
    "variant": "GX Plus 7-Seater",
    "fuelType": "Diesel",
    "bodyType": "MPV",
    "engineCC": 2393,
    "exShowroomPrice": 2115000,
    "insuranceCategory": "MUV"
  },
  {
    "id": "TEST-06",
    "brand": "Kia",
    "model": "Seltos",
    "variant": "GTX (O) AT",
    "fuelType": "Diesel",
    "bodyType": "Compact SUV",
    "engineCC": 1493,
    "exShowroomPrice": 2182000,
    "insuranceCategory": "SUV"
  },
  {
    "id": "TEST-07",
    "brand": "Kia",
    "model": "Carens",
    "variant": "Premium Opt",
    "fuelType": "CNG",
    "bodyType": "MPV",
    "engineCC": 1497,
    "exShowroomPrice": 1177000,
    "insuranceCategory": "MUV"
  },
  {
    "id": "TEST-08",
    "brand": "Tata Motors",
    "model": "Nexon EV",
    "variant": "Empowered Plus A 45",
    "fuelType": "Electric",
    "bodyType": "Compact SUV (Electric)",
    "engineCC": null,
    "exShowroomPrice": 1769000,
    "insuranceCategory": "SUV",
    "motorPowerKW": 45
  },
  {
    "id": "TEST-09",
    "brand": "Mahindra",
    "model": "XUV 7XO",
    "variant": "AX7T AT",
    "fuelType": "Diesel",
    "bodyType": "SUV",
    "engineCC": 2184,
    "exShowroomPrice": 1679000,
    "insuranceCategory": "SUV"
  },
  {
    "id": "TEST-10",
    "brand": "Toyota",
    "model": "Innova Hycross",
    "variant": "VX(O) 7STR Hybrid",
    "fuelType": "Petrol",
    "bodyType": "MPV (Hybrid/ICE)",
    "engineCC": 1987,
    "exShowroomPrice": 2877000,
    "insuranceCategory": "MUV"
  }
];
